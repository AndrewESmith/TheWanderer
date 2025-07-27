The game will contin...

655| });

Caused by: Reference...

How do I fix the fol...

New Session





All audio unit tests pass but I am getting the following error when the game runs please analyis the error, explain why it occurs and fix it "Audio Error: SOUND_LOAD_ERROR: Sound asset not found:" for all my sound assets. The sound files exist. 



Kiro
Including Steering Documents

typescript-standards.md
I'll analyze the audio error and help you fix it. Let me first examine the current sound system implementation and the test files to understand the issue.

Read file(s)

sound-system-performance.test.ts
Now let me examine the sound configuration and audio manager to understand how sound assets are loaded:

Read file(s)

sound-config.ts
Now let me check the audio manager implementation to see how it loads sounds:

Read file(s)

audio-manager.ts
Let me check the public folder to see if the sound files actually exist:

Searched workspace
Checking the public folder structure to see if sound files exist
Searched workspace
Checking the sounds directory structure to see what sound files exist
Now let me check how the application is being served and what the base URL configuration is:

Read file(s)

vite.config.js
Let me also check the asset loader to see how it's trying to load the sound files:

Read file(s)

asset-loader.ts
Now I understand the issue! The problem is that the sound files exist in the public/sounds/ directory, but the application is trying to load them from URLs that start with sounds/ (relative paths). In a Vite development environment, files in the public directory are served from the root, so the correct path should be /sounds/ (with a leading slash) or the full URL.

Let me check how the application is currently running and what the base URL should be:

Read file(s)

index.html
Perfect! Now I can see the issue clearly. The problem is in the sound configuration file - the paths are missing the leading slash. In Vite, files in the public directory are served from the root, so sounds/player/walk.mp3 should be /sounds/player/walk.mp3.

Analysis of the Error
The error "Audio Error: SOUND_LOAD_ERROR: Sound asset not found:" occurs because:

Incorrect Path Format: The sound asset paths in sound-config.ts are using relative paths like 'sounds/player/walk.mp3' instead of absolute paths like '/sounds/player/walk.mp3'.

Vite Static Asset Serving: In Vite, files in the public directory are served from the root URL. So a file at public/sounds/player/walk.mp3 should be accessed via /sounds/player/walk.mp3 (with leading slash).

Network Request Failure: When the browser tries to fetch sounds/player/walk.mp3, it's looking for it relative to the current page URL, which fails because the file doesn't exist at that relative path.

The Fix
I need to update all the sound asset paths in the configuration to use absolute paths with leading slashes:

Accepted edits to

sound-config.ts


Now let's test this fix by running the application to see if the sound loading error is resolved:

Command
npm run dev
npm run dev
:\Windows\System32\cmd.exe - npm  run devpm run dev
> thewanderer@0.1.0 dev
> cross-env NODE_NO_WAR
RNINGS=1 vite --mode dev
velopment

:\Windows\system32\cmd.exe Port 3000 is in use, tr
rying another one...    

  VITE v6.3.5  ready in
n
 273 ms

  ➜  Local:   http://lo
ocalhost:3001/
  ➜  Network: use --hos
st to expose
  ➜  press h + enter to
o show help
;Windows PowerShell
Great! The development server is running on port 3001. Let me also run the tests to make sure our fix doesn't break anything:

Command
npm test
npm test
Let me try running the tests with a more specific command:

Command
npm run test:unit
npm run test:unit
Let me check what test scripts are available:

Read file(s)

package.json
Let me run the tests to verify our fix works:

Command
npm run test:no-warnings
npm run test:no-warning
gs
Terminate batch job (Y/
/N)?y
:\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
r>npm run test:no-warnin
ngs
:\Windows\System32\cmd.exe - npm  run test:no-warningspm run test:no-warnings
> thewanderer@0.1.0 tes
st:no-warnings
> cross-env NODE_NO_WAR
RNINGS=1 vitest run -c v
vitest.config.ts        

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBas
sh/TheWanderer

ode (vitest 1)ode (vitest 3)ode (vitest 4)ode (vitest 2)ode (vitest 8)ode (vitest 7)ode (vitest 10)ode (vitest 11)ode (vitest 15)
 Test Files 0 passed (2
26)
      Tests 0 passed (0
0)
   Start at 18:58:23   
   Duration 979ms      

 ❯ src/tests/audio-manager.test.ts [queued]   

 Test Files 0 passed (26)
      Tests 0 passed (0)
   Start at 18:58:23   
   Duration 1.86s      

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]   
 ❯ src/tests/audio-manager.test.ts [queued]   

 Test Files 0 passed (26)
      Tests 0 passed (0)
   Start at 18:58:23   
   Duration 1.96s      

 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]   
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]    
 ❯ src/tests/audio-mana
ager.test.ts [queued]   
 ❯ src/tests/audio/asse
et-loader.test.ts [queue
ed]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts [queued]
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts [queued]
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts [queued]
 ❯ src/tests/GameState-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts [queued]
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 [queued]

 Test Files 0 passed (2
26)
      Tests 0 passed (0
0)
   Start at 18:58:23   
   Duration 2.06s      

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]  
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx [queued]   
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-cont
text.test.tsx [queued]  
 ❯ src/tests/audio-hook
ks.test.tsx [queued]    
 ❯ src/tests/audio-mana
ager.test.ts [queued]   
 ❯ src/tests/audio/asse
et-loader.test.ts 0/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts [queued]
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts [queued]
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts [queued]
 ❯ src/tests/GameState-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts [queued]
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 [queued]

 Test Files 0 passed (2
26)
      Tests 0 passed (1
16)
   Start at 18:58:23   
   Duration 2.50s      
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
Failed to load test_sound from sounds/test.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:116:40
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/asset-loader.test.ts 
 > AssetLoader > loadAud
dioBuffer > should retry
y failed requests       
Retry 1/2 for sounds/te
est.mp3: Error: Network 
 error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\asset-loader.test.ts:1
132:40
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx [queued]  
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 0/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx [queued]  
 ❯ src/tests/audio-hook
ks.test.tsx [queued]    
 ❯ src/tests/audio-mana
ager.test.ts 0/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 1/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 0/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 0/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts [queued]
 ❯ src/tests/GameState-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 0/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 0/20

 Test Files 0 passed (2
26)
      Tests 1 passed (1
162)
   Start at 18:58:23   
   Duration 2.60s      












stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should initialize with Web Audio API support
Initialized gain node pool with 5 nodes
Web Audio API initialized successfullystdout | src/tests/audio/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > initialization
n > should initialize wi
ith Web Audio API suppor
rt
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle m
muted state correctly   
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should load mut
ted preference from loca
alStorage
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle l
localStorage errors grac
cefully
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > initialization
n > should handle audio 
 context suspension     
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > initialization
n > should handle audio 
 context suspension     
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should preload 
 sounds successfully    
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should preload 
 sounds with progress tr
racking
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should preload 
 sounds successfully    
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should preload 
 sounds with progress tr
racking
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should preload 
 sounds successfully    
Preloaded 9 sounds     

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Complete Game Soun
nd Workflow > should han
ndle complete player mov
vement workflow
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx [queued]  
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 0/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx [queued]  
 ❯ src/tests/audio-hook
ks.test.tsx [queued]    
 ❯ src/tests/audio-mana
ager.test.ts 0/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 1/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 0/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 0/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts [queued]
 ❯ src/tests/GameState-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 0/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 0/20

 Test Files 0 passed (2
26)
      Tests 1 passed (1
162)
   Start at 18:58:23   
   Duration 2.60s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/p
player/dig.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/a
arrow/twang.mp3: Error: 
 Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/a
arrow/thud.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/p
player/death.mp3: Error:
: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/e
environment/door-slam.mp
p3: Error: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/       @vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/d
diamond/collect.mp3: Err
ror: Network error      
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx [queued]  
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 0/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx [queued]  
 ❯ src/tests/audio-hook
ks.test.tsx [queued]    
 ❯ src/tests/audio-mana
ager.test.ts 0/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 1/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 0/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 0/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts [queued]
 ❯ src/tests/GameState-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 0/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 0/20

 Test Files 0 passed (2
26)
      Tests 1 passed (1
162)
   Start at 18:58:23   
   Duration 2.60s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Initialization Performance > should initialize WebAudioManager within performance budget  
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Initialization Perfor
rmance > should initiali
ize HTML5AudioManager wi
ithin performance budget
HTML5 Audio initialized
d successfully


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx [queued]  
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 0/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx [queued]  
 ❯ src/tests/audio-hook
ks.test.tsx [queued]    
 ❯ src/tests/audio-mana
ager.test.ts 0/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 1/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 0/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 0/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts [queued]
 ❯ src/tests/GameState-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 0/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 0/20

 Test Files 0 passed (2
26)
      Tests 1 passed (1
162)
   Start at 18:58:23   
   Duration 2.60s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Asset loading complete: 9/9 loaded, 0 failed  

stdout | src/tests/sound-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Complete Game Soun
nd Workflow > should han
ndle complete player mov
vement workflow
Preloaded 9 sounds     


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Audio context state changed to: closed        

stdout | src/tests/sound-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Complete Game Soun
nd Workflow > should han
ndle complete game state
e transition workflow   
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Initialization Perfor
rmance > should handle m
multiple manager instanc
ces efficiently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should preload soun
nds within performance b
budget
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > WebAudioManag
ger with Comprehensive M
Mocks > should initializ
ze with mocked Web Audio
o API
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > WebAudioManag
ger with Comprehensive M
Mocks > should handle au
udio context state chang
ges
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Audio context state cha
anged to: suspended     
Audio context state cha
anged to: running       


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio context state changes
Audio context suspended - attempting to resume
e on next user interacti
ion


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should create and manage gain nodes correctly
Initialized gain node pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > WebAudioManag
ger with Comprehensive M
Mocks > should create bu
uffer sources for sound 
 playback
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > WebAudioManag
ger with Comprehensive M
Mocks > should create bu
uffer sources for sound 
 playback
Asset loading complete:
: 9/9 loaded, 0 failed  


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      












stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:133:40
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/asset-loader.test.ts 
 > AssetLoader > loadAud
dioBuffer > should throw
w error if all sources f
fail
Retry 1/2 for sounds/te
est.mp3: Error: Network 
 error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\asset-loader.test.ts:1
146:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should preload sounds within performance budget
Asset loading complete: 9/9 loaded, 0 failed  

stdout | src/tests/sound-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Complete Game Soun
nd Workflow > should han
ndle complete game state
e transition workflow   
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > WebAudioManag
ger with Comprehensive M
Mocks > should create bu
uffer sources for sound 
 playback
Preloaded 9 sounds     

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > WebAudioManag
ger with Comprehensive M
Mocks > should handle au
udio decoding with mocke
ed decodeAudioData      
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Complete Game Soun
nd Workflow > should han
ndle complete game state
e transition workflow   
Preloaded 9 sounds     

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > WebAudioManag
ger with Comprehensive M
Mocks > should handle au
udio decoding with mocke
ed decodeAudioData      
Asset loading complete:
: 9/9 loaded, 0 failed  


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow   
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow   
Audio context state changed to: closed        

stdout | src/tests/sound-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Complete Game Soun
nd Workflow > should han
ndle death scenario work
kflow
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should preload soun
nds within performance b
budget
Preloaded 9 sounds     

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > WebAudioManag
ger with Comprehensive M
Mocks > should handle au
udio decoding with mocke
ed decodeAudioData      
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should preload 
 sounds with progress tr
