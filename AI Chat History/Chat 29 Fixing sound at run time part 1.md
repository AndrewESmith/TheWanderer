Caused by: Reference...

How do I fix the fol...

New Session





All audio unit tests pass but I am getting the following error when the game runs please analyis the error, explain why it occurs and fix it Audio Error: SOUND_LOAD_ERROR: Sound asset not found: boulder_move

The game will continue to work, but sound effects may be limited or unavailable.

Kiro
Including Steering Documents

typescript-standards.md
I'll analyze this audio error and help you fix it. Let me first examine the current audio system implementation to understand the issue.

Searched workspace
Searching for references to the boulder_move sound that's causing the error
Read file(s)

sound-config.ts
Searched workspace
Checking if the sounds directory and boulder folder exist
Searched workspace
Checking the sounds directory structure
Searched workspace
Checking the boulder sounds directory to see what files exist
Now let me check the audio manager to see how it handles sound loading:

Error(s) while reading file(s)
Searched workspace
Finding the audio manager file
Read file(s)

audio-manager.ts
Let me check the error handling and see how sounds are loaded:

Searched workspace
Looking for the specific error message about sound asset not found
Now let me check how the game is trying to play the boulder_move sound:

Searched workspace
Looking for where boulder_move sound is being played in the game code
Searched workspace
Looking for where BOULDER_MOVE sound ID is used in the game
Let me check the sound event mapper to see how boulder movement events are handled:

Read file(s)

sound-event-mapper.ts
Now let me check where boulder movement events are generated in the game logic:

Searched workspace
Looking for where boulder movement events are created or triggered in the game
Now let me check the collision detection file to see how boulder movement events are generated:

Read file(s)

collision-detection.ts 140 - 161
Now I understand the issue! Let me check the current working directory and see if there's a mismatch in the sound file path:

Command
Get-Location
Get-Location
Command
pwd
pwd
'pwd' is not recognized as an internal or external command,
operable program or batch file.

D:\FizzBash\TheWanderer>get -  -location
'get-location' is not recognized as an internal or external command,     
operable program or batch file.

D:\FizzBash\TheWanderer>Get-Location
'Get-Location' is not recognized as an internal or external command,     
operable program or batch file.

D:\FizzBash\TheWanderer
Command
dir
dir
 Volume in drive D is DevDrive
:\Windows\System32\cmd.exe - dir
 Volume Serial Number is 729F-4428

 Directory of D:\FizzBash\TheWanderer

27/07/2025  06:40 PM    <DIR>          .
27/07/2025  06:40 PM    <DIR>          ..
27/07/2025  11:16 AM               165 .env
27/07/2025  11:16 AM                78 .env.development
27/07/2025  11:16 AM                77 .env.production
27/07/2025  11:16 AM    <DIR>          .github
27/07/2025  11:16 AM               437 .gitignore
27/07/2025  11:16 AM    <DIR>          .kiro
27/07/2025  11:16 AM    <DIR>          .vscode
27/07/2025  06:40 PM    <DIR>          AI Chat History
27/07/2025  11:16 AM    <DIR>          dist
27/07/2025  11:16 AM               675 index.html
27/07/2025  11:16 AM    <DIR>          Instructions
27/07/2025  11:16 AM                 0 mcp.log
27/07/2025  11:16 AM             2,414 MigrateToVite.md
24/07/2025  03:59 PM    <DIR>          node_modules
27/07/2025  11:16 AM           194,305 package-lock.json
27/07/2025  11:16 AM             1,849 package.json
27/07/2025  06:40 PM    <DIR>          playwright-report
27/07/2025  11:16 AM             2,365 playwright.config.ts
27/07/2025  11:16 AM    <DIR>          public
27/07/2025  11:16 AM             8,957 README.md
27/07/2025  11:16 AM                43 run-tests-no-warnings.bat
27/07/2025  11:16 AM               506 run-tests-no-warnings.js
27/07/2025  11:16 AM             1,258 run-tests.js
27/07/2025  11:16 AM               970 run-vitest.js
27/07/2025  11:16 AM    <DIR>          src
27/07/2025  11:16 AM                44 start-no-warnings.bat
27/07/2025  11:16 AM                59 start-with-tests.bat
27/07/2025  11:16 AM             1,340 start-with-tests.js
27/07/2025  11:16 AM               123 start-with-tests.ps1
27/07/2025  06:40 PM    <DIR>          test-results
27/07/2025  11:16 AM    <DIR>          tests-examples
27/07/2025  11:16 AM               824 tsconfig.json
27/07/2025  11:16 AM               251 tsconfig.node.json
27/07/2025  11:16 AM             1,123 vite.config.js
27/07/2025  11:16 AM               877 vitest.config.js
27/07/2025  11:16 AM               950 vitest.config.ts
27/07/2025  11:16 AM             1,306 vscode-test-runner.js
              25 File(s)        220,996 bytes
              14 Dir(s)  71,212,482,560 bytes free
:\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Now let me check if the boulder sound file exists and what the exact filename is:

Command
dir public\sounds\boulder
dir public\sounds\boulder
 Volume in drive D is DevDrive
:\Windows\System32\cmd.exe - dir  public\sounds\boulder
 Volume Serial Number is 729F-4428

 Directory of D:\FizzBash\TheWanderer\public\sounds\boulder

27/07/2025  11:16 AM    <DIR>          .
27/07/2025  11:16 AM    <DIR>          ..
27/07/2025  11:16 AM             5,281 thud.mp3
27/07/2025  11:16 AM            15,066 Whoosh.mp3
               2 File(s)         20,347 bytes
               2 Dir(s)  71,212,482,560 bytes free
:\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Perfect! Now I can see the issue. The sound file exists as Whoosh.mp3 (with capital W), and the configuration is correct. Let me check if there's an issue with the sound loading by examining the asset loader:

Read file(s)

asset-loader.ts 1 - 101
Let me check how the game initializes and loads sounds:

Searched workspace
Looking for where sounds are preloaded or initialized in the game
Let me check the audio context to see how sounds are initialized:

Read file(s)

audio-context.tsx 190 - 211
Now let me check if there's an issue with the sound configuration. I noticed there's a duplicate line in the sound config:

Read file(s)

sound-config.ts 85 - 96
Read file(s)

sound-config.ts 115 - 126
Now let me run the game to see the actual error and understand what's happening:

Command
npm start
npm start
:\Windows\System32\cmd.exe - npm  startpm start
> thewanderer@0.1.0 start
> cross-env NODE_NO_WARNINGS=1 node start-with-tests.js

:\Windows\system32\cmd.exe Running tests before starting development server...
Test output:
ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 5)ode (vitest 7)ode (vitest 10)ode (vitest 11)ode (vitest 13)ode (vitest 15)
 Test Files 0 passed (26)
      Tests 0 passed (0)
   Start at 18:45:54
   Duration 911ms

 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]

 Test Files 0 passed (26)
      Tests 0 passed (0)
   Start at 18:45:54
   Duration 1.89s

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (26)
      Tests 0 passed (0)
   Start at 18:45:54
   Duration 1.99s

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
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
   Start at 18:45:54
   Duration 2.52s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
Failed to load test_sound from sounds/test.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:116:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBu
uffer > should retry failed requests
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:132:4
40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (26)
      Tests 1 passed (162)
   Start at 18:45:54
   Duration 2.62s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should initialize with Web Audio API support
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context 
 suspension
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > initialization > should handle audio context 
 suspension
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle muted state correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should preload sounds w
with progress tracking
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should load muted preference from localStorage
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle localStorage errors gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should preload sounds successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should preload sounds w
with progress tracking
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should preload sounds successfully
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Complete Game Sound Workflow > should handle comp
plete player movement workflow
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should preload sounds successfully
Preloaded 9 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Initialization Performance > should initialize WebAu
udioManager within performance budget
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (26)
      Tests 1 passed (162)
   Start at 18:45:54
   Duration 2.62s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Initialization Performance > should initialize HTML5AudioManager within performance budget
HTML5 Audio initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Asset loading complete: 9/9 loaded, 0 failed

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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Preloading Performance > should preload sounds withi
in performance budget
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 9/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 0 passed (26)
      Tests 30 passed (178)
   Start at 18:45:54
   Duration 2.73s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
Failed to load test_sound from sounds/test.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:133:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBu
uffer > should throw error if all sources fail
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146:4
41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 9/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 0 passed (26)
      Tests 30 passed (178)
   Start at 18:45:54
   Duration 2.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 9/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 0 passed (26)
      Tests 30 passed (178)
   Start at 18:45:54
   Duration 2.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize







 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 9/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 0 passed (26)
      Tests 30 passed (178)
   Start at 18:45:54
   Duration 2.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Audio context state changed to: closed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle comp