racking
Preloaded 9 sounds     

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should apply op
ptimization during prelo
oading
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should apply op
ptimization during prelo
oading
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Complete Game Soun
nd Workflow > should han
ndle death scenario work
kflow
Asset loading complete:
: 9/9 loaded, 0 failed  


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle mocked audio context errors gracefully
Audio context error (INITIALIZATION_FAILED): E
Error: AudioContext crea
ation failed
    at fn.<anonymous> (
(D:\FizzBash\TheWanderer
r\src\tests\comprehensiv
ve-sound-system.test.ts:
:540:27)
    at new mockCall (fi
ile:///D:/FizzBash/TheWa
anderer/node_modules/@vi
itest/spy/dist/index.js:
:96:15)
    at new spy (file://
//D:/FizzBash/TheWandere
er/node_modules/tinyspy/
/dist/index.js:47:39)   
    at WebAudioManager.
.initializeAudioContext 
 (D:\FizzBash\TheWandere
er\src\audio\managers\au
udio-manager.ts:97:39)  
    at new WebAudioMana
ager (D:\FizzBash\TheWan
nderer\src\audio\manager
rs\audio-manager.ts:80:1
14)
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:543:33
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should initialize with mocked HTML5 Audio
HTML5 Audio initialized successfully

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > HTML5AudioMan
nager with Comprehensive
e Mocks > should create 
 audio elements for each
h sound
HTML5 Audio initialized
d successfully

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > HTML5AudioMan
nager with Comprehensive
e Mocks > should create 
 audio elements for each
h sound
HTML5 Audio preloaded 9
9/9 sounds

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > HTML5AudioMan
nager with Comprehensive
e Mocks > should handle 
 audio loading events   
HTML5 Audio initialized
d successfully

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > HTML5AudioMan
nager with Comprehensive
e Mocks > should handle 
 audio loading events   
HTML5 Audio preloaded 9
9/9 sounds

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Complete Game Soun
nd Workflow > should han
ndle death scenario work
kflow
Preloaded 9 sounds     

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > HTML5AudioMan
nager with Comprehensive
e Mocks > should handle 
 audio playback with moc
cked play method        
HTML5 Audio initialized
d successfully

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > HTML5AudioMan
nager with Comprehensive
e Mocks > should handle 
 audio playback with moc
cked play method        
HTML5 Audio preloaded 9
9/9 sounds


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      












stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
Audio context state changed to: closedstdout | src/tests/comprehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Audio Manager Fall
lback Workflow > should 
 gracefully fallback fro
om WebAudio to HTML5 to 
 Silent
HTML5 Audio initialized
d successfully


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should gracefully fallback from WebAudio to HTML5 to Silent
Web Audio API not supported, using HTML5 Audio fallback
No audio support detect
ted, using silent mode  
No audio support detect
ted, using silent mode  

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 1/3 for /sounds/p
player/walk.mp3: Error: 
 Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 1/3 for /sounds/p
player/dig.mp3: Error: N
Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 1/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Network error       
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 1/3 for /sounds/a
arrow/twang.mp3: Error: 
 Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 1/3 for /sounds/a
arrow/thud.mp3: Error: N
Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 1/3 for /sounds/p
player/death.mp3: Error:
: Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 1/3 for /sounds/e
environment/door-slam.mp
p3: Error: Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 1/3 for /sounds/d
diamond/collect.mp3: Err
ror: Network error      
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/asset-loader.test.ts 
 > AssetLoader > loadAud
dioBuffer > should throw
w error if all sources f
fail
Retry 1/2 for sounds/te
est.ogg: Error: Network 
 error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\asset-loader.test.ts:1
146:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-context.test.tsx > Au
udioContext > should pro
ovide audio context to c
children
AudioContext not suppor
rted

stderr | src/tests/audi
io-context.test.tsx > Au
udioContext > should pro
ovide audio context to c
children
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
Asset loading complete: 9/9 loaded, 0 failed  

stdout | src/tests/sound-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Audio Manager Fall
lback Workflow > should 
 handle audio context su
uspension and recovery w
workflow
Asset loading complete:
: 9/9 loaded, 0 failed  


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx [queued]   
 ❯ src/tests/app-sound-
-integration.test.tsx [q
queued]
 ❯ src/tests/audio-cont
text.test.tsx 0/7       
 ❯ src/tests/audio-hook
ks.test.tsx 0/16        
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 5/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 2/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 14/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 0/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 0/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 [queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 1/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 3/20

 Test Files 0 passed (2
26)
      Tests 37 passed (
(207)
   Start at 18:58:23   
   Duration 2.81s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
Preloaded 9 sounds     


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
Audio context suspended - attempting to resume on next user interaction
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
Audio context state changed to: suspended     
Audio context state changed to: running       
Audio context state cha
anged to: closed        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Settings Persisten
nce Workflow > should pe
ersist and restore audio
o settings across sessio
ons
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Audio context state cha
anged to: closed        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      












stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should persist and restore audio settings across sessions
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting 
 to reinitialize        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should handle settings corruption gracefully
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        
Audio context state cha
anged to: closed        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should handle settings corruption gracefully
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Performance Under 
 Load Workflow > should 
 handle intensive sound 
 event workflow efficien
ntly
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Performance Under 
 Load Workflow > should 
 handle intensive sound 
 event workflow efficien
ntly
Preloaded 9 sounds     


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting 
 to reinitialize        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
Audio context state changed to: closed        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Performance Under 
 Load Workflow > should 
 maintain performance du
uring concurrent operati
ions
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Performance Under 
 Load Workflow > should 
 maintain performance du
uring concurrent operati
ions
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Performance Under 
 Load Workflow > should 
 maintain performance du
uring concurrent operati
ions
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should optimize net
twork requests during pr
reloading
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should optimize net
twork requests during pr
reloading
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should optimize net
twork requests during pr
reloading
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should play sou
unds with minimal latenc
cy
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should play sou
unds with minimal latenc
cy
Asset loading complete:
: 9/9 loaded, 0 failed  


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      












stderr | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
AudioContext not supported
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io
Failed to initialize au
udio: Error: Initializat
tion failed
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-context.test.tsx:70:27
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runFiles (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1787:3)

stderr | src/tests/audi
io-context.test.tsx > Au
udioContext > should cal
ll preloadSounds during 
 initialization
AudioContext not suppor
rted
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/audi
io-context.test.tsx > Au
udioContext > should all
low manual cleanup      
AudioContext not suppor
rted
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/audi
io-context.test.tsx > Au
udioContext > should all
low manual cleanup      
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 

stderr | src/tests/audi
io-context.test.tsx > Au
udioContext > should pre
event multiple simultane
eous initializations    
AudioContext not suppor
rted
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/audi
io-context.test.tsx > Au
udioContext > should han
ndle non-Error exception
ns during initialization
AudioContext not suppor
rted
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io
Failed to initialize au
udio: String error      

stderr | src/tests/audi
io-hooks.test.tsx > Audi
io Hooks > useSound > sh
hould provide playSound 
 function with options  
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/audi
io-hooks.test.tsx > Audi
io Hooks > useSound > sh
hould return muted state
e from audio manager    
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/audi
io-hooks.test.tsx > Audi
io Hooks > useSound > sh
hould toggle mute state 
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should apply optimization during preloading
Preloaded 9 sounds     

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/p
player/dig.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/a
arrow/twang.mp3: Error: 
 Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/a
arrow/thud.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/p
player/death.mp3: Error:
: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/e
environment/door-slam.mp
p3: Error: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/Th       eWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/d
diamond/collect.mp3: Err
ror: Network error      
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/asset-loader.test.ts 
 > AssetLoader > loadAud
dioBuffer > should throw
w error if all sources f
fail
Failed to load test_sou
und from sounds/test.ogg
g: Error: Network error 
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\asset-loader.test.ts:1
146:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/asset-loader.test.ts 
 > AssetLoader > loadAud
dioBuffer > should handl
le HTTP errors
Failed to load test_sou
und from sounds/test.mp3
3: Error: HTTP 404: Not 
 Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31

stderr | src/tests/audi
io/asset-loader.test.ts 
 > AssetLoader > loadAud
dioBuffer > should handl
le audio decoding errors
Failed to load test_sou
und from sounds/test.mp3
3: Error: Invalid audio 
 data
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\asset-loader.test.ts:1
194:68
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
 ✓ src/tests/audio-context.test.tsx (7 tests) 162ms

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6       
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization 
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will b
be required to play audi
io

stderr | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Performance Under 
 Load Workflow > should 
 maintain performance du
uring concurrent operati
ions
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
Audio context state changed to: closed        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should play sou
unds with minimal latenc
cy
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should handle r
rapid sequential playbac
ck efficiently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
                       
                       
                       
                       
                       
                       
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully       
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
Autoplay not allowed - user interaction will b
be required to play audi
io

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > us
seSound Hook Integration
n > should call audio ma
anager methods correctly
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Retry 1/3 for /sounds/a
arrow/thud.mp3: Error: N
Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\sound-sy
ystem-e2e.test.ts:222:28
8)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-hooks.test.tsx > Audi
io Hooks > useAudioSetti
ings > should return def
fault volume from config
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/audi
io-hooks.test.tsx > Audi
io Hooks > useAudioSetti
ings > should load volum
me from localStorage    
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > us
seSound Hook Integration
n > should handle playba
ack errors and track err
ror state
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > us
seSound Hook Integration
n > should handle playba
ack errors and track err
ror state
Skipping sound test-sou
und due to multiple play
yback errors

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > us
seSound Hook Integration
n > should reset error c
counts via resetAudioSys
stem
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > us
seSound Hook Integration
n > should sync volume s
settings with audio mana
ager
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should allow user to control audio settings end-to-end
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized
d successfully


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
                       
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should allow user to control audio settings end-to-end
No supported audio format found for player_walk
Failed to create audio 
 element for player_walk
No supported audio form
mat found for player_dig
Failed to create audio 
 element for player_dig 
No supported audio form
mat found for boulder_mo
ove
Failed to create audio 
 element for boulder_mov
ve
No supported audio form
mat found for arrow_move
Failed to create audio 
 element for arrow_move 
No supported audio form
mat found for collision_
_thud
Failed to create audio 
 element for collision_t
thud
No supported audio form
mat found for death_soun
nd
Failed to create audio 
 element for death_sound
No supported audio form
mat found for victory_so
ound
Failed to create audio 
 element for victory_sou
und
No supported audio form
mat found for door_slam 
Failed to create audio 
 element for door_slam  
No supported audio form
mat found for diamond_co
ollect
Failed to create audio 
 element for diamond_col
llect


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should allow user to control audio settings end-to-end
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should handle r
rapid sequential playbac
ck efficiently
Asset loading complete:
: 9/9 loaded, 0 failed  


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSetting
gs (D:\FizzBash\TheWande
erer\src\audio\context\a
audio-context.tsx:51:33)
    at AudioProvider (D
D:\FizzBash\TheWanderer\
\src\audio\context\audio
o-context.tsx:91:19)    
    at Object.react-sta
ack-bottom-frame (D:\Fiz
zzBash\TheWanderer\node_
_modules\react-dom\cjs\r
react-dom-client.develop
pment.js:23863:20)      
    at renderWithHooks 
 (D:\FizzBash\TheWandere
er\node_modules\react-do
om\cjs\react-dom-client.
.development.js:5529:22)
    at updateFunctionCo
omponent (D:\FizzBash\Th
heWanderer\node_modules\
\react-dom\cjs\react-dom
m-client.development.js:
:8897:19)
    at beginWork (D:\Fi
izzBash\TheWanderer\node
e_modules\react-dom\cjs\
\react-dom-client.develo
opment.js:10522:18)     
    at runWithFiberInDE
EV (D:\FizzBash\TheWande
erer\node_modules\react-
-dom\cjs\react-dom-clien
nt.development.js:1522:1
13)
    at performUnitOfWor
rk (D:\FizzBash\TheWande
erer\node_modules\react-
-dom\cjs\react-dom-clien
nt.development.js:15140:
:22)
    at workLoopSync (D:
:\FizzBash\TheWanderer\n
node_modules\react-dom\c
cjs\react-dom-client.dev
velopment.js:14956:41)  
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Failed to load audio se
ettings: SyntaxError: Un
nexpected token 'i', "in
nvalid" is not valid JSO
ON
    at JSON.parse (<ano
onymous>)
    at loadAudioSetting
gs (D:\FizzBash\TheWande
erer\src\audio\context\a
audio-context.tsx:51:33)
    at AudioProvider (D
D:\FizzBash\TheWanderer\
\src\audio\context\audio
o-context.tsx:91:19)    
    at Object.react-sta
ack-bottom-frame (D:\Fiz
zzBash\TheWanderer\node_
_modules\react-dom\cjs\r
react-dom-client.develop
pment.js:23863:20)      
    at renderWithHooks 
 (D:\FizzBash\TheWandere
er\node_modules\react-do
om\cjs\react-dom-client.
.development.js:5529:22)
    at updateFunctionCo
omponent (D:\FizzBash\Th
heWanderer\node_modules\
\react-dom\cjs\react-dom
m-client.development.js:
:8897:19)
    at beginWork (D:\Fi
izzBash\TheWanderer\node
e_modules\react-dom\cjs\
\react-dom-client.develo
opment.js:10522:18)     
    at runWithFiberInDE
EV (D:\FizzBash\TheWande
erer\node_modules\react-
-dom\cjs\react-dom-clien
nt.development.js:1522:1
13)
    at performUnitOfWor
rk (D:\FizzBash\TheWande
erer\node_modules\react-
-dom\cjs\react-dom-clien
nt.development.js:15140:
:22)
    at workLoopSync (D:
:\FizzBash\TheWanderer\n
node_modules\react-dom\c
cjs\react-dom-client.dev
velopment.js:14956:41)  
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/audi
io-hooks.test.tsx > Audi
io Hooks > useAudioSetti
ings > should handle inv
valid localStorage volum
me
Failed to load audio se
ettings: SyntaxError: Un
nexpected token 'i', "in
nvalid" is not valid JSO
ON
    at JSON.parse (<ano
onymous>)
    at loadAudioSetting
gs (D:\FizzBash\TheWande
erer\src\audio\context\a
audio-context.tsx:51:33)
    at AudioProvider (D
D:\FizzBash\TheWanderer\
\src\audio\context\audio
o-context.tsx:91:19)    
    at Object.react-sta
ack-bottom-frame (D:\Fiz
zzBash\TheWanderer\node_
_modules\react-dom\cjs\r
react-dom-client.develop
pment.js:23863:20)      
    at renderWithHooks 
 (D:\FizzBash\TheWandere
er\node_modules\react-do
om\cjs\react-dom-client.
.development.js:5529:22)
    at updateFunctionCo
omponent (D:\FizzBash\Th
heWanderer\node_modules\
\react-dom\cjs\react-dom
m-client.development.js:
:8897:19)
    at beginWork (D:\Fi
izzBash\TheWanderer\node
e_modules\react-dom\cjs\
\react-dom-client.develo
opment.js:10522:18)     
    at runWithFiberInDE
EV (D:\FizzBash\TheWande
erer\node_modules\react-
-dom\cjs\react-dom-clien
nt.development.js:1522:1
13)
    at performUnitOfWor
rk (D:\FizzBash\TheWande
erer\node_modules\react-
-dom\cjs\react-dom-clien
nt.development.js:15140:
:22)
    at workLoopSync (D:
:\FizzBash\TheWanderer\n
node_modules\react-dom\c
cjs\react-dom-client.dev
velopment.js:14956:41)  

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > us
seAudioSettings Hook Int
tegration > should integ
grate with AudioProvider
r for settings managemen
nt
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/audi
io-hooks.test.tsx > Audi
io Hooks > useAudioSetti
ings > should set muted 
 state through audio man
nager
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > us
seAudioSettings Hook Int
tegration > should persi
ist settings to localSto
orage
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
Preloaded 9 sounds     


 ❯ src/audio/__tests__/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage
Selected audio manager not supported, falling back
HTML5 audio not supported, falling back to silent mode
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 
Autoplay not allowed - 
 user interaction will b
be required to play audi
io
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > us
seAudioSettings Hook Int
tegration > should load 
 settings from localStor
rage on initialization  
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/audi
io-hooks.test.tsx > Audi
io Hooks > useAudioSetti
ings > should clamp volu
ume between 0 and 1     
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 
Autoplay not allowed - 
 user interaction will b
be required to play audi
io
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 

stderr | src/tests/audi
io/asset-loader.test.ts 
 > AssetLoader > loadAud
dioBuffer > should respe
ect timeout
Failed to load test_sou
und from sounds/test.mp3
3: Error: Timeout loadin
ng sounds/test.mp3 after
r 100ms
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\audio\managers
s\asset-loader.ts:163:24
4)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-hooks.test.tsx > Audi
io Hooks > useAudioSetti
ings > should reset to d
defaults
Selected audio manager 
 not supported, falling 
 back
HTML5 audio not support
ted, falling back to sil
lent mode
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed  


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:278:40
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-hooks.test.tsx > Audi
io Hooks > useAudioSetti
ings > should handle loc
calStorage errors gracef
fully
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 
Autoplay not allowed - 
 user interaction will b
be required to play audi
io
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 0/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 0/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 0/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 10/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 8/16  
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 1/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 4/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 1/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 7/20

 Test Files 1 passed (2
26)
      Tests 83 passed (
(274)
   Start at 18:58:23   
   Duration 3.02s      
 ✓ src/tests/GameState-sound-integration.test.ts (9 tests) 329ms     
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
Initialized gain node pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should handle c
concurrent sound playbac
ck efficiently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should handle c
concurrent sound playbac
ck efficiently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should manage memory ef
fficiently during intens
sive use
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should manage memory ef
fficiently during intens
sive use
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should manage memory ef
fficiently during intens
sive use
Preloaded 9 sounds     

 ✓ src/tests/game-state
e-sound-transitions.test
t.ts (7 tests) 347ms    
stdout | src/audio/__te
ests__/audio-settings-in
ntegration.test.tsx > Au
udio Settings Integratio
on > complete audio sett
tings workflow > should 
 handle keyboard shortcu
uts
Web Audio API not suppo
orted, falling back to H
HTML5 Audio
HTML5 Audio initialized
d successfully


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should handle keyboard shortcuts
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio form
mat found for player_dig
Failed to create audio 
 element for player_dig 
No supported audio form
mat found for boulder_mo
ove
Failed to create audio 
 element for boulder_mov
ve
No supported audio form
mat found for arrow_move
Failed to create audio 
 element for arrow_move 
No supported audio form
mat found for collision_
_thud
Failed to create audio 
 element for collision_t
thud
No supported audio form
mat found for death_soun
nd
Failed to create audio 
 element for death_sound
No supported audio form
mat found for victory_so
ound
Failed to create audio 
 element for victory_sou
und
No supported audio form
mat found for door_slam 
Failed to create audio 
 element for door_slam  
No supported audio form
mat found for diamond_co
ollect
Failed to create audio 
 element for diamond_col
llect


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should handle keyboard shortcuts
HTML5 Audio preloaded 0/9 sounds

stdout | src/audio/__tests__/audio-settings-in
ntegration.test.tsx > Au
udio Settings Integratio
on > complete audio sett
tings workflow > should 
 reset settings to defau
ults
Web Audio API not suppo
orted, falling back to H
HTML5 Audio
HTML5 Audio initialized
d successfully


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      












stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should reset settings to defaults
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio form
mat found for player_dig
Failed to create audio 
 element for player_dig 
No supported audio form
mat found for boulder_mo
ove
Failed to create audio 
 element for boulder_mov
ve
No supported audio form
mat found for arrow_move
Failed to create audio 
 element for arrow_move 
No supported audio form
mat found for collision_
_thud
Failed to create audio 
 element for collision_t
thud
No supported audio form
mat found for death_soun
nd
Failed to create audio 
 element for death_sound
No supported audio form
mat found for victory_so
ound
Failed to create audio 
 element for victory_sou
und
No supported audio form
mat found for door_slam 
Failed to create audio 
 element for door_slam  
No supported audio form
mat found for diamond_co
ollect
Failed to create audio 
 element for diamond_col
llect
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should reset settings to defaults
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should reset settings to defaults
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should disable volume controls when muted
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should disable volume controls when muted
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio form
mat found for player_dig
Failed to create audio 
 element for player_dig 
No supported audio form
mat found for boulder_mo
ove
Failed to create audio 
 element for boulder_mov
ve
No supported audio form
mat found for arrow_move
Failed to create audio 
 element for arrow_move 
No supported audio form
mat found for collision_
_thud
Failed to create audio 
 element for collision_t
thud
No supported audio form
mat found for death_soun
nd
Failed to create audio 
 element for death_sound
No supported audio form
mat found for victory_so
ound
Failed to create audio 
 element for victory_sou
und
No supported audio form
mat found for door_slam 
Failed to create audio 
 element for door_slam  
No supported audio form
mat found for diamond_co
ollect
Failed to create audio 
 element for diamond_col
llect


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should disable volume controls when muted
HTML5 Audio preloaded 0/9 sounds

stdout | src/audio/__tests__/audio-settings-in
ntegration.test.tsx > Au
udio Settings Integratio
on > persistence across 
 sessions > should load 
 saved settings on initi
ialization
Web Audio API not suppo
orted, falling back to H
HTML5 Audio
HTML5 Audio initialized
d successfully


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should load saved settings on initialization
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio form
mat found for player_dig
Failed to create audio 
 element for player_dig 
No supported audio form
mat found for boulder_mo
ove
Failed to create audio 
 element for boulder_mov
ve
No supported audio form
mat found for arrow_move
Failed to create audio 
 element for arrow_move 
No supported audio form
mat found for collision_
_thud
Failed to create audio 
 element for collision_t
thud
No supported audio form
mat found for death_soun
nd
Failed to create audio 
 element for death_sound
No supported audio form
mat found for victory_so
ound
Failed to create audio 
 element for victory_sou
und
No supported audio form
mat found for door_slam 
Failed to create audio 
 element for door_slam  
No supported audio form
mat found for diamond_co
ollect
Failed to create audio 
 element for diamond_col
llect
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should load saved settings on initialization
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
                       
                       
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should load saved settings on initialization
An update to AudioProvider inside a test was not wrapped in act(...).When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 

stderr | src/tests/audi
io/asset-loader.test.ts 
 > AssetLoader > loadAss
sets > should handle par
rtial failures
Failed to load sound2 f
from sounds/sound2.mp3: 
 TypeError: Cannot read 
 properties of undefined
d (reading 'then')      
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:166
6:53
    at new Promise (<an
nonymous>)
    at AssetLoader.load
dAudioFile (D:\FizzBash\
\TheWanderer\src\audio\m
managers\asset-loader.ts
s:159:16)
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:195
5:55

stderr | src/tests/audi
io/asset-loader.test.ts 
 > AssetLoader > loadAss
sets > should handle par
rtial failures
Failed to load sound so
ound2: TypeError: Cannot
t read properties of und
defined (reading 'then')
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:166
6:53
    at new Promise (<an
nonymous>)
    at AssetLoader.load
dAudioFile (D:\FizzBash\
\TheWanderer\src\audio\m
managers\asset-loader.ts
s:159:16)
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:195
5:55


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
                       
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Asset loading complete: 1/2 loaded, 1 failed  


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:335:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > us
seAudioSettings Hook Int
tegration > should valid
date and clamp volume va
alues
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Au
udioProvider Context Int
tegration > should provi
ide audio manager to chi
ild components
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Au
udioProvider Context Int
tegration > should handl
le audio manager initial
lization errors
Autoplay not allowed - 
 user interaction will b
be required to play audi
io
Failed to initialize au
udio: Error: Init failed
    at D:\FizzBash\TheW
Wanderer\src\tests\react
t-sound-integration.test
t.tsx:401:30
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Au
udioProvider Context Int
tegration > should provi
ide reinitialize functio
onality
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      












 ✓ src/tests/audio-hooks.test.tsx (16 tests) 416ms ❯ src/audio/__tests__/audio-settings-integration.test.tsx 6/6
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 2/20
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:335:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Co
omponent Integration wit
th Sound System > should
d integrate sound system
m with App component    
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
 ✓ src/tests/audio/asset-loader.test.ts (16 tests) 680ms
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
Web Audio API not supported, falling back to H
HTML5 Audio
HTML5 Audio initialized
d successfully


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid-json" is not valid JSON
    at JSON.parse (<ano
onymous>)
    at loadAudioSetting
gs (D:\FizzBash\TheWande
erer\src\audio\context\a
audio-context.tsx:51:33)
    at AudioProvider (D
D:\FizzBash\TheWanderer\
\src\audio\context\audio
o-context.tsx:91:19)    
    at Object.react-sta
ack-bottom-frame (D:\Fiz
zzBash\TheWanderer\node_
_modules\react-dom\cjs\r
react-dom-client.develop
pment.js:23863:20)      
    at renderWithHooks 
 (D:\FizzBash\TheWandere
er\node_modules\react-do
om\cjs\react-dom-client.
.development.js:5529:22)
    at updateFunctionCo
omponent (D:\FizzBash\Th
heWanderer\node_modules\
\react-dom\cjs\react-dom
m-client.development.js:
:8897:19)
    at beginWork (D:\Fi
izzBash\TheWanderer\node
e_modules\react-dom\cjs\
\react-dom-client.develo
opment.js:10522:18)     
    at runWithFiberInDE
EV (D:\FizzBash\TheWande
erer\node_modules\react-
-dom\cjs\react-dom-clien
nt.development.js:1522:1
13)
    at performUnitOfWor
rk (D:\FizzBash\TheWande
erer\node_modules\react-
-dom\cjs\react-dom-clien
nt.development.js:15140:
:22)
    at workLoopSync (D:
:\FizzBash\TheWanderer\n
node_modules\react-dom\c
cjs\react-dom-client.dev
velopment.js:14956:41)  
No supported audio form
mat found for player_wal
lk
Failed to create audio 
 element for player_walk
No supported audio form
mat found for player_dig
Failed to create audio 
 element for player_dig 
No supported audio form
mat found for boulder_mo
ove
Failed to create audio 
 element for boulder_mov
ve
No supported audio form
mat found for arrow_move
Failed to create audio 
 element for arrow_move 
No supported audio form
mat found for collision_
_thud
Failed to create audio 
 element for collision_t
thud
No supported audio form
mat found for death_soun
nd
Failed to create audio 
 element for death_sound
No supported audio form
mat found for victory_so
ound
Failed to create audio 
 element for victory_sou
und
No supported audio form
mat found for door_slam 
Failed to create audio 
 element for door_slam  
No supported audio form
mat found for diamond_co
ollect
Failed to create audio 
 element for diamond_col
llect
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code thatode (vitest 10)
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
 ✓ src/audio/__tests__/audio-settings-integration.test.tsx (6 tests) 320ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should prevent memory leaks during long-running sessions
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should prevent memory l
leaks during long-runnin
ng sessions
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should prevent memory l
leaks during long-runnin
ng sessions
Preloaded 9 sounds     


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 2/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 4/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 13/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 9/20

 Test Files 6 passed (2
26)
      Tests 134 passed 
 (274)
   Start at 18:58:23   
   Duration 3.31s      
ode (vitest 13)ode (vitest 14)stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 9/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 14/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 13/20

 Test Files 6 passed (2
26)
      Tests 149 passed 
 (274)
   Start at 18:58:23   
   Duration 3.59s      
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should trigger sounds on user interactions
Autoplay not allowed - user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 9/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 14/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 13/20

 Test Files 6 passed (2
26)
      Tests 149 passed 
 (274)
   Start at 18:58:23   
   Duration 3.59s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
Asset loading complete: 9/9 loaded, 0 failed  

stdout | src/tests/sound-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Event System Performa
ance > should handle sou
und event emission effic
ciently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Event System Performa
ance > should maintain p
performance under event 
 system stress
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Event System Performa
ance > should maintain p
performance under event 
 system stress
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Event System Performa
ance > should maintain p
performance under event 
 system stress
Preloaded 9 sounds     


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 9/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 14/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 13/20

 Test Files 6 passed (2
26)
      Tests 149 passed 
 (274)
   Start at 18:58:23   
   Duration 3.59s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Retry 2/3 for /sounds/p
player/dig.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Retry 2/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Retry 2/3 for /sounds/a
arrow/twang.mp3: Error: 
 Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Retry 2/3 for /sounds/a
arrow/thud.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Retry 2/3 for /sounds/p
player/death.mp3: Error:
: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Retry 2/3 for /sounds/e
environment/door-slam.mp
p3: Error: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Retry 2/3 for /sounds/d
diamond/collect.mp3: Err
ror: Network error      
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 7/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 9/
/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 14/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 13/20

 Test Files 6 passed (2
26)
      Tests 149 passed 
 (274)
   Start at 18:58:23   
   Duration 3.59s      
ode (vitest 11)stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should handle mute toggle in UI
Autoplay not allowed - user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 12/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 15/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 6 passed (2
26)
      Tests 160 passed 
 (274)
   Start at 18:58:23   
   Duration 3.81s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should cleanup resources efficiently
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should cleanup resourc
ces efficiently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should cleanup resourc
ces efficiently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should handle cleanup 
 of multiple managers ef
fficiently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should handle cleanup 
 of multiple managers ef
fficiently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 12/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 15/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 6 passed (2
26)
      Tests 160 passed 
 (274)
   Start at 18:58:23   
   Duration 3.81s      












stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 2/3 for /sounds/p
player/dig.mp3: Error: N
Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 2/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Network error       
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 2/3 for /sounds/a
arrow/twang.mp3: Error: 
 Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 2/3 for /sounds/a
arrow/thud.mp3: Error: N
Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 2/3 for /sounds/p
player/death.mp3: Error:
: Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 2/3 for /sounds/e
environment/door-slam.mp
p3: Error: Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Retry 2/3 for /sounds/d
diamond/collect.mp3: Err
ror: Network error      
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 12/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 15/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 6 passed (2
26)
      Tests 160 passed 
 (274)
   Start at 18:58:23   
   Duration 3.81s      
                       
                       
                       
                       
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading       
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should handle cleanup 
 of multiple managers ef
fficiently
Preloaded 9 sounds     


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 12/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 15/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 6 passed (2
26)
      Tests 160 passed 
 (274)
   Start at 18:58:23   
   Duration 3.81s      
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should open audio settings dialog
Autoplay not allowed - user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 12/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 15/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 6 passed (2
26)
      Tests 160 passed 
 (274)
   Start at 18:58:23   
   Duration 3.81s      












stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 12/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-cont
text.test.tsx 7/7       
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 15/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 6 passed (2
26)
      Tests 160 passed 
 (274)
   Start at 18:58:23   
   Duration 3.81s      
 ✓ src/audio/__tests__/error-handling.test.ts (23 tests) 1231ms      
   ✓ Audio Error Handling and Fallbacks > Sound File Loading Errors > should retry failed sound loads  1013ms      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 16/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 172 passed 
 (274)
   Start at 18:58:23   
   Duration 3.92s      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Retry 2/3 for /sounds/p
player/dig.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Retry 2/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Retry 2/3 for /sounds/a
arrow/twang.mp3: Error: 
 Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Retry 2/3 for /sounds/a
arrow/thud.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Retry 2/3 for /sounds/p
player/death.mp3: Error:
: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file  :/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Retry 2/3 for /sounds/e
environment/door-slam.mp
p3: Error: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Retry 2/3 for /sounds/d
diamond/collect.mp3: Err
ror: Network error      
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 16/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 172 passed 
 (274)
   Start at 18:58:23   
   Duration 3.92s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed  

stdout | src/tests/sound-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should handle cleanup 
 of multiple managers ef
fficiently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should handle cleanup 
 of multiple managers ef
fficiently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should handle cleanup 
 of multiple managers ef
fficiently
Asset loading complete:
: 9/9 loaded, 0 failed  


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 16/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 172 passed 
 (274)
   Start at 18:58:23   
   Duration 3.92s      
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should handle game state changes with sound integration
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 16/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 172 passed 
 (274)
   Start at 18:58:23   
   Duration 3.92s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading       
Attempting to reinitialize audio context      
Initialized gain node pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should handle cleanup 
 of multiple managers ef
fficiently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should handle cleanup 
 of multiple managers ef
fficiently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Asset loading complete:
: 9/9 loaded, 0 failed  


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 16/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 9/17    
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 172 passed 
 (274)
   Start at 18:58:23   
   Duration 3.92s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed  

stdout | src/tests/sound-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should recover 
 from network failures d
during preloading       
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 18/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 175 passed 
 (274)
   Start at 18:58:23   
   Duration 4.17s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading       
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 18/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 175 passed 
 (274)
   Start at 18:58:23   
   Duration 4.17s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation 
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should handle cleanup 
 of multiple managers ef
fficiently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Cleanup Performance >
> should handle cleanup 
 of multiple managers ef
fficiently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 18/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 175 passed 
 (274)
   Start at 18:58:23   
   Duration 4.17s      
                       
                       
                       
                       
                       
                       
                       
                       
                       
                       
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at E2EMockAudioContext.<anonymous> (D:\Fiz
zzBash\TheWanderer\src\t
tests\sound-system-e2e.t
test.ts:585:43)
    at E2EMockAudioCont
text.mockCall (file:///D
D:/FizzBash/TheWanderer/
/node_modules/@vitest/sp
py/dist/index.js:96:15) 
    at E2EMockAudioCont
text.spy [as decodeAudio
oData] (file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/tinyspy/dist/inde
ex.js:47:103)
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:176
6:51
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Retry 1/3 for /sounds/p
player/death.mp3: Error:
: Decode failed
    at E2EMockAudioCont
text.<anonymous> (D:\Fiz
zzBash\TheWanderer\src\t
tests\sound-system-e2e.t
test.ts:585:43)
    at E2EMockAudioCont
text.mockCall (file:///D
D:/FizzBash/TheWanderer/
/node_modules/@vitest/sp
py/dist/index.js:96:15) 
    at E2EMockAudioCont
text.spy [as decodeAudio
oData] (file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/tinyspy/dist/inde
ex.js:47:103)
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:176
6:51
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Pe
erformance Integration T
Tests > should not block
k React rendering during
g audio operations      
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 
Autoplay not allowed - 
 user interaction will b
be required to play audi
io
An update to AudioProvi
ider inside a test was n
not wrapped in act(...).

When testing, code that
t causes React state upd
dates should be wrapped 
 into act(...):

act(() => {
  /* fire events that u
update state */
});
/* assert on the output
t */

This ensures that you'r
re testing the behavior 
 the user would see in t
the browser. Learn more 
 at https://react.dev/li
ink/wrap-tests-with-act 

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Pe
erformance Integration T
Tests > should handle ra
apid hook updates effici
iently
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 18/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 175 passed 
 (274)
   Start at 18:58:23   
   Duration 4.17s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed  


 ❯ src/audio/__tests__/ode (vitest 9)
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 18/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 175 passed 
 (274)
   Start at 18:58:23   
   Duration 4.17s      
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Performance Integration Tests > should maintain React state consistency during audio operations
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Er
rror Handling Integratio
on > should handle audio
o manager failures grace
efully in React context 
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 18/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 175 passed 
 (274)
   Start at 18:58:23   
   Duration 4.17s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Preloaded 9 sounds     


 ❯ src/audio/__tests__/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 18/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 175 passed 
 (274)
   Start at 18:58:23   
   Duration 4.17s      
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Error Handling Integration > should handle audio manager failures gracefully in React context 
Failed to play sound test-sound: Error: Audio 
 manager failed
    at Object.<anonymou
us> (D:\FizzBash\TheWand
derer\src\tests\react-so
ound-integration.test.ts
sx:646:17)
    at Object.mockCall 
 (file:///D:/FizzBash/Th
heWanderer/node_modules/
/@vitest/spy/dist/index.
.js:96:15)
    at Object.spy [as p
playSound] (file:///D:/F
FizzBash/TheWanderer/nod
de_modules/tinyspy/dist/
/index.js:47:103)       
    at Object.playSound
d (D:\FizzBash\TheWander
rer\src\audio\hooks\use-
-sound.ts:92:26)        
    at D:\FizzBash\TheW
Wanderer\src\tests\react
t-sound-integration.test
t.tsx:660:28
    at D:\FizzBash\TheW
Wanderer\node_modules\@t
testing-library\react\di
ist\act-compat.js:48:24 
    at process.env.NODE
E_ENV.exports.act (D:\Fi
izzBash\TheWanderer\node
e_modules\react\cjs\reac
ct.development.js:789:22
2)
    at Proxy.<anonymous
s> (D:\FizzBash\TheWande
erer\node_modules\@testi
ing-library\react\dist\a
act-compat.js:47:25)    
    at D:\FizzBash\TheW
Wanderer\src\tests\react
t-sound-integration.test
t.tsx:659:11
    at Proxy.assertThro
ows (file:///D:/FizzBash
h/TheWanderer/node_modul
les/chai/chai.js:2787:5)

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Er
rror Handling Integratio
on > should recover from
m temporary errors      
Autoplay not allowed - 
 user interaction will b
be required to play audi
io

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Er
rror Handling Integratio
on > should recover from
m temporary errors      
Failed to play sound te
est-sound: Error: Tempor
rary failure
    at Object.<anonymou
us> (D:\FizzBash\TheWand
derer\src\tests\react-so
ound-integration.test.ts
sx:699:19)
    at Object.mockCall 
 (file:///D:/FizzBash/Th
heWanderer/node_modules/
/@vitest/spy/dist/index.
.js:96:15)
    at Object.spy [as p
playSound] (file:///D:/F
FizzBash/TheWanderer/nod
de_modules/tinyspy/dist/
/index.js:47:103)       
    at Object.playSound
d (D:\FizzBash\TheWander
rer\src\audio\hooks\use-
-sound.ts:92:26)        
    at D:\FizzBash\TheW
Wanderer\src\tests\react
t-sound-integration.test
t.tsx:714:26
    at D:\FizzBash\TheW
Wanderer\node_modules\@t
testing-library\react\di
ist\act-compat.js:48:24 
    at process.env.NODE
E_ENV.exports.act (D:\Fi
izzBash\TheWanderer\node
e_modules\react\cjs\reac
ct.development.js:789:22
2)
    at Proxy.<anonymous
s> (D:\FizzBash\TheWande
erer\node_modules\@testi
ing-library\react\dist\a
act-compat.js:47:25)    
    at D:\FizzBash\TheW
Wanderer\src\tests\react
t-sound-integration.test
t.tsx:713:9
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
20

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Er
rror Handling Integratio
on > should recover from
m temporary errors      
Audio manager not initi
ialized


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 18/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 175 passed 
 (274)
   Start at 18:58:23   
   Duration 4.17s      
                       
                       
                       
                       
                       
                       
                       
                       
                       
                       
                       
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain consistent performance across operations
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 18/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 175 passed 
 (274)
   Start at 18:58:23   
   Duration 4.17s      
stderr | src/tests/react-sound-integration.test.tsx > React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Memory Management Integration > should manage audio manager lifecycle properly
Autoplay not allowed - user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/audio-settings-integrat
tion.test.tsx 6/6       
 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 12
2/21
 ❯ src/tests/audio-hook
ks.test.tsx 16/16       
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/asse
et-loader.test.ts 16/16 
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/game-state
e-sound-transitions.test
t.ts 7/7
 ❯ src/tests/GameState-
-sound-integration.test.
.ts 9/9
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 18/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 15/20

 Test Files 7 passed (2
26)
      Tests 175 passed 
 (274)
   Start at 18:58:23   
   Duration 4.17s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain consistent performance across operations
Asset loading complete: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Performance Regressio
on Detection > should ma
aintain consistent perfo
ormance across operation
ns
Preloaded 9 sounds     


 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 13
3/21
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 19/20

 Test Files 8 passed (2
26)
      Tests 188 passed 
 (274)
   Start at 18:58:23   
   Duration 4.44s      
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain consistent performance across operations
High performance variability detected: ratio=22.94, avg=0.50ms, min=0.21ms, max=4.93ms      

stderr | src/tests/reac
ct-sound-integration.tes
st.tsx > React Sound Sys
stem Integration Tests >
> 2. Integration Tests f
for React Hooks and Comp
ponent Interactions > Me
emory Management Integra
ation > should handle mu
ultiple component instan
nces efficiently        
Autoplay not allowed - 
 user interaction will b
be required to play audi
io
Autoplay not allowed - 
 user interaction will b
be required to play audi
io
Autoplay not allowed - 
 user interaction will b
be required to play audi
io


 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 13
3/21
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 19/20

 Test Files 8 passed (2
26)
      Tests 188 passed 
 (274)
   Start at 18:58:23   
   Duration 4.44s      
 ✓ src/tests/react-sound-integration.test.tsx (26 tests) 1311ms      
   ✓ React Sound System Integration Tests > 2. Integration Tests for React Hooks and Component Interactions > Component Integration with Sound System > should trigger sounds on user interactions  314ms      
stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Performance Monitorin
ng and Metrics > should 
 provide performance met
trics for monitoring    
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Performance Monitorin
ng and Metrics > should 
 provide performance met
trics for monitoring    
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Performance Monitorin
ng and Metrics > should 
 provide performance met
trics for monitoring    
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Performance Monitorin
ng and Metrics > should 
 track performance trend
ds over time
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Performance Monitorin
ng and Metrics > should 
 track performance trend
ds over time
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Performance Monitorin
ng and Metrics > should 
 track performance trend
ds over time
Preloaded 9 sounds     


 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 13
3/21
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 19/20

 Test Files 8 passed (2
26)
      Tests 188 passed 
 (274)
   Start at 18:58:23   
   Duration 4.44s      
ode (vitest 8) ✓ src/tests/sound-system-performance.test.ts (20 tests) 1932ms      
   ✓ 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently  432ms

 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 15
5/21
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 191 passed 
 (274)
   Start at 18:58:23   
   Duration 4.66s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load sound PL
LAYER_WALK: Error: Netwo
ork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load PLAYER_D
DIG from /sounds/player/
/dig.mp3: Error: Network
k error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load sound PL
LAYER_DIG: Error: Networ
rk error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load BOULDER_
_MOVE from /sounds/bould
der/Whoosh.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load sound BO
OULDER_MOVE: Error: Netw
work error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load ARROW_MO
OVE from /sounds/arrow/t
twang.mp3: Error: Networ
rk error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load sound AR
RROW_MOVE: Error: Networ
rk error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load COLLISIO
ON_THUD from /sounds/arr
row/thud.mp3: Error: Net
twork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load sound CO
OLLISION_THUD: Error: Ne
etwork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load DEATH_SO
OUND from /sounds/player
r/death.mp3: Error: Netw
work error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load sound DE
EATH_SOUND: Error: Netwo
ork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load VICTORY_
_SOUND from /sounds/envi
ironment/door-slam.mp3: 
 Error: Network error   
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:      222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load DOOR_SLA
AM from /sounds/environm
ment/door-slam.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load sound VI
ICTORY_SOUND: Error: Net
twork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load sound DO
OOR_SLAM: Error: Network
k error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load DIAMOND_
_COLLECT from /sounds/di
iamond/collect.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle p
preload errors gracefull
ly
Failed to load sound DI
IAMOND_COLLECT: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:222:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 15
5/21
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 191 passed 
 (274)
   Start at 18:58:23   
   Duration 4.66s      
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Asset loading complete: 0/9 loaded, 9 failed  

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle p
preload errors gracefull
ly
Preloaded 0 sounds     

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should play sou
und with default options
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should play sou
und with custom options 
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should not play
y sound when muted      
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should handle m
missing sound buffer gra
acefully
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > WebAudioMa
anager > should cleanup 
 resources properly     
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 15
5/21
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 191 passed 
 (274)
   Start at 18:58:23   
   Duration 4.66s      












stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle audio context creation failure
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed
    at new global.AudioContext (D:\FizzBash\TheWanderer\src\tests\aud
dio-manager.test.ts:300:
:27)
    at WebAudioManager.
.initializeAudioContext 
 (D:\FizzBash\TheWandere
er\src\audio\managers\au
udio-manager.ts:97:39)  
    at new WebAudioMana
ager (D:\FizzBash\TheWan
nderer\src\audio\manager
rs\audio-manager.ts:80:1
14)
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:304:29
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)


 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 15
5/21
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 191 passed 
 (274)
   Start at 18:58:23   
   Duration 4.66s      
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should initialize with HTML5 Audio support
HTML5 Audio initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should handle
e muted state correctly 
HTML5 Audio initialized
d successfully

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > HTML5Audio
oManager > should preloa
ad sounds using HTML5 Au
udio
HTML5 Audio initialized
d successfully


 ❯ src/audio/__tests__/
/error-handling.test.ts 
 23/23
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 15
5/21
 ❯ src/tests/audio-mana
ager.test.ts 5/27       
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 20/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 191 passed 
 (274)
   Start at 18:58:23   
   Duration 4.66s      
ode (vitest 7)stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio
HTML5 Audio preloaded 9/9 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should play s
sound with HTML5 Audio  
HTML5 Audio initialized
d successfully


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should play sound with HTML5 Audio  
Sound asset not found for ID: test_sound      


 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should not play sound when muted    
HTML5 Audio initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should cleanup audio elements       
HTML5 Audio initialized
d successfully


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should cleanup audio elements       
Error cleaning up audio element: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:384:21
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > SilentAudi
ioManager > should initi
ialize in silent mode   
No audio support detect
ted, using silent mode  

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > SilentAudi
ioManager > should handl
le all operations silent
tly
No audio support detect
ted, using silent mode  


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stdout | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create WebAudioManager when Web Audio API is supported
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > createAudi
ioManager factory > shou
uld create HTML5AudioMan
nager when only HTML5 Au
udio is supported       
HTML5 Audio initialized
d successfully


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported       
Web Audio API not supported, using HTML5 Audio fallback

stderr | src/tests/audio-manager.test.ts > Aud
dio Manager > createAudi
ioManager factory > shou
uld create SilentAudioMa
anager when no audio sup
pport is available      
No audio support detect
ted, using silent mode  
No audio support detect
ted, using silent mode  


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Retry 1/3 for /sounds/p
player/dig.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Retry 1/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Retry 1/3 for /sounds/a
arrow/twang.mp3: Error: 
 Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Retry 1/3 for /sounds/a
arrow/thud.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Retry 1/3 for /sounds/p
player/death.mp3: Error:
: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Retry 1/3 for /sounds/e
environment/door-slam.mp
p3: Error: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Retry 1/3 for /sounds/d
diamond/collect.mp3: Err
ror: Network error      
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load PLAYER_W
WALK from /sounds/player
r/walk.mp3: Error: Netwo
ork error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load sound PL
LAYER_WALK: Error: Netwo
ork error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load PLAYER_D
DIG from /sounds/player/
/dig.mp3: Error: Network
k error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load sound PL
LAYER_DIG: Error: Networ
rk error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load BOULDER_
_MOVE from /sounds/bould
der/Whoosh.mp3: Error: N
Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load sound BO
OULDER_MOVE: Error: Netw
work error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load ARROW_MO
OVE from /sounds/arrow/t
twang.mp3: Error: Networ
rk error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load sound AR
RROW_MOVE: Error: Networ
rk error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load COLLISIO
ON_THUD from /sounds/arr
row/thud.mp3: Error: Net
twork error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load sound CO
OLLISION_THUD: Error: Ne
etwork error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load DEATH_SO
OUND from /sounds/player
r/death.mp3: Error: Netw
work error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load sound DE
EATH_SOUND: Error: Netwo
ork error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load VICTORY_
_SOUND from /sounds/envi
ironment/door-slam.mp3: 
 Error: Network error   
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)
Failed to load DOOR_SLA
AM from /sounds/environm
ment/door-slam.mp3: Erro
or: Network error       
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)
Failed to load sound VI
ICTORY_SOUND: Error: Net
twork error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)
Failed to load sound DO
OOR_SLAM: Error: Network
k error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load DIAMOND_
_COLLECT from /sounds/di
iamond/collect.mp3: Erro
or: Network error       
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Failed to load sound DI
IAMOND_COLLECT: Error: N
Network error
    at Timeout._onTimeo
out (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:201:28)
    at listOnTimeout (n
node:internal/timers:594
4:17)
    at processTimers (n
node:internal/timers:529
9:7)


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
                       
                       
                       
                       
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked network failure
es during preloading    
Preloaded 0 sounds     

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
Retry 1/3 for /sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 1/3 for /sounds/p
player/dig.mp3: Error: D
Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 1/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Decode failed       
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 1/3 for /sounds/a
arrow/twang.mp3: Error: 
 Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 1/3 for /sounds/a
arrow/thud.mp3: Error: D
Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 1/3 for /sounds/p
player/death.mp3: Error:
: Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 1/3 for /sounds/e
environment/door-slam.mp
p3: Error: Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 1/3 for /sounds/d
diamond/collect.mp3: Err
ror: Decode failed      
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/app-
-sound-integration.test.
.tsx > App Sound Integra
ation > Error Recovery >
> should continue workin
ng when sound playback f
fails
Failed to emit sound ev
vent: Error: Sound playb
back failed
    at D:\FizzBash\TheW
Wanderer\src\tests\app-s
sound-integration.test.t
tsx:493:23
    at mockCall (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/spy/dist/index.js:96:1
15)
    at spy (file:///D:/
/FizzBash/TheWanderer/no
ode_modules/tinyspy/dist
t/index.js:47:103)      
    at D:\FizzBash\TheW