plete game state transition workflow
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Preloading Performance > should preload sounds withi
in performance budget
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > WebAudioManager with Comprehensive Mocks > should initialize with mocke
ed Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > WebAudioManager with Comprehensive Mocks > should handle audio context 
 state changes
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Audio context state changed to: suspended
Audio context state changed to: running


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 9/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 0 passed (26)
      Tests 30 passed (178)
   Start at 18:45:54
   Duration 2.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio context state changes
Audio context suspended - attempting to resume on next user interaction  


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 9/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 0 passed (26)
      Tests 30 passed (178)
   Start at 18:45:54
   Duration 2.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should create and manage gain nodes correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 9/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 0 passed (26)
      Tests 30 passed (178)
   Start at 18:45:54
   Duration 2.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 9/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 0 passed (26)
      Tests 30 passed (178)
   Start at 18:45:54
   Duration 2.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
Audio context state changed to: closed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > WebAudioManager with Comprehensive Mocks > should create buffer sources
s for sound playback
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > WebAudioManager with Comprehensive Mocks > should create buffer sources
s for sound playback
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Preloading Performance > should preload sounds withi
in performance budget
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]      
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]       
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/comprehensive-sound-system.test.ts 9/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/react-sound-integration.test.tsx [queued]
 ❯ src/tests/sound-system-e2e.test.ts 1/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 0 passed (26)
      Tests 30 passed (178)
   Start at 18:45:54
   Duration 2.73s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBu
uffer > should throw error if all sources fail
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146:4
41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Complete Game Sound Workflow > should handle deat
th scenario workflow
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
Audio context state changed to: closed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should gracefully fallback from WebAudio to HTML5 to Silent
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s












stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should gracefully fallback from WebAudio to HTML5 to Silent
Web Audio API not supported, using HTML5 Audio fallback
No audio support detected, using silent mode
No audio support detected, using silent mode ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should apply optimizati
ion during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should apply optimizati
ion during preloading
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > WebAudioManager with Comprehensive Mocks > should create buffer sources
s for sound playback
Preloaded 9 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > WebAudioManager with Comprehensive Mocks > should handle audio decoding
g with mocked decodeAudioData
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > WebAudioManager with Comprehensive Mocks > should handle audio decoding
g with mocked decodeAudioData
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > WebAudioManager with Comprehensive Mocks > should handle audio decoding
g with mocked decodeAudioData
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Preloading Performance > should handle concurrent pr
reloading efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Audio Manager Fallback Workflow > should handle a
audio context suspension and recovery workflow
Asset loading complete: 9/9 loaded, 0 failed


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle mocked audio context errors gracefully
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:540:27)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\sr
rc\audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\au
udio-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:543:33
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should initialize with mocked HTML5 Audio
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should create audio elements for each sound
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > HTML5AudioManager with Comprehensive Mocks > should create audio elemen
nts for each sound
HTML5 Audio preloaded 9/9 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > HTML5AudioManager with Comprehensive Mocks > should handle audio loadin
ng events
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > HTML5AudioManager with Comprehensive Mocks > should handle audio loadin
ng events
HTML5 Audio preloaded 9/9 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Audio Manager Fallback Workflow > should handle a
audio context suspension and recovery workflow
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Preloading Performance > should handle concurrent pr
reloading efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Preloading Performance > should handle concurrent pr
reloading efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > HTML5AudioManager with Comprehensive Mocks > should handle audio playba
ack with mocked play method
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > HTML5AudioManager with Comprehensive Mocks > should handle audio playba
ack with mocked play method
HTML5 Audio preloaded 9/9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
Audio context suspended - attempting to resume on next user interaction  
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
Audio context state changed to: suspended
Audio context state changed to: running
Audio context state changed to: closed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should persist and restore audio settings across sessions
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Audio context state changed to: closed
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should persist and restore audio settings across sessions
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 1/3 for sounds/player/death.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error     
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 1/3 for sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should handle settings corruption gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Audio context state changed to: closed


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should handle settings corruption gracefully
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent pr
reloading efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Performance Under Load Workflow > should handle i
intensive sound event workflow efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Preloading Performance > should handle concurrent pr
reloading efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Preloading Performance > should optimize network req
quests during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stderr | src/tests/audio-context.test.tsx > AudioContext > should provide audio context to children
AudioContext not supported

stderr | src/tests/audio-context.test.tsx > AudioContext > should provide audio context to children
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.ogg: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
Failed to load test_sound from sounds/test.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
Failed to load test_sound from sounds/test.mp3: Error: Invalid audio data
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:194:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Performance Under Load Workflow > should handle i
intensive sound event workflow efficiently
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
Audio context state changed to: closed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should apply optimization during preloading
Preloaded 9 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
AudioContext not supported
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   
Failed to initialize audio: Error: Initialization failed
    at D:\FizzBash\TheWanderer\src\tests\audio-context.test.tsx:70:27    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runFiles (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1787:3)

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should
d provide playSound function with options
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 3/23
 ❯ src/tests/comprehensive-sound-system.test.ts 15/36
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/react-sound-integration.test.tsx 0/26
 ❯ src/tests/sound-system-e2e.test.ts 4/17
 ❯ src/tests/sound-system-performance.test.ts 4/20

 Test Files 0 passed (26)
      Tests 48 passed (274)
   Start at 18:45:54
   Duration 2.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
Audio context state changed to: closed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:222:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system
m-e2e.test.ts:222:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should recover from net
twork failures during preloading
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error     
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system
m-e2e.test.ts:222:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should recover from net
twork failures during preloading
Retry 1/3 for sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system
m-e2e.test.ts:222:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should
d return muted state from audio manager
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should
d toggle mute state
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > useSound Hook Integration > should call audio manager method
ds correctly
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > useSound Hook Integration > should handle playback errors an
nd track error state
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > useSound Hook Integration > should handle playback errors an
nd track error state
Skipping sound test-sound due to multiple playback errors

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > useSound Hook Integration > should reset error counts via re
esetAudioSystem
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > useSound Hook Integration > should sync volume settings with
h audio manager
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > useAudioSettings Hook Integration > should integrate with Au
udioProvider for settings management
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > useAudioSettings Hook Integration > should persist settings 
 to localStorage
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > useAudioSettings Hook Integration > should load settings fro
om localStorage on initialization
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should optimize network requests during preloading
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should optimize network requests during preloading
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should play sounds with minimal latency
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Sound Playback Performance > should play sounds with
h minimal latency
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Sound Playback Performance > should play sounds with
h minimal latency
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/tests/audio-context.test.tsx > AudioContext > should call preloadSounds during initialization
AudioContext not supported
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
AudioContext not supported
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio-context.test.tsx > AudioContext > should allow m
manual cleanup
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into
o act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act

stderr | src/tests/audio-context.test.tsx > AudioContext > should prevent
t multiple simultaneous initializations
AudioContext not supported
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should allow user to control audio settings end-to-end
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should allow user to control audio settings end-to-end
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


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should allow user to control audio settings end-to-end
HTML5 Audio preloaded 0/9 sounds








 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:278:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
 ✓ src/tests/game-state-sound-transitions.test.ts (7 tests) 348ms        

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > useAudioSettings Hook Integration > should validate and clamp volume values
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization
AudioContext not supported
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   
Failed to initialize audio: String error


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
                                                                         
 ✓ src/tests/GameState-sound-integration.test.ts (9 tests) 344ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > AudioProvider Context Integration > should provide audio manager to child components
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
 ✓ src/tests/audio-context.test.tsx (7 tests) 198ms

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > AudioProvider Context Integration > should handle audio manager initialization errors
Autoplay not allowed - user interaction will be required to play audio   
Failed to initialize audio: Error: Init failed
    at D:\FizzBash\TheWanderer\src\tests\react-sound-integration.test.tsx:401:30
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should
d handle playSound errors gracefully
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should return default volume from config
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should load volume from localStorage
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should handle keyboard shortcuts
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should handle keyboard shortcuts
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


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should handle keyboard shortcuts
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\context\audio-context.tsx:51:33)
    at AudioProvider (D:\FizzBash\TheWanderer\src\audio\context\audio-context.tsx:91:19)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:23863:20)
    at renderWithHooks (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:5529:22)
    at updateFunctionComponent (D:\FizzBash\TheWanderer\node_modules\reac
ct-dom\cjs\react-dom-client.development.js:8897:19)
    at beginWork (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\reac
ct-dom-client.development.js:10522:18)
    at runWithFiberInDEV (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:1522:13)
    at performUnitOfWork (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:15140:22)
    at workLoopSync (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\r
react-dom-client.development.js:14956:41)
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invali
id" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\context\audio
o-context.tsx:51:33)
    at AudioProvider (D:\FizzBash\TheWanderer\src\audio\context\audio-con
ntext.tsx:91:19)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_modu
ules\react-dom\cjs\react-dom-client.development.js:23863:20)
    at renderWithHooks (D:\FizzBash\TheWanderer\node_modules\react-dom\cj
js\react-dom-client.development.js:5529:22)
    at updateFunctionComponent (D:\FizzBash\TheWanderer\node_modules\reac
ct-dom\cjs\react-dom-client.development.js:8897:19)
    at beginWork (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\reac
ct-dom-client.development.js:10522:18)
    at runWithFiberInDEV (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:1522:13)
    at performUnitOfWork (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:15140:22)
    at workLoopSync (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\r
react-dom-client.development.js:14956:41)
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should handle invalid localStorage volume
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invali
id" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\context\audio
o-context.tsx:51:33)
    at AudioProvider (D:\FizzBash\TheWanderer\src\audio\context\audio-con
ntext.tsx:91:19)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_modu
ules\react-dom\cjs\react-dom-client.development.js:23863:20)
    at renderWithHooks (D:\FizzBash\TheWanderer\node_modules\react-dom\cj
js\react-dom-client.development.js:5529:22)
    at updateFunctionComponent (D:\FizzBash\TheWanderer\node_modules\reac
ct-dom\cjs\react-dom-client.development.js:8897:19)
    at beginWork (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\reac
ct-dom-client.development.js:10522:18)
    at runWithFiberInDEV (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:1522:13)
    at performUnitOfWork (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:15140:22)
    at workLoopSync (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\r
react-dom-client.development.js:14956:41)

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should set muted state through audio manager
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should set volume and save to localStorage
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into
o act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio   
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into
o act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should clamp volume between 0 and 1
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into
o act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio   
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into
o act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 1/20
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 9/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 9/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 7/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 3 passed (26)
      Tests 100 passed (274)
   Start at 18:45:54
   Duration 3.04s
ode (vitest 12)ode (vitest 15)stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should reset to defaults
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio   
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into
o act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > AudioProvider Context Integration > should provide reinitial
lize functionality
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should reset settings to defaults
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should reset settings to defaults
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
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into
o act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should reset settings to defaults
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should reset settings to defaults
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should disable volume controls when muted
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should disable volume controls when muted
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


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should disable volume controls when muted
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:166:53 
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:195:55 

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound sound2: TypeError: Cannot read properties of undefin
ned (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:166:53 
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\manag
gers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:195:55 


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Asset loading complete: 1/2 loaded, 1 failed


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:335:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
Asset loading complete: 9/9 loaded, 0 failed

 ✓ src/tests/audio-hooks.test.tsx (16 tests) 336ms
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should load saved settings on initialization
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should load saved settings on initialization
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
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into
o act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should load saved settings on initialization
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should load saved settings on initialization
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tr
racking > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:335:4
41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
Preloaded 9 sounds

 ✓ src/tests/audio/asset-loader.test.ts (16 tests) 694ms
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid-json" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\context\audio-context.tsx:51:33)
    at AudioProvider (D:\FizzBash\TheWanderer\src\audio\context\audio-context.tsx:91:19)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:23863:20)
    at renderWithHooks (D:\FizzBash\TheWanderer\node_modules\react-dom\cj
js\react-dom-client.development.js:5529:22)
    at updateFunctionComponent (D:\FizzBash\TheWanderer\node_modules\reac
ct-dom\cjs\react-dom-client.development.js:8897:19)
    at beginWork (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\reac
ct-dom-client.development.js:10522:18)
    at runWithFiberInDEV (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:1522:13)
    at performUnitOfWork (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:15140:22)
    at workLoopSync (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\r
react-dom-client.development.js:14956:41)
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
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into
o act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should manage memory efficiently during intensive use
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should integrate sound system with App component
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
 ✓ src/audio/__tests__/audio-settings-integration.test.tsx (6 tests) 367ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should manage memory efficiently during intensive use
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should manage memory efficiently during intensive use
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 4/20
 ❯ src/tests/app-sound-integration.test.tsx 3/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 13/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 8/20

 Test Files 6 passed (26)
      Tests 134 passed (274)
   Start at 18:45:54
   Duration 3.32s
ode (vitest 14)ode (vitest 11)stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should prevent memory leaks during long-running sessions
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 8/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 14/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 6 passed (26)
      Tests 143 passed (274)
   Start at 18:45:54
   Duration 3.54s
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should trigger sounds on user interactions
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 8/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 14/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 6 passed (26)
      Tests 143 passed (274)
   Start at 18:45:54
   Duration 3.54s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should prevent memory leaks during long-running sessions
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should prevent memory leaks during long-running sessions
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 8/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 14/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 6 passed (26)
      Tests 143 passed (274)
   Start at 18:45:54
   Duration 3.54s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 10/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 14/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 6 passed (26)
      Tests 146 passed (274)
   Start at 18:45:54
   Duration 3.64s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 10/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 14/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 6 passed (26)
      Tests 146 passed (274)
   Start at 18:45:54
   Duration 3.64s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
Asset loading complete: 9/9 loaded, 0 failed


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 10/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 14/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 6 passed (26)
      Tests 146 passed (274)
   Start at 18:45:54
   Duration 3.64s
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should handle mute toggle in UI
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Retry 2/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Retry 2/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Retry 2/3 for sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 10/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 14/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 6 passed (26)
      Tests 146 passed (274)
   Start at 18:45:54
   Duration 3.64s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 10/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 14/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 6 passed (26)
      Tests 146 passed (274)
   Start at 18:45:54
   Duration 3.64s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance under event system stress
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Event System Performance > should maintain performan
nce under event system stress
Asset loading complete: 9/9 loaded, 0 failed

 ✓ src/audio/__tests__/error-handling.test.ts (23 tests) 1223ms
   ✓ Audio Error Handling and Fallbacks > Sound File Loading Errors > sho
ould retry failed sound loads  1018ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Event System Performance > should maintain performan
nce under event system stress
Preloaded 9 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should recover from net
twork failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should recover from net
twork failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 11/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 15/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 7 passed (26)
      Tests 1 failed | 165 passed (274)
   Start at 18:45:54
   Duration 3.86s
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should open audio settings dialog
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 11/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 15/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 7 passed (26)
      Tests 1 failed | 165 passed (274)
   Start at 18:45:54
   Duration 3.86s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 11/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 15/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 13/20

 Test Files 7 passed (26)
      Tests 1 failed | 165 passed (274)
   Start at 18:45:54
   Duration 3.86s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 2/3 for sounds/arrow/thud.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 2/3 for sounds/player/death.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error     
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Retry 2/3 for sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 16/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 14/20

 Test Files 7 passed (26)
      Tests 1 failed | 168 passed (274)
   Start at 18:45:54
   Duration 3.96s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should cleanup resources efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 16/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 14/20

 Test Files 7 passed (26)
      Tests 1 failed | 168 passed (274)
   Start at 18:45:54
   Duration 3.96s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Retry 2/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Retry 2/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Retry 2/3 for sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 16/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 14/20

 Test Files 7 passed (26)
      Tests 1 failed | 168 passed (274)
   Start at 18:45:54
   Duration 3.96s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should cleanup resources efficiently
Asset loading complete: 9/9 loaded, 0 failed


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 16/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 14/20

 Test Files 7 passed (26)
      Tests 1 failed | 168 passed (274)
   Start at 18:45:54
   Duration 3.96s
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should handle game state changes with sound integration
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 16/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 14/20

 Test Files 7 passed (26)
      Tests 1 failed | 168 passed (274)
   Start at 18:45:54
   Duration 3.96s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should cleanup resources efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Cleanup Performance > should handle cleanup of multi
iple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-hooks.test.tsx 16/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/react-sound-integration.test.tsx 16/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 14/20

 Test Files 7 passed (26)
      Tests 1 failed | 168 passed (274)
   Start at 18:45:54
   Duration 3.96s
ode (vitest 9)stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error     
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:222:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Retry 2/3 for sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system
m-e2e.test.ts:222:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/react-sound-integration.test.tsx 18/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 7 passed (26)
      Tests 1 failed | 171 passed (274)
   Start at 18:45:54
   Duration 4.17s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Cleanup Performance > should handle cleanup of multi
iple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Cleanup Performance > should handle cleanup of multi
iple managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Cleanup Performance > should handle cleanup of multi
iple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/react-sound-integration.test.tsx 18/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 7 passed (26)
      Tests 1 failed | 171 passed (274)
   Start at 18:45:54
   Duration 4.17s
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Performance Integration Tests > should not block React rendering during audio operations
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio   
An update to AudioProvider inside a test was not wrapped in act(...).    

When testing, code that causes React state updates should be wrapped into
o act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the b
browser. Learn more at https://react.dev/link/wrap-tests-with-act

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > Performance Integration Tests > should handle rapid hook upd
dates efficiently
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > Performance Integration Tests > should maintain React state 
 consistency during audio operations
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > Error Handling Integration > should handle audio manager fai
ilures gracefully in React context
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > Error Handling Integration > should handle audio manager fai
ilures gracefully in React context
Failed to play sound test-sound: Error: Audio manager failed
    at Object.<anonymous> (D:\FizzBash\TheWanderer\src\tests\react-sound-
-integration.test.tsx:646:17)
    at Object.mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/spy/dist/index.js:96:15)
    at Object.spy [as playSound] (file:///D:/FizzBash/TheWanderer/node_mo
odules/tinyspy/dist/index.js:47:103)
    at Object.playSound (D:\FizzBash\TheWanderer\src\audio\hooks\use-soun
nd.ts:92:26)
    at D:\FizzBash\TheWanderer\src\tests\react-sound-integration.test.tsx