Wanderer\src\App.tsx:51:
:7
    at emit (D:\FizzBas
sh\TheWanderer\src\audio
o\events\sound-event-emi
itter.ts:25:13)
    at Array.forEach (<
<anonymous>)
    at Object.emitMulti
iple (D:\FizzBash\TheWan
nderer\src\audio\events\
\sound-event-emitter.ts:
:32:16)
    at emitSoundEvents 
 (D:\FizzBash\TheWandere
er\src\audio\events\soun
nd-event-emitter.ts:66:1
13)
    at movePlayer (D:\F
FizzBash\TheWanderer\src
c\GameState.ts:150:7)   
    at Object.movePlaye
er (D:\FizzBash\TheWande
erer\src\GameState.ts:19
91:22)
Failed to emit sound ev
vent: Error: Sound playb
back failed
    at D:\FizzBash\TheW
Wanderer\src\tests\app-s
sound-integration.test.t
tsx:493:23
    at mockCall (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/spy/dist/index.js:96:1
15)
    at spy (file:///D:/
/FizzBash/TheWanderer/no
ode_modules/tinyspy/dist
t/index.js:47:103)      
    at D:\FizzBash\TheW
Wanderer\src\App.tsx:51:
:7
    at emit (D:\FizzBas
sh\TheWanderer\src\audio
o\events\sound-event-emi
itter.ts:25:13)
    at Array.forEach (<
<anonymous>)
    at Object.emitMulti
iple (D:\FizzBash\TheWan
nderer\src\audio\events\
\sound-event-emitter.ts:
:32:16)
    at emitSoundEvents 
 (D:\FizzBash\TheWandere
er\src\audio\events\soun
nd-event-emitter.ts:66:1
13)
    at movePlayer (D:\F
FizzBash\TheWanderer\src
c\GameState.ts:150:7)   
    at Object.movePlaye
er (D:\FizzBash\TheWande
erer\src\GameState.ts:19
91:22)
Failed to emit sound ev
vent: Error: Sound playb
back failed
    at D:\FizzBash\TheW
Wanderer\src\tests\app-s
sound-integration.test.t
tsx:493:23
    at mockCall (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/spy/dist/index.js:96:1
15)
    at spy (file:///D:/
/FizzBash/TheWanderer/no
ode_modules/tinyspy/dist
t/index.js:47:103)      
    at D:\FizzBash\TheW
Wanderer\src\App.tsx:51:
:7
    at emit (D:\FizzBas
sh\TheWanderer\src\audio
o\events\sound-event-emi
itter.ts:25:13)
    at Array.forEach (<
<anonymous>)
    at Object.emitMulti
iple (D:\FizzBash\TheWan
nderer\src\audio\events\
\sound-event-emitter.ts:
:32:16)
    at emitSoundEvents 
 (D:\FizzBash\TheWandere
er\src\audio\events\soun
nd-event-emitter.ts:66:1
13)
    at movePlayer (D:\F
FizzBash\TheWanderer\src
c\GameState.ts:150:7)   
    at Object.movePlaye
er (D:\FizzBash\TheWande
erer\src\GameState.ts:19
91:22)
Failed to emit sound ev
vent: Error: Sound playb
back failed
    at D:\FizzBash\TheW
Wanderer\src\tests\app-s
sound-integration.test.t
tsx:493:23
    at mockCall (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/spy/dist/index.js:96:1
15)
    at spy (file:///D:/
/FizzBash/TheWanderer/no
ode_modules/tinyspy/dist
t/index.js:47:103)      
    at D:\FizzBash\TheW
Wanderer\src\App.tsx:51:
:7
    at emit (D:\FizzBas
sh\TheWanderer\src\audio
o\events\sound-event-emi
itter.ts:25:13)
    at Array.forEach (<
<anonymous>)
    at Object.emitMulti
iple (D:\FizzBash\TheWan
nderer\src\audio\events\
\sound-event-emitter.ts:
:32:16)
    at emitSoundEvents 
 (D:\FizzBash\TheWandere
er\src\audio\events\soun
nd-event-emitter.ts:66:1
13)
    at movePlayer (D:\F
FizzBash\TheWanderer\src
c\GameState.ts:150:7)   
    at Object.movePlaye
er (D:\FizzBash\TheWande
erer\src\GameState.ts:19
91:22)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load PLAYER_W
WALK from /sounds/player
r/walk.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load sound PL
LAYER_WALK: Error: Netwo
ork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load PLAYER_D
DIG from /sounds/player/
/dig.mp3: Error: Network
k error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load sound PL
LAYER_DIG: Error: Networ
rk error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load BOULDER_
_MOVE from /sounds/bould
der/Whoosh.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load sound BO
OULDER_MOVE: Error: Netw
work error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@v     itest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load ARROW_MO
OVE from /sounds/arrow/t
twang.mp3: Error: Networ
rk error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load sound AR
RROW_MOVE: Error: Networ
rk error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load COLLISIO
ON_THUD from /sounds/arr
row/thud.mp3: Error: Net
twork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load sound CO
OLLISION_THUD: Error: Ne
etwork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load DEATH_SO
OUND from /sounds/player
r/death.mp3: Error: Netw
work error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load sound DE
EATH_SOUND: Error: Netwo
ork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load VICTORY_
_SOUND from /sounds/envi
ironment/door-slam.mp3: 
 Error: Network error   
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load DOOR_SLA
AM from /sounds/environm
ment/door-slam.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load sound VI
ICTORY_SOUND: Error: Net
twork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load sound DO
OOR_SLAM: Error: Network
k error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load DIAMOND_
_COLLECT from /sounds/di
iamond/collect.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Failed to load sound DI
IAMOND_COLLECT: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:160:45        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at processTicksAndR
Rejections (node:interna
al/process/task_queues:1
105:5)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Asset loading complete: 0/9 loaded, 9 failed  

stdout | src/tests/audio/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should handle l
loading failures gracefu
ully
Preloaded 0 sounds     

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > enhanced prelo
oading > should skip pre
eloading in fallback mod
de
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode
Audio manager in fallback mode, skipping preload


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report 
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > optimization r
reporting > should provi
ide optimization report 
Asset loading complete:
: 9/9 loaded, 0 failed  


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 16
6/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 [queued]
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 4/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/react-soun
nd-integration.test.tsx 
 26/26
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 20/20

 Test Files 9 passed (2
26)
      Tests 211 passed 
 (274)
   Start at 18:58:23   
   Duration 4.88s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation 
Attempting to reinitialize audio context      
Initialized gain node pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 10 nodes      
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 10 nodes      
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 10 nodes      
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 10 nodes      
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 10 nodes      
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 10 nodes      
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 10 nodes      
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Attempting to reinitial
lize audio context      
Initialized gain node p
pool with 10 nodes      
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > optimization r
reporting > should provi
ide optimization report 
Preloaded 9 sounds     

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > optimization r
reporting > should handl
le empty buffer set     
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > loading state 
 management > should tra
ack loading state correc
ctly
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > loading state 
 management > should tra
ack loading state correc
ctly
Asset loading complete:
: 9/9 loaded, 0 failed  


 ❯ src/audio/__tests__/