x:660:28
    at D:\FizzBash\TheWanderer\node_modules\@testing-library\react\dist\a
act-compat.js:48:24
    at process.env.NODE_ENV.exports.act (D:\FizzBash\TheWanderer\node_mod
dules\react\cjs\react.development.js:789:22)
    at Proxy.<anonymous> (D:\FizzBash\TheWanderer\node_modules\@testing-l
library\react\dist\act-compat.js:47:25)
    at D:\FizzBash\TheWanderer\src\tests\react-sound-integration.test.tsx
x:659:11
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/c
chai/chai.js:2787:5)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/react-sound-integration.test.tsx 18/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 7 passed (26)
      Tests 1 failed | 171 passed (274)
   Start at 18:45:54
   Duration 4.17s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/react-sound-integration.test.tsx 18/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 7 passed (26)
      Tests 1 failed | 171 passed (274)
   Start at 18:45:54
   Duration 4.17s
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Error Handling Integration > should recover from temporary errors
Autoplay not allowed - user interaction will be required to play audio   

stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Error Handling Integration > should recover from temporary errors
Failed to play sound test-sound: Error: Temporary failure
    at Object.<anonymous> (D:\FizzBash\TheWanderer\src\tests\react-sound-integration.test.tsx:699:19)
    at Object.mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/spy/dist/index.js:96:15)
    at Object.spy [as playSound] (file:///D:/FizzBash/TheWanderer/node_mo
odules/tinyspy/dist/index.js:47:103)
    at Object.playSound (D:\FizzBash\TheWanderer\src\audio\hooks\use-soun
nd.ts:92:26)
    at D:\FizzBash\TheWanderer\src\tests\react-sound-integration.test.tsx
x:714:26
    at D:\FizzBash\TheWanderer\node_modules\@testing-library\react\dist\a
act-compat.js:48:24
    at process.env.NODE_ENV.exports.act (D:\FizzBash\TheWanderer\node_mod
dules\react\cjs\react.development.js:789:22)
    at Proxy.<anonymous> (D:\FizzBash\TheWanderer\node_modules\@testing-l
library\react\dist\act-compat.js:47:25)
    at D:\FizzBash\TheWanderer\src\tests\react-sound-integration.test.tsx
x:713:9
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:20

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > Error Handling Integration > should recover from temporary e
errors
Audio manager not initialized

stderr | src/tests/react-sound-integration.test.tsx > React Sound System 
 Integration Tests > 2. Integration Tests for React Hooks and Component In
nteractions > Memory Management Integration > should manage audio manager 
 lifecycle properly
Autoplay not allowed - user interaction will be required to play audio   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/react-sound-integration.test.tsx 18/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 7 passed (26)
      Tests 1 failed | 171 passed (274)
   Start at 18:45:54
   Duration 4.17s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/react-sound-integration.test.tsx 18/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 7 passed (26)
      Tests 1 failed | 171 passed (274)
   Start at 18:45:54
   Duration 4.17s












stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Memory Management Integration > should handle multiple component instances efficiently
Autoplay not allowed - user interaction will be required to play audio
Autoplay not allowed - user interaction will be required to play audio
Autoplay not allowed - user interaction will be required to play audio ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/react-sound-integration.test.tsx 18/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 7 passed (26)
      Tests 1 failed | 171 passed (274)
   Start at 18:45:54
   Duration 4.17s
 ✓ src/tests/react-sound-integration.test.tsx (26 tests) 1353ms
   ✓ React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should trigger sounds on user interactions  301ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Cleanup Performance > should handle cleanup of multi
iple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Cleanup Performance > should handle cleanup of multi
iple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Cleanup Performance > should handle cleanup of multi
iple managers efficiently
Preloaded 9 sounds


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 13/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 8 passed (26)
      Tests 1 failed | 180 passed (274)
   Start at 18:45:54
   Duration 4.39s
ode (vitest 8)stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain consistent performance across operations
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain consistent performance across operations
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain c
consistent performance across operations
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Performance Monitoring and Metrics > should provide 
 performance metrics for monitoring
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/react-sound-integration.test.tsx 26/26
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 8 passed (26)
      Tests 1 failed | 182 passed (274)
   Start at 18:45:54
   Duration 4.50s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should provide performance metrics for monitoring
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should provide performance metrics for monitoring
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should track performance trends over time
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 15/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 8 passed (26)
      Tests 1 failed | 185 passed (274)
   Start at 18:45:54
   Duration 4.71s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 15/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 8 passed (26)
      Tests 1 failed | 185 passed (274)
   Start at 18:45:54
   Duration 4.71s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should track performance trends over time
Asset loading complete: 9/9 loaded, 0 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 15/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 8 passed (26)
      Tests 1 failed | 185 passed (274)
   Start at 18:45:54
   Duration 4.71s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Network e
error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load DIAMOND_COLLECT from sounds/diamond/collect.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle preload errors gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 15/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 8 passed (26)
      Tests 1 failed | 185 passed (274)
   Start at 18:45:54
   Duration 4.71s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Preloaded 0 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should play sound with default options
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should play sound with custom options
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should not play sound when muted
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle missing sound buffer gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Test
ts for Audio System > Performance Monitoring and Metrics > should track pe
erformance trends over time
Preloaded 9 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should cleanup resources properly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 15/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 8 passed (26)
      Tests 1 failed | 185 passed (274)
   Start at 18:45:54
   Duration 4.71s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle audio context creation failure
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed
    at new global.AudioContext (D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:300:27)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:304:29    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 15/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 8 passed (26)
      Tests 1 failed | 185 passed (274)
   Start at 18:45:54
   Duration 4.71s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should initialize with HTML5 Audio support
HTML5 Audio initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should handle muted state correctly
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 15/21
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 9/17
 ❯ src/tests/sound-system-performance.test.ts 18/20

 Test Files 8 passed (26)
      Tests 1 failed | 185 passed (274)
   Start at 18:45:54
   Duration 4.71s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio
HTML5 Audio initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio
HTML5 Audio preloaded 9/9 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should play sound with HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 8 passed (26)
      Tests 1 failed | 206 passed (302)
   Start at 18:45:54
   Duration 4.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should play sound with HTML5 Audio
Sound asset not found for ID: test_sound


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 8 passed (26)
      Tests 1 failed | 206 passed (302)
   Start at 18:45:54
   Duration 4.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should not play sound when muted
HTML5 Audio initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should cleanup audio elements
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 8 passed (26)
      Tests 1 failed | 206 passed (302)
   Start at 18:45:54
   Duration 4.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should cleanup audio elements
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:384:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)

stderr | src/tests/audio-manager.test.ts > Audio Manager > SilentAudioMan
nager > should initialize in silent mode
No audio support detected, using silent mode

stderr | src/tests/audio-manager.test.ts > Audio Manager > SilentAudioMan
nager > should handle all operations silently
No audio support detected, using silent mode


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 8 passed (26)
      Tests 1 failed | 206 passed (302)
   Start at 18:45:54
   Duration 4.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create WebAudioManager when Web Audio API is supported
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 8 passed (26)
      Tests 1 failed | 206 passed (302)
   Start at 18:45:54
   Duration 4.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported
Web Audio API not supported, using HTML5 Audio fallback

stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support is available
No audio support detected, using silent mode
No audio support detected, using silent mode


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 8 passed (26)
      Tests 1 failed | 206 passed (302)
   Start at 18:45:54
   Duration 4.83s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 8 passed (26)
      Tests 1 failed | 206 passed (302)
   Start at 18:45:54
   Duration 4.83s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 8 passed (26)
      Tests 1 failed | 206 passed (302)
   Start at 18:45:54
   Duration 4.83s
 ❯ src/tests/sound-system-performance.test.ts (20 tests | 1 failed) 2155ms
   ✓ 5. Performance Tests for Audio System > Initialization Performance > should initialize WebAudioManager within performance budget 14ms        
   ✓ 5. Performance Tests for Audio System > Initialization Performance > should initialize HTML5AudioManager within performance budget 2ms       
   ✓ 5. Performance Tests for Audio System > Initialization Performance > should handle multiple manager instances efficiently 21ms
   ✓ 5. Performance Tests for Audio System > Preloading Performance > should preload sounds within performance budget 114ms
   ✓ 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently 111ms
   ✓ 5. Performance Tests for Audio System > Preloading Performance > sho
ould optimize network requests during preloading 80ms
   ✓ 5. Performance Tests for Audio System > Sound Playback Performance >
>
 should play sounds with minimal latency 59ms
   ✓ 5. Performance Tests for Audio System > Sound Playback Performance >
>
 should handle rapid sequential playback efficiently 134ms
   ✓ 5. Performance Tests for Audio System > Sound Playback Performance >
>
 should handle concurrent sound playback efficiently 96ms
   ✓ 5. Performance Tests for Audio System > Memory Performance > should 
 manage memory efficiently during intensive use 126ms
   ✓ 5. Performance Tests for Audio System > Memory Performance > should 
 prevent memory leaks during long-running sessions 205ms
   × 5. Performance Tests for Audio System > Event System Performance > s
should handle sound event generation efficiently 33ms
     → expected 1.1412000000000262 to be less than 0.6
   ✓ 5. Performance Tests for Audio System > Event System Performance > s
should handle sound event emission efficiently 120ms
   ✓ 5. Performance Tests for Audio System > Event System Performance > s
should maintain performance under event system stress 158ms
   ✓ 5. Performance Tests for Audio System > Cleanup Performance > should
d cleanup resources efficiently 116ms
   ✓ 5. Performance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently  389ms
   ✓ 5. Performance Tests for Audio System > Performance Regression Detec
ction > should maintain consistent performance across operations 109ms    
   ✓ 5. Performance Tests for Audio System > Performance Regression Detec
ction > should detect performance bottlenecks in audio operations 27ms    
   ✓ 5. Performance Tests for Audio System > Performance Monitoring and M
Metrics > should provide performance metrics for monitoring 98ms
   ✓ 5. Performance Tests for Audio System > Performance Monitoring and M
Metrics > should track performance trends over time 139ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 8 passed (26)
      Tests 1 failed | 206 passed (302)
   Start at 18:45:54
   Duration 4.83s
stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > should continue working when sound playback fails    
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\soun
nd-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-ev
vent-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)       
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22
2)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:4
493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy
y/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/ind
dex.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter
r.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\soun
nd-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-ev
vent-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)       
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22
2)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:4
493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy
y/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/ind
dex.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter
r.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\soun
nd-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-ev
vent-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)       
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22
2)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:4
493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy
y/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/ind
dex.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter
r.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\soun
nd-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-ev
vent-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)       
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22
2)


 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 8 passed (26)
      Tests 1 failed | 206 passed (302)
   Start at 18:45:54
   Duration 4.83s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load sound PLAYER_WALK: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load sound PLAYER_DIG: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load sound BOULDER_MOVE: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load sound ARROW_MOVE: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load sound COLLISION_THUD: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Network e
error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load sound DEATH_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error
r: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Ne
etwork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Failed to load sound VICTORY_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Failed to load sound DOOR_SLAM: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load DIAMOND_COLLECT from sounds/diamond/collect.mp3: Error: Ne
etwork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked network failures during pre
eloading
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 18/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 10 passed (26)
      Tests 1 failed | 247 passed (312)
   Start at 18:45:54
   Duration 5.05s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Preloaded 0 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 18/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 10 passed (26)
      Tests 1 failed | 247 passed (312)
   Start at 18:45:54
   Duration 5.05s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 1/3 for sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 1/3 for sounds/player/dig.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 1/3 for sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 1/3 for sounds/arrow/thud.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 1/3 for sounds/player/death.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Decode failed     
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 1/3 for sounds/diamond/collect.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading fode (vitest 6)
failures gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Network e
error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load DIAMOND_COLLECT from sounds/diamond/collect.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading f
failures gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:160:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5
5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 18/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 10 passed (26)
      Tests 1 failed | 247 passed (312)
   Start at 18:45:54
   Duration 5.05s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Preloaded 0 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 18/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 10 passed (26)
      Tests 1 failed | 247 passed (312)
   Start at 18:45:54
   Duration 5.05s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode
Audio manager in fallback mode, skipping preload


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 18/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 10 passed (26)
      Tests 1 failed | 247 passed (312)
   Start at 18:45:54
   Duration 5.05s
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report
Initialized gain node pool with 5 nodes
Web Audio API initialized successfullystdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report
Asset loading complete: 9/9 loaded, 0 failedstdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Audio Manager Factory > should create WebAudioMan
nager when Web Audio API is supported
Using Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Audio Manager Factory > should fall back to HTML5
5AudioManager when Web Audio API is not supported
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Audio Manager Factory > should fall back to Silen
ntAudioManager when no audio is supported
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Audio Manager Factory > should create specific au
udio manager when requested
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > SilentAudioManager > should implement all AudioMa
anager methods without errors
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > SilentAudioManager > should handle loading progre
ess callbacks
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Error Recovery > should handle errors during audi
io context creation
Using Web Audio API
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Error Recovery > should handle errors during soun
nd playback
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Error Recovery > should handle errors during prel
loading
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Autoplay Policy Handling > should detect autoplay
y restrictions
Using Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

 ✓ src/audio/__tests__/audio-error-handling.test.ts (10 tests) 38ms      
 ✓ src/tests/audio/audio-optimization.test.ts (28 tests) 86ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 5/20
 ❯ src/tests/app-sound-integration.test.tsx 18/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 1 failed | 10 passed (26)
      Tests 1 failed | 247 passed (312)
   Start at 18:45:54
   Duration 5.05s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Failed to load DIAMOND_COLLECT from sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:222:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system
m-e2e.test.ts:222:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 8/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 6/23
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 0/37
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 12 passed (26)
      Tests 1 failed | 270 passed (363)
   Start at 18:45:54
   Duration 5.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Asset loading complete: 8/9 loaded, 1 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Preloaded 8 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 8/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 6/23
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 0/37
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 12 passed (26)
      Tests 1 failed | 270 passed (363)
   Start at 18:45:54
   Duration 5.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 8/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 6/23
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 0/37
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 12 passed (26)
      Tests 1 failed | 270 passed (363)
   Start at 18:45:54
   Duration 5.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should handle empty 
 buffer set
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > loading state management > should track loadi
ing state correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > loading state management > should track loadi
ing state correctly
Asset loading complete: 9/9 loaded, 0 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 8/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 6/23
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 0/37
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 12 passed (26)
      Tests 1 failed | 270 passed (363)
   Start at 18:45:54
   Duration 5.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Decode failed
    at E2EMockAudioContext.<anonymous> (D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:585:43)
    at E2EMockAudioContext.mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at E2EMockAudioContext.spy [as decodeAudioData] (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:176:51 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Retry 1/3 for sounds/player/death.mp3: Error: Decode failed
    at E2EMockAudioContext.<anonymous> (D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:585:43)
    at E2EMockAudioContext.mockCall (file:///D:/FizzBash/TheWanderer/node
e_modules/@vitest/spy/dist/index.js:96:15)
    at E2EMockAudioContext.spy [as decodeAudioData] (file:///D:/FizzBash/
/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:176:51 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration
n > Error Recovery > should handle audio reset errors gracefully
Failed to reset audio system: Error: Reset failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:5
559:52
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 8/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 6/23
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 0/37
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 12 passed (26)
      Tests 1 failed | 270 passed (363)
   Start at 18:45:54
   Duration 5.15s
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
 ✓ src/tests/app-sound-integration.test.tsx (21 tests) 2238ms
   ✓ App Sound Integration > Performance and Responsiveness > should not block user input during sound playback  493ms
 ✓ src/tests/audio/hooks/use-audio-settings.test.ts (14 tests) 70ms      

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 8/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 6/23
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 0/37
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 12 passed (26)
      Tests 1 failed | 270 passed (363)
   Start at 18:45:54
   Duration 5.15s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > loading state management > should track loading state correctly
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads   
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

 ✓ src/tests/sound-event-integration.test.ts (37 tests) 31ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10ode (vitest 15)
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 8/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 15 passed (26)
      Tests 1 failed | 336 passed (388)
   Start at 18:45:54
   Duration 5.36s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads   
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:218:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 8/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 15 passed (26)
      Tests 1 failed | 336 passed (388)
   Start at 18:45:54
   Duration 5.36s
stdout | src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonstrate boulder falling with sound events
Initial maze state:
Boulder at position (3,1), should fall to (3,2) then hit rock at (3,3)   
After physics simulation:
Sound events generated: 1
Boulder successfully fell from (3,1) to (3,2) with sound event

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonstrate boulder collision with sound events
Boulder collision test:
Boulder at (1,1) surrounded by rocks - should not move
Boulder correctly stayed in place - no movement sounds generated

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration
n Demo > should demonstrate game integration with physics and sound       
Game integration test:
Player moves right, boulder at (2,2) should fall to (2,3)
Player moved successfully and boulder physics was applied
Final player position: { x: 2, y: 1 }
Boulder moved from (2,2) to (2,3)

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration
n Demo > should demonstrate multiple boulder physics
Multiple boulder physics test:
Two boulders at (1,1) and (3,1) should both fall
Both boulders fell successfully with sound events
Generated 2 movement sound events

 ✓ src/tests/physics-integration-demo.test.ts (4 tests) 20ms
 ✓ src/tests/collision-sound-integration.test.ts (21 tests) 22ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 8/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 15 passed (26)
      Tests 1 failed | 336 passed (388)
   Start at 18:45:54
   Duration 5.36s
ode (vitest 12)ode (vitest 7)ode (vitest 13)
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 15 passed (26)
      Tests 1 failed | 337 passed (388)
   Start at 18:45:54
   Duration 5.47s
ode (vitest 11)ode (vitest 14)
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/LargerMaze.test.ts 0/8
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 15 passed (26)
      Tests 1 failed | 337 passed (396)
   Start at 18:45:54
   Duration 5.68s
ode (vitest 9) ✓ src/tests/LargerMaze.test.ts (8 tests) 11ms

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/LargerMazeGameState.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 16 passed (26)
      Tests 1 failed | 345 passed (405)
   Start at 18:45:54
   Duration 5.89s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Retry 2/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Retry 2/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Retry 2/3 for sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/LargerMazeGameState.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 16 passed (26)
      Tests 1 failed | 345 passed (405)
   Start at 18:45:54
   Duration 5.89s
 ✓ src/tests/LargerMazeGameState.test.ts (9 tests) 10ms
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 2/3 for sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 2/3 for sounds/player/dig.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 2/3 for sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 2/3 for sounds/arrow/thud.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 2/3 for sounds/player/death.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Decode failed     
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Retry 2/3 for sounds/diamond/collect.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 17 passed (26)
      Tests 1 failed | 354 passed (405)
   Start at 18:45:54
   Duration 5.99s
ode (vitest 8)stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 17 passed (26)
      Tests 1 failed | 354 passed (405)
   Start at 18:45:54
   Duration 6.31s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Decode failed
    at E2EMockAudioContext.<anonymous> (D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:585:43)
    at E2EMockAudioContext.mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at E2EMockAudioContext.spy [as decodeAudioData] (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:176:51 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 17 passed (26)
      Tests 1 failed | 354 passed (405)
   Start at 18:45:54
   Duration 6.31s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads   
Asset loading complete: 9/9 loaded, 0 failed


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 10/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 17 passed (26)
      Tests 1 failed | 354 passed (405)
   Start at 18:45:54
   Duration 6.31s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads   
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors 
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 12/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 10/17
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]

 Test Files 1 failed | 18 passed (26)
      Tests 1 failed | 367 passed (415)
   Start at 18:45:54
   Duration 6.43s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors 
Retry 1/3 for sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Invalid audio     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/diamond/collect.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 12/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 10/17
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]

 Test Files 1 failed | 18 passed (26)
      Tests 1 failed | 367 passed (415)
   Start at 18:45:54
   Duration 6.43s
 ✓ src/tests/GameState.test.ts (10 tests) 11ms

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 12/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 10/17
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]

 Test Files 1 failed | 18 passed (26)
      Tests 1 failed | 367 passed (415)
   Start at 18:45:54
   Duration 6.43s