/audio-error-handling.te
est.ts [queued]
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 21
1/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 0/28
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 7/23
 ❯ src/tests/audio/hook
ks/use-audio-settings.te
est.ts [queued]
 ❯ src/tests/collision-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-even
nt-integration.test.ts [
[queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 10 passed (
(26)
      Tests 219 passed 
 (302)
   Start at 18:58:23   
   Duration 5.20s      
stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > should handle audio reset errors gracefully  
Failed to reset audio system: Error: Reset failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:559:52
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Retry 2/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Decode failed       
    at E2EMockAudioCont
text.<anonymous> (D:\Fiz
zzBash\TheWanderer\src\t
tests\sound-system-e2e.t
test.ts:585:43)
    at E2EMockAudioCont
text.mockCall (file:///D
D:/FizzBash/TheWanderer/
/node_modules/@vitest/sp
py/dist/index.js:96:15) 
    at E2EMockAudioCont
text.spy [as decodeAudio
oData] (file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/tinyspy/dist/inde
ex.js:47:103)
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:176
6:51
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)


 ❯ src/audio/__tests__/
/audio-error-handling.te
est.ts [queued]
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 21
1/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 0/28
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 7/23
 ❯ src/tests/audio/hook
ks/use-audio-settings.te
est.ts [queued]
 ❯ src/tests/collision-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-even
nt-integration.test.ts [
[queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 10 passed (
(26)
      Tests 219 passed 
 (302)
   Start at 18:58:23   
   Duration 5.20s      
 ✓ src/tests/app-sound-integration.test.tsx (21 tests) 2238ms        
   ✓ App Sound Integration > Performance and Responsiveness > should not block user input during sound playback  543ms
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioM
Manager > loading state 
 management > should tra
ack loading state correc
ctly
Preloaded 9 sounds     


 ❯ src/audio/__tests__/
/audio-error-handling.te
est.ts [queued]
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 7/20       
 ❯ src/tests/app-sound-
-integration.test.tsx 21
1/21
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/audi
io-optimization.test.ts 
 0/28
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 7/23
 ❯ src/tests/audio/hook
ks/use-audio-settings.te
est.ts [queued]
 ❯ src/tests/collision-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-even
nt-integration.test.ts [
[queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 10 passed (
(26)
      Tests 219 passed 
 (302)
   Start at 18:58:23   
   Duration 5.20s      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        


 ❯ src/audio/__tests__/
/audio-error-handling.te
est.ts [queued]
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 9/20       
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/audio/hook
ks/use-audio-settings.te
est.ts [queued]
 ❯ src/tests/collision-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/physics-in
ntegration-demo.test.ts 
 [queued]
 ❯ src/tests/sound-even
nt-integration.test.ts [
[queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 11 passed (
(26)
      Tests 251 passed 
 (302)
   Start at 18:58:23   
   Duration 5.30s      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager
r.test.ts:218:44        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/audio/__tests__/
/audio-error-handling.te
est.ts [queued]
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 9/20       
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/audio/hook
ks/use-audio-settings.te
est.ts [queued]
 ❯ src/tests/collision-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/physics-in
ntegration-demo.test.ts 
 [queued]
 ❯ src/tests/sound-even
nt-integration.test.ts [
[queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 11 passed (
(26)
      Tests 251 passed 
 (302)
   Start at 18:58:23   
   Duration 5.30s      
 ✓ src/tests/audio/audio-optimization.test.ts (28 tests) 102ms       

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 9/20       
 ❯ src/tests/audio-manager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/audio/hook
ks/use-audio-settings.te
est.ts [queued]
 ❯ src/tests/collision-
-sound-integration.test.
.ts [queued]
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/physics-in
ntegration-demo.test.ts 
 [queued]
 ❯ src/tests/sound-even
nt-integration.test.ts [
[queued]
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 11 passed (
(26)
      Tests 251 passed 
 (302)
   Start at 18:58:23   
   Duration 5.30s      
ode (vitest 6)stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Audio Manager Factory > should create WebAudioManager when Web Audio API is supported  
Using Web Audio API    
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/audio/__te
ests__/audio-error-handl
ling.test.ts > Audio Err
ror Handling and Fallbac
cks > Audio Manager Fact
tory > should fall back 
 to HTML5AudioManager wh
hen Web Audio API is not
t supported
Web Audio API not suppo
orted, falling back to H
HTML5 Audio
HTML5 Audio initialized
d successfully

stdout | src/audio/__te
ests__/audio-error-handl
ling.test.ts > Audio Err
ror Handling and Fallbac
cks > Audio Manager Fact
tory > should fall back 
 to SilentAudioManager w
when no audio is support
ted
Silent Audio Manager in
nitialized - no audio wi
ill be played

stdout | src/audio/__te
ests__/audio-error-handl
ling.test.ts > Audio Err
ror Handling and Fallbac
cks > Audio Manager Fact
tory > should create spe
ecific audio manager whe
en requested
Silent Audio Manager in
nitialized - no audio wi
ill be played


 ❯ src/audio/__tests__/
/audio-error-handling.te
est.ts 0/10
 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/audio/hook
ks/use-audio-settings.te
est.ts [queued]
 ❯ src/tests/collision-
-sound-integration.test.
.ts 0/21
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/physics-in
ntegration-demo.test.ts 
 [queued]
 ❯ src/tests/sound-even
nt-integration.test.ts 1
1/37
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 11 passed (
(26)
      Tests 253 passed 
 (370)
   Start at 18:58:23   
   Duration 5.41s      
ode (vitest 15) ✓ src/tests/sound-event-integration.test.ts (37 tests) 31ms
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > SilentAudioManager > should implement all AudioManager methods without errors
Silent Audio Manager initialized - no audio wi
ill be played

stdout | src/audio/__te
ests__/audio-error-handl
ling.test.ts > Audio Err
ror Handling and Fallbac
cks > SilentAudioManager
r > should handle loadin
ng progress callbacks   
Silent Audio Manager in
nitialized - no audio wi
ill be played

 ✓ src/tests/collision-
-sound-integration.test.
.ts (21 tests) 24ms     
stdout | src/audio/__te
ests__/audio-error-handl
ling.test.ts > Audio Err
ror Handling and Fallbac
cks > Error Recovery > s
should handle errors dur
ring audio context creat
tion
Using Web Audio API    
Silent Audio Manager in
nitialized - no audio wi
ill be played

stdout | src/audio/__te
ests__/audio-error-handl
ling.test.ts > Audio Err
ror Handling and Fallbac
cks > Error Recovery > s
should handle errors dur
ring sound playback     
Silent Audio Manager in
nitialized - no audio wi
ill be played

stdout | src/audio/__te
ests__/audio-error-handl
ling.test.ts > Audio Err
ror Handling and Fallbac
cks > Error Recovery > s
should handle errors dur
ring preloading
Silent Audio Manager in
nitialized - no audio wi
ill be played

stdout | src/audio/__te
ests__/audio-error-handl
ling.test.ts > Audio Err
ror Handling and Fallbac
cks > Autoplay Policy Ha
andling > should detect 
 autoplay restrictions  
Using Web Audio API    
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

 ✓ src/audio/__tests__/
/audio-error-handling.te
est.ts (10 tests) 44ms  

 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/audio/hook
ks/use-audio-settings.te
est.ts 0/14
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/physics-in
ntegration-demo.test.ts 
 0/4
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 14 passed (
(26)
      Tests 320 passed 
 (388)
   Start at 18:58:23   
   Duration 5.51s      
ode (vitest 13)ode (vitest 14)stdout | src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonstrate boulder falling with sound events     
Initial maze state:    
Boulder at position (3,1), should fall to (3,2) then hit rock at (3,3)
After physics simulation:ode (vitest 10)
Sound events generated:
:
 1
Boulder successfully fe
ell from (3,1) to (3,2) 
 with sound event       

stdout | src/tests/phys
sics-integration-demo.te
est.ts > Physics Integra
ation Demo > should demo
onstrate boulder collisi
ion with sound events   
Boulder collision test:
Boulder at (1,1) surrou
unded by rocks - should 
 not move
Boulder correctly staye
ed in place - no movemen
nt sounds generated     

stdout | src/tests/phys
sics-integration-demo.te
est.ts > Physics Integra
ation Demo > should demo
onstrate game integratio
on with physics and soun
nd
Game integration test: 
Player moves right, bou
ulder at (2,2) should fa
all to (2,3)
Player moved successful
lly and boulder physics 
 was applied
Final player position: 
 { x: 2, y: 1 }
Boulder moved from (2,2
2) to (2,3)

stdout | src/tests/phys
sics-integration-demo.te
est.ts > Physics Integra
ation Demo > should demo
onstrate multiple boulde
er physics
Multiple boulder physic
cs test:
Two boulders at (1,1) a
and (3,1) should both fa
all
Both boulders fell succ
cessfully with sound eve
ents
Generated 2 movement so
ound events

 ✓ src/tests/physics-in
ntegration-demo.test.ts 
 (4 tests) 23ms
 ✓ src/tests/audio/hook
ks/use-audio-settings.te
est.ts (14 tests) 77ms  

 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/LargerMaze
e.test.ts [queued]      
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 16 passed (
(26)
      Tests 338 passed 
 (388)
   Start at 18:58:23   
   Duration 5.82s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Retry 2/3 for /sounds/p
player/dig.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Retry 2/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Retry 2/3 for /sounds/a
arrow/twang.mp3: Error: 
 Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Retry 2/3 for /sounds/a
arrow/thud.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Retry 2/3 for /sounds/p
player/death.mp3: Error:
: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Retry 2/3 for /sounds/e
environment/door-slam.mp
p3: Error: Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529ode (vitest 11)
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Retry 2/3 for /sounds/d
diamond/collect.mp3: Err
ror: Network error      
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/LargerMaze
e.test.ts [queued]      
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 16 passed (
(26)
      Tests 338 passed 
 (388)
   Start at 18:58:23   
   Duration 5.82s      
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
Retry 2/3 for /sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 2/3 for /sounds/p
player/dig.mp3: Error: D
Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 2/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Decode failed       
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 2/3 for /sounds/a
arrow/twang.mp3: Error: 
 Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 2/3 for /sounds/a
arrow/thud.mp3: Error: D
Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 2/3 for /sounds/p
player/death.mp3: Error:
: Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 2/3 for /sounds/e
environment/door-slam.mp
p3: Error: Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Retry 2/3 for /sounds/d
diamond/collect.mp3: Err
ror: Decode failed      
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/LargerMaze
e.test.ts 0/8
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 16 passed (
(26)
      Tests 338 passed 
 (396)
   Start at 18:58:23   
   Duration 5.93s      
 ✓ src/tests/LargerMaze.test.ts (8 tests) 11ms
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation 
Asset loading complete: 9/9 loaded, 0 failed  


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/GameState.
.test.ts [queued]       
 ❯ src/tests/LargerMaze
eUI.test.ts 0/12        
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 17 passed (
(26)
      Tests 346 passed 
 (408)
   Start at 18:58:23   
   Duration 6.15s      
ode (vitest 9)stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation 
Preloaded 9 sounds     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for
r Complete Sound Workflo
ows > Error Recovery Wor
rkflow > should handle a
audio decoding failures 
 and continue operation 
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        
Audio context state cha
anged to: closed        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/GameState.
.test.ts 0/10
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 18 passed (
(26)
      Tests 358 passed 
 (418)
   Start at 18:58:23   
   Duration 6.25s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation 
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/GameState.
.test.ts 0/10
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 18 passed (
(26)
      Tests 358 passed 
 (418)
   Start at 18:58:23   
   Duration 6.25s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle localStorage failures and continue operation   
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        
Audio context state cha
anged to: closed        

 ✓ src/tests/LargerMaze
eUI.test.ts (12 tests) 1
12ms

 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/GameState.
.test.ts 0/10
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 18 passed (
(26)
      Tests 358 passed 
 (418)
   Start at 18:58:23   
   Duration 6.25s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle localStorage failures and continue operation   
Failed to save muted preference: Error: Storage quota exceeded       
    at Object.<anonymous> (D:\FizzBash\TheWand
derer\src\tests\sound-sy
ystem-e2e.test.ts:605:27
7)
    at Object.mockCall 
 (file:///D:/FizzBash/Th
heWanderer/node_modules/
/@vitest/spy/dist/index.
.js:96:15)
    at Object.spy [as s
setItem] (file:///D:/Fiz
zzBash/TheWanderer/node_
_modules/tinyspy/dist/in
ndex.js:47:103)
    at WebAudioManager.
.saveMutedPreference (D:
:\FizzBash\TheWanderer\s
src\audio\managers\audio
o-manager.ts:590:26)    
    at WebAudioManager.
.setMuted (D:\FizzBash\T
TheWanderer\src\audio\ma
anagers\audio-manager.ts
s:916:14)
    at D:\FizzBash\TheW
Wanderer\src\tests\sound
d-system-e2e.test.ts:614
4:34
    at Proxy.assertThro
ows (file:///D:/FizzBash
h/TheWanderer/node_modul
les/chai/chai.js:2787:5)
    at Proxy.methodWrap
pper (file:///D:/FizzBas
sh/TheWanderer/node_modu
ules/chai/chai.js:1706:2
25)
    at Proxy.<anonymous
s> (file:///D:/FizzBash/
/TheWanderer/node_module
es/@vitest/expect/dist/i
index.js:1088:12)       
    at Proxy.overwritin
ngMethodWrapper (file://
//D:/FizzBash/TheWandere
er/node_modules/chai/cha
ai.js:1755:33)
Audio context closed un
nexpectedly
Audio context closed un
nexpectedly, attempting 
 to reinitialize        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/GameState.
.test.ts 0/10
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 18 passed (
(26)
      Tests 358 passed 
 (418)
   Start at 18:58:23   
   Duration 6.25s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow    
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should retry failed 
 loads
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Memory Management 
 Workflow > should prope
erly cleanup resources i
in complete workflow    
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Memory Management 
 Workflow > should prope
erly cleanup resources i
in complete workflow    
Preloaded 9 sounds     


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/GameState.
.test.ts 0/10
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 18 passed (
(26)
      Tests 358 passed 
 (418)
   Start at 18:58:23   
   Duration 6.25s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow    
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/GameState.
.test.ts 0/10
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 18 passed (
(26)
      Tests 358 passed 
 (418)
   Start at 18:58:23   
   Duration 6.25s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow    
Audio context state changed to: closed        

stdout | src/tests/sound-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Memory Management 
 Workflow > should handl
le memory pressure grace
efully
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Memory Management 
 Workflow > should handl
le memory pressure grace
efully
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Memory Management 
 Workflow > should handl
le memory pressure grace
efully
Preloaded 9 sounds     


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 9/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/GameState.
.test.ts 0/10
 ❯ src/tests/sound-syst
tem-e2e.test.ts 10/17   

 Test Files 18 passed (
(26)
      Tests 358 passed 
 (418)
   Start at 18:58:23   
   Duration 6.25s      
ode (vitest 8)stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-syst
tem-e2e.test.ts 13/17   

 Test Files 19 passed (
(26)
      Tests 372 passed 
 (418)
   Start at 18:58:23   
   Duration 6.35s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
Audio context state changed to: closed        

stdout | src/tests/audio/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should retry failed 
 loads
Preloaded 9 sounds     

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-syst
tem-e2e.test.ts 13/17   

 Test Files 19 passed (
(26)
      Tests 372 passed 
 (418)
   Start at 18:58:23   
   Duration 6.35s      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Retry 1/3 for /sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/p
player/dig.mp3: Error: I
Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Invalid audio       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/a
arrow/twang.mp3: Error: 
 Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/a
arrow/thud.mp3: Error: I
Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/p
player/death.mp3: Error:
: Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/e
environment/door-slam.mp
p3: Error: Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10     )
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Retry 1/3 for /sounds/d
diamond/collect.mp3: Err
ror: Invalid audio      
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-syst
tem-e2e.test.ts 13/17   

 Test Files 19 passed (
(26)
      Tests 372 passed 
 (418)
   Start at 18:58:23   
   Duration 6.35s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext      
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

 ✓ src/tests/GameState.
.test.ts (10 tests) 14ms
stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Cross-Browser Comp
patibility Workflow > sh
hould handle webkit pref
fixed AudioContext      
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Cross-Browser Comp
patibility Workflow > sh
hould handle webkit pref
fixed AudioContext      
Preloaded 9 sounds     


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-syst
tem-e2e.test.ts 13/17   

 Test Files 19 passed (
(26)
      Tests 372 passed 
 (418)
   Start at 18:58:23   
   Duration 6.35s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext      
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-syst
tem-e2e.test.ts 13/17   

 Test Files 19 passed (
(26)
      Tests 372 passed 
 (418)
   Start at 18:58:23   
   Duration 6.35s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext      
Audio context state changed to: closed        

stdout | src/tests/sound-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Cross-Browser Comp
patibility Workflow > sh
hould handle different a
audio format support    
HTML5 Audio initialized
d successfully


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-syst
tem-e2e.test.ts 13/17   

 Test Files 19 passed (
(26)
      Tests 372 passed 
 (418)
   Start at 18:58:23   
   Duration 6.35s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support    
Web Audio API not supported, using HTML5 Audio fallback


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-syst
tem-e2e.test.ts 13/17   

 Test Files 19 passed (
(26)
      Tests 372 passed 
 (418)
   Start at 18:58:23   
   Duration 6.35s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support    
HTML5 Audio preloaded 9/9 sounds


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-syst
tem-e2e.test.ts 13/17   

 Test Files 19 passed (
(26)
      Tests 372 passed 
 (418)
   Start at 18:58:23   
   Duration 6.35s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support    
Error cleaning up audio element: TypeError: audio.load is not a function
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\sound
d-system-e2e.test.ts:724
4:21
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
20
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\sound
d-system-e2e.test.ts:724
4:21
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
20
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\sound
d-system-e2e.test.ts:724
4:21
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
20
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\sound
d-system-e2e.test.ts:724
4:21
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
20
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\sound
d-system-e2e.test.ts:724
4:21
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
20
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\sound
d-system-e2e.test.ts:724
4:21
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
20
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\sound
d-system-e2e.test.ts:724
4:21
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
20
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\sound
d-system-e2e.test.ts:724
4:21
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
20
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\sound
d-system-e2e.test.ts:724
4:21
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
20


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-syst
tem-e2e.test.ts 13/17   

 Test Files 19 passed (
(26)
      Tests 372 passed 
 (418)
   Start at 18:58:23   
   Duration 6.35s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 10/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/sound-syst
tem-e2e.test.ts 13/17   

 Test Files 19 passed (
(26)
      Tests 372 passed 
 (418)
   Start at 18:58:23   
   Duration 6.35s      
ode (vitest 7)stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
Asset loading complete: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-e2e.test.ts > 
 4. End-to-End Tests for
r Complete Sound Workflo
ows > Integration with G
Game Events Workflow > s
should integrate with co
omplete game event seque
ence
Preloaded 9 sounds     


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 12/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/LargerMaze
eGameState.test.ts [queu
ued]
 ❯ src/tests/sound-syst
tem-infrastructure.test.
.ts 0/5

 Test Files 20 passed (
(26)
      Tests 378 passed 
 (423)
   Start at 18:58:23   
   Duration 6.58s      
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting 
 to reinitialize        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 12/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/LargerMaze
eGameState.test.ts [queu
ued]
 ❯ src/tests/sound-syst
tem-infrastructure.test.
.ts 0/5

 Test Files 20 passed (
(26)
      Tests 378 passed 
 (423)
   Start at 18:58:23   
   Duration 6.58s      
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
Audio context state changed to: closed        

 ✓ src/tests/sound-syst
tem-e2e.test.ts (17 test
ts) 3888ms
   ✓ 4. End-to-End Test
ts for Complete Sound Wo
orkflows > Error Recover
ry Workflow > should rec
cover from network failu
ures during preloading  
 1085ms
   ✓ 4. End-to-End Test
ts for Complete Sound Wo
orkflows > Error Recover
ry Workflow > should han
ndle audio decoding fail
lures and continue opera
ation  2179ms

 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 12/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36
 ❯ src/tests/LargerMaze
eGameState.test.ts [queu
ued]
 ❯ src/tests/sound-syst
tem-infrastructure.test.
.ts 0/5

 Test Files 20 passed (
(26)
      Tests 378 passed 
 (423)
   Start at 18:58:23   
   Duration 6.58s      
ode (vitest 5)ode (vitest 15) ✓ src/tests/sound-system-infrastructure.test.ts (5 tests) 10ms      
 ✓ src/tests/LargerMazeGameState.test.ts (9 tests) 9ms

 ❯ src/tests/app-sound-integration-comprehensive.test.tsx 14/20      
 ❯ src/tests/audio-manager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36

 Test Files 22 passed (
(26)
      Tests 394 passed 
 (432)
   Start at 18:58:23   
   Duration 6.79s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load sound PL
LAYER_WALK: Error: Netwo
ork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load PLAYER_D
DIG from /sounds/player/
/dig.mp3: Error: Network
k error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load sound PL
LAYER_DIG: Error: Networ
rk error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load BOULDER_
_MOVE from /sounds/bould
der/Whoosh.mp3: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load sound BO
OULDER_MOVE: Error: Netw
work error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load ARROW_MO
OVE from /sounds/arrow/t
twang.mp3: Error: Networ
rk error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load sound AR
RROW_MOVE: Error: Networ
rk error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load COLLISIO
ON_THUD from /sounds/arr
row/thud.mp3: Error: Net
twork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load sound CO
OLLISION_THUD: Error: Ne
etwork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load DEATH_SO
OUND from /sounds/player
r/death.mp3: Error: Netw
work error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load sound DE
EATH_SOUND: Error: Netwo
ork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load VICTORY_
_SOUND from /sounds/envi
ironment/door-slam.mp3: 
 Error: Network error   
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Failed to load DOOR_SLA
AM from /sounds/environm
ment/door-slam.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Failed to load sound VI
ICTORY_SOUND: Error: Net
twork error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Failed to load sound DO
OOR_SLAM: Error: Network
k error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load DIAMOND_
_COLLECT from /sounds/di
iamond/collect.mp3: Erro
or: Network error       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle fe
etch errors during prelo
oading
Failed to load sound DI
IAMOND_COLLECT: Error: N
Network error
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o-manager.test.ts:441:41
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 14/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36

 Test Files 22 passed (
(26)
      Tests 394 passed 
 (432)
   Start at 18:58:23   
   Duration 6.79s      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Asset loading complete: 0/9 loaded, 9 failed  

stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fe
etch errors during prelo
oading
Preloaded 0 sounds     

stdout | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 14/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36

 Test Files 22 passed (
(26)
      Tests 394 passed 
 (432)
   Start at 18:58:23   
   Duration 6.79s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for /sounds/player/walk.mp3: Error: HTTP 404: Not Found    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31
Retry 1/3 for /sounds/p
player/dig.mp3: Error: H
HTTP 404: Not Found     
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
Retry 1/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: HTTP 404: Not Found 
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
Retry 1/3 for /sounds/a
arrow/twang.mp3: Error: 
 HTTP 404: Not Found    
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
Retry 1/3 for /sounds/a
arrow/thud.mp3: Error: H
HTTP 404: Not Found     
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
Retry 1/3 for /sounds/p
player/death.mp3: Error:
: HTTP 404: Not Found   
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
Retry 1/3 for /sounds/e
environment/door-slam.mp
p3: Error: HTTP 404: Not
t Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
Retry 1/3 for /sounds/d
diamond/collect.mp3: Err
ror: HTTP 404: Not Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31

stderr | src/tests/app-
-sound-integration-compr
rehensive.test.tsx > App
p Sound Integration - Co
omprehensive Task 10 Tes
sts > Task 10.4: Ensure 
 sound system doesn't bl
lock game rendering or i
input > should handle so
ound errors without bloc
cking gameplay
Failed to emit sound ev
vent: Error: Sound playb
back failed
    at D:\FizzBash\TheW
Wanderer\src\tests\app-s
sound-integration-compre
ehensive.test.tsx:493:15
    at mockCall (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/spy/dist/index.js:96:1
15)
    at spy (file:///D:/
/FizzBash/TheWanderer/no
ode_modules/tinyspy/dist
t/index.js:47:103)      
    at D:\FizzBash\TheW
Wanderer\src\App.tsx:51:
:7
    at emit (D:\FizzBas
sh\TheWanderer\src\audio
o\events\sound-event-emi
itter.ts:25:13)
    at Array.forEach (<
<anonymous>)
    at Object.emitMulti
iple (D:\FizzBash\TheWan
nderer\src\audio\events\
\sound-event-emitter.ts:
:32:16)
    at emitSoundEvents 
 (D:\FizzBash\TheWandere
er\src\audio\events\soun
nd-event-emitter.ts:66:1
13)
    at movePlayer (D:\F
FizzBash\TheWanderer\src
c\GameState.ts:150:7)   
    at Object.movePlaye
er (D:\FizzBash\TheWande
erer\src\GameState.ts:19
91:22)
Failed to emit sound ev
vent: Error: Sound playb
back failed
    at D:\FizzBash\TheW
Wanderer\src\tests\app-s
sound-integration-compre
ehensive.test.tsx:493:15
    at mockCall (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/spy/dist/index.js:96:1
15)
    at spy (file:///D:/
/FizzBash/TheWanderer/no
ode_modules/tinyspy/dist
t/index.js:47:103)      
    at D:\FizzBash\TheW
Wanderer\src\App.tsx:51:
:7
    at emit (D:\FizzBas
sh\TheWanderer\src\audio
o\events\sound-event-emi
itter.ts:25:13)
    at Array.forEach (<
<anonymous>)
    at Object.emitMulti
iple (D:\FizzBash\TheWan
nderer\src\audio\events\
\sound-event-emitter.ts:
:32:16)
    at emitSoundEvents 
 (D:\FizzBash\TheWandere
er\src\audio\events\soun
nd-event-emitter.ts:66:1
13)
    at movePlayer (D:\F
FizzBash\TheWanderer\src
c\GameState.ts:150:7)   
    at Object.movePlaye
er (D:\FizzBash\TheWande
erer\src\GameState.ts:19
91:22)
Failed to emit sound ev
vent: Error: Sound playb
back failed
    at D:\FizzBash\TheW
Wanderer\src\tests\app-s
sound-integration-compre
ehensive.test.tsx:493:15
    at mockCall (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/spy/dist/index.js:96:1
15)
    at spy (file:///D:/
/FizzBash/TheWanderer/no
ode_modules/tinyspy/dist
t/index.js:47:103)      
    at D:\FizzBash\TheW
Wanderer\src\App.tsx:51:
:7
    at emit (D:\FizzBas
sh\TheWanderer\src\audio
o\events\sound-event-emi
itter.ts:25:13)
    at Array.forEach (<
<anonymous>)
    at Object.emitMulti
iple (D:\FizzBash\TheWan
nderer\src\audio\events\
\sound-event-emitter.ts:
:32:16)
    at emitSoundEvents 
 (D:\FizzBash\TheWandere
er\src\audio\events\soun
nd-event-emitter.ts:66:1
13)
    at movePlayer (D:\F
FizzBash\TheWanderer\src
c\GameState.ts:150:7)   
    at Object.movePlaye
er (D:\FizzBash\TheWande
erer\src\GameState.ts:19
91:22)
Failed to emit sound ev
vent: Error: Sound playb
back failed
    at D:\FizzBash\TheW
Wanderer\src\tests\app-s
sound-integration-compre
ehensive.test.tsx:493:15
    at mockCall (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/spy/dist/index.js:96:1
15)
    at spy (file:///D:/
/FizzBash/TheWanderer/no
ode_modules/tinyspy/dist
t/index.js:47:103)      
    at D:\FizzBash\TheW
Wanderer\src\App.tsx:51:
:7
    at emit (D:\FizzBas
sh\TheWanderer\src\audio
o\events\sound-event-emi
itter.ts:25:13)
    at Array.forEach (<
<anonymous>)
    at Object.emitMulti
iple (D:\FizzBash\TheWan
nderer\src\audio\events\
\sound-event-emitter.ts:
:32:16)
    at emitSoundEvents 
 (D:\FizzBash\TheWandere
er\src\audio\events\soun
nd-event-emitter.ts:66:1
13)
    at movePlayer (D:\F
FizzBash\TheWanderer\src
c\GameState.ts:150:7)   
    at Object.movePlaye
er (D:\FizzBash\TheWande
erer\src\GameState.ts:19
91:22)


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 14/20      
 ❯ src/tests/audio-mana
ager.test.ts 23/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 21/36

 Test Files 22 passed (
(26)
      Tests 394 passed 
 (432)
   Start at 18:58:23   
   Duration 6.79s      
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Decod
de failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load sound PL
LAYER_WALK: Error: Decod
de failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load PLAYER_D
DIG from /sounds/player/
/dig.mp3: Error: Decode 
 failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load sound PL
LAYER_DIG: Error: Decode
e failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load BOULDER_
_MOVE from /sounds/bould
der/Whoosh.mp3: Error: D
Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load sound BO
OULDER_MOVE: Error: Deco
ode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load ARROW_MO
OVE from /sounds/arrow/t
twang.mp3: Error: Decode
e failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load sound AR
RROW_MOVE: Error: Decode
e failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load COLLISIO
ON_THUD from /sounds/arr
row/thud.mp3: Error: Dec
code failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load sound CO
OLLISION_THUD: Error: De
ecode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load DEATH_SO
OUND from /sounds/player
r/death.mp3: Error: Deco
ode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load sound DE
EATH_SOUND: Error: Decod
de failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load VICTORY_
_SOUND from /sounds/envi
ironment/door-slam.mp3: 
 Error: Decode failed   
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load DOOR_SLA
AM from /sounds/environm
ment/door-slam.mp3: Erro
or: Decode failed       
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load sound VI
ICTORY_SOUND: Error: Dec
code failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load sound DO
OOR_SLAM: Error: Decode 
 failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load DIAMOND_
_COLLECT from /sounds/di
iamond/collect.mp3: Erro
or: Decode failed       
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Failed to load sound DI
IAMOND_COLLECT: Error: D
Decode failed
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:630:78
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 22/36

 Test Files 22 passed (
(26)
      Tests 397 passed 
 (432)
   Start at 18:58:23   
   Duration 7.01s      
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
Asset loading complete: 0/9 loaded, 9 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked audio decoding 
 failures
Preloaded 0 sounds     

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 3. Mock Implementat
tions for Web Audio API 
 Testing > Mock Error Sc
cenarios > should handle
e mocked localStorage fa
ailures
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 4. End-to-End Tests
s for Complete Sound Wor
rkflows > should complet
te full sound system lif
fecycle
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 4. End-to-End Tests
s for Complete Sound Wor
rkflows > should complet
te full sound system lif
fecycle
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 4. End-to-End Tests
s for Complete Sound Wor
rkflows > should complet
te full sound system lif
fecycle
Preloaded 9 sounds     


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 22/36

 Test Files 22 passed (
(26)
      Tests 397 passed 
 (432)
   Start at 18:58:23   
   Duration 7.01s      
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should complete full sound system lifecycle
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting 
 to reinitialize        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 22/36

 Test Files 22 passed (
(26)
      Tests 397 passed 
 (432)
   Start at 18:58:23   
   Duration 7.01s      
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should complete full sound system lifecycle
Audio context state changed to: closed        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 4. End-to-End Tests
s for Complete Sound Wor
rkflows > should handle 
 complex game scenario e
end-to-end
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 4. End-to-End Tests
s for Complete Sound Wor
rkflows > should handle 
 complex game scenario e
end-to-end
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 4. End-to-End Tests
s for Complete Sound Wor
rkflows > should handle 
 complex game scenario e
end-to-end
Preloaded 9 sounds     


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 22/36

 Test Files 22 passed (
(26)
      Tests 397 passed 
 (432)
   Start at 18:58:23   
   Duration 7.01s      
                       
                       
                       
                       
                       
                       
                       
                       
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should handle fallback scenarios end-to-end
Audio context error (INITIALIZATION_FAILED): Error: Web Audio not supported
    at fn.<anonymous> (
(D:\FizzBash\TheWanderer
r\src\tests\comprehensiv
ve-sound-system.test.ts:
:722:23)
    at new mockCall (fi
ile:///D:/FizzBash/TheWa
anderer/node_modules/@vi
itest/spy/dist/index.js:
:96:15)
    at new spy (file://
//D:/FizzBash/TheWandere
er/node_modules/tinyspy/
/dist/index.js:47:39)   
    at WebAudioManager.
.initializeAudioContext 
 (D:\FizzBash\TheWandere
er\src\audio\managers\au
udio-manager.ts:97:39)  
    at new WebAudioMana
ager (D:\FizzBash\TheWan
nderer\src\audio\manager
rs\audio-manager.ts:80:1
14)
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:728:29
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 22/36

 Test Files 22 passed (
(26)
      Tests 397 passed 
 (432)
   Start at 18:58:23   
   Duration 7.01s      
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should initialize quickly without blocking      
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould handle rapid sound
d playback without perfo
ormance degradation     
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould handle rapid sound
d playback without perfo
ormance degradation     
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould handle rapid sound
d playback without perfo
ormance degradation     
Preloaded 9 sounds     

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould preload sounds eff
ficiently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould preload sounds eff
ficiently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould preload sounds eff
ficiently
Preloaded 9 sounds     

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould handle memory mana
agement efficiently     
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould handle memory mana
agement efficiently     
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould handle memory mana
agement efficiently     
Preloaded 9 sounds     


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 22/36

 Test Files 22 passed (
(26)
      Tests 397 passed 
 (432)
   Start at 18:58:23   
   Duration 7.01s      
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle memory management efficiently     
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 22/36

 Test Files 22 passed (
(26)
      Tests 397 passed 
 (432)
   Start at 18:58:23   
   Duration 7.01s      
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle memory management efficiently     
Audio context state changed to: closed        


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 22/36

 Test Files 22 passed (
(26)
      Tests 397 passed 
 (432)
   Start at 18:58:23   
   Duration 7.01s      
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should not impact game responsiveness during audio operations
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould not impact game re
esponsiveness during aud
dio operations
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould not impact game re
esponsiveness during aud
dio operations
Preloaded 9 sounds     

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould handle concurrent 
 audio operations effici
iently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould handle concurrent 
 audio operations effici
iently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould handle concurrent 
 audio operations effici
iently
Preloaded 9 sounds     

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould maintain consisten
nt performance under str
ress
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould maintain consisten
nt performance under str
ress
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > 5. Performance Test
ts for Audio System > sh
hould maintain consisten
nt performance under str
ress
Preloaded 9 sounds     


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 33/36

 Test Files 22 passed (
(26)
      Tests 408 passed 
 (432)
   Start at 18:58:23   
   Duration 7.12s      
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > Error Handling and Edge Cases > should handle all error scenarios gracefully
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed
    at fn.<anonymous> (
(D:\FizzBash\TheWanderer
r\src\tests\comprehensiv
ve-sound-system.test.ts:
:924:31)
    at new mockCall (fi
ile:///D:/FizzBash/TheWa
anderer/node_modules/@vi
itest/spy/dist/index.js:
:96:15)
    at new spy (file://
//D:/FizzBash/TheWandere
er/node_modules/tinyspy/
/dist/index.js:47:39)   
    at WebAudioManager.
.initializeAudioContext 
 (D:\FizzBash\TheWandere
er\src\audio\managers\au
udio-manager.ts:97:39)  
    at new WebAudioMana
ager (D:\FizzBash\TheWan
nderer\src\audio\manager
rs\audio-manager.ts:80:1
14)
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:926:28
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:946:30
    at Proxy.assertThro
ows (file:///D:/FizzBash
h/TheWanderer/node_modul
les/chai/chai.js:2787:5)
    at Proxy.methodWrap
pper (file:///D:/FizzBas
sh/TheWanderer/node_modu
ules/chai/chai.js:1706:2
25)
    at Proxy.<anonymous
s> (file:///D:/FizzBash/
/TheWanderer/node_module
es/@vitest/expect/dist/i
index.js:1088:12)       
Audio context error (IN
NITIALIZATION_FAILED): E
Error: AudioContext fail
led
    at fn.<anonymous> (
(D:\FizzBash\TheWanderer
r\src\tests\comprehensiv
ve-sound-system.test.ts:
:924:31)
    at new mockCall (fi
ile:///D:/FizzBash/TheWa
anderer/node_modules/@vi
itest/spy/dist/index.js:
:96:15)
    at new spy (file://
//D:/FizzBash/TheWandere
er/node_modules/tinyspy/
/dist/index.js:47:39)   
    at WebAudioManager.
.initializeAudioContext 
 (D:\FizzBash\TheWandere
er\src\audio\managers\au
udio-manager.ts:97:39)  
    at new WebAudioMana
ager (D:\FizzBash\TheWan
nderer\src\audio\manager
rs\audio-manager.ts:80:1
14)
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:931:37
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:946:30
    at Proxy.assertThro
ows (file:///D:/FizzBash
h/TheWanderer/node_modul
les/chai/chai.js:2787:5)
    at Proxy.methodWrap
pper (file:///D:/FizzBas
sh/TheWanderer/node_modu
ules/chai/chai.js:1706:2
25)
    at Proxy.<anonymous
s> (file:///D:/FizzBash/
/TheWanderer/node_module
es/@vitest/expect/dist/i
index.js:1088:12)       
Audio context not avail
lable for preloading    
Audio context error (IN
NITIALIZATION_FAILED): E
Error: AudioContext fail
led
    at fn.<anonymous> (
(D:\FizzBash\TheWanderer
r\src\tests\comprehensiv
ve-sound-system.test.ts:
:924:31)
    at new mockCall (fi
ile:///D:/FizzBash/TheWa
anderer/node_modules/@vi
itest/spy/dist/index.js:
:96:15)
    at new spy (file://
//D:/FizzBash/TheWandere
er/node_modules/tinyspy/
/dist/index.js:47:39)   
    at WebAudioManager.
.initializeAudioContext 
 (D:\FizzBash\TheWandere
er\src\audio\managers\au
udio-manager.ts:97:39)  
    at new WebAudioMana
ager (D:\FizzBash\TheWan
nderer\src\audio\manager
rs\audio-manager.ts:80:1
14)
    at errorScenarios (
(D:\FizzBash\TheWanderer
r\src\tests\comprehensiv
ve-sound-system.test.ts:
:938:37)
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:946:30
    at Proxy.assertThro
ows (file:///D:/FizzBash
h/TheWanderer/node_modul
les/chai/chai.js:2787:5)
    at Proxy.methodWrap
pper (file:///D:/FizzBas
sh/TheWanderer/node_modu
ules/chai/chai.js:1706:2
25)
    at Proxy.<anonymous
s> (file:///D:/FizzBash/
/TheWanderer/node_module
es/@vitest/expect/dist/i
index.js:1088:12)       
Failed to save muted pr
reference: Error: Storag
ge failed
    at Object.<anonymou
us> (D:\FizzBash\TheWand
derer\src\tests\comprehe
ensive-sound-system.test
t.ts:936:31)
    at Object.mockCall 
 (file:///D:/FizzBash/Th
heWanderer/node_modules/
/@vitest/spy/dist/index.
.js:96:15)
    at Object.spy [as s
setItem] (file:///D:/Fiz
zzBash/TheWanderer/node_
_modules/tinyspy/dist/in
ndex.js:47:103)
    at WebAudioManager.
.saveMutedPreference (D:
:\FizzBash\TheWanderer\s
src\audio\managers\audio
o-manager.ts:590:26)    
    at WebAudioManager.
.setMuted (D:\FizzBash\T
TheWanderer\src\audio\ma
anagers\audio-manager.ts
s:916:14)
    at errorScenarios (
(D:\FizzBash\TheWanderer
r\src\tests\comprehensiv
ve-sound-system.test.ts:
:939:29)
    at D:\FizzBash\TheW
Wanderer\src\tests\compr
rehensive-sound-system.t
test.ts:946:30
    at Proxy.assertThro
ows (file:///D:/FizzBash
h/TheWanderer/node_modul
les/chai/chai.js:2787:5)
    at Proxy.methodWrap
pper (file:///D:/FizzBas
sh/TheWanderer/node_modu
ules/chai/chai.js:1706:2
25)
    at Proxy.<anonymous
s> (file:///D:/FizzBash/
/TheWanderer/node_module
es/@vitest/expect/dist/i
index.js:1088:12)       


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 33/36

 Test Files 22 passed (
(26)
      Tests 408 passed 
 (432)
   Start at 18:58:23   
   Duration 7.12s      
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > Error Handling and Edge Cases > should handle invalid sound IDs gracefully
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > Error Handling and 
 Edge Cases > should han
ndle invalid play option
ns gracefully
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > Error Handling and 
 Edge Cases > should han
ndle invalid play option
ns gracefully
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/comp
prehensive-sound-system.
.test.ts > Comprehensive
e Sound System Test Suit
te > Error Handling and 
 Edge Cases > should han
ndle invalid play option
ns gracefully
Preloaded 9 sounds     


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 15/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23
 ❯ src/tests/comprehens
sive-sound-system.test.t
ts 33/36

 Test Files 22 passed (
(26)
      Tests 408 passed 
 (432)
   Start at 18:58:23   
   Duration 7.12s      
 ✓ src/tests/comprehensive-sound-system.test.ts (36 tests) 4565ms    
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  2043ms 
   ✓ Comprehensive Sound System Test Suite > 3
3. Mock Implementations 
 for Web Audio API Testi
ing > Mock Error Scenari
ios > should handle mock
ked audio decoding failu
ures  2060ms

 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 17/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23

 Test Files 23 passed (
(26)
      Tests 413 passed 
 (432)
   Start at 18:58:23   
   Duration 7.33s      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Retry 2/3 for /sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Retry 2/3 for /sounds/p
player/dig.mp3: Error: I
Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Retry 2/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: Invalid audio       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Retry 2/3 for /sounds/a
arrow/twang.mp3: Error: 
 Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Retry 2/3 for /sounds/a
arrow/thud.mp3: Error: I
Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Retry 2/3 for /sounds/p
player/death.mp3: Error:
: Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Retry 2/3 for /sounds/e
environment/door-slam.mp
p3: Error: Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Retry 2/3 for /sounds/d
diamond/collect.mp3: Err
ror: Invalid audio      
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 17/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23

 Test Files 23 passed (
(26)
      Tests 413 passed 
 (432)
   Start at 18:58:23   
   Duration 7.33s      
ode (vitest 4)stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Audio context suspended for 5 seconds. Click anywhere to enable audio.


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 19/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23

 Test Files 23 passed (
(26)
      Tests 415 passed 
 (432)
   Start at 18:58:23   
   Duration 7.95s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 2/3 for /sounds/player/walk.mp3: Error: HTTP 404: Not Found    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Retry 2/3 for /sounds/p
player/dig.mp3: Error: H
HTTP 404: Not Found     
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Retry 2/3 for /sounds/b
boulder/Whoosh.mp3: Erro
or: HTTP 404: Not Found 
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Retry 2/3 for /sounds/a
arrow/twang.mp3: Error: 
 HTTP 404: Not Found    
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Retry 2/3 for /sounds/a
arrow/thud.mp3: Error: H
HTTP 404: Not Found     
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Retry 2/3 for /sounds/p
player/death.mp3: Error:
: HTTP 404: Not Found   
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Retry 2/3 for /sounds/e
environment/door-slam.mp
p3: Error: HTTP 404: Not
t Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Retry 2/3 for /sounds/d
diamond/collect.mp3: Err
ror: HTTP 404: Not Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31


 ❯ src/tests/app-sound-
-integration-comprehensi
ive.test.tsx 19/20      
 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23

 Test Files 23 passed (
(26)
      Tests 415 passed 
 (432)
   Start at 18:58:23   
   Duration 7.95s      
 ✓ src/tests/app-sound-integration-comprehensive.test.tsx (20 tests) 5058ms
   ✓ App Sound Integration - Comprehensive Task 10 Tests > Task 10.2: Connect keyboard event handlers to trigger appropriate sounds > should handle rapid keyboard input without blocking  1720ms
   ✓ App Sound Integrat
tion - Comprehensive Tas
sk 10 Tests > Task 10.4:
: Ensure sound system do
oesn't block game render
ring or input > should n
not block game rendering
g during sound operation
ns  1080ms
   ✓ App Sound Integrat
tion - Comprehensive Tas
sk 10 Tests > Task 10.4:
: Ensure sound system do
oesn't block game render
ring or input > should m
maintain consistent fram
me rate during audio ope
erations  352ms
   ✓ App Sound Integrat
tion - Comprehensive Tas
sk 10 Tests > Task 10.5:
: Write integration test
ts for complete sound sy
ystem functionality > sh
hould maintain performan
nce under stress conditi
ions  617ms

 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 10/23

 Test Files 24 passed (
(26)
      Tests 416 passed 
 (432)
   Start at 18:58:23   
   Duration 8.07s      
ode (vitest 3)stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load sound PL
LAYER_WALK: Error: Inval
lid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load PLAYER_D
DIG from /sounds/player/
/dig.mp3: Error: Invalid
d audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load sound PL
LAYER_DIG: Error: Invali
id audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load BOULDER_
_MOVE from /sounds/bould
der/Whoosh.mp3: Error: I
Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load sound BO
OULDER_MOVE: Error: Inva
alid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load ARROW_MO
OVE from /sounds/arrow/t
twang.mp3: Error: Invali
id audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load sound AR
RROW_MOVE: Error: Invali
id audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load COLLISIO
ON_THUD from /sounds/arr
row/thud.mp3: Error: Inv
valid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load sound CO
OLLISION_THUD: Error: In
nvalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load DEATH_SO
OUND from /sounds/player
r/death.mp3: Error: Inva
alid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load sound DE
EATH_SOUND: Error: Inval
lid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load VICTORY_
_SOUND from /sounds/envi
ironment/door-slam.mp3: 
 Error: Invalid audio   
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load DOOR_SLA
AM from /sounds/environm
ment/door-slam.mp3: Erro
or: Invalid audio       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load sound VI
ICTORY_SOUND: Error: Inv
valid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
Failed to load sound DO
OOR_SLAM: Error: Invalid
d audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load DIAMOND_
_COLLECT from /sounds/di
iamond/collect.mp3: Erro
or: Invalid audio       
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Failed to load sound DI
IAMOND_COLLECT: Error: I
Invalid audio
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:234:68        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 11/23

 Test Files 24 passed (
(26)
      Tests 417 passed 
 (432)
   Start at 18:58:23   
   Duration 8.38s      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Asset loading complete: 0/9 loaded, 9 failed  

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > error recovery
y > should handle decode
e errors
Preloaded 0 sounds     

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > format fallbac
ck > should try multiple
e formats
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 11/23

 Test Files 24 passed (
(26)
      Tests 417 passed 
 (432)
   Start at 18:58:23   
   Duration 8.38s      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Retry 1/3 for /sounds/player/walk.mp3: Error: 404
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager
r.test.ts:247:44        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:752:2
26
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runTest (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1574:12)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)
    at runSuite (file:/
///D:/FizzBash/TheWander
rer/node_modules/@vitest
t/runner/dist/chunk-hook
ks.js:1729:8)


 ❯ src/tests/audio-mana
ager.test.ts 24/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 11/23

 Test Files 24 passed (
(26)
      Tests 417 passed 
 (432)
   Start at 18:58:23   
   Duration 8.38s      
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load sound PL
LAYER_WALK: Error: HTTP 
 404: Not Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load PLAYER_D
DIG from /sounds/player/
/dig.mp3: Error: HTTP 40
04: Not Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load sound PL
LAYER_DIG: Error: HTTP 4
404: Not Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load BOULDER_
_MOVE from /sounds/bould
der/Whoosh.mp3: Error: H
HTTP 404: Not Found     
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load sound BO
OULDER_MOVE: Error: HTTP
P 404: Not Found        
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load ARROW_MO
OVE from /sounds/arrow/t
twang.mp3: Error: HTTP 4
404: Not Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load sound AR
RROW_MOVE: Error: HTTP 4
404: Not Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load COLLISIO
ON_THUD from /sounds/arr
row/thud.mp3: Error: HTT
TP 404: Not Found       
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load sound CO
OLLISION_THUD: Error: HT
TTP 404: Not Found      
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load DEATH_SO
OUND from /sounds/player
r/death.mp3: Error: HTTP
P 404: Not Found        
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load sound DE
EATH_SOUND: Error: HTTP 
 404: Not Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load VICTORY_
_SOUND from /sounds/envi
ironment/door-slam.mp3: 
 Error: HTTP 404: Not Fo
ound
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Failed to load DOOR_SLA
AM from /sounds/environm
ment/door-slam.mp3: Erro
or: HTTP 404: Not Found 
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Failed to load sound VI
ICTORY_SOUND: Error: HTT
TP 404: Not Found       
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)
Failed to load sound DO
OOR_SLAM: Error: HTTP 40
04: Not Found
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31
    at runNextTicks (no
ode:internal/process/tas
sk_queues:65:5)
    at listOnTimeout (n
node:internal/timers:555
5:9)
    at processTimers (n
node:internal/timers:529
9:7)

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load DIAMOND_
_COLLECT from /sounds/di
iamond/collect.mp3: Erro
or: HTTP 404: Not Found 
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31

stderr | src/tests/audi
io-manager.test.ts > Aud
dio Manager > Error Hand
dling > should handle HT
TTP errors during preloa
ading
Failed to load sound DI
IAMOND_COLLECT: Error: H
HTTP 404: Not Found     
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\asset-loader.ts:171
1:31


 ❯ src/tests/audio-mana
ager.test.ts 25/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 11/23

 Test Files 24 passed (
(26)
      Tests 418 passed 
 (432)
   Start at 18:58:23   
   Duration 8.82s      
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Asset loading complete: 0/9 loaded, 9 failed  

stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HT
TTP errors during preloa
ading
Preloaded 0 sounds     


 ❯ src/tests/audio-mana
ager.test.ts 25/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 11/23

 Test Files 24 passed (
(26)
      Tests 418 passed 
 (432)
   Start at 18:58:23   
   Duration 8.82s      

 ❯ src/tests/audio-manager.test.ts 25/27      
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 24 passed (26)
      Tests 418 passed (432)
   Start at 18:58:23   
   Duration 9.02s      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Asset loading complete: 9/9 loaded, 0 failed  

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Au
udio Manager > WebAudioM
Manager > format fallbac
ck > should try multiple
e formats
Preloaded 9 sounds     

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > HTML5Audi
ioManager > initializati
ion > should initialize 
 with HTML5 Audio suppor
rt
HTML5 Audio initialized
d successfully

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > HTML5Audi
ioManager > preloading w
with format optimization
n > should preload sound
ds with format filtering
HTML5 Audio initialized
d successfully

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > HTML5Audi
ioManager > preloading w
with format optimization
n > should preload sound
ds with format filtering
HTML5 Audio preloaded 9
9/9 sounds


 ❯ src/tests/audio-mana
ager.test.ts 25/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 12/23

 Test Files 24 passed (
(26)
      Tests 419 passed 
 (432)
   Start at 18:58:23   
   Duration 9.54s      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should preload sounds with format filtering
Error cleaning up audio element: TypeError: audio.load is not a function
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:272:21        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runHook (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1436:51)
    at callSuiteHook (f
file:///D:/FizzBash/TheW
Wanderer/node_modules/@v
vitest/runner/dist/chunk
k-hooks.js:1442:25)     
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:272:21        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runHook (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1436:51)
    at callSuiteHook (f
file:///D:/FizzBash/TheW
Wanderer/node_modules/@v
vitest/runner/dist/chunk
k-hooks.js:1442:25)     
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:272:21        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runHook (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1436:51)
    at callSuiteHook (f
file:///D:/FizzBash/TheW
Wanderer/node_modules/@v
vitest/runner/dist/chunk
k-hooks.js:1442:25)     
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:272:21        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runHook (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1436:51)
    at callSuiteHook (f
file:///D:/FizzBash/TheW
Wanderer/node_modules/@v
vitest/runner/dist/chunk
k-hooks.js:1442:25)     
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:272:21        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runHook (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1436:51)
    at callSuiteHook (f
file:///D:/FizzBash/TheW
Wanderer/node_modules/@v
vitest/runner/dist/chunk
k-hooks.js:1442:25)     
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:272:21        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runHook (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1436:51)
    at callSuiteHook (f
file:///D:/FizzBash/TheW
Wanderer/node_modules/@v
vitest/runner/dist/chunk
k-hooks.js:1442:25)     
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:272:21        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runHook (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1436:51)
    at callSuiteHook (f
file:///D:/FizzBash/TheW
Wanderer/node_modules/@v
vitest/runner/dist/chunk
k-hooks.js:1442:25)     
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:272:21        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runHook (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1436:51)
    at callSuiteHook (f
file:///D:/FizzBash/TheW
Wanderer/node_modules/@v
vitest/runner/dist/chunk
k-hooks.js:1442:25)     
Error cleaning up audio
o element: TypeError: au
udio.load is not a funct
tion
    at D:\FizzBash\TheW
Wanderer\src\audio\manag
gers\html5-audio-manager
r.ts:431:23
    at Map.forEach (<an
nonymous>)
    at HTML5AudioManage
er.cleanup (D:\FizzBash\
\TheWanderer\src\audio\m
managers\html5-audio-man
nager.ts:427:28)        
    at D:\FizzBash\TheW
Wanderer\src\tests\audio
o\enhanced-audio-manager
r.test.ts:272:21        
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:155:1
11
    at file:///D:/FizzB
Bash/TheWanderer/node_mo
odules/@vitest/runner/di
ist/chunk-hooks.js:1897:
:20
    at new Promise (<an
nonymous>)
    at runWithTimeout (
(file:///D:/FizzBash/The
eWanderer/node_modules/@
@vitest/runner/dist/chun
nk-hooks.js:1863:10)    
    at runHook (file://
//D:/FizzBash/TheWandere
er/node_modules/@vitest/
/runner/dist/chunk-hooks
s.js:1436:51)
    at callSuiteHook (f
file:///D:/FizzBash/TheW
Wanderer/node_modules/@v
vitest/runner/dist/chunk
k-hooks.js:1442:25)     


 ❯ src/tests/audio-mana
ager.test.ts 25/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 12/23

 Test Files 24 passed (
(26)
      Tests 419 passed 
 (432)
   Start at 18:58:23   
   Duration 9.54s      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats
HTML5 Audio initialized successfully


 ❯ src/tests/audio-mana
ager.test.ts 25/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 12/23

 Test Files 24 passed (
(26)
      Tests 419 passed 
 (432)
   Start at 18:58:23   
   Duration 9.54s      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio form
mat found for player_dig
Failed to create audio 
 element for player_dig 
No supported audio form
mat found for boulder_mo
ove
Failed to create audio 
 element for boulder_mov
ve
No supported audio form
mat found for arrow_move
Failed to create audio 
 element for arrow_move 
No supported audio form
mat found for collision_
_thud
Failed to create audio 
 element for collision_t
thud
No supported audio form
mat found for death_soun
nd
Failed to create audio 
 element for death_sound
No supported audio form
mat found for victory_so
ound
Failed to create audio 
 element for victory_sou
und
No supported audio form
mat found for door_slam 
Failed to create audio 
 element for door_slam  
No supported audio form
mat found for diamond_co
ollect
Failed to create audio 
 element for diamond_col
llect


 ❯ src/tests/audio-mana
ager.test.ts 25/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 12/23

 Test Files 24 passed (
(26)
      Tests 419 passed 
 (432)
   Start at 18:58:23   
   Duration 9.54s      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > HTML5Audi
ioManager > loading stat
te > should provide load
ding state
HTML5 Audio initialized
d successfully

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > HTML5Audi
ioManager > loading stat
te > should provide opti
imization report        
HTML5 Audio initialized
d successfully

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > HTML5Audi
ioManager > loading stat
te > should provide opti
imization report        
HTML5AudioManager repor
rt: {
  "optimized": 0,      
  "skipped": 0,        
  "totalSavings": 0,   
  "details": [],       
  "globalRecommendation
ns": [
    "Consider using Web
b Audio API for better p
performance",
    "HTML5 Audio has li
imited optimization capa
abilities"
  ]
}

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > createAud
dioManager factory > sho
ould create WebAudioMana
ager when Web Audio API 
 is available
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > createAud
dioManager factory > sho
ould create HTML5AudioMa
anager when only HTML5 A
Audio is available      
HTML5 Audio initialized
d successfully


 ❯ src/tests/audio-mana
ager.test.ts 25/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 12/23

 Test Files 24 passed (
(26)
      Tests 419 passed 
 (432)
   Start at 18:58:23   
   Duration 9.54s      
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is available      
Web Audio API not supported, using HTML5 Audio fallback

stderr | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > createAud
dioManager factory > sho
ould create SilentAudioM
Manager when no audio su
upport
No audio support detect
ted, using silent mode  
No audio support detect
ted, using silent mode  


 ❯ src/tests/audio-mana
ager.test.ts 25/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 12/23

 Test Files 24 passed (
(26)
      Tests 419 passed 
 (432)
   Start at 18:58:23   
   Duration 9.54s      
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > integrati
ion with existing functi
ionality > should mainta
ain existing playSound f
functionality
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > integrati
ion with existing functi
ionality > should mainta
ain existing playSound f
functionality
Preloaded 9 sounds     

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > integrati
ion with existing functi
ionality > should mainta
ain existing mute functi
ionality
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > integrati
ion with existing functi
ionality > should mainta
ain existing mute functi
ionality
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > integrati
ion with existing functi
ionality > should mainta
ain existing mute functi
ionality
Preloaded 9 sounds     


 ❯ src/tests/audio-mana
ager.test.ts 25/27      
 ❯ src/tests/audio/enha
anced-audio-manager.test
t.ts 12/23

 Test Files 24 passed (
(26)
      Tests 419 passed 
 (432)
   Start at 18:58:23   
   Duration 9.54s      
ode (vitest 2)stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing cleanup functionality
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > integrati
ion with existing functi
ionality > should mainta
ain existing cleanup fun
nctionality
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/audi
io/enhanced-audio-manage
er.test.ts > Enhanced Au
udio Manager > integrati
ion with existing functi
ionality > should mainta
ain existing cleanup fun
nctionality
Preloaded 9 sounds     

 ✓ src/tests/audio/enha
anced-audio-manager.test
t.ts (23 tests) 7026ms  
   ✓ Enhanced Audio Man
nager > WebAudioManager 
 > enhanced preloading >
> should handle loading 
 failures gracefully  20
038ms
   ✓ Enhanced Audio Man
nager > WebAudioManager 
 > error recovery > shou
uld retry failed loads  
 1113ms
   ✓ Enhanced Audio Man
nager > WebAudioManager 
 > error recovery > shou
uld handle decode errors
s
  2023ms
   ✓ Enhanced Audio Man
nager > WebAudioManager 
 > format fallback > sho
ould try multiple format
ts  1063ms

 ❯ src/tests/audio-mana
ager.test.ts 25/27      

 Test Files 25 passed (
(26)
      Tests 430 passed 
 (432)
   Start at 18:58:23   
   Duration 10.08s     
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle playback errors gracefully
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        


 ❯ src/tests/audio-mana
ager.test.ts 26/27      

 Test Files 25 passed (
(26)
      Tests 431 passed 
 (432)
   Start at 18:58:23   
   Duration 10.74s     
 ✓ src/tests/audio-manager.test.ts (27 tests) 8176ms
   ✓ Audio Manager > WebAudioManager > should handle preload errors gracefully  2039ms      
   ✓ Audio Manager > Error Handling > should handle fetch errors during preloading  2021ms  
   ✓ Audio Manager > Er
rror Handling > should h
handle HTTP errors durin
ng preloading  2018ms   
   ✓ Audio Manager > Er
rror Handling > should h
handle audio decoding er
rrors  2011ms

 Test Files  26 passed 
 (26)
      Tests  432 passed
d (432)
   Start at  18:58:23  
   Duration  10.83s (tr
ransform 2.36s, setup 5.
.88s, collect 6.75s, tes
sts 38.04s, environment 
 35.86s, prepare 5.50s) 

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
r
Let me run a more focused test to check if the sound system is working:

Command
npx vitest run src/tests/sound-system-performance.test.ts --reporter=verbose
npx vitest run src/tes
sts/sound-system-perform
mance.test.ts --reporter
r=verbose
:\Windows\System32\cmd.exe - npx  vitest run src/tests/sound-system-performance.test.ts --reporter=verbosepm exec vitest run src/tests/sound-system-performance.test.ts --reporter=verbose:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBas
sh/TheWanderer

ode (vitest 1)ode (vitest 3)ode (vitest 6)ode (vitest 7)ode (vitest 8)ode (vitest 10)ode (vitest 12)ode (vitest 15)
 ❯ src/tests/sound-syst
tem-performance.test.ts 
 [queued]

 Test Files 0 passed (1
1)
      Tests 0 passed (0
0)
   Start at 18:58:50   
   Duration 895ms      
(node:28496) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/sound-syst
tem-performance.test.ts 
 0/20

 Test Files 0 passed (1
1)
      Tests 0 passed (2
20)
   Start at 18:58:50   
   Duration 1.20s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Initialization Performance > should initialize WebAudioManager within performance budget  
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Initialization Perfor
rmance > should initiali
ize HTML5AudioManager wi
ithin performance budget
HTML5 Audio initialized
d successfully

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Initialization Perfor
rmance > should handle m
multiple manager instanc
ces efficiently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should preload soun
nds within performance b
budget
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should preload soun
nds within performance b
budget
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should preload soun
nds within performance b
budget
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        


 ❯ src/tests/sound-syst
tem-performance.test.ts 
 1/20

 Test Files 0 passed (1
1)
      Tests 1 passed (2
20)
   Start at 18:58:50   
   Duration 1.31s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
Asset loading complete: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should handle concu
urrent preloading effici
iently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should optimize net
twork requests during pr
reloading
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should optimize net
twork requests during pr
reloading
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Preloading Performanc
ce > should optimize net
twork requests during pr
reloading
Preloaded 9 sounds     


 ❯ src/tests/sound-syst
tem-performance.test.ts 
 5/20

 Test Files 0 passed (1
1)
      Tests 5 passed (2
20)
   Start at 18:58:50   
   Duration 1.42s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should play sounds with minimal latency
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should play sou
unds with minimal latenc
cy
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should play sou
unds with minimal latenc
cy
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should handle r
rapid sequential playbac
ck efficiently
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should handle r
rapid sequential playbac
ck efficiently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should handle r
rapid sequential playbac
ck efficiently
Preloaded 9 sounds     


 ❯ src/tests/sound-syst
tem-performance.test.ts 
 6/20

 Test Files 0 passed (1
1)
      Tests 6 passed (2
20)
   Start at 18:58:50   
   Duration 1.53s      
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
Initialized gain node pool with 5 nodes       
Web Audio API initialized successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should handle c
concurrent sound playbac
ck efficiently
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Sound Playback Perfor
rmance > should handle c
concurrent sound playbac
ck efficiently
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should manage memory ef
fficiently during intens
sive use
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should manage memory ef
fficiently during intens
sive use
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should manage memory ef
fficiently during intens
sive use
Preloaded 9 sounds     

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should prevent memory l
leaks during long-runnin
ng sessions
Initialized gain node p
pool with 5 nodes       
Web Audio API initializ
zed successfully        

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should prevent memory l
leaks during long-runnin
ng sessions
Asset loading complete:
: 9/9 loaded, 0 failed  

stdout | src/tests/soun
nd-system-performance.te
est.ts > 5. Performance 
 Tests for Audio System 
 > Memory Performance > 
 should prevent memory l
leaks during long-runnin
ng sessions
Preloaded 9 sounds     


 ❯ src/tests/sound-syst
tem-performance.test.ts 
 10/20

 Test Files 0 passed (1
1)
      Tests 10 passed (
(20)
   Start at 18:58:50   
   Duration 1.85s      


 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 0 passed (1)
      Tests 10 passed (20)
   Start at 18:58:50
   Duration 1.85s




stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
Asset loading complete: 9/9 loaded, 0 failedstdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > s
should handle sound event emission efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Event System Performance > s
should maintain performance under event system stress
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Event System Performance > s
should maintain performance under event system stress
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Event System Performance > s
should maintain performance under event system stress
Preloaded 9 sounds


 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 0 passed (1)
      Tests 11 passed (20)
   Start at 18:58:50
   Duration 2.18s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should cleanup resources efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should cleanup resources efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d cleanup resources efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/tests/sound-system-performance.test.ts 14/20

 Test Files 0 passed (1)
      Tests 14 passed (20)
   Start at 18:58:50
   Duration 2.28s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Cleanup Performance > should
d handle cleanup of multiple managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Performance Regression Detec
ction > should maintain consistent performance across operatio
ons
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Performance Regression Detec
ction > should maintain consistent performance across operatio
ons
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Performance Regression Detec
ction > should maintain consistent performance across operatio
ons
Preloaded 9 sounds


 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 0 passed (1)
      Tests 16 passed (20)
   Start at 18:58:50
   Duration 2.61s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should provide performance metrics for monitoring   
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should provide performance metrics for monitoring   
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Performance Monitoring and M
Metrics > should provide performance metrics for monitoring   
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Performance Monitoring and M
Metrics > should track performance trends over time
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Performance Monitoring and M
Metrics > should track performance trends over time
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Perf
formance Tests for Audio System > Performance Monitoring and M
Metrics > should track performance trends over time
Preloaded 9 sounds


 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 0 passed (1)
      Tests 20 passed (20)
   Start at 18:58:50
   Duration 2.81s
 ✓ src/tests/sound-system-performance.test.ts (20 tests) 1607ms
   ✓ 5. Performance Tests for Audio System (20)
     ✓ Initialization Performance (3)
       ✓ should initialize WebAudioManager within performance budget 6ms
       ✓ should initialize HTML5AudioManager within performance budget 1ms
       ✓ should handle multiple manager instances efficiently 8ms
     ✓ Preloading Performance (3)
       ✓ should preload sounds within performance budget 73ms
       ✓ should handle concurrent preloading efficiently 72ms
       ✓ should optimize network requests during preloading 7
76ms
     ✓ Sound Playback Performance (3)
       ✓ should play sounds with minimal latency 53ms        
       ✓ should handle rapid sequential playback efficiently 
 87ms
       ✓ should handle concurrent sound playback efficiently 
 93ms
     ✓ Memory Performance (2)
       ✓ should manage memory efficiently during intensive us
se 123ms
       ✓ should prevent memory leaks during long-running sess
sions 202ms
     ✓ Event System Performance (3)
       ✓ should handle sound event generation efficiently 12m
ms
       ✓ should handle sound event emission efficiently 81ms 
       ✓ should maintain performance under event system stres
ss 84ms
     ✓ Cleanup Performance (2)
       ✓ should cleanup resources efficiently 77ms
       ✓ should handle cleanup of multiple managers efficient
tly  312ms
     ✓ Performance Regression Detection (2)
       ✓ should maintain consistent performance across operat
tions 78ms
       ✓ should detect performance bottlenecks in audio opera
ations 15ms
     ✓ Performance Monitoring and Metrics (2)
       ✓ should provide performance metrics for monitoring 76
6ms
       ✓ should track performance trends over time 75ms      

 Test Files  1 passed (1)
      Tests  20 passed (20)
   Start at  18:58:50
   Duration  2.91s (transform 157ms, setup 96ms, collect 165m
ms, tests 1.61s, environment 568ms, prepare 153ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Session Too Long
Continue
Summarize and continue in a new session.


Revert


sound-config.ts






Claude Sonnet 4.0
Autopilot