ode (vitest 6) ✓ src/tests/sound-system-infrastructure.test.ts (5 tests) 9ms
 ✓ src/tests/LargerMazeUI.test.ts (12 tests) 13ms

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 13/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 385 passed (432)
   Start at 18:45:54
   Duration 6.53s
ode (vitest 15)stderr | src/tests/app-sound-integration-comprehensive.test.tsx > App Sound Integration - Comprehensive Task 10 Tests > Task 10.4: Ensure sound system doesn't block game rendering or input > should handle sound errors without blocking gameplay
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration-comprehensive.test.tsx:493:15
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter
r.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\soun
nd-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-ev
vent-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)       
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22
2)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration-comprehens
sive.test.tsx:493:15
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy
y/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/ind
dex.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter
r.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\soun
nd-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-ev
vent-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)       
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22
2)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration-comprehens
sive.test.tsx:493:15
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy
y/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/ind
dex.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter
r.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\soun
nd-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-ev
vent-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)       
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22
2)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration-comprehens
sive.test.tsx:493:15
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy
y/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/ind
dex.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter
r.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\soun
nd-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-ev
vent-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)       
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22
2)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 14/20
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 386 passed (432)
   Start at 18:45:54
   Duration 6.75s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Network e
error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error
r: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load DIAMOND_COLLECT from sounds/diamond/collect.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle fetch errors during preloading
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 15/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 388 passed (432)
   Start at 18:45:54
   Duration 6.86s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                          
Asset loading complete: 0/9 loaded, 9 failed                             
                                                                         
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                          
Preloaded 0 sounds                                                       
                                                                         
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                           
Initialized gain node pool with 5 nodes                                  
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 15/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 388 passed (432)
   Start at 18:45:54
   Duration 6.86s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                           
Retry 1/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
Retry 1/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: HTTP 404: Not Found      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
Retry 1/3 for sounds/arrow/twang.mp3: Error: HTTP 404: Not Found         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
Retry 1/3 for sounds/arrow/thud.mp3: Error: HTTP 404: Not Found          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
Retry 1/3 for sounds/player/death.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
Retry 1/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Foun
nd
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
Retry 1/3 for sounds/diamond/collect.mp3: Error: HTTP 404: Not Found     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 15/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 388 passed (432)
   Start at 18:45:54
   Duration 6.86s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load sound PLAYER_WALK: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Decode faile
ed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load sound PLAYER_DIG: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Decode
e failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load sound BOULDER_MOVE: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Decode fail
led
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load sound ARROW_MOVE: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Decode f
failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load sound COLLISION_THUD: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Decode fa
ailed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load sound DEATH_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error
r: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: De
ecode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load DIAMOND_COLLECT from sounds/diamond/collect.mp3: Error: De
ecode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked audio decoding failures    
Failed to load sound DIAMOND_COLLECT: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:630:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 15/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 388 passed (432)
   Start at 18:45:54
   Duration 6.96s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures    
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures    
Preloaded 0 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing 
 > Mock Error Scenarios > should handle mocked localStorage failures      
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 4. End-to-End Tests for Complete Sound Workflows >
> should complete full sound system lifecycle
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 4. End-to-End Tests for Complete Sound Workflows >
> should complete full sound system lifecycle
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 4. End-to-End Tests for Complete Sound Workflows >
> should complete full sound system lifecycle
Preloaded 9 sounds


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 15/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 388 passed (432)
   Start at 18:45:54
   Duration 6.96s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should complete full sound system lifecycle                             
Audio context closed unexpectedly                                        
Audio context closed unexpectedly, attempting to reinitialize            
                                                                         
                                                                         
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 15/20          
 ❯ src/tests/audio-manager.test.ts 24/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23                  
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                    
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 388 passed (432)
   Start at 18:45:54
   Duration 6.96s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should complete full sound system lifecycle                             
Audio context state changed to: closed                                   
                                                                         
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should handle complex game scenario end-to-end                          
Initialized gain node pool with 5 nodes                                  
Web Audio API initialized successfully                                   
                                                                         
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 4. End-to-End Tests for Complete Sound Workflows >
> should handle complex game scenario end-to-end
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 4. End-to-End Tests for Complete Sound Workflows >
> should handle complex game scenario end-to-end
Preloaded 9 sounds


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 15/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 388 passed (432)
   Start at 18:45:54
   Duration 6.96s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should handle fallback scenarios end-to-end                             
Audio context error (INITIALIZATION_FAILED): Error: Web Audio not supported                                                                       
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:722:23)                                               
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)                                                
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:39)                                                         
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\sr
rc\audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\au
udio-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:728:29
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 15/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 388 passed (432)
   Start at 18:45:54
   Duration 6.96s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should initialize quickly without blocking                                         
Initialized gain node pool with 5 nodes                                  
Web Audio API initialized successfully                                   
                                                                         
                                                                         
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 15/20          
 ❯ src/tests/audio-manager.test.ts 24/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23                  
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                    
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 388 passed (432)
   Start at 18:45:54
   Duration 6.96s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle rapid sound playback without performance degradation
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle rapid sound playback without performance degradation
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should han
ndle rapid sound playback without performance degradation
Preloaded 9 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should pre
eload sounds efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should pre
eload sounds efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should pre
eload sounds efficiently
Preloaded 9 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should han
ndle memory management efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should han
ndle memory management efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should han
ndle memory management efficiently
Preloaded 9 sounds


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 16/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 28/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 396 passed (432)
   Start at 18:45:54
   Duration 7.17s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle memory management efficiently                                        
Audio context closed unexpectedly                                        
Audio context closed unexpectedly, attempting to reinitialize            
                                                                         
                                                                         
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 16/20          
 ❯ src/tests/audio-manager.test.ts 24/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23                  
 ❯ src/tests/comprehensive-sound-system.test.ts 28/36                    
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 396 passed (432)
   Start at 18:45:54
   Duration 7.17s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle memory management efficiently                                        
Audio context state changed to: closed                                   
                                                                         
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should not impact game responsiveness during audio operations                      
Initialized gain node pool with 5 nodes                                  
Web Audio API initialized successfully                                   
                                                                         
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should not
t impact game responsiveness during audio operations
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should not
t impact game responsiveness during audio operations
Preloaded 9 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Preloaded 9 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Error Recovery Workflow > should handle audio dec
coding failures and continue operation
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 16/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 28/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 396 passed (432)
   Start at 18:45:54
   Duration 7.17s
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
                                                                         
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 16/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 28/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 396 passed (432)
   Start at 18:45:54
   Duration 7.17s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle concurrent audio operations efficiently                              
Initialized gain node pool with 5 nodes                                  
Web Audio API initialized successfully                                   
                                                                         
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle localStorage failures and continue operation                                      
Initialized gain node pool with 5 nodes                                  
Web Audio API initialized successfully                                   
Audio context state changed to: closed


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 16/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 28/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 396 passed (432)
   Start at 18:45:54
   Duration 7.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle localStorage failures and continue operation                                      
Failed to save muted preference: Error: Storage quota exceeded           
    at Object.<anonymous> (D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:605:27)                                                     
    at Object.mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)                                             
    at Object.spy [as setItem] (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)                                        
    at WebAudioManager.saveMutedPreference (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:590:26)
    at WebAudioManager.setMuted (D:\FizzBash\TheWanderer\src\audio\manage
ers\audio-manager.ts:916:14)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:614:34 
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/c
chai/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/
/chai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/expect/dist/index.js:1088:12)
    at Proxy.overwritingMethodWrapper (file:///D:/FizzBash/TheWanderer/no
ode_modules/chai/chai.js:1755:33)
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 16/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 28/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 396 passed (432)
   Start at 18:45:54
   Duration 7.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                       
Initialized gain node pool with 5 nodes                                  
Web Audio API initialized successfully                                   
                                                                         
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle concurrent audio operations efficiently                              
Asset loading complete: 9/9 loaded, 0 failed                             
                                                                         
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Memory Management Workflow > should properly clea
anup resources in complete workflow
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should han
ndle concurrent audio operations efficiently
Preloaded 9 sounds


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 16/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 28/36
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 396 passed (432)
   Start at 18:45:54
   Duration 7.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
Preloaded 9 sounds


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                       
Audio context closed unexpectedly                                        
Audio context closed unexpectedly, attempting to reinitialize            
                                                                         
                                                                         
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20          
 ❯ src/tests/audio-manager.test.ts 24/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23                  
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36                    
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                       
Audio context state changed to: closed                                   
                                                                         
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                     
Initialized gain node pool with 5 nodes                                  
Web Audio API initialized successfully                                   
                                                                         
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should mai
intain consistent performance under stress
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should mai
intain consistent performance under stress
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > 5. Performance Tests for Audio System > should mai
intain consistent performance under stress
Preloaded 9 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Memory Management Workflow > should handle memory
y pressure gracefully
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Memory Management Workflow > should handle memory
y pressure gracefully
Preloaded 9 sounds


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > Error Handling and Edge Cases > should handle all error scenarios gracefully                                               
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed  
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:924:31)                                               
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)                                                
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:39)                                                         
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\au
udio-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:926:28
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:946:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/c
chai/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/
/chai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/expect/dist/index.js:1088:12)
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed  
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-so
ound-system.test.ts:924:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/spy/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist
t/index.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\sr
rc\audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\au
udio-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:931:37
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:946:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/c
chai/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/
/chai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/expect/dist/index.js:1088:12)
Audio context not available for preloading
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed  
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-so
ound-system.test.ts:924:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/spy/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist
t/index.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\sr
rc\audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\au
udio-manager.ts:80:14)
    at errorScenarios (D:\FizzBash\TheWanderer\src\tests\comprehensive-so
ound-system.test.ts:938:37)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:946:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/c
chai/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/
/chai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/expect/dist/index.js:1088:12)
Failed to save muted preference: Error: Storage failed
    at Object.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensiv
ve-sound-system.test.ts:936:31)
    at Object.mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vit
test/spy/dist/index.js:96:15)
    at Object.spy [as setItem] (file:///D:/FizzBash/TheWanderer/node_modu
ules/tinyspy/dist/index.js:47:103)
    at WebAudioManager.saveMutedPreference (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:590:26)
    at WebAudioManager.setMuted (D:\FizzBash\TheWanderer\src\audio\manage
ers\audio-manager.ts:916:14)
    at errorScenarios (D:\FizzBash\TheWanderer\src\tests\comprehensive-so
ound-system.test.ts:939:29)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.
.ts:946:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/c
chai/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/
/chai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@v
vitest/expect/dist/index.js:1088:12)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Memory Management Workflow > should handle memory
y pressure gracefully
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                     
Audio context state changed to: closed                                   
                                                                         
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > Error Handling and Edge Cases > should handle invalid sound IDs gracefully                                                 
Initialized gain node pool with 5 nodes                                  
Web Audio API initialized successfully                                   
                                                                         
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Cross-Browser Compatibility Workflow > should han
ndle webkit prefixed AudioContext
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > Error Handling and Edge Cases > should handle inva
alid play options gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > Error Handling and Edge Cases > should handle inva
alid play options gracefully
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Cross-Browser Compatibility Workflow > should han
ndle webkit prefixed AudioContext
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sou
und System Test Suite > Error Handling and Edge Cases > should handle inva
alid play options gracefully
Preloaded 9 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Cross-Browser Compatibility Workflow > should han
ndle webkit prefixed AudioContext
Preloaded 9 sounds


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                         
Audio context closed unexpectedly                                        
Audio context closed unexpectedly, attempting to reinitialize            
                                                                         
                                                                         
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20          
 ❯ src/tests/audio-manager.test.ts 24/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23                  
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36                    
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                         
Audio context state changed to: closed                                   
                                                                         
                                                                         
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20          
 ❯ src/tests/audio-manager.test.ts 24/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23                  
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36                    
 ❯ src/tests/sound-system-e2e.test.ts 13/17                              

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors 
Retry 2/3 for sounds/player/walk.mp3: Error: Invalid audio               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:234:68                                                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                     
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                     
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                    
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support                                       
HTML5 Audio initialized successfully                                     
                                                                         
                                                                         
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20          
 ❯ src/tests/audio-manager.test.ts 24/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23                  
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36                    
 ❯ src/tests/sound-system-e2e.test.ts 13/17                              

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support                                       
Web Audio API not supported, using HTML5 Audio fallback                  
                                                                         
                                                                         
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20          
 ❯ src/tests/audio-manager.test.ts 24/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23                  
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36                    
 ❯ src/tests/sound-system-e2e.test.ts 13/17                              

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support                                       
HTML5 Audio preloaded 9/9 sounds                                         
                                                                         
                                                                         
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20          
 ❯ src/tests/audio-manager.test.ts 24/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23                  
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36                    
 ❯ src/tests/sound-system-e2e.test.ts 13/17                              

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors 
Retry 2/3 for sounds/player/dig.mp3: Error: Invalid audio                
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:234:68                                                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                     
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                     
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                    
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Retry 2/3 for sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Retry 2/3 for sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Retry 2/3 for sounds/player/death.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Invalid audio     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Retry 2/3 for sounds/diamond/collect.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Cross-Browser Compatibility Workflow > should han
ndle different audio format support
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:724:21 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:724:21 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:724:21 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:724:21 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:724:21 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:724:21 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:724:21 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:724:21 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:724:21 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:20


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 18/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/comprehensive-sound-system.test.ts 35/36
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 1 failed | 20 passed (26)
      Tests 1 failed | 408 passed (432)
   Start at 18:45:54
   Duration 7.28s
ode (vitest 4)ode (vitest 5) ✓ src/tests/comprehensive-sound-system.test.ts (36 tests) 4731ms        
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  2060ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures  2060ms
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Integration with Game Events Workflow > should in
ntegrate with complete game event sequence
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Com
mplete Sound Workflows > Integration with Game Events Workflow > should in
ntegrate with complete game event sequence
Preloaded 9 sounds


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 19/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 1 failed | 22 passed (26)
      Tests 1 failed | 414 passed (432)
   Start at 18:45:54
   Duration 7.82s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                
Audio context closed unexpectedly                                        
Audio context closed unexpectedly, attempting to reinitialize            
                                                                         
                                                                         
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 19/20          
 ❯ src/tests/audio-manager.test.ts 24/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 1 failed | 22 passed (26)
      Tests 1 failed | 414 passed (432)
   Start at 18:45:54
   Duration 7.82s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                
Audio context state changed to: closed                                   
                                                                         
 ✓ src/tests/sound-system-e2e.test.ts (17 tests) 4845ms                  
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading  2121ms  
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation  20
087ms
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Audio context suspended for 5 seconds. Click anywhere to enable audio.   


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 19/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 1 failed | 22 passed (26)
      Tests 1 failed | 414 passed (432)
   Start at 18:45:54
   Duration 7.82s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                           
Retry 2/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)             
    at listOnTimeout (node:internal/timers:555:9)                        
    at processTimers (node:internal/timers:529:7)                        
                                                                         
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: HTTP 404: Not Found      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Retry 2/3 for sounds/arrow/thud.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/death.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Foun
nd
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Retry 2/3 for sounds/diamond/collect.mp3: Error: HTTP 404: Not Found     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 19/20
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 1 failed | 22 passed (26)
      Tests 1 failed | 414 passed (432)
   Start at 18:45:54
   Duration 7.82s
 ✓ src/tests/app-sound-integration-comprehensive.test.tsx (20 tests) 5037ms
   ✓ App Sound Integration - Comprehensive Task 10 Tests > Task 10.2: Connect keyboard event handlers to trigger appropriate sounds > should handle rapid keyboard input without blocking  1605ms
   ✓ App Sound Integration - Comprehensive Task 10 Tests > Task 10.4: Ensure sound system doesn't block game rendering or input > should not block game rendering during sound operations  1027ms
   ✓ App Sound Integration - Comprehensive Task 10 Tests > Task 10.4: Ensure sound system doesn't block game rendering or input > should maintain 
 consistent frame rate during audio operations  320ms
   ✓ App Sound Integration - Comprehensive Task 10 Tests > Task 10.5: Wri
ite integration tests for complete sound system functionality > should mai
intain performance under stress conditions  660ms

 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 415 passed (432)
   Start at 18:45:54
   Duration 8.04s
ode (vitest 3)stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load sound PLAYER_WALK: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Invalid audi
io
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load sound PLAYER_DIG: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Invali
id audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load sound BOULDER_MOVE: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Invalid aud
dio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load sound ARROW_MOVE: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Invalid 
 audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load sound COLLISION_THUD: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Invalid a
audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load sound DEATH_SOUND: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error
r: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: In
nvalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load DIAMOND_COLLECT from sounds/diamond/collect.mp3: Error: In
nvalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode errors 
Failed to load sound DIAMOND_COLLECT: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:234:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 416 passed (432)
   Start at 18:45:54
   Duration 8.47s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors 
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors 
Preloaded 0 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > format fallback > should try multiple formats
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 416 passed (432)
   Start at 18:45:54
   Duration 8.47s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Retry 1/3 for sounds/player/walk.mp3: Error: 404                         
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:247:44                                                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                     
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/run
nner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 416 passed (432)
   Start at 18:45:54
   Duration 8.47s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load sound PLAYER_WALK: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: HTTP 404: No
ot Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load sound PLAYER_DIG: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: HTTP 4
404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load sound BOULDER_MOVE: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: HTTP 404: N
Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load sound ARROW_MOVE: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: HTTP 404
4: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load sound COLLISION_THUD: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: HTTP 404:
: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load sound DEATH_SOUND: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error
r: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: HT
TTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound VICTORY_SOUND: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound DOOR_SLAM: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load DIAMOND_COLLECT from sounds/diamond/collect.mp3: Error: HT
TTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle HTTP errors during preloading
Failed to load sound DIAMOND_COLLECT: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31 


 ❯ src/tests/audio-manager.test.ts 25/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 417 passed (432)
   Start at 18:45:54
   Duration 8.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                           
Asset loading complete: 0/9 loaded, 9 failed                             
                                                                         
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                           
Preloaded 0 sounds                                                       
                                                                         

 ❯ src/tests/audio-manager.test.ts 25/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 417 passed (432)
   Start at 18:45:54
   Duration 8.91s

 ❯ src/tests/audio-manager.test.ts 25/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 417 passed (432)
   Start at 18:45:54
   Duration 9.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > HTML5AudioManager > initialization > should initialize with HTM
ML5 Audio support
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > HTML5AudioManager > preloading with format optimization > shoul
ld preload sounds with format filtering
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > HTML5AudioManager > preloading with format optimization > shoul
ld preload sounds with format filtering
HTML5 Audio preloaded 9/9 sounds


 ❯ src/tests/audio-manager.test.ts 25/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 418 passed (432)
   Start at 18:45:54
   Duration 9.55s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should preload sounds with format filtering                                   
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:431:23                                                                   
    at Map.forEach (<anonymous>)                                         
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:272:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:272:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:272:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:272:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:272:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:272:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:272:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:272:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:
:431:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manag
gers\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.tes
st.ts:272:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runn
ner/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:1442:25)


 ❯ src/tests/audio-manager.test.ts 25/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 418 passed (432)
   Start at 18:45:54
   Duration 9.55s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                                             
HTML5 Audio initialized successfully                                     
                                                                         
                                                                         
 ❯ src/tests/audio-manager.test.ts 25/27                                 
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23                  

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 418 passed (432)
   Start at 18:45:54
   Duration 9.55s
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


 ❯ src/tests/audio-manager.test.ts 25/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 418 passed (432)
   Start at 18:45:54
   Duration 9.55s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                                             
HTML5 Audio preloaded 0/9 sounds                                         
                                                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > loading state > should provide loading state                                                                        
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > HTML5AudioManager > loading state > should provide optimization
n report
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > HTML5AudioManager > loading state > should provide optimization
n report
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

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > createAudioManager factory > should create WebAudioManager when
n Web Audio API is available
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > createAudioManager factory > should create HTML5AudioManager wh
hen only HTML5 Audio is available
HTML5 Audio initialized successfully


 ❯ src/tests/audio-manager.test.ts 25/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 418 passed (432)
   Start at 18:45:54
   Duration 9.55s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is available                                         
Web Audio API not supported, using HTML5 Audio fallback                  
                                                                         
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support                                                     
No audio support detected, using silent mode
No audio support detected, using silent mode


 ❯ src/tests/audio-manager.test.ts 25/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 418 passed (432)
   Start at 18:45:54
   Duration 9.55s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality                                              
Initialized gain node pool with 5 nodes                                  
Web Audio API initialized successfully                                   
                                                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > integration with existing functionality > should maintain exist
ting playSound functionality
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > integration with existing functionality > should maintain exist
ting mute functionality
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > integration with existing functionality > should maintain exist
ting mute functionality
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > integration with existing functionality > should maintain exist
ting mute functionality
Preloaded 9 sounds


 ❯ src/tests/audio-manager.test.ts 25/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 1 failed | 23 passed (26)
      Tests 1 failed | 418 passed (432)
   Start at 18:45:54
   Duration 9.55s
ode (vitest 2)stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing cleanup functionality
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing cleanup functionality
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > integration with existing functionality > should maintain exist
ting cleanup functionality
Preloaded 9 sounds

 ✓ src/tests/audio/enhanced-audio-manager.test.ts (23 tests) 7040ms      
   ✓ Enhanced Audio Manager > WebAudioManager > enhanced preloading > sho
ould handle loading failures gracefully  2034ms
   ✓ Enhanced Audio Manager > WebAudioManager > error recovery > should r
retry failed loads  1101ms
   ✓ Enhanced Audio Manager > WebAudioManager > error recovery > should h
handle decode errors  2018ms
   ✓ Enhanced Audio Manager > WebAudioManager > format fallback > should 
 try multiple formats  1076ms

 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 1 failed | 24 passed (26)
      Tests 1 failed | 429 passed (432)
   Start at 18:45:54
   Duration 9.98s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle playback errors gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 1 failed | 24 passed (26)
      Tests 1 failed | 430 passed (432)
   Start at 18:45:54
   Duration 10.84s
 ✓ src/tests/audio-manager.test.ts (27 tests) 8228ms
   ✓ Audio Manager > WebAudioManager > should handle preload errors gracefully  2076ms
   ✓ Audio Manager > Error Handling > should handle fetch errors during preloading  2022ms
   ✓ Audio Manager > Error Handling > should handle HTTP errors during preloading  2014ms
   ✓ Audio Manager > Error Handling > should handle audio decoding errors
s
  2024ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event g
generation efficiently
AssertionError: expected 1.1412000000000262 to be less than 0.6
 ❯ src/tests/sound-system-performance.test.ts:653:30
    651|XgenerationTimes.forEach((time, index) => {
    652|Xconst expectedMaxTime = eventCounts[index]! * 0…
    653|Xexpect(time).toBeLessThan(expectedMaxTime);     
       |X^
    654|X});
    655|X});
 ❯ src/tests/sound-system-performance.test.ts:651:29


⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed | 25 passed (26)
      Tests  1 failed | 431 passed (432)
   Start at  18:45:54
   Duration  10.89s (transform 2.73s, setup 5.40s, collect 8.46s, tests 3
39.46s, environment 33.73s, prepare 5.08s)

ode (vitest 1)
Tests failed! Fix the issues before starting the development server.     
Error: Command failed: cross-env NODE_NO_WARNINGS=1 vitest run -c vitest.
.config.ts
⠙
:\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me check the browser console logs to see what's happening:


Failed to call MCP tool

playwright_navigate

Session Too Long
Continue
Summarize and continue in a new session.

Revert







Claude Sonnet 4.0
Autopilot
