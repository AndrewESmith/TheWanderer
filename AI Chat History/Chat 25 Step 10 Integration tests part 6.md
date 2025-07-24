Execute Task: 10. In...

npm test -- src/test...

npm test -- src/test...

How do I fix the fol...

npm test -- src/test...

Execute task: 10. In...

New Session





Please run npm test -- --run --reporter=verbose and resolve failing tests.

Kiro
Including Steering Documents

typescript-standards.md
I'll run the tests and resolve any failing ones. Let me start by executing the test command.

Command
npm test -- --run --reporter=verbose
npm test -- --run
n --reporter=verbose
:\Windows\System32\cmd.exe - npm  test -- --run --reporter=verbosepm test --run --reporter=verbose
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run --
-reporter=verbose

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer     

ode (vitest 1)ode (vitest 2)ode (vitest 4)ode (vitest 9)ode (vitest 8)ode (vitest 10)ode (vitest 11)ode (vitest 15)
 Test Files 0 passed (21)
      Tests 0 passed (0)
   Start at 16:41:41
   Duration 928ms

 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]

 Test Files 0 passed (21)
      Tests 0 passed (0)
   Start at 16:41:41
   Duration 1.80s
(node:62336) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)        
(node:42416) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to sh
how where the warning was created)        
(node:25216) [DEP0040] DeprecationWarning
g: The `punycode` module is deprecated. Pl
lease use a userland alternative instead. 
(Use `node --trace-deprecation ...` to sh
how where the warning was created)        
(node:41404) [DEP0040] DeprecationWarning
g: The `punycode` module is deprecated. Pl
lease use a userland alternative instead. 
(Use `node --trace-deprecation ...` to sh
how where the warning was created)        
(node:36308) [DEP0040] DeprecationWarning
g: The `punycode` module is deprecated. Pl
lease use a userland alternative instead. 
(Use `node --trace-deprecation ...` to sh
how where the warning was created)        
(node:51596) [DEP0040] DeprecationWarning
g: The `punycode` module is deprecated. Pl
lease use a userland alternative instead. 
(Use `node --trace-deprecation ...` to sh
how where the warning was created)        

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts [queued]
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts [queue
ed]
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts [queued]

 Test Files 0 passed (21)
      Tests 0 passed (0)
   Start at 16:41:41
   Duration 1.90s
(node:18400) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)        
(node:18204) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)        
(node:44516) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)        
(node:37120) [DEP0040] DeprecationWarning
g: The `punycode` module is deprecated. Pl
lease use a userland alternative instead. 
(Use `node --trace-deprecation ...` to sh
how where the warning was created)        
(node:40936) [DEP0040] DeprecationWarning
g: The `punycode` module is deprecated. Pl
lease use a userland alternative instead. 
(Use `node --trace-deprecation ...` to sh
how where the warning was created)        
(node:40524) [DEP0040] DeprecationWarning
g: The `punycode` module is deprecated. Pl
lease use a userland alternative instead. 
(Use `node --trace-deprecation ...` to sh
how where the warning was created)        
(node:46680) [DEP0040] DeprecationWarning
g: The `punycode` module is deprecated. Pl
lease use a userland alternative instead. 
(Use `node --trace-deprecation ...` to sh
how where the warning was created)        

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts [queued]
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts [queued]
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts [queue
ed]
 ❯ src/tests/audio/asset-loader.test.ts [
[queued]
 ❯ src/tests/audio/audio-optimization.tes
st.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts [queued]
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions
s.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.
.test.ts [queued]
 ❯ src/tests/physics-integration-demo.tes
st.ts [queued]

 Test Files 0 passed (21)
      Tests 0 passed (0)
   Start at 16:41:41
   Duration 2.00s
(node:64684) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)        
(node:6700) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.  
(Use `node --trace-deprecation ...` to show where the warning was created)        

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts [queued]
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts [queue
ed]
 ❯ src/tests/audio/asset-loader.test.ts 0
0/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts [queued]
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions
s.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.
.test.ts [queued]
 ❯ src/tests/physics-integration-demo.tes
st.ts [queued]
 ❯ src/tests/sound-event-integration.test
t.ts [queued]

 Test Files 0 passed (21)
      Tests 0 passed (16)
   Start at 16:41:41
   Duration 2.41s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:116:40        
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.tes
st.ts > AssetLoader > loadAudioBuffer > sh
hould retry failed requests
Retry 1/2 for sounds/test.mp3: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\asset-loader.test.ts:132:40        
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 0/23
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts 0/27  
 ❯ src/tests/audio/asset-loader.test.ts 1
1/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions
s.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 0/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 0/4
 ❯ src/tests/sound-event-integration.test
t.ts 0/37

 Test Files 1 failed | 0 passed (21)     
      Tests 5 failed | 6 passed (184)    
   Start at 16:41:41
   Duration 2.51s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should initialize with Web Audio API support  
Web Audio API initialized successfully   

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support  
Web Audio API initialized successfully   

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspension        
Web Audio API initialized successfully   

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > initialization > shoul
ld handle audio context suspension        
Web Audio API initialized successfully   

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should preload sounds with progress track
king
Web Audio API initialized successfully   

stdout | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle muted state correctly
Web Audio API initialized successfully   

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should preload sounds with progress track
king
Preloaded 9 sounds

stdout | src/audio/__tests__/audio-error-
-handling.test.ts > Audio Error Handling a
and Fallbacks > Audio Manager Factory > sh
hould create WebAudioManager when Web Audi
io API is supported
Using Web Audio API

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should apply optimization during preloadi
ing
Web Audio API initialized successfully   

stdout | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld load muted preference from localStorage
Web Audio API initialized successfully   

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should apply optimization during preloadi
ing
Preloaded 9 sounds

stdout | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle localStorage errors gracefully  
Web Audio API initialized successfully   

stdout | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld preload sounds successfully
Web Audio API initialized successfully   

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Web Audio API initialized successfully   

stdout | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld preload sounds successfully
Preloaded 9 sounds

stdout | src/audio/__tests__/audio-error-
-handling.test.ts > Audio Error Handling a
and Fallbacks > Audio Manager Factory > sh
hould fall back to HTML5AudioManager when 
 Web Audio API is not supported
Web Audio API not supported, falling back
k to HTML5 Audio
HTML5 Audio initialized successfully     

stdout | src/audio/__tests__/audio-error-
-handling.test.ts > Audio Error Handling a
and Fallbacks > Audio Manager Factory > sh
hould fall back to SilentAudioManager when
n no audio is supported
Silent Audio Manager initialized - no aud
dio will be played

stdout | src/audio/__tests__/audio-error-
-handling.test.ts > Audio Error Handling a
and Fallbacks > Audio Manager Factory > sh
hould create specific audio manager when r
requested
Silent Audio Manager initialized - no aud
dio will be played

stdout | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Web Audio API initialized successfully   

stdout | src/audio/__tests__/audio-error-
-handling.test.ts > Audio Error Handling a
and Fallbacks > SilentAudioManager > shoul
ld implement all AudioManager methods with
hout errors
Silent Audio Manager initialized - no aud
dio will be played


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 0/23
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts 0/27  
 ❯ src/tests/audio/asset-loader.test.ts 1
1/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions
s.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 0/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 0/4
 ❯ src/tests/sound-event-integration.test
t.ts 0/37

 Test Files 1 failed | 0 passed (21)     
      Tests 5 failed | 6 passed (184)    
   Start at 16:41:41
   Duration 2.51s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully       
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Er
rror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 0/23
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts 0/27  
 ❯ src/tests/audio/asset-loader.test.ts 1
1/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions
s.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 0/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 0/4
 ❯ src/tests/sound-event-integration.test
t.ts 0/37

 Test Files 1 failed | 0 passed (21)     
      Tests 5 failed | 6 passed (184)    
   Start at 16:41:41
   Duration 2.51s
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > SilentAudioManager > should handle loading progress callbacks      
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during audio context creation
Using Web Audio API


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 0/23
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts 0/27  
 ❯ src/tests/audio/asset-loader.test.ts 1
1/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions
s.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 0/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 0/4
 ❯ src/tests/sound-event-integration.test
t.ts 0/37

 Test Files 1 failed | 0 passed (21)     
      Tests 5 failed | 6 passed (184)    
   Start at 16:41:41
   Duration 2.51s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Er
rror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 0/23
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts 0/27  
 ❯ src/tests/audio/asset-loader.test.ts 1
1/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions
s.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 0/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 0/4
 ❯ src/tests/sound-event-integration.test
t.ts 0/37

 Test Files 1 failed | 0 passed (21)     
      Tests 5 failed | 6 passed (184)    
   Start at 16:41:41
   Duration 2.51s
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during sound playback        
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during preloading
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-
-handling.test.ts > Audio Error Handling a
and Fallbacks > Autoplay Policy Handling >
> should detect autoplay restrictions     
Using Web Audio API

stdout | src/tests/physics-integration-de
emo.test.ts > Physics Integration Demo > s
should demonstrate boulder falling with so
ound events
Initial maze state:
Boulder at position (3,1), should fall to
o (3,2) then hit rock at (3,3)
After physics simulation:
Sound events generated: 1
Boulder successfully fell from (3,1) to (
(3,2) with sound event

stdout | src/tests/physics-integration-de
emo.test.ts > Physics Integration Demo > s
should demonstrate boulder collision with 
 sound events
Boulder collision test:
Boulder at (1,1) surrounded by rocks - sh
hould not move
Boulder correctly stayed in place - no mo
ovement sounds generated

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts (10 tests | 5 failed) 48ms    
   ❯ Audio Error Handling and Fallbacks (
(10)
     ❯ Audio Manager Factory (4)
       × should create WebAudioManager wh
hen Web Audio API is supported 19ms       
       ✓ should fall back to HTML5AudioMa
anager when Web Audio API is not supported
d 3ms
       ✓ should fall back to SilentAudioM
Manager when no audio is supported 1ms    
       ✓ should create specific audio man
nager when requested 1ms
     ❯ SilentAudioManager (2)
       × should implement all AudioManage
er methods without errors 4ms
       ✓ should handle loading progress c
callbacks 5ms
     ❯ Error Recovery (3)
       × should handle errors during audi
io context creation 5ms
       × should handle errors during soun
nd playback 4ms
       ✓ should handle errors during prel
loading 2ms
     ❯ Autoplay Policy Handling (1)      
       × should detect autoplay restricti
ions 2ms
stdout | src/tests/physics-integration-de
emo.test.ts > Physics Integration Demo > s
should demonstrate game integration with p
physics and sound
Game integration test:
Player moves right, boulder at (2,2) shou
uld fall to (2,3)
Player moved successfully and boulder phy
ysics was applied
Final player position: { x: 2, y: 1 }    
Boulder moved from (2,2) to (2,3)        

stdout | src/tests/physics-integration-de
emo.test.ts > Physics Integration Demo > s
should demonstrate multiple boulder physic
cs
Multiple boulder physics test:
Two boulders at (1,1) and (3,1) should bo
oth fall
Both boulders fell successfully with soun
nd events
Generated 2 movement sound events        


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 0/23
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts 0/27  
 ❯ src/tests/audio/asset-loader.test.ts 1
1/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions
s.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 0/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 0/4
 ❯ src/tests/sound-event-integration.test
t.ts 0/37

 Test Files 1 failed | 0 passed (21)     
      Tests 5 failed | 6 passed (184)    
   Start at 16:41:41
   Duration 2.51s
 ✓ src/tests/physics-integration-demo.test.ts (4 tests) 19ms
   ✓ Physics Integration Demo (4)        
     ✓ should demonstrate boulder falling with sound events 9ms
     ✓ should demonstrate boulder collision with sound events 2ms
     ✓ should demonstrate game integration with physics and sound 4ms
     ✓ should demonstrate multiple boulder physics 2ms
 ✓ src/tests/audio/audio-optimization.test.ts (28 tests) 87ms
   ✓ AudioFormatUtils (14)
     ✓ isFormatSupported (3)
       ✓ should return true for supported
d formats 4ms
       ✓ should return false for unsuppor
rted formats 1ms
       ✓ should be case insensitive 1ms  
     ✓ getBestSupportedFormat (3)        
       ✓ should return mp3 as preferred f
format 1ms
       ✓ should return ogg if mp3 not ava
ailable 1ms
       ✓ should return null if no formats
s supported 0ms
     ✓ getFormatFromUrl (3)
       ✓ should extract format from URL 1
1ms
       ✓ should handle URLs with query pa
arameters 0ms
       ✓ should return empty string for U
URLs without extension 0ms
     ✓ validateAudioHeader (5)
       ✓ should validate MP3 header with 
 ID3 tag 1ms
       ✓ should validate MP3 header with 
 frame sync 0ms
       ✓ should validate OGG header 0ms  
       ✓ should validate WAV header 0ms  
       ✓ should reject invalid headers 0m
ms
   ✓ AudioOptimizer (11)
     ✓ analyzeAudioBuffer (5)
       ✓ should analyze audio buffer metr
rics 1ms
       ✓ should provide sample rate recom
mmendations 0ms
       ✓ should provide channel recommend
dations for stereo 1ms
       ✓ should provide duration recommen
ndations for long clips 0ms
       ✓ should provide file size recomme
endations 0ms
     ✓ normalizeAudioBuffer (2)
       ✓ should normalize audio buffer 36
6ms
       ✓ should skip normalization when d
disabled 0ms
     ✓ applyFadeInOut (2)
       ✓ should apply fade in and out 16m
ms
       ✓ should use default fade times 14
4ms
     ✓ getOptimizationReport (2)
       ✓ should generate optimization rep
port for multiple files 2ms
       ✓ should provide global recommenda
ations 1ms
   ✓ AudioUtils (3)
     ✓ formatFileSize (1)
       ✓ should format bytes correctly 0m
ms
     ✓ formatDuration (1)
       ✓ should format seconds correctly 
 0ms
     ✓ formatCompressionRatio (1)        
       ✓ should format compression ratio 
 as percentage 0ms
 ❯ src/audio/__tests__/error-handling.tes
st.ts (23 tests | 15 failed) 93ms
   ❯ Audio Error Handling and Fallbacks (
(23)
     ❯ Web Audio API Unavailable (3)     
       ✓ should gracefully degrade when W
Web Audio API is not supported 7ms        
       ✓ should fall back to silent mode 
 when no audio support exists 2ms
       × should handle AudioContext creat
tion failure 16ms
     ❯ Audio Context Suspension Handling 
 (3)
       × should handle suspended audio co
ontext due to autoplay policies 7ms       
       × should handle audio context resu
ume failure 5ms
       ✓ should set up multiple event lis
steners for context resume 3ms
     ❯ Sound File Loading Errors (3)     
       × should handle failed sound file 
 loads gracefully 12ms
       × should retry failed sound loads 
 4ms
       × should fall back to HTML5 audio 
 when Web Audio loading fails completely 3
3ms
     ❯ HTML5 Audio Fallback (3)
       × should handle HTML5 audio playba
ack errors 2ms
       × should handle autoplay blocked e
errors 2ms
       × should handle unsupported audio 
 formats 3ms
     ✓ Silent Mode Fallback (2)
       ✓ should provide silent implementa
ations for all methods 2ms
       ✓ should return empty loading stat
te 2ms
     ❯ Error Recovery Mechanisms (3)     
       × should attempt on-demand loading
g when buffer not found 3ms
       × should validate audio buffers be
efore playback 3ms
       ✓ should handle audio context inte
erruption on iOS Safari 6ms
     ❯ Browser-Specific Error Handling (2
2)
       × should handle Safari-specific au
udio context issues 2ms
       × should handle Chrome-specific au
udio context issues 2ms
     ❯ Error Event Emission (2)
       × should emit error events for ext
ternal handling 2ms
       × should emit fallback events when
n switching audio managers 1ms
     ✓ Memory Management and Cleanup (2) 
       ✓ should clean up resources on aud
dio manager cleanup 2ms
       ✓ should handle cleanup errors gra
acefully 1ms

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts 0/13
 ❯ src/tests/game-state-sound-transitions
s.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 3/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 3 passed (21)     
      Tests 23 failed | 96 passed (197)  
   Start at 16:41:41
   Duration 2.61s
                                         
                                         
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:133:40        
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.tes
st.ts > AssetLoader > loadAudioBuffer > sh
hould throw error if all sources fail     
Retry 1/2 for sounds/test.mp3: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\asset-loader.test.ts:146:41        
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts 0/13
 ❯ src/tests/game-state-sound-transitions
s.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 3/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 3 passed (21)     
      Tests 23 failed | 96 passed (197)  
   Start at 16:41:41
   Duration 2.61s
 ✓ src/tests/sound-event-integration.test.ts (37 tests) 31ms
   ✓ Sound Event Mapper (30)
     ✓ mapPlayerMovementToSound (6)      
       ✓ should return dig sound event when player enters soil 4ms
       ✓ should return walk sound event when player moves to empty cell 1ms       
       ✓ should return walk sound event when player moves to diamond 0ms
       ✓ should return walk sound event when player moves to exit 1ms
       ✓ should return walk sound event when player moves to bomb 0ms
       ✓ should return null for blocked m
movement 0ms
     ✓ mapGameStateChangeToSound (4)     
       ✓ should return death sound event 
 when player dies 0ms
       ✓ should return victory sound even
nt when player wins 0ms
       ✓ should return null when game sta
ate does not change 1ms
       ✓ should return null for invalid s
state transitions 0ms
     ✓ mapDiamondCollectionToSound (2)   
       ✓ should return collection sound e
event when collecting diamond 0ms
       ✓ should return null for non-diamo
ond cells 0ms
     ✓ mapExitInteractionToSound (3)     
       ✓ should return door slam and vict
tory sound events when player can exit 2ms
       ✓ should return empty array when p
player cannot exit 0ms
       ✓ should return empty array for no
on-exit cells 0ms
     ✓ mapSoundEventToId (10)
       ✓ should map player dig movement t
to dig sound ID 1ms
       ✓ should map player walk movement 
 to walk sound ID 0ms
       ✓ should map boulder movement to b
boulder sound ID 0ms
       ✓ should map arrow movement to arr
row sound ID 0ms
       ✓ should map collision event to th
hud sound ID 0ms
       ✓ should map collection event to d
diamond collect sound ID 0ms
       ✓ should map death event to death 
 sound ID 0ms
       ✓ should map victory event to vict
tory sound ID 0ms
       ✓ should map door_slam event to do
oor slam sound ID 0ms
       ✓ should throw error for unknown e
event type 1ms
     ✓ generatePlayerMoveEvents (5)      
       ✓ should generate movement and col
llection events for diamond collection 1ms
       ✓ should generate movement and dea
ath events when player dies 1ms
       ✓ should generate movement, door s
slam, and victory events when player wins 
 1ms
       ✓ should generate dig sound when e
entering soil 1ms
       ✓ should generate only movement ev
vent for regular movement 0ms
   ✓ Sound Event Emitter (7)
     ✓ createSoundEventEmitter (4)       
       ✓ should create emitter with worki
ing emit function 3ms
       ✓ should emit multiple events 1ms 
       ✓ should not emit when no callback
k is set 1ms
       ✓ should handle errors gracefully 
 2ms
     ✓ getSoundEventEmitter (1)
       ✓ should return the same instance 
 on multiple calls 0ms
     ✓ emitSoundEvent (1)
       ✓ should emit single event using g
global emitter 1ms
     ✓ emitSoundEvents (1)
       ✓ should emit multiple events usin
ng global emitter 0ms

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts 0/13
 ❯ src/tests/game-state-sound-transitions
s.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 3/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 3 passed (21)     
      Tests 23 failed | 96 passed (197)  
   Start at 16:41:41
   Duration 2.61s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail     
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146:41        
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.tes
st.ts > AssetLoader > loadAudioBuffer > sh
hould throw error if all sources fail     
Retry 1/2 for sounds/test.ogg: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\asset-loader.test.ts:146:41        
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queu
ued]
 ❯ src/tests/audio-hooks.test.tsx [queued
d]
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settin
ngs.test.ts 0/13
 ❯ src/tests/game-state-sound-transitions
s.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 3/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 3 passed (21)     
      Tests 23 failed | 96 passed (197)  
   Start at 16:41:41
   Duration 2.61s
ode (vitest 6)stderr | src/tests/audio/hooks/use-audio-settings.test.ts > useAudioSettings > initialization > should handle corrupted localStorage data gracefully
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid-json" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-audio-settings.ts:26:33)
    at mountStateImpl (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:6130:24)
    at mountState (D:\FizzBash\TheWandereode (vitest 13)
er\node_modules\react-dom\cjs\react-dom-cl
lient.development.js:6151:22)
    at Object.useState (D:\FizzBash\TheWa
anderer\node_modules\react-dom\cjs\react-d
dom-client.development.js:22951:18)       
    at process.env.NODE_ENV.exports.useSt
tate (D:\FizzBash\TheWanderer\node_modules
s\react\cjs\react.development.js:1221:34) 
    at Module.useAudioSettings (D:\FizzBa
ash\TheWanderer\src\audio\hooks\use-audio-
-settings.ts:59:37)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\hooks\use-audio-settings.test.ts:90
0:49
    at TestComponent (D:\FizzBash\TheWand
derer\node_modules\@testing-library\react\
\dist\pure.js:331:27)
    at Object.react-stack-bottom-frame (D
D:\FizzBash\TheWanderer\node_modules\react
t-dom\cjs\react-dom-client.development.js:
:23863:20)

stderr | src/tests/audio/asset-loader.tes
st.ts > AssetLoader > loadAudioBuffer > sh
hould throw error if all sources fail     
Failed to load test_sound from sounds/tes
st.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\asset-loader.test.ts:146:41        
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.tes
st.ts > AssetLoader > loadAudioBuffer > sh
hould handle HTTP errors
Failed to load test_sound from sounds/tes
st.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31

stderr | src/tests/audio/asset-loader.tes
st.ts > AssetLoader > loadAudioBuffer > sh
hould handle audio decoding errors        
Failed to load test_sound from sounds/tes
st.mp3: Error: Invalid audio data
    at D:\FizzBash\TheWanderer\src\tests\
\audio\asset-loader.test.ts:194:68        
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7  
 ❯ src/tests/audio-hooks.test.tsx 0/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/game-state-sound-transitions
s.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 4/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 4 passed (21)     
      Tests 23 failed | 112 passed (241) 
   Start at 16:41:41
   Duration 2.83s
                                         
                                         
stdout | src/tests/audio-context.test.tsx > AudioContext > should provide audio context to children
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7  
 ❯ src/tests/audio-hooks.test.tsx 0/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/game-state-sound-transitions
s.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 4/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 4 passed (21)     
      Tests 23 failed | 112 passed (241) 
   Start at 16:41:41
   Duration 2.83s
stderr | src/tests/audio-context.test.tsx > AudioContext > should provide audio context to children
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7  
 ❯ src/tests/audio-hooks.test.tsx 0/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/game-state-sound-transitions
s.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 4/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 4 passed (21)     
      Tests 23 failed | 112 passed (241) 
   Start at 16:41:41
   Duration 2.83s
stdout | src/tests/audio-context.test.tsx > AudioContext > should provide audio context to children
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function that calls audio manager
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7  
 ❯ src/tests/audio-hooks.test.tsx 0/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/game-state-sound-transitions
s.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 4/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 4 passed (21)     
      Tests 23 failed | 112 passed (241) 
   Start at 16:41:41
   Duration 2.83s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function that calls audio manager
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7  
 ❯ src/tests/audio-hooks.test.tsx 0/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/game-state-sound-transitions
s.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 4/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 4 passed (21)     
      Tests 23 failed | 112 passed (241) 
   Start at 16:41:41
   Duration 2.83s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function that calls audio manager
HTML5 Audio preloaded 0/9 sounds

 ✓ src/tests/audio/hooks/use-audio-settings.test.ts (13 tests) 90ms
   ✓ useAudioSettings (13)
     ✓ initialization (3)
       ✓ should initialize with default settings when no stored settings exist 25ms
       ✓ should load settings from localStorage when available 3ms
       ✓ should handle corrupted localSto
orage data gracefully 19ms
     ✓ mute functionality (2)
       ✓ should toggle mute state 7ms    
       ✓ should persist mute state to loc
calStorage 4ms
     ✓ volume controls (3)
       ✓ should set global volume and cla
amp values 4ms
       ✓ should set category volume and c
clamp values 3ms
       ✓ should persist volume changes to
o localStorage 3ms
     ✓ reset functionality (1)
       ✓ should reset all settings to def
faults 4ms
     ✓ keyboard shortcuts (3)
       ✓ should toggle mute on Ctrl+M 4ms
       ✓ should toggle mute on Cmd+M (Mac
c) 3ms
       ✓ should not toggle mute on M with
hout modifier keys 2ms
     ✓ localStorage error handling (1)   
       ✓ should handle localStorage save 
 errors gracefully 5ms

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7  
 ❯ src/tests/audio-hooks.test.tsx 0/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/game-state-sound-transitions
s.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 4/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 4 passed (21)     
      Tests 23 failed | 112 passed (241) 
   Start at 16:41:41
   Duration 2.83s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function that calls audio manager
Sound asset not found for ID: test-sound 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7  
 ❯ src/tests/audio-hooks.test.tsx 0/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/game-state-sound-transitions
s.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 4/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 4 passed (21)     
      Tests 23 failed | 112 passed (241) 
   Start at 16:41:41
   Duration 2.83s
stdout | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tode (vitest 15)
tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7  
 ❯ src/tests/audio-hooks.test.tsx 0/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/game-state-sound-transitions
s.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 4/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 4 passed (21)     
      Tests 23 failed | 112 passed (241) 
   Start at 16:41:41
   Duration 2.83s
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7  
 ❯ src/tests/audio-hooks.test.tsx 0/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/game-state-sound-transitions
s.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 4/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 4 passed (21)     
      Tests 23 failed | 112 passed (241) 
   Start at 16:41:41
   Duration 2.83s
stdout | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7  
 ❯ src/tests/audio-hooks.test.tsx 0/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
 ❯ src/tests/audio/asset-loader.test.ts 5
5/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
 ❯ src/tests/game-state-sound-transitions
s.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.
.test.ts 4/9
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 2 failed | 4 passed (21)     
      Tests 23 failed | 112 passed (241) 
   Start at 16:41:41
   Duration 2.83s
ode (vitest 14)stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function with options
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function with options
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function with options
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function with options
Sound asset not found for ID: test-sound 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should return muted state from audio manager
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should return muted state from audio manager
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should return muted state from audio manager
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should toggle mute state
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should toggle mute state
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should toggle mute state
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-context.test.tsx > AudioContext > should call preloadSounds during initialization
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-context.test.tsx > AudioContext > should call preloadSounds during initialization
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-context.test.tsx > AudioContext > should call preloadSounds during initialization
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
HTML5 Audio preloaded 0/9 sounds

 ✓ src/tests/game-state-sound-transitions.test.ts (7 tests) 333ms
   ✓ Game State Sound Transitions (7)    
     ✓ Death sound transitions (2)       
       ✓ should stop all sounds and play death sound when player hits bomb 113ms  
       ✓ should stop all sounds and play death sound when running out of moves 104ms
     ✓ Victory sound transitions (2)     
       ✓ should stop all sounds and play 
 victory sound when player exits successfu
ully 108ms
       ✓ should not allow exit when diamo
onds remain 1ms
     ✓ Door slam sound for exit interacti
ion (1)
       ✓ should play door slam sound when
n player successfully exits 2ms
     ✓ Sound stopping behavior (2)       
       ✓ should not stop sounds during no
ormal gameplay 1ms
       ✓ should filter out death/victory 
 sounds from regular emission when game en
nds 1ms
 ✓ src/tests/GameState-sound-integration.
.test.ts (9 tests) 344ms
   ✓ GameState Sound Integration (9)     
     ✓ should emit walk sound when player
r moves to empty cell 11ms
     ✓ should emit dig sound when player 
 moves to soil 2ms
     ✓ should emit collection sound when 
 player collects diamond 2ms
     ✓ should emit death sound when playe
er hits bomb 109ms
     ✓ should emit victory sounds when pl
layer exits with no diamonds 108ms        
     ✓ should not emit sounds when moveme
ent is blocked 1ms
     ✓ should not emit sounds when game i
is not in playing state 1ms
     ✓ should emit death sound when runni
ing out of moves 106ms
     ✓ should not emit exit sounds when p
player cannot exit with diamonds remaining
g 1ms
stdout | src/tests/audio-hooks.test.tsx >
> Audio Hooks > useSound > should handle a
audio manager not initialized
Web Audio API not supported, falling back
k to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s














stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized
HTML5 Audio preloaded 0/9 sounds ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act

stderr | src/tests/audio-context.test.tsx
x > AudioContext > should allow manual cle
eanup
An update to AudioProvider inside a test 
 was not wrapped in act(...).

When testing, code that causes React stat
te updates should be wrapped into act(...)
):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
An update to AudioProvider inside a test 
 was not wrapped in act(...).

When testing, code that causes React stat
te updates should be wrapped into act(...)
):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s














stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
HTML5 Audio preloaded 0/9 sounds ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act

stderr | src/tests/audio/asset-loader.tes
st.ts > AssetLoader > loadAudioBuffer > sh
hould respect timeout
Failed to load test_sound from sounds/tes
st.mp3: Error: Timeout loading sounds/test
t.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\Th
heWanderer\src\audio\managers\asset-loader
r.ts:160:24)
    at listOnTimeout (node:internal/timer
rs:594:17)
    at processTimers (node:internal/timer
rs:529:7)


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-context.test.tsx > AudioContext > should prevent multiple simultaneous initializations
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-context.test.tsx > AudioContext > should prevent multiple simultaneous initializations
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-context.test.tsx > AudioContext > should prevent multiple simultaneous initializations
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10ode (vitest 7)
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
Sound asset not found for ID: test-sound 

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:278:40        
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config        
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config        
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
An update to AudioProvider inside a test 
 was not wrapped in act(...).

When testing, code that causes React stat
te updates should be wrapped into act(...)
):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config        
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config        
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s














stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
An update to AudioProvider inside a test 
 was not wrapped in act(...).

When testing, code that causes React stat
te updates should be wrapped into act(...)
):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume       
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume       
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-audio-settings.ts:26:33)
    at mountStateImpl (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:6130:24)
    at mountState (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-cl
lient.development.js:6151:22)
    at Object.useState (D:\FizzBash\TheWa
anderer\node_modules\react-dom\cjs\react-d
dom-client.development.js:22951:18)       
    at process.env.NODE_ENV.exports.useSt
tate (D:\FizzBash\TheWanderer\node_modules
s\react\cjs\react.development.js:1221:34) 
    at Module.useAudioSettings (D:\FizzBa
ash\TheWanderer\src\audio\hooks\use-audio-
-settings.ts:59:37)
    at __vi_import_1__.renderHook.wrapper
r (D:\FizzBash\TheWanderer\src\tests\audio
o-hooks.test.tsx:192:49)
    at TestComponent (D:\FizzBash\TheWand
derer\node_modules\@testing-library\react\
\dist\pure.js:331:27)
    at Object.react-stack-bottom-frame (D
D:\FizzBash\TheWanderer\node_modules\react
t-dom\cjs\react-dom-client.development.js:
:23863:20)
AudioContext not supported
No supported audio format found for playe
er_walk
Failed to create audio element for player
r_walk
No supported audio format found for playe
er_dig
Failed to create audio element for player
r_dig
No supported audio format found for bould
der_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
An update to AudioProvider inside a test 
 was not wrapped in act(...).

When testing, code that causes React stat
te updates should be wrapped into act(...)
):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume       
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume       
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set muted state through audio manager    
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set muted state through audio manager    
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set muted state through audio manager    
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage      
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage      
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for bouldeode (vitest 10)
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
An update to AudioProvider inside a test 
 was not wrapped in act(...).

When testing, code that causes React stat
te updates should be wrapped into act(...)
):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization        
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization        
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization        
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage      
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]ode (vitest 11)
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage      
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should clamp volume between 0 and 1
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should clamp volume between 0 and 1
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
An update to AudioProvider inside a test 
 was not wrapped in act(...).

When testing, code that causes React stat
te updates should be wrapped into act(...)
):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
 ❯ src/tests/audio-context.test.tsx (7 tests | 5 failed) 220ms
   ❯ AudioContext (7)
     ✓ should provide audio context to children 87ms
     × should handle initialization errors 27ms
     × should call preloadSounds during initialization 18ms
     × should allow manual cleanup 32ms  
     × should prevent multiple simultaneous initializations 15ms
     ✓ should throw error when useAudioContext is used outside provider 9ms       
     × should handle non-Error exceptions
s during initialization 28ms
stdout | src/tests/audio-hooks.test.tsx >
> Audio Hooks > useAudioSettings > should 
 clamp volume between 0 and 1
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s














stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should clamp volume between 0 and 1
An update to AudioProvider inside a test was not wrapped in act(...).When testing, code that causes React state updates should be wrapped into act(...):act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should reset to defaults
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should reset to defaults
AudioContext not supported
No supported audio format found for player_walk
Failed to create audio element for player_walk
No supported audio format found for player_dig
Failed to create audio element for player_dig
No supported audio format found for boulder_move
Failed to create audio element for boulde
er_move
No supported audio format found for arrow
w_move
Failed to create audio element for arrow_
_move
No supported audio format found for colli
ision_thud
Failed to create audio element for collis
sion_thud
No supported audio format found for death
h_sound
Failed to create audio element for death_
_sound
No supported audio format found for victo
ory_sound
Failed to create audio element for victor
ry_sound
No supported audio format found for door_
_slam
Failed to create audio element for door_s
slam
No supported audio format found for diamo
ond_collect
Failed to create audio element for diamon
nd_collect
Autoplay not allowed - user interaction w
will be required to play audio


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should reset to defaults
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully    
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully    
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully    
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-hooks.test.tsx 5/16   ode (vitest 12)
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 364ms
 ❯ src/tests/audio/asset-loader.test.ts 8
8/16
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 365ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 3 failed | 6 passed (21)     
      Tests 32 failed | 128 passed (241) 
   Start at 16:41:41
   Duration 2.96s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:53
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:156:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:192:55

stderr | src/tests/audio/asset-loader.tes
st.ts > AssetLoader > loadAssets > should 
 handle partial failures
Failed to load sound sound2: TypeError: C
Cannot read properties of undefined (readi
ing 'then')
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:163:53
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\Fizz
zBash\TheWanderer\src\audio\managers\asset
t-loader.ts:156:16)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:192:55


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 7/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 699ms
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 699ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 147 passed (241) 
   Start at 16:41:41
   Duration 3.29s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Asset loading complete: 1/2 loaded, 1 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 7/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 699ms
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 699ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 147 passed (241) 
   Start at 16:41:41
   Duration 3.29s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure      
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:335:41        
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.tes
st.ts > AssetLoader > progress tracking > 
 should emit error events on failure      
Failed to load test_sound from sounds/tes
st.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\asset-loader.test.ts:335:41        
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-hooks.test.tsx >
> Audio Hooks > useAudioSettings > should 
 handle localStorage errors gracefully    
An update to AudioProvider inside a test 
 was not wrapped in act(...).

When testing, code that causes React stat
te updates should be wrapped into act(...)
):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 7/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 699ms
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 699ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 147 passed (241) 
   Start at 16:41:41
   Duration 3.29s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 7/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 699ms
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 699ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 147 passed (241) 
   Start at 16:41:41
   Duration 3.29s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 7/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 699ms
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 699ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 147 passed (241) 
   Start at 16:41:41
   Duration 3.29s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 7/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 699ms
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 699ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 147 passed (241) 
   Start at 16:41:41
   Duration 3.29s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */    
});
/* assert on the output */

This ensures that you're testing the beha
avior the user would see in the browser. L
Learn more at https://react.dev/link/wrap-
-tests-with-act


 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 7/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 699ms
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 699ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 147 passed (241) 
   Start at 16:41:41
   Duration 3.29s
 ❯ src/tests/audio-hooks.test.tsx (16 tests | 11 failed) 220ms
   ❯ Audio Hooks (16)
     ❯ useSound (7)
       × should provide playSound function that calls audio manager 54ms
       × should provide playSound function with options 18ms
       × should return muted state from audio manager 17ms
       × should toggle mute state 9ms    
       ✓ should handle audio manager not initialized 7ms
       ✓ should show loading state during initialization 10ms
       × should handle playSound errors g
gracefully 16ms
     ❯ useAudioSettings (9)
       ✓ should return default volume fro
om config 5ms
       × should load volume from localSto
orage 9ms
       ✓ should handle invalid localStora
age volume 18ms
       × should set muted state through a
audio manager 8ms
       × should set volume and save to lo
ocalStorage 9ms
       ✓ should clamp volume between 0 an
nd 1 7ms
       × should reset to defaults 7ms    
       × should handle localStorage error
rs gracefully 15ms
       × should handle audio manager not 
 initialized for setMuted 8ms
 ✓ src/tests/audio/asset-loader.test.ts (
(16 tests) 696ms
   ✓ AssetLoader (16)
     ✓ constructor (2)
       ✓ should initialize with default o
options 3ms
       ✓ should accept custom options 1ms
     ✓ loadAudioBuffer (7)
       ✓ should successfully load audio b
buffer from first source 5ms
       ✓ should fallback to second source
e if first fails 13ms
       ✓ should retry failed requests 111
1ms
       ✓ should throw error if all source
es fail 215ms
       ✓ should handle HTTP errors 3ms   
       ✓ should handle audio decoding err
rors 3ms
       ✓ should respect timeout 108ms    
     ✓ loadAssets (2)
       ✓ should load all preload assets 3
3ms
       ✓ should handle partial failures 1
112ms
     ✓ progress tracking (2)
       ✓ should emit progress events 1ms 
       ✓ should emit error events on fail
lure 111ms
     ✓ format optimization (2)
       ✓ should prefer supported formats 
 1ms
       ✓ should filter unsupported format
ts 1ms
     ✓ cleanup (1)
       ✓ should clear all state and callb
backs 1ms

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 7/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 699ms
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 699ms
 ❯ src/tests/physics-integration-demo.tes
st.ts 4/4
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 147 passed (241) 
   Start at 16:41:41
   Duration 3.29s
ode (vitest 3)ode (vitest 4)stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Retry 2/3 for sounds/player/walk.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Retry 2/3 for sounds/player/dig.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Retry 2/3 for sounds/player/dig.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Retry 2/3 for sounds/boulder/Whoosh.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Retry 2/3 for sounds/boulder/Whoosh.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Retry 2/3 for sounds/arrow/twang.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Retry 2/3 for sounds/arrow/twang.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Retry 2/3 for sounds/arrow/thud.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Retry 2/3 for sounds/arrow/thud.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Retry 2/3 for sounds/player/death.mp3: Er
rror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Retry 2/3 for sounds/player/death.mp3: Er
rror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.tes
st.ts 23/23
 ❯ src/tests/app-sound-integration.test.t
tsx 10/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 919ms
 ❯ src/tests/audio/audio-optimization.tes
st.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 919ms
 ❯ src/tests/sound-event-integration.test
t.ts 37/37

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 150 passed (241) 
   Start at 16:41:41
   Duration 3.51s





 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 13/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors gracefully 1.37s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gra
acefully 1.37s
 ❯ src/tests/collision-sound-integration.
.test.ts [queued]

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 153 passed (241) 
   Start at 16:41:41
   Duration 3.96s
(node:11888) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)        

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors gracefully 1.48s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gra
acefully 1.48s
 ❯ src/tests/collision-sound-integration.
.test.ts [queued]

 Test Files 4 failed | 7 passed (21)     
      Tests 39 failed | 154 passed (241) 
   Start at 16:41:41
   Duration 4.07s
(node:30172) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)        
(node:37132) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)        
(node:50016) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)        
(node:29872) [DEP0040] DeprecationWarning
g: The `punycode` module is deprecated. Pl
lease use a userland alternative instead. 
(Use `node --trace-deprecation ...` to sh
how where the warning was created)        

 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.t
tsx 15/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.68s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 1.68s
 ❯ src/tests/LargerMaze.test.ts [queued] 
 ❯ src/tests/LargerMazeGameState.test.ts 
 [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued
d]
 ❯ src/tests/sound-system-infrastructure.
.test.ts [queued]

 Test Files 4 failed | 8 passed (21)     
      Tests 39 failed | 176 passed (262) 
   Start at 16:41:41
   Duration 4.27s
 ✓ src/tests/collision-sound-integration.test.ts (21 tests) 18ms
   ✓ Collision Sound Integration Tests (21)
     ✓ Boulder Collision Detection (4)   
       ✓ should detect collision when boulder hits rock 3ms
       ✓ should detect collision when boulder hits another boulder 0ms
       ✓ should detect ground collision when boulder hits soil 0ms
       ✓ should not detect collision in empty space 0ms
     ✓ Arrow Collision Detection (2)     
       ✓ should detect collision when arr
row hits rock 0ms
       ✓ should detect collision when arr
row hits boulder 0ms
     ✓ Boulder Movement and Sound Events 
 (4)
       ✓ should generate movement sound w
when boulder falls 2ms
       ✓ should generate collision sound 
 when boulder cannot fall 0ms
       ✓ should correctly identify when b
boulder can fall 1ms
       ✓ should correctly identify when b
boulder cannot fall 0ms
     ✓ Arrow Movement and Sound Events (2
2)
       ✓ should generate movement sound w
when arrow moves 1ms
       ✓ should generate collision sound 
 and destroy arrow when hitting obstacle 0
0ms
     ✓ Physics Engine Integration (3)    
       ✓ should find all boulders in maze
e 1ms
       ✓ should simulate gravity for mult
tiple boulders 1ms
       ✓ should run complete physics simu
ulation step 1ms
     ✓ Sound Event Mapping (4)
       ✓ should map boulder collision wit
th rock to high priority sound 0ms        
       ✓ should map arrow collision with 
 soil to low priority sound 0ms
       ✓ should generate object interacti
ion events correctly 0ms
       ✓ should generate collision sound 
 events for multiple collisions 0ms       
     ✓ Game State Integration (2)        
       ✓ should trigger physics simulatio
on and sound events when player moves 2ms 
       ✓ should handle collision timing c
correctly 0ms

 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.t
tsx 15/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.68s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 1.68s
 ❯ src/tests/LargerMaze.test.ts [queued] 
 ❯ src/tests/LargerMazeGameState.test.ts 
 [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued
d]
 ❯ src/tests/sound-system-infrastructure.
.test.ts [queued]

 Test Files 4 failed | 8 passed (21)     
      Tests 39 failed | 176 passed (262) 
   Start at 16:41:41
   Duration 4.27s
(node:48856) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created)        

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors gracefully 1.78s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gra
acefully 1.78s
 ❯ src/tests/GameState.test.ts [queued]  
 ❯ src/tests/LargerMaze.test.ts 0/8      
 ❯ src/tests/LargerMazeGameState.test.ts 
 0/9
 ❯ src/tests/LargerMazeUI.test.ts 1/12   

 Test Files 4 failed | 9 passed (21)     
      Tests 39 failed | 183 passed (296) 
   Start at 16:41:41
   Duration 4.37s
 ✓ src/tests/sound-system-infrastructure.test.ts (5 tests) 12ms
   ✓ Sound System Infrastructure (5)     
     ✓ Sound Configuration (4)
       ✓ should have all required sound assets defined 4ms
       ✓ should have proper sound asset structure 1ms
       ✓ should have sound configuration with categories 1ms
       ✓ should have sound ID constants 0ms
     ✓ Audio Utilities (1)
       ✓ should detect browser audio support 4ms

 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.t
tsx 16/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.78s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 1.78s
 ❯ src/tests/GameState.test.ts [queued]  
 ❯ src/tests/LargerMaze.test.ts 0/8      
 ❯ src/tests/LargerMazeGameState.test.ts 
 0/9
 ❯ src/tests/LargerMazeUI.test.ts 1/12   

 Test Files 4 failed | 9 passed (21)     
      Tests 39 failed | 183 passed (296) 
   Start at 16:41:41
   Duration 4.37s
stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > should continue working when sound playback fails
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23    
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.ts
sx:51:7
    at emit (D:\FizzBash\TheWanderer\src\
\audio\events\sound-event-emitter.ts:25:13
3)
    at Array.forEach (<anonymous>)       
    at Object.emitMultiple (D:\FizzBash\T
TheWanderer\src\audio\events\sound-event-e
emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWa
anderer\src\audio\events\sound-event-emitt
ter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWandere
er\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\The
eWanderer\src\GameState.ts:191:22)        
Failed to emit sound event: Error: Sound 
 playback failed
    at D:\FizzBash\TheWanderer\src\tests\
\app-sound-integration.test.tsx:493:23    
    at mockCall (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/spy/dist/ind
dex.js:96:15)
    at spy (file:///D:/FizzBash/TheWander
rer/node_modules/tinyspy/dist/index.js:47:
:103)
    at D:\FizzBash\TheWanderer\src\App.ts
sx:51:7
    at emit (D:\FizzBash\TheWanderer\src\
\audio\events\sound-event-emitter.ts:25:13
3)
    at Array.forEach (<anonymous>)       
    at Object.emitMultiple (D:\FizzBash\T
TheWanderer\src\audio\events\sound-event-e
emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWa
anderer\src\audio\events\sound-event-emitt
ter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWandere
er\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\The
eWanderer\src\GameState.ts:191:22)        
Failed to emit sound event: Error: Sound 
 playback failed
    at D:\FizzBash\TheWanderer\src\tests\
\app-sound-integration.test.tsx:493:23    
    at mockCall (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/spy/dist/ind
dex.js:96:15)
    at spy (file:///D:/FizzBash/TheWander
rer/node_modules/tinyspy/dist/index.js:47:
:103)
    at D:\FizzBash\TheWanderer\src\App.ts
sx:51:7
    at emit (D:\FizzBash\TheWanderer\src\
\audio\events\sound-event-emitter.ts:25:13
3)
    at Array.forEach (<anonymous>)       
    at Object.emitMultiple (D:\FizzBash\T
TheWanderer\src\audio\events\sound-event-e
emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWa
anderer\src\audio\events\sound-event-emitt
ter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWandere
er\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\The
eWanderer\src\GameState.ts:191:22)        
Failed to emit sound event: Error: Sound 
 playback failed
    at D:\FizzBash\TheWanderer\src\tests\
\app-sound-integration.test.tsx:493:23    
    at mockCall (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/spy/dist/ind
dex.js:96:15)
    at spy (file:///D:/FizzBash/TheWander
rer/node_modules/tinyspy/dist/index.js:47:
:103)
    at D:\FizzBash\TheWanderer\src\App.ts
sx:51:7
    at emit (D:\FizzBash\TheWanderer\src\
\audio\events\sound-event-emitter.ts:25:13
3)
    at Array.forEach (<anonymous>)       
    at Object.emitMultiple (D:\FizzBash\T
TheWanderer\src\audio\events\sound-event-e
emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWa
anderer\src\audio\events\sound-event-emitt
ter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWandere
er\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\The
eWanderer\src\GameState.ts:191:22)        


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.t
tsx 16/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.78s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 1.78s
 ❯ src/tests/GameState.test.ts [queued]  
 ❯ src/tests/LargerMaze.test.ts 0/8      
 ❯ src/tests/LargerMazeGameState.test.ts 
 0/9
 ❯ src/tests/LargerMazeUI.test.ts 1/12   

 Test Files 4 failed | 9 passed (21)     
      Tests 39 failed | 183 passed (296) 
   Start at 16:41:41
   Duration 4.37s
ode (vitest 5) ✓ src/tests/LargerMazeUI.test.ts (12 tests) 12ms
   ✓ Larger Maze UI Adaptation - Functional Implementation (12)
     ✓ Maze dimension validation (2)     
       ✓ should have correct larger maze dimensions 3ms
       ✓ should maintain consistent row lengths 1ms
     ✓ Maze structure validation (3)     
       ✓ should have proper rock border around the maze 0ms
       ✓ should have required game elements 0ms
       ✓ should have appropriate maze com
mposition for larger size 0ms
     ✓ Icon mapping validation (2)       
       ✓ should have icons defined for al
ll cell types 1ms
       ✓ should have unique icons for dif
fferent cell types 0ms
     ✓ Game state integration with larger
r maze (2)
       ✓ should create valid initial game
e state with larger maze 2ms
       ✓ should correctly count diamonds 
 in larger maze 0ms
     ✓ Maze accessibility and playability
y
 (3)
       ✓ should have sufficient empty spa
aces for movement 0ms
       ✓ should have balanced distributio
on of obstacles 0ms
       ✓ should have appropriate challeng
ge elements for larger maze 0ms
 ✓ src/tests/LargerMazeGameState.test.ts 
 (9 tests) 13ms
   ✓ Larger Maze Game State Management - 
 Functional Implementation (9)
     ✓ Diamond counting and collection (2
2)
       ✓ should correctly count diamonds 
 in larger maze 4ms
       ✓ should prevent exit when diamond
ds remain in larger maze 1ms
     ✓ Win and lose conditions (2)       
       ✓ should handle win condition corr
rectly in larger maze 0ms
       ✓ should handle lose condition whe
en running out of moves 0ms
     ✓ Multiple diamond collection scenar
rios (1)
       ✓ should handle multiple diamonds 
 collection across larger maze 1ms        
     ✓ Bomb interactions (1)
       ✓ should handle bomb interactions 
 correctly in larger maze 1ms
     ✓ Move counting and game mechanics (
(2)
       ✓ should handle move counting corr
rectly in larger maze 1ms
       ✓ should maintain maze integrity d
during multiple operations 2ms
     ✓ Factory function integration (1)  
       ✓ should work correctly with creat
teGameState factory for larger mazes 1ms  
 ✓ src/tests/LargerMaze.test.ts (8 tests)
) 12ms
   ✓ Larger Maze Tests - Functional Imple
ementation (8)
     ✓ Player movement in larger maze (2)
       ✓ should allow player to move in a
all directions 4ms
       ✓ should prevent movement through 
 rock borders 1ms
     ✓ Diamond collection in larger maze 
 (1)
       ✓ should allow player to collect d
diamonds across the maze 1ms
     ✓ Exit mechanics in larger maze (1) 
       ✓ should allow exit only after col
llecting all diamonds 1ms
     ✓ Bomb interactions in larger maze (
(1)
       ✓ should cause death when hitting 
 a bomb 1ms
     ✓ Complex navigation in larger maze 
 (2)
       ✓ should handle complex paths with
h various obstacles 1ms
       ✓ should handle sequential moves e
efficiently 0ms
     ✓ Factory function integration (1)  
       ✓ should work correctly with creat
teGameState factory 1ms

 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.t
tsx 18/21
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 4/23
   └── should handle loading failures gra
acefully 1.88s
 ❯ src/tests/GameState.test.ts 1/10      

 Test Files 4 failed | 12 passed (21)    
      Tests 39 failed | 214 passed (306) 
   Start at 16:41:41
   Duration 4.47s
ode (vitest 14)ode (vitest 6)ode (vitest 15) ✓ src/tests/GameState.test.ts (10 tests) 12ms
   ✓ GameState - Functional Implementation (10)
     ✓ movePlayer function (7)
       ✓ should collect diamond and update state correctly 4ms
       ✓ should not move when blocked by rock 1ms
       ✓ should set game state to dead when hitting bomb 1ms
       ✓ should prevent exit when diamonds remain 0ms
       ✓ should allow exit when all diamonds are collected 1ms
       ✓ should handle soil movement corr
rectly 1ms
       ✓ should set game state to dead wh
hen running out of moves 1ms
     ✓ createGameState factory function (
(3)
       ✓ should create game state with de
efault values 1ms
       ✓ should create game state with cu
ustom initial data 1ms
       ✓ should handle player movement th
hrough factory interface 1ms

 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully       
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41             
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                              
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Load error for PLAYER_WALK: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Failed to load PLAYER_WALK from sounds/pl
layer/walk.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Load error for PLAYER_WALK: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Failed to load PLAYER_DIG from sounds/pla
ayer/dig.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Failed to load PLAYER_DIG from sounds/pla
ayer/dig.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Load error for PLAYER_DIG: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Load error for PLAYER_DIG: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Failed to load BOULDER_MOVE from sounds/b
boulder/Whoosh.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Load error for BOULDER_MOVE: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Failed to load BOULDER_MOVE from sounds/b
boulder/Whoosh.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Failed to load ARROW_MOVE from sounds/arr
row/twang.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Load error for BOULDER_MOVE: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Load error for ARROW_MOVE: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Failed to load COLLISION_THUD from sounds
s/arrow/thud.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Failed to load ARROW_MOVE from sounds/arr
row/twang.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Load error for COLLISION_THUD: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Load error for ARROW_MOVE: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Failed to load DEATH_SOUND from sounds/pl
layer/death.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Failed to load COLLISION_THUD from sounds
s/arrow/thud.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Load error for DEATH_SOUND: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Load error for COLLISION_THUD: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Failed to load VICTORY_SOUND from sounds/
/environment/door-slam.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Failed to load DEATH_SOUND from sounds/pl
layer/death.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Load error for VICTORY_SOUND: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Load error for DEATH_SOUND: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Failed to load DOOR_SLAM from sounds/envi
ironment/door-slam.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Failed to load VICTORY_SOUND from sounds/
/environment/door-slam.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Load error for DOOR_SLAM: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Load error for VICTORY_SOUND: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Failed to load DOOR_SLAM from sounds/envi
ironment/door-slam.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Failed to load DIAMOND_COLLECT from sound
ds/environment/door-slam.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Load error for DOOR_SLAM: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > enhanced preloading > 
 should handle loading failures gracefully
Load error for DIAMOND_COLLECT: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:161:
:45
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle preload errors gracefully       
Failed to load DIAMOND_COLLECT from sound
ds/environment/door-slam.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Preloaded 0 sounds                       
                                         
                                         
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]               
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors gracefully 1.99s                              
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully       
Load error for DIAMOND_COLLECT: Error: Network error                              
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41             
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                              
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:in
nternal/process/task_queues:105:5)        
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully       
Preloaded 0 sounds                       
                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode  
Web Audio API initialized successfully   
                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > 
 should skip preloading in fallback mode  
Preloaded 9 sounds

stdout | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld play sound with default options        
Web Audio API initialized successfully   

stdout | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld play sound with custom options
Web Audio API initialized successfully   

stdout | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld not play sound when muted
Web Audio API initialized successfully   

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > optimization reporting
g > should provide optimization report    
Web Audio API initialized successfully   

stdout | src/tests/audio-manager.test.ts 
 > Audio Manager > WebAudioManager > shoul
ld handle missing sound buffer gracefully 
Web Audio API initialized successfully   


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle missing sound buffer gracefully 
Sound buffer not found for nonexistent_sound                                      
                                         
                                         
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]               
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors gracefully 1.99s                              
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report    
Preloaded 9 sounds                       
                                         
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should cleanup resources properly             
Web Audio API initialized successfully   
                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting
g > should handle empty buffer set        
Web Audio API initialized successfully   


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle audio context creation failure  
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed  
    at new global.AudioContext (D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:294:27)                            
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:79:39)          
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:62:14)
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:298:29
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > loading state management > should track loading state correctly
Web Audio API initialized successfully   
                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > loading state management > should track loading state correctly
Preloaded 9 sounds                       
                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld retry failed loads
Web Audio API initialized successfully   


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                     
Retry 1/3 for sounds/player/walk.mp3: Error: Network error                        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:219:44                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > HTML5AudioManager > sho
ould preload sounds using HTML5 Audio     
Failed to preload PLAYER_WALK: TypeError:
: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload PLAYER_DIG: TypeError: 
 audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload BOULDER_MOVE: TypeError
r: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload ARROW_MOVE: TypeError: 
 audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload COLLISION_THUD: TypeErr
ror: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DEATH_SOUND: TypeError:
: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload VICTORY_SOUND: TypeErro
or: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DOOR_SLAM: TypeError: a
audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DIAMOND_COLLECT: TypeEr
rror: audio.load is not a function        
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio     
HTML5 Audio preloaded 0 sounds           
                                         
                                         
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]               
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors gracefully 1.99s                              
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23                            

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should play sound with HTML5 Audio          
Sound asset not found for ID: test_sound 
                                         
stderr | src/tests/audio-manager.test.ts > Audio Manager > SilentAudioManager > should initialize in silent mode           
No audio support detected, using silent mode                                      
                                         
stderr | src/tests/audio-manager.test.ts > Audio Manager > SilentAudioManager > should handle all operations silently      
No audio support detected, using silent m
mode


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stdout | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create WebAudioManager when Web Audio API is supported               
Web Audio API initialized successfully   
                                         
                                         
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]               
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors gracefully 1.99s                              
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported          
Web Audio API not supported, using HTML5 Audio fallback                           
                                         
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support is available         
No audio support detected, using silent mode                                      
No audio support detected, using silent m
mode


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
                                         
                                         
                                         
                                         
                                         
                                         
                                         
                                         
                                         
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading   
Web Audio API initialized successfully    ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading   
Retry 1/3 for sounds/player/walk.mp3: Error: Network error                        
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41             
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                              
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Er
rror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/app-sound-integration.
.test.tsx > App Sound Integration > Error 
 Recovery > should handle audio reset erro
ors gracefully
Failed to reset audio system: Error: Rese
et failed
    at D:\FizzBash\TheWanderer\src\tests\
\app-sound-integration.test.tsx:559:52    
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
 ✓ src/tests/app-sound-integration.test.tsx (21 tests) 1795ms                     
   ✓ App Sound Integration (21)          
     ✓ Sound System Initialization (3)   
       ✓ should initialize audio system on app startup 122ms                      
       ✓ should not block game rendering during audio initialization 72ms         
       ✓ should handle audio initialization errors gracefully 74ms                
     ✓ Keyboard Controls Integration (4) 
       ✓ should handle game movement keys without interfering with audio 92ms     
       ✓ should handle mute keyboard shor
rtcut (Ctrl+M) 35ms
       ✓ should handle mute keyboard shor
rtcut (Cmd+M) on Mac 31ms
       ✓ should not trigger mute on M key
y without modifiers 48ms
     ✓ Game Event Sound Integration (3)  
       ✓ should emit sounds for player mo
ovement 97ms
       ✓ should stop all sounds when game
e ends 82ms
       ✓ should not emit sounds when game
e is over 46ms
     ✓ Audio Controls Integration (3)    
       ✓ should toggle mute via button cl
lick 62ms
       ✓ should open audio settings dialo
og 51ms
       ✓ should display audio error messa
ages when available 68ms
     ✓ Performance and Responsiveness (3)
       ✓ should not block user input duri
ing sound playback  340ms
       ✓ should handle multiple simultane
eous sound events 144ms
       ✓ should maintain game state consi
istency during audio operations 120ms     
     ✓ Error Recovery (5)
       ✓ should continue working when sou
und playback fails 98ms
       ✓ should handle audio context susp
pension gracefully 74ms
       ✓ should show fallback mode indica
ator when in fallback 34ms
       ✓ should show reset audio button w
when there are playback errors 53ms       
       ✓ should handle audio reset errors
s gracefully 47ms

 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27  
   └── should handle preload errors grace
efully 1.99s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 5/23

 Test Files 4 failed | 14 passed (21)    
      Tests 40 failed | 226 passed (306) 
   Start at 16:41:41
   Duration 4.58s
ode (vitest 7)ode (vitest 8)
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27 
   └── should handle fetch errors during preloading 436ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
   └── should retry failed loads 438ms   

 Test Files 4 failed | 14 passed (21)    
      Tests 42 failed | 246 passed (306) 
   Start at 16:41:41
   Duration 5.16s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Web Audio API initialized successfully   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27 
   └── should handle fetch errors during 
 preloading 869ms
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 10/23

 Test Files 4 failed | 14 passed (21)    
      Tests 42 failed | 247 passed (306) 
   Start at 16:41:41
   Duration 5.59s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                   
Retry 1/3 for sounds/player/walk.mp3: Error: Invalid audio                        
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Erro
or: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: 
 Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Err
ror: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Erro
or: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Er
rror: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Retry 2/3 for sounds/player/walk.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Retry 2/3 for sounds/player/dig.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Retry 2/3 for sounds/boulder/Whoosh.mp3: 
 Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Retry 2/3 for sounds/arrow/twang.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Retry 2/3 for sounds/arrow/thud.mp3: Erro
or: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Retry 2/3 for sounds/player/death.mp3: Er
rror: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27 
   └── should handle fetch errors during 
 preloading 869ms
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 10/23

 Test Files 4 failed | 14 passed (21)    
      Tests 42 failed | 247 passed (306) 
   Start at 16:41:41
   Duration 5.59s

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 23/27 
   └── should handle fetch errors during preloading 1.41s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
   └── should handle decode errors 444ms 

 Test Files 4 failed | 14 passed (21)    
      Tests 42 failed | 247 passed (306) 
   Start at 16:41:41
   Duration 6.13s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Retry 2/3 for sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Retry 2/3 for sounds/player/dig.mp3: Erro
or: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Retry 2/3 for sounds/boulder/Whoosh.mp3: 
 Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Retry 2/3 for sounds/arrow/twang.mp3: Err
ror: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Retry 2/3 for sounds/arrow/thud.mp3: Erro
or: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Retry 2/3 for sounds/player/death.mp3: Er
rror: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Failed to load PLAYER_WALK from sounds/pl
layer/walk.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Load error for PLAYER_WALK: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Failed to load PLAYER_DIG from sounds/pla
ayer/dig.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Load error for PLAYER_DIG: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Failed to load BOULDER_MOVE from sounds/b
boulder/Whoosh.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Load error for BOULDER_MOVE: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Failed to load ARROW_MOVE from sounds/arr
row/twang.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Load error for ARROW_MOVE: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Failed to load COLLISION_THUD from sounds
s/arrow/thud.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Load error for COLLISION_THUD: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Failed to load DEATH_SOUND from sounds/pl
layer/death.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Load error for DEATH_SOUND: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Failed to load VICTORY_SOUND from sounds/
/environment/door-slam.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Load error for VICTORY_SOUND: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Failed to load DOOR_SLAM from sounds/envi
ironment/door-slam.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Load error for DOOR_SLAM: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Failed to load DIAMOND_COLLECT from sound
ds/environment/door-slam.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle fetch errors during preloading   
Load error for DIAMOND_COLLECT: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\
\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 10/23
   └── should handle decode errors 984ms 

 Test Files 4 failed | 14 passed (21)    
      Tests 42 failed | 248 passed (306) 
   Start at 16:41:41
   Duration 6.67s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading   
Preloaded 0 sounds                       
                                         
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading    
Web Audio API initialized successfully   
                                         
                                         
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 10/23
   └── should handle decode errors 984ms 

 Test Files 4 failed | 14 passed (21)    
      Tests 42 failed | 248 passed (306) 
   Start at 16:41:41
   Duration 6.67s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading    
Retry 1/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31          
Retry 1/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31          
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/arrow/twang.mp3: Err
ror: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/arrow/thud.mp3: Erro
or: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/player/death.mp3: Er
rror: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/door-sla
am.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 10/23
   └── should handle decode errors 984ms 

 Test Files 4 failed | 14 passed (21)    
      Tests 42 failed | 248 passed (306) 
   Start at 16:41:41
   Duration 6.67s

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during preloading 389ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
   └── should handle decode errors 1.42s 

 Test Files 4 failed | 14 passed (21)    
      Tests 42 failed | 248 passed (306) 
   Start at 16:41:41
   Duration 7.11s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Audio context suspended for 5 seconds. Click anywhere to enable audio.


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during preloading 925ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 248 passed (306) 
   Start at 16:41:41
   Duration 7.65s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                   
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Invalid audio      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Load error for PLAYER_WALK: Error: Invali
id audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Failed to load PLAYER_DIG from sounds/pla
ayer/dig.mp3: Error: Invalid audio        
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Load error for PLAYER_DIG: Error: Invalid
d audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Failed to load BOULDER_MOVE from sounds/b
boulder/Whoosh.mp3: Error: Invalid audio  
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Load error for BOULDER_MOVE: Error: Inval
lid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Failed to load ARROW_MOVE from sounds/arr
row/twang.mp3: Error: Invalid audio       
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Load error for ARROW_MOVE: Error: Invalid
d audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Failed to load COLLISION_THUD from sounds
s/arrow/thud.mp3: Error: Invalid audio    
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Load error for COLLISION_THUD: Error: Inv
valid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Failed to load DEATH_SOUND from sounds/pl
layer/death.mp3: Error: Invalid audio     
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Load error for DEATH_SOUND: Error: Invali
id audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Failed to load VICTORY_SOUND from sounds/
/environment/door-slam.mp3: Error: Invalid
d audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Load error for VICTORY_SOUND: Error: Inva
alid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Failed to load DOOR_SLAM from sounds/envi
ironment/door-slam.mp3: Error: Invalid aud
dio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Load error for DOOR_SLAM: Error: Invalid 
 audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Failed to load DIAMOND_COLLECT from sound
ds/environment/door-slam.mp3: Error: Inval
lid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> WebAudioManager > error recovery > shoul
ld handle decode errors
Load error for DIAMOND_COLLECT: Error: In
nvalid audio
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:233:
:68
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during p
preloading 925ms
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 11/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 248 passed (306) 
   Start at 16:41:41
   Duration 7.65s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                   
Preloaded 0 sounds                       
                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                  
Web Audio API initialized successfully   
                                         
                                         
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during p
preloading 925ms
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 11/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 248 passed (306) 
   Start at 16:41:41
   Duration 7.65s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                  
Retry 1/3 for sounds/player/walk.mp3: Error: 404                                  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:246:44                                       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                              
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/runner/dist/
/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Retry 2/3 for sounds/player/walk.mp3: Err
ror: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Retry 2/3 for sounds/player/dig.mp3: Erro
or: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Retry 2/3 for sounds/boulder/Whoosh.mp3: 
 Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Retry 2/3 for sounds/arrow/twang.mp3: Err
ror: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Retry 2/3 for sounds/arrow/thud.mp3: Erro
or: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Retry 2/3 for sounds/player/death.mp3: Er
rror: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Retry 2/3 for sounds/environment/door-sla
am.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during p
preloading 925ms
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 11/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 248 passed (306) 
   Start at 16:41:41
   Duration 7.65s

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during preloading 1.47s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23
   └── should try multiple formats 488ms 

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 248 passed (306) 
   Start at 16:41:41
   Duration 8.19s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during preloading 1.80s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 249 passed (306) 
   Start at 16:41:41
   Duration 8.52s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should preload sounds with format filtering                     
Failed to preload PLAYER_WALK: TypeError: audio.load is not a function            
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27         
    at new Promise (<anonymous>)         
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23         
    at Array.map (<anonymous>)           
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:305:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload PLAYER_DIG: TypeError: 
 audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:305:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload BOULDER_MOVE: TypeError
r: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:305:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload ARROW_MOVE: TypeError: 
 audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:305:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload COLLISION_THUD: TypeErr
ror: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:305:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DEATH_SOUND: TypeError:
: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:305:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload VICTORY_SOUND: TypeErro
or: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:305:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DOOR_SLAM: TypeError: a
audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:305:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DIAMOND_COLLECT: TypeEr
rror: audio.load is not a function        
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:305:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during p
preloading 1.80s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 12/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 249 passed (306) 
   Start at 16:41:41
   Duration 8.52s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should preload sounds with format filtering                     
HTML5 Audio preloaded 0 sounds           
                                         
                                         
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]               
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during preloading 1.80s                          
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 12/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 249 passed (306) 
   Start at 16:41:41
   Duration 8.52s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                               
Failed to preload PLAYER_WALK: Error: No supported format found for PLAYER_WALK   
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:27         
    at Array.map (<anonymous>)           
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:953:59)                
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:320:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
Failed to preload PLAYER_DIG: Error: No s
supported format found for PLAYER_DIG     
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:320:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
Failed to preload BOULDER_MOVE: Error: No
o supported format found for BOULDER_MOVE 
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:320:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
Failed to preload ARROW_MOVE: Error: No s
supported format found for ARROW_MOVE     
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:320:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
Failed to preload COLLISION_THUD: Error: 
 No supported format found for COLLISION_T
THUD
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:320:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
Failed to preload DEATH_SOUND: Error: No 
 supported format found for DEATH_SOUND   
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:320:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
Failed to preload VICTORY_SOUND: Error: N
No supported format found for VICTORY_SOUN
ND
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:320:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
Failed to preload DOOR_SLAM: Error: No su
upported format found for DOOR_SLAM       
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:320:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)
Failed to preload DIAMOND_COLLECT: Error:
: No supported format found for DIAMOND_CO
OLLECT
    at D:\FizzBash\TheWanderer\src\audio\
\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D
D:\FizzBash\TheWanderer\src\audio\managers
s\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\
\audio\enhanced-audio-manager.test.ts:320:
:31
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:155:11
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:752:26
    at file:///D:/FizzBash/TheWanderer/no
ode_modules/@vitest/runner/dist/chunk-hook
ks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBas
sh/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWa
anderer/node_modules/@vitest/runner/dist/c
chunk-hooks.js:1574:12)


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during p
preloading 1.80s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 12/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 249 passed (306) 
   Start at 16:41:41
   Duration 8.52s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                               
HTML5 Audio preloaded 0 sounds           
                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > loading state > should provide optimization report           
HTML5AudioManager report: {              
  "totalSounds": 0,                      
  "loadedSounds": 0,
  "failedSounds": 0,
  "globalRecommendations": [
    "Consider using Web Audio API for bet
tter performance",
    "HTML5 Audio has limited optimization
n capabilities"
  ]
}

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> createAudioManager factory > should crea
ate WebAudioManager when Web Audio API is 
 available
Web Audio API initialized successfully   


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during p
preloading 1.80s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 12/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 249 passed (306) 
   Start at 16:41:41
   Duration 8.52s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is available                           
Web Audio API not supported, using HTML5 Audio fallback                           
                                         
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support                                       
No audio support detected, using silent m
mode
No audio support detected, using silent m
mode


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during p
preloading 1.80s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 12/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 249 passed (306) 
   Start at 16:41:41
   Duration 8.52s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality                                
Web Audio API initialized successfully   
                                         
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality                                
Preloaded 9 sounds                       

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> integration with existing functionality 
 > should maintain existing mute functiona
ality
Web Audio API initialized successfully   

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> integration with existing functionality 
 > should maintain existing mute functiona
ality
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> integration with existing functionality 
 > should maintain existing cleanup functi
ionality
Web Audio API initialized successfully   

stdout | src/tests/audio/enhanced-audio-m
manager.test.ts > Enhanced Audio Manager >
> integration with existing functionality 
 > should maintain existing cleanup functi
ionality
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27 
   └── should handle HTTP errors during p
preloading 1.80s
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts 12/23

 Test Files 4 failed | 14 passed (21)    
      Tests 43 failed | 249 passed (306) 
   Start at 16:41:41
   Duration 8.52s
ode (vitest 2) ❯ src/tests/audio/enhanced-audio-manager.test.ts (23 tests | 5 failed) 6139ms    
   ❯ Enhanced Audio Manager (23)
     ❯ WebAudioManager (12)
       ✓ initialization (2)
         X✓ should initialize with Web Audio API support 8ms
         X✓ should handle audio context suspension 3ms
       ❯ enhanced preloading (4)
         × should preload sounds with progress tracking 16ms
         × should apply optimization during preloading 7ms
         × should handle loading failures
s gracefully 2030ms
         × should skip preloading in fall
lback mode 6ms
       ✓ optimization reporting (2)      
         ✓ should provide optimization re
eport 4ms
         ✓ should handle empty buffer set
t 4ms
       ✓ loading state management (1)    
         ✓ should track loading state cor
rrectly 3ms
       ❯ error recovery (2)
         ✓ should retry failed loads  101
18ms
         × should handle decode errors 20
013ms
       ✓ format fallback (1)
         ✓ should try multiple formats  1
1009ms
     ✓ HTML5AudioManager (5)
       ✓ initialization (1)
         ✓ should initialize with HTML5 A
Audio support 1ms
       ✓ preloading with format optimizat
tion (2)
         ✓ should preload sounds with for
rmat filtering 3ms
         ✓ should handle unsupported form
mats 3ms
       ✓ loading state (2)
         ✓ should provide loading state 1
1ms
         ✓ should provide optimization re
eport 1ms
     ✓ createAudioManager factory (3)    
       ✓ should create WebAudioManager wh
hen Web Audio API is available 1ms        
       ✓ should create HTML5AudioManager 
 when only HTML5 Audio is available 0ms   
       ✓ should create SilentAudioManager
r when no audio support 0ms
     ✓ integration with existing function
nality (3)
       ✓ should maintain existing playSou
und functionality 3ms
       ✓ should maintain existing mute fu
unctionality 1ms
       ✓ should maintain existing cleanup
p functionality 1ms

 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 25/27 
   └── should handle audio decoding error
rs 448ms

 Test Files 5 failed | 14 passed (21)    
      Tests 43 failed | 261 passed (306) 
   Start at 16:41:41
   Duration 9.17s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading    
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31          
    at runNextTicks (node:internal/process/task_queues:65:5)                      
    at listOnTimeout (node:internal/timers:555:9)                                 
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Load error for PLAYER_WALK: Error: HTTP 4
404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Failed to load PLAYER_DIG from sounds/pla
ayer/dig.mp3: Error: HTTP 404: Not Found  
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Load error for PLAYER_DIG: Error: HTTP 40
04: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Failed to load BOULDER_MOVE from sounds/b
boulder/Whoosh.mp3: Error: HTTP 404: Not F
Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Load error for BOULDER_MOVE: Error: HTTP 
 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Failed to load ARROW_MOVE from sounds/arr
row/twang.mp3: Error: HTTP 404: Not Found 
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Load error for ARROW_MOVE: Error: HTTP 40
04: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Failed to load COLLISION_THUD from sounds
s/arrow/thud.mp3: Error: HTTP 404: Not Fou
und
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Load error for COLLISION_THUD: Error: HTT
TP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Failed to load DEATH_SOUND from sounds/pl
layer/death.mp3: Error: HTTP 404: Not Foun
nd
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Load error for DEATH_SOUND: Error: HTTP 4
404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Failed to load VICTORY_SOUND from sounds/
/environment/door-slam.mp3: Error: HTTP 40
04: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Load error for VICTORY_SOUND: Error: HTTP
P 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Failed to load DOOR_SLAM from sounds/envi
ironment/door-slam.mp3: Error: HTTP 404: N
Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Load error for DOOR_SLAM: Error: HTTP 404
4: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/proces
ss/task_queues:65:5)
    at listOnTimeout (node:internal/timer
rs:555:9)
    at processTimers (node:internal/timer
rs:529:7)

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Failed to load DIAMOND_COLLECT from sound
ds/environment/door-slam.mp3: Error: HTTP 
 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31

stderr | src/tests/audio-manager.test.ts 
 > Audio Manager > Error Handling > should
d handle HTTP errors during preloading    
Load error for DIAMOND_COLLECT: Error: HT
TTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\
\managers\asset-loader.ts:168:31


 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 25/27 
   └── should handle audio decoding error
rs 448ms

 Test Files 5 failed | 14 passed (21)    
      Tests 43 failed | 261 passed (306) 
   Start at 16:41:41
   Duration 9.17s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading    
Preloaded 0 sounds                       
                                         
                                         
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]               
 ❯ src/tests/audio-manager.test.ts 25/27 
   └── should handle audio decoding errors 448ms                                  

 Test Files 5 failed | 14 passed (21)    
      Tests 43 failed | 261 passed (306) 
   Start at 16:41:41
   Duration 9.17s

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 25/27 
   └── should handle audio decoding errors 1.42s

 Test Files 5 failed | 14 passed (21)    
      Tests 43 failed | 261 passed (306) 
   Start at 16:41:41
   Duration 10.14s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle playback errors gracefully       
Web Audio API initialized successfully   


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 26/27 

 Test Files 5 failed | 14 passed (21)    
      Tests 43 failed | 262 passed (306) 
   Start at 16:41:41
   Duration 10.58s
 ❯ src/tests/audio-manager.test.ts (27 tests | 3 failed) 8190ms
   ❯ Audio Manager (27)
     ❯ WebAudioManager (12)
       ✓ should initialize with Web Audio API support 7ms
       × should handle muted state correctly 19ms
       ✓ should load muted preference from localStorage 7ms
       ✓ should handle localStorage error
rs gracefully 1ms
       ✓ should preload sounds successful
lly 5ms
       ✓ should handle preload errors gra
acefully  2027ms
       ✓ should play sound with default o
options 3ms
       ✓ should play sound with custom op
ptions 2ms
       ✓ should not play sound when muted
d 2ms
       ✓ should handle missing sound buff
fer gracefully 1ms
       ✓ should cleanup resources properl
ly 1ms
       × should handle audio context crea
ation failure 7ms
     ✓ HTML5AudioManager (6)
       ✓ should initialize with HTML5 Aud
dio support 1ms
       ✓ should handle muted state correc
ctly 1ms
       ✓ should preload sounds using HTML
L5 Audio 8ms
       ✓ should play sound with HTML5 Aud
dio 1ms
       ✓ should not play sound when muted
d 1ms
       ✓ should cleanup audio elements 1m
ms
     ✓ SilentAudioManager (2)
       ✓ should initialize in silent mode
e 1ms
       ✓ should handle all operations sil
lently 1ms
     ✓ createAudioManager factory (3)    
       ✓ should create WebAudioManager wh
hen Web Audio API is supported 1ms        
       ✓ should create HTML5AudioManager 
 when only HTML5 Audio is supported 0ms   
       ✓ should create SilentAudioManager
r when no audio support is available 0ms  
     ❯ Error Handling (4)
       ✓ should handle fetch errors durin
ng preloading  2026ms
       ✓ should handle HTTP errors during
g preloading  2031ms
       ✓ should handle audio decoding err
rors  2029ms
       × should handle playback errors gr
racefully 3ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Suites 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/audio/__tests__/audio-settings
s-integration.test.tsx [ src/audio/__tests
s__/audio-settings-integration.test.tsx ] 
ReferenceError: jest is not defined      
 ❯ src/audio/__tests__/audio-settings-int
tegration.test.tsx:30:17
     28| // Mock Web Audio API
     29| const mockAudioContext = {      
     30|     createGain: jest.fn(() => ({
       |X^
     31|Xconnect: jest.fn(),     
     32|Xgain: {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/45]⎯


⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 44 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/audio-context.test.tsx >
> AudioContext > should handle initializat
tion errors
AssertionError: expected 'true' to be 'fa
alse' // Object.is equality

Expected: "false"
Received: "true"

 ❯ src/tests/audio-context.test.tsx:82:63
     80|X});
     81|
     82|Xexpect(screen.getByTest…
       |                                 
^
     83|Xexpect(screen.getByTest…
     84|Xexpect(screen.getByTest…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/45]⎯

 FAIL  src/tests/audio-context.test.tsx >
> AudioContext > should call preloadSounds
s during initialization
AssertionError: expected "spy" to be call
led 1 times, but got 0 times
 ❯ src/tests/audio-context.test.tsx:98:48
     96|X});
     97|
     98|Xexpect(mockAudioManager…
       |                                 
^
     99|     });
    100|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/45]⎯

 FAIL  src/tests/audio-context.test.tsx >
> AudioContext > should allow manual clean
nup
AssertionError: expected "spy" to be call
led 1 times, but got 0 times
 ❯ src/tests/audio-context.test.tsx:124:4
42
    122|
    123|Xexpect(screen.getByTest…
    124|Xexpect(mockAudioManager…
       |                                 
^
    125|     });
    126|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/45]⎯

 FAIL  src/tests/audio-context.test.tsx >
> AudioContext > should prevent multiple s
simultaneous initializations
AssertionError: expected "spy" to be call
led 1 times, but got 0 times
 ❯ src/tests/audio-context.test.tsx:143:4
48
    141|
    142|X// Should not call prel…
    143|Xexpect(mockAudioManager…
       |                                 
^
    144|     });
    145|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/45]⎯

 FAIL  src/tests/audio-context.test.tsx >
> AudioContext > should handle non-Error e
exceptions during initialization
AssertionError: expected 'null' to be 'Fa
ailed to initialize audio' // Object.is eq
quality

Expected: "Failed to initialize audio"   
Received: "null"

 ❯ src/tests/audio-context.test.tsx:170:5
57
    168|X});
    169|
    170|Xexpect(screen.getByTest…
       |                                 
^
    171|     });
    172| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useSound > should provide pl
laySound function that calls audio manager
AssertionError: expected "spy" to be call
led with arguments: [ 'test-sound', undefi
ined ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:63:48  
     61|X});
     62|
     63|Xexpect(mockAudioMan…
       |                                 
^
     64|X});
     65|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useSound > should provide pl
laySound function with options
AssertionError: expected "spy" to be call
led with arguments: [ 'test-sound', …(1) ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:82:48  
     80|X});
     81|
     82|Xexpect(mockAudioMan…
       |                                 
^
     83|X});
     84|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useSound > should return mut
ted state from audio manager
AssertionError: expected false to be true
e // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/tests/audio-hooks.test.tsx:97:44  
     95|X});
     96|
     97|Xexpect(result.curre…
       |                                 
^
     98|X});
     99|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useSound > should toggle mut
te state
AssertionError: expected "spy" to be call
led with arguments: [ true ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:116:47 
    114|X});
    115|
    116|Xexpect(mockAudioMan…
       |                                 
^
    117|X});
    118|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[10/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useSound > should handle pla
aySound errors gracefully
AssertionError: expected "error" to be ca
alled with arguments: [ …(2) ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:165:32 
    163|X});
    164|
    165|Xexpect(consoleSpy).…
       |X^
    166|XconsoleSpy.mockRest…
    167|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[11/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useAudioSettings > should lo
oad volume from localStorage
AssertionError: expected 0.8 to be 0.6 //
/ Object.is equality

- Expected
+ Received

- 0.6
+ 0.8

 ❯ src/tests/audio-hooks.test.tsx:186:43 
    184|X});
    185|
    186|Xexpect(result.curre…
       |                                 
^
    187|X});
    188|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[12/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useAudioSettings > should se
et muted state through audio manager      
AssertionError: expected "spy" to be call
led with arguments: [ true ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:213:47 

    211|X});
    212|
    213|Xexpect(mockAudioMan…
       |                                 
^
    214|X});
    215|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[13/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useAudioSettings > should se
et volume and save to localStorage        
AssertionError: expected "spy" to be call
led with arguments: [ 'audio-volume', '0.7
7' ]

Received:

  1st spy call:

  [
-   "audio-volume",
-   "0.7",
+   "wanderer-audio-settings",
+   "{\"isMuted\":false,\"globalVolume\":
:0.8,\"categoryVolumes\":{\"movement\":0.8
8,\"collision\":0.9,\"gameState\":1}}",   
  ]

  2nd spy call:

  [
-   "audio-volume",
-   "0.7",
+   "wanderer-audio-settings",
+   "{\"isMuted\":false,\"globalVolume\":
:0.7,\"categoryVolumes\":{\"movement\":0.8
8,\"collision\":0.9,\"gameState\":1}}",   
  ]


Number of calls: 2

 ❯ src/tests/audio-hooks.test.tsx:226:46 
    224|
    225|Xexpect(result.curre…
    226|Xexpect(mockLocalSto…
       |                                 
^
    227|X});
    228|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[14/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useAudioSettings > should re
eset to defaults
AssertionError: expected "spy" to be call
led with arguments: [ false ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:262:47 
    260|
    261|Xexpect(result.curre…
    262|Xexpect(mockAudioMan…
       |                                 
^
    263|Xexpect(mockLocalSto…
    264|Xexpect(mockLocalSto…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[15/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useAudioSettings > should ha
andle localStorage errors gracefully      
AssertionError: expected "warn" to be cal
lled with arguments: [ …(2) ]

Received:

  1st warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to save audio settings:",    
+   Error {
+     "message": "Storage error",        
+   },
  ]

  2nd warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "AudioContext not supported",        
  ]

  3rd warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "No supported audio format found for 
 player_walk",
  ]

  4th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to create audio element for p
player_walk",
  ]

  5th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "No supported audio format found for 
 player_dig",
  ]

  6th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to create audio element for p
player_dig",
  ]

  7th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "No supported audio format found for 
 boulder_move",
  ]

  8th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to create audio element for b
boulder_move",
  ]

  9th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "No supported audio format found for 
 arrow_move",
  ]

  10th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to create audio element for a
arrow_move",
  ]

  11th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "No supported audio format found for 
 collision_thud",
  ]

  12th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to create audio element for c
collision_thud",
  ]

  13th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "No supported audio format found for 
 death_sound",
  ]

  14th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to create audio element for d
death_sound",
  ]

  15th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "No supported audio format found for 
 victory_sound",
  ]

  16th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to create audio element for v
victory_sound",
  ]

  17th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "No supported audio format found for 
 door_slam",
  ]

  18th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to create audio element for d
door_slam",
  ]

  19th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "No supported audio format found for 
 diamond_collect",
  ]

  20th warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to create audio element for d
diamond_collect",
  ]

  21st warn call:

  [
-   "Failed to save volume preference:", 
-   Any<Error>,
+   "Failed to save audio settings:",    
+   Error {
+     "message": "Storage error",        
+   },
  ]


Number of calls: 21

 ❯ src/tests/audio-hooks.test.tsx:282:32 
    280|X});
    281|
    282|Xexpect(consoleSpy).…
       |X^
    283|XconsoleSpy.mockRest…
    284|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[16/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > A
Audio Hooks > useAudioSettings > should ha
andle audio manager not initialized for se
etMuted
AssertionError: expected "warn" to be cal
lled with arguments: [ 'Audio manager not 
 initialized' ]

Received:

  1st warn call:

  [
-   "Audio manager not initialized",     
+   "AudioContext not supported",        
  ]

  2nd warn call:

  [
-   "Audio manager not initialized",     
+   "No supported audio format found for 
 player_walk",
  ]

  3rd warn call:

  [
-   "Audio manager not initialized",     
+   "Failed to create audio element for p
player_walk",
  ]

  4th warn call:

  [
-   "Audio manager not initialized",     
+   "No supported audio format found for 
 player_dig",
  ]

  5th warn call:

  [
-   "Audio manager not initialized",     
+   "Failed to create audio element for p
player_dig",
  ]

  6th warn call:

  [
-   "Audio manager not initialized",     
+   "No supported audio format found for 
 boulder_move",
  ]

  7th warn call:

  [
-   "Audio manager not initialized",     
+   "Failed to create audio element for b
boulder_move",
  ]

  8th warn call:

  [
-   "Audio manager not initialized",     
+   "No supported audio format found for 
 arrow_move",
  ]

  9th warn call:

  [
-   "Audio manager not initialized",     
+   "Failed to create audio element for a
arrow_move",
  ]

  10th warn call:

  [
-   "Audio manager not initialized",     
+   "No supported audio format found for 
 collision_thud",
  ]

  11th warn call:

  [
-   "Audio manager not initialized",     
+   "Failed to create audio element for c
collision_thud",
  ]

  12th warn call:

  [
-   "Audio manager not initialized",     
+   "No supported audio format found for 
 death_sound",
  ]

  13th warn call:

  [
-   "Audio manager not initialized",     
+   "Failed to create audio element for d
death_sound",
  ]

  14th warn call:

  [
-   "Audio manager not initialized",     
+   "No supported audio format found for 
 victory_sound",
  ]

  15th warn call:

  [
-   "Audio manager not initialized",     
+   "Failed to create audio element for v
victory_sound",
  ]

  16th warn call:

  [
-   "Audio manager not initialized",     
+   "No supported audio format found for 
 door_slam",
  ]

  17th warn call:

  [
-   "Audio manager not initialized",     
+   "Failed to create audio element for d
door_slam",
  ]

  18th warn call:

  [
-   "Audio manager not initialized",     
+   "No supported audio format found for 
 diamond_collect",
  ]

  19th warn call:

  [
-   "Audio manager not initialized",     
+   "Failed to create audio element for d
diamond_collect",
  ]


Number of calls: 19


 ❯ src/tests/audio-hooks.test.tsx:300:32
    298|X});
    299|
    300|Xexpect(consoleSpy).…
       |X^
    301|XconsoleSpy.mockRest…
    302|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[17/45]⎯

 FAIL  src/tests/audio-manager.test.ts > 
 Audio Manager > WebAudioManager > should 
 handle muted state correctly
AssertionError: expected "spy" to be call
led with arguments: [ 'audio-muted', 'true
e' ]

Received:

  1st spy call:

  [
-   "audio-muted",
+   "wanderer-audio-muted",
    "true",
  ]


Number of calls: 1

 ❯ src/tests/audio-manager.test.ts:181:46
    179|Xmanager.setMuted(tr…
    180|Xexpect(manager.isMu…
    181|Xexpect(mockLocalSto…
       |                                 
^
    182|
    183|Xmanager.setMuted(fa…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[18/45]⎯

 FAIL  src/tests/audio-manager.test.ts > 
 Audio Manager > WebAudioManager > should 
 handle audio context creation failure    
AssertionError: expected true to be false
e // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/tests/audio-manager.test.ts:299:43
    297|
    298|Xconst manager = new…
    299|Xexpect(manager.isSu…
       |                                 
^
    300|X});
    301|     });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[19/45]⎯

 FAIL  src/tests/audio-manager.test.ts > 
 Audio Manager > Error Handling > should h
handle playback errors gracefully
AssertionError: expected "error" to be ca
alled with arguments: [ …(2) ]

Received:

  1st error call:

  [
-   "Failed to create audio source:",    
-   Any<Error>,
+   "Play error for test_sound:",        
+   Error {
+     "message": "Source creation failed"
",
+   },
  ]


Number of calls: 1

 ❯ src/tests/audio-manager.test.ts:513:37
    511|
    512|X// Verify that erro…
    513|Xexpect(consoleError…
       |                                 
    ^
    514|
    515|X// Restore console.…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[20/45]⎯

 FAIL  src/audio/__tests__/audio-error-ha
andling.test.ts > Audio Error Handling and
d Fallbacks > Audio Manager Factory > shou
uld create WebAudioManager when Web Audio 
 API is supported

AssertionError: expected false to be true
e // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts:96:43
     94|
     95|Xexpect(isWebAudioSu…
     96|Xexpect(manager.isSu…
       |                                 
^
     97|X});
     98|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[21/45]⎯

 FAIL  src/audio/__tests__/audio-error-ha
andling.test.ts > Audio Error Handling and
d Fallbacks > SilentAudioManager > should 
 implement all AudioManager methods withou
ut errors
AssertionError: expected true to be false
e // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts:153:39
    151|Xexpect(() => manage…
    152|Xexpect(() => manage…
    153|Xexpect(manager.isMu…
       |                                 
      ^
    154|Xexpect(manager.isSu…
    155|Xexpect(() => manage…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[22/45]⎯

 FAIL  src/audio/__tests__/audio-error-ha
andling.test.ts > Audio Error Handling and
d Fallbacks > Error Recovery > should hand
dle errors during audio context creation  
AssertionError: expected WebAudioManager{
{} to be an instance of SilentAudioManager
 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts:211:29
    209|
    210|X// Should fall back…
    211|Xexpect(manager).toB…
       |X^   
    212|Xexpect(console.erro…
    213|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[23/45]⎯

 FAIL  src/audio/__tests__/audio-error-ha
andling.test.ts > Audio Error Handling and
d Fallbacks > Error Recovery > should hand
dle errors during sound playback
AssertionError: expected "playSound" to b
be called with arguments: [ 'test', undefi
ined ]

Received:

  1st playSound call:

  [
    "test",
-   undefined,
  ]


Number of calls: 1

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts:224:34
    222|Xmanager.playSound('…
    223|
    224|Xexpect(playSoundSpy…
       |                                 
 ^
    225|Xexpect(() => manage…
    226|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[24/45]⎯

 FAIL  src/audio/__tests__/audio-error-ha
andling.test.ts > Audio Error Handling and
d Fallbacks > Autoplay Policy Handling > s
should detect autoplay restrictions       
AssertionError: expected false to be true
e // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts:282:43
    280|
    281|X// Should still cre…
    282|Xexpect(manager.isSu…
       |                                 
^
    283|
    284|X// Event listeners …

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[25/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Web Audio API Unavailable > should
d handle AudioContext creation failure    
AssertionError: expected true to be false
e // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/audio/__tests__/error-handling.tes
st.ts:135:43
    133|
    134|X// Should handle th…
    135|Xexpect(manager.isSu…
       |                                 
^
    136|Xexpect(console.erro…
    137|Xexpect.stringCo…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[26/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Audio Context Suspension Handling 
 > should handle suspended audio context d
due to autoplay policies

AssertionError: expected "spy" to be call
led at least once
 ❯ src/audio/__tests__/error-handling.tes
st.ts:160:45
    158|
    159|X// Should attempt t…
    160|Xexpect(suspendedCon…
       |                                 
^
    161|X});
    162|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[27/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Audio Context Suspension Handling 
 > should handle audio context resume fail
lure
AssertionError: expected "warn" to be cal
lled with arguments: [ StringContaining{…}
}, Any<Error> ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.tes
st.ts:179:34
    177|
    178|X// Should handle re…
    179|Xexpect(console.warn…
       |                                 
 ^
    180|Xexpect.stringCo…
    181|Xexpect.any(Erro…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[28/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Sound File Loading Errors > should
d handle failed sound file loads gracefull
ly
AssertionError: expected "error" to be ca
alled with arguments: [ StringContaining{…
…}, Any<Error> ]

Received:

  1st error call:

  [
-   StringContaining "Failed to load soun
nd",
-   Any<Error>,
+   "Load error for PLAYER_WALK:",       
+   Error {
+     "message": "No supported audio form
mats found for PLAYER_WALK",
+   },
  ]

  2nd error call:

  [
-   StringContaining "Failed to load soun
nd",
-   Any<Error>,
+   "Load error for PLAYER_DIG:",        
+   Error {
+     "message": "No supported audio form
mats found for PLAYER_DIG",
+   },
  ]

  3rd error call:

  [
-   StringContaining "Failed to load soun
nd",
-   Any<Error>,
+   "Load error for BOULDER_MOVE:",      
+   Error {
+     "message": "No supported audio form
mats found for BOULDER_MOVE",
+   },
  ]

  4th error call:

  [
-   StringContaining "Failed to load soun
nd",
-   Any<Error>,
+   "Load error for ARROW_MOVE:",        
+   Error {
+     "message": "No supported audio form
mats found for ARROW_MOVE",
+   },
  ]

  5th error call:

  [
-   StringContaining "Failed to load soun
nd",
-   Any<Error>,
+   "Load error for COLLISION_THUD:",    
+   Error {
+     "message": "No supported audio form
mats found for COLLISION_THUD",
+   },
  ]

  6th error call:

  [
-   StringContaining "Failed to load soun
nd",
-   Any<Error>,
+   "Load error for DEATH_SOUND:",       
+   Error {
+     "message": "No supported audio form
mats found for DEATH_SOUND",
+   },
  ]

  7th error call:

  [
-   StringContaining "Failed to load soun
nd",
-   Any<Error>,
+   "Load error for VICTORY_SOUND:",     
+   Error {
+     "message": "No supported audio form
mats found for VICTORY_SOUND",
+   },
  ]

  8th error call:

  [
-   StringContaining "Failed to load soun
nd",
-   Any<Error>,
+   "Load error for DOOR_SLAM:",
+   Error {
+     "message": "No supported audio form
mats found for DOOR_SLAM",
+   },
  ]

  9th error call:

  [
-   StringContaining "Failed to load soun
nd",
-   Any<Error>,
+   "Load error for DIAMOND_COLLECT:",   
+   Error {
+     "message": "No supported audio form
mats found for DIAMOND_COLLECT",
+   },
  ]


Number of calls: 9

 ❯ src/audio/__tests__/error-handling.tes
st.ts:224:35
    222|
    223|X// Should log the e…
    224|Xexpect(console.erro…
       |                                 
  ^
    225|Xexpect.stringCo…
    226|Xexpect.any(Erro…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[29/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Sound File Loading Errors > should
d retry failed sound loads
AssertionError: expected "spy" to be call
led 2 times, but got 0 times
 ❯ src/audio/__tests__/error-handling.tes
st.ts:250:31
    248|
    249|X// Should have retr…
    250|Xexpect(mockFetch).t…
       |X^ 
    251|X});
    252|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[30/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Sound File Loading Errors > should
d fall back to HTML5 audio when Web Audio 
 loading fails completely
AssertionError: expected "spy" to be call
led with arguments: [ ObjectContaining{…} 
 ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.tes
st.ts:262:42
    260|Xmanager.playSound('…
    261|
    262|Xexpect(window.dispa…
       |                                 
^
    263|Xexpect.objectCo…
    264|Xtype: 'audi…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[31/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > HTML5 Audio Fallback > should hand
dle HTML5 audio playback errors
AssertionError: expected "error" to be ca
alled with arguments: [ StringContaining{…
…}, Any<Error> ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.tes
st.ts:286:35

    284| 
    285|X// Should handle th…
    286|Xexpect(console.erro…
       |                                 
  ^
    287|Xexpect.stringCo…
    288|Xexpect.any(Erro…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[32/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > HTML5 Audio Fallback > should hand
dle autoplay blocked errors
AssertionError: expected "spy" to be call
led with arguments: [ 'click', Any<Functio
on>, …(1) ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.tes
st.ts:307:47
    305|
    306|X// Should set up au…
    307|Xexpect(document.add…
       |                                 
^
    308|X'click',        
    309|Xexpect.any(Func…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[33/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > HTML5 Audio Fallback > should hand
dle unsupported audio formats
AssertionError: expected "error" to be ca
alled with arguments: [ StringContaining{…
…}, Any<Error> ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.tes
st.ts:322:35
    320|Xawait expect(manage…
    321|
    322|Xexpect(console.erro…
       |                                 
  ^
    323|Xexpect.stringCo…
    324|Xexpect.any(Erro…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[34/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Error Recovery Mechanisms > should
d attempt on-demand loading when buffer no
ot found
AssertionError: expected "log" to be call
led with arguments: [ StringContaining{…} 
 ]

Received:

  1st log call:

  [
-   StringContaining "Attempting on-deman
nd load",
+   "Web Audio API initialized successful
lly",
  ]


Number of calls: 1

 ❯ src/audio/__tests__/error-handling.tes
st.ts:368:33
    366|
    367|X// Should attempt t…
    368|Xexpect(console.log)…
       |                                 
^
    369|Xexpect.stringCo…
    370|X);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[35/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Error Recovery Mechanisms > should
d validate audio buffers before playback  
AssertionError: expected "warn" to be cal
lled with arguments: [ …(2) ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.tes
st.ts:389:34
    387|
    388|X// Should detect an…
    389|Xexpect(console.warn…
       |                                 
 ^
    390|Xexpect.stringCo…
    391|Xexpect.any(Stri…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[36/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Browser-Specific Error Handling > 
 should handle Safari-specific audio conte
ext issues
AssertionError: expected "spy" to be call
led at least once
 ❯ src/audio/__tests__/error-handling.tes
st.ts:442:42
    440|
    441|X// Should handle Sa…
    442|Xexpect(safariContex…
       |                                 
^
    443|X});
    444|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[37/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Browser-Specific Error Handling > 
 should handle Chrome-specific audio conte
ext issues
AssertionError: expected "spy" to be call
led at least once
 ❯ src/audio/__tests__/error-handling.tes
st.ts:469:52
    467|
    468|X// Should handle Ch…
    469|Xexpect(chromeContex…
       |                                 
^
    470|X});
    471|     });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[38/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Error Event Emission > should emit
t error events for external handling      
AssertionError: expected "spy" to be call
led with arguments: [ ObjectContaining{…} 
 ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.tes
st.ts:481:42
    479|
    480|X// Should emit erro…
    481|Xexpect(window.dispa…
       |                                 
^
    482|Xexpect.objectCo…
    483|Xtype: 'audi…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[39/45]⎯

 FAIL  src/audio/__tests__/error-handling
g.test.ts > Audio Error Handling and Fallb
backs > Error Event Emission > should emit
t fallback events when switching audio man
nagers
AssertionError: expected "spy" to be call
led with arguments: [ ObjectContaining{…} 
 ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.tes
st.ts:501:42
    499|
    500|X// Should emit fall…
    501|Xexpect(window.dispa…
       |                                 
^
    502|Xexpect.objectCo…
    503|Xtype: 'audi…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[40/45]⎯

 FAIL  src/tests/audio/enhanced-audio-man
nager.test.ts > Enhanced Audio Manager > W
WebAudioManager > enhanced preloading > sh
hould preload sounds with progress trackin
ng
AssertionError: expected 0 to be greater 
 than 0
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts:148:50
    146|Xconst loadingSt…
    147|Xexpect(loadingS…
    148|Xexpect(loadingS…
       |                                 
^
    149|
    150|Xunsubscribe();  

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[41/45]⎯

 FAIL  src/tests/audio/enhanced-audio-man
nager.test.ts > Enhanced Audio Manager > W
WebAudioManager > enhanced preloading > sh
hould apply optimization during preloading
AssertionError: expected "spy" to be call
led at least once
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts:157:55
    155|
    156|X// Verify that …
    157|Xexpect(mockAudi…
       |                                 
^
    158|X});
    159|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[42/45]⎯

 FAIL  src/tests/audio/enhanced-audio-man
nager.test.ts > Enhanced Audio Manager > W
WebAudioManager > enhanced preloading > sh
hould handle loading failures gracefully  
AssertionError: expected 0 to be greater 
 than 0
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts:166:58
    164|
    165|Xconst loadingSt…
    166|Xexpect(loadingS…
       |                                 
^
    167|Xexpect(loadingS…
    168|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[43/45]⎯

 FAIL  src/tests/audio/enhanced-audio-man
nager.test.ts > Enhanced Audio Manager > W
WebAudioManager > enhanced preloading > sh
hould skip preloading in fallback mode    
AssertionError: expected "spy" to not be 
 called at all, but actually been called 9
9 times

Received:

  1st spy call:

    Array [
      "sounds/player/walk.mp3",
      Object {
        "signal": AbortSignal {},        
      },
    ]

  2nd spy call:

    Array [
      "sounds/player/dig.mp3",
      Object {
        "signal": AbortSignal {},        
      },
    ]

  3rd spy call:

    Array [
      "sounds/boulder/Whoosh.mp3",       
      Object {
        "signal": AbortSignal {},        
      },
    ]

  4th spy call:

    Array [
      "sounds/arrow/twang.mp3",
      Object {
        "signal": AbortSignal {},        
      },
    ]

  5th spy call:

    Array [
      "sounds/arrow/thud.mp3",
      Object {
        "signal": AbortSignal {},        
      },
    ]

  6th spy call:

    Array [
      "sounds/player/death.mp3",
      Object {
        "signal": AbortSignal {},        
      },
    ]

  7th spy call:

    Array [
      "sounds/environment/door-slam.mp3",
      Object {
        "signal": AbortSignal {},        
      },
    ]

  8th spy call:

    Array [
      "sounds/environment/door-slam.mp3",
      Object {
        "signal": AbortSignal {},        
      },
    ]

  9th spy call:

    Array [
      "sounds/environment/door-slam.mp3",
      Object {
        "signal": AbortSignal {},        
      },
    ]


Number of calls: 9

 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts:176:39
    174|Xawait manager.p…
    175|
    176|Xexpect(mockFetc…
       |                                 
      ^
    177|X});
    178|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[44/45]⎯

 FAIL  src/tests/audio/enhanced-audio-man
nager.test.ts > Enhanced Audio Manager > W
WebAudioManager > error recovery > should 
 handle decode errors
AssertionError: expected 0 to be greater 
 than 0
 ❯ src/tests/audio/enhanced-audio-manager
r.test.ts:238:58
    236|
    237|Xconst loadingSt…
    238|Xexpect(loadingS…
       |                                 
^
    239|X});
    240|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[45/45]⎯

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

Vitest caught 1 unhandled error during th
he test run.
This might cause false positive tests. Re
esolve unhandled errors to make sure your 
 tests are not affected.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: Preload failed
 ❯ SilentAudioManager.<anonymous> src/aud
dio/__tests__/audio-error-handling.test.ts
s:234:23
    232|
    233|Xmanager.preloadSoun…
    234|Xthrow new Error…
       |X^
    235|X});
    236|
 ❯ SilentAudioManager.mockCall node_modul
les/@vitest/spy/dist/index.js:96:15       
 ❯ SilentAudioManager.spy node_modules/ti
inyspy/dist/index.js:47:103
 ❯ src/audio/__tests__/audio-error-handli
ing.test.ts:240:35
 ❯ Proxy.assertThrows node_modules/chai/c
chai.js:2787:5
 ❯ Proxy.methodWrapper node_modules/chai/
/chai.js:1706:25
 ❯ Proxy.<anonymous> node_modules/@vitest
t/expect/dist/index.js:1088:12
 ❯ Proxy.overwritingMethodWrapper node_mo
odules/chai/chai.js:1755:33
 ❯ Proxy.<anonymous> node_modules/@vitest
t/expect/dist/index.js:1420:16
 ❯ Proxy.<anonymous> node_modules/@vitest
t/expect/dist/index.js:1029:14

This error originated in "src/audio/__tes
sts__/audio-error-handling.test.ts" test f
file. It doesn't mean the error was thrown
n inside the file itself, but while it was
s running.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯


 Test Files  7 failed | 14 passed (21)   
      Tests  44 failed | 262 passed (306)
     Errors  1 error
   Start at  16:41:41
   Duration  10.70s (transform 1.92s, set
tup 4.13s, collect 5.04s, tests 18.38s, en
nvironment 26.73s, prepare 5.43s)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
I can see there are several failing tests. Let me analyze the main issues and fix them systematically:

Jest vs Vitest compatibility issue - One test file is using jest instead of vi
Mock setup issues - Several tests have incorrect mock expectations
Audio context and localStorage key mismatches
Test assertion mismatches
Let me start by fixing the most critical issues:

Read file(s)

audio-settings-integration.test.tsx
Now I need to fix the jest vs vitest issue:


2 edits to file

audio-settings-integration.test.tsx


I also need to add the vi import:

Accepted edits to

audio-settings-integration.test.tsx


Now let me check some of the failing tests to understand the localStorage key issues:

Searched workspace
Looking for localStorage key usage to understand the mismatch
I can see the issue - the tests expect audio-muted but the actual implementation uses wanderer-audio-muted. Let me fix the test expectations:


2 edits to file

audio-manager.test.ts


Now let me check the audio hooks test for similar issues:

Searched workspace
Looking for audio-volume localStorage key usage
I can see that the audio hooks are using a different localStorage approach - they're storing everything in wanderer-audio-settings as a JSON object, not individual keys. Let me check the actual implementation:

Read file(s)

use-audio-settings.ts 20 - 41
Read file(s)

use-audio-settings.ts 40 - 61
Now I understand. The audio settings hook saves everything as a JSON object to wanderer-audio-settings, but the tests expect individual keys. Let me fix the audio hooks tests:

Error(s) while editing

Unable to replace text, trying a different approach...
Retry

Kiro
Including Steering Documents

typescript-standards.md
I'll run the npm test command with the specified flags to see what tests are failing and then resolve them.

Command
npm test -- --run --reporter=verbose
npm test -- --run --reporter=verbose
:\Windows\System32\cmd.exe - npm  test -- --run --reporter=verbosepm test --run --reporter=verbose
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run --reporter=verbose

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 4)ode (vitest 1)ode (vitest 5)ode (vitest 6)ode (vitest 8)ode (vitest 9)ode (vitest 11)ode (vitest 12)ode (vitest 13)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (21)
      Tests 0 passed (0)
   Start at 16:53:48
   Duration 897ms

 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]

 Test Files 0 passed (21)
      Tests 0 passed (0)
   Start at 16:53:48
   Duration 1.98s
(node:12824) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:29508) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:45960) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:55652) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:32868) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:60324) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]

 Test Files 0 passed (21)
      Tests 0 passed (0)
   Start at 16:53:48
   Duration 2.09s
(node:59388) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:18896) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:34312) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:16144) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:37968) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:11740) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:41144) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:51408) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:35872) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]

 Test Files 0 passed (21)
      Tests 0 passed (16)
   Start at 16:53:48
   Duration 2.64s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should initialize with Web Audio API support
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > initialization > should handle audio cont
text suspension
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > initialization > should handle audio cont
text suspension
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle muted state correctly
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should preload soun
nds with progress tracking
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should load muted preference from localStorage
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle localStorage errors gracefully
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/physics-integration-demo.test.ts 0/4
 ❯ src/tests/sound-event-integration.test.ts 1/37

 Test Files 0 passed (21)
      Tests 1 passed (184)
   Start at 16:53:48
   Duration 2.74s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
Failed to load test_sound from sounds/test.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:116
6:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/physics-integration-demo.test.ts 0/4
 ❯ src/tests/sound-event-integration.test.ts 1/37

 Test Files 0 passed (21)
      Tests 1 passed (184)
   Start at 16:53:48
   Duration 2.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should preload soun
nds with progress tracking
Preloaded 9 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should preload sounds successfully
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/physics-integration-demo.test.ts 0/4
 ❯ src/tests/sound-event-integration.test.ts 1/37

 Test Files 0 passed (21)
      Tests 1 passed (184)
   Start at 16:53:48
   Duration 2.74s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:132
2:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/physics-integration-demo.test.ts 0/4
 ❯ src/tests/sound-event-integration.test.ts 1/37

 Test Files 0 passed (21)
      Tests 1 passed (184)
   Start at 16:53:48
   Duration 2.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should apply optimi
ization during preloading
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should apply optimi
ization during preloading
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/physics-integration-demo.test.ts 0/4
 ❯ src/tests/sound-event-integration.test.ts 1/37

 Test Files 0 passed (21)
      Tests 1 passed (184)
   Start at 16:53:48
   Duration 2.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/physics-integration-demo.test.ts 0/4
 ❯ src/tests/sound-event-integration.test.ts 1/37

 Test Files 0 passed (21)
      Tests 1 passed (184)
   Start at 16:53:48
   Duration 2.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/physics-integration-demo.test.ts 0/4
 ❯ src/tests/sound-event-integration.test.ts 1/37

 Test Files 0 passed (21)
      Tests 1 passed (184)
   Start at 16:53:48
   Duration 2.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/physics-integration-demo.test.ts 0/4
 ❯ src/tests/sound-event-integration.test.ts 1/37

 Test Files 0 passed (21)
      Tests 1 passed (184)
   Start at 16:53:48
   Duration 2.74s
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Audio Manager Factory > should create WebAudioManager when Web Audio API is supported
Using Web Audio API

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error
r Handling and Fallbacks > Audio Manager Factory > should fall back to H
HTML5AudioManager when Web Audio API is not supported
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error
r Handling and Fallbacks > Audio Manager Factory > should fall back to S
SilentAudioManager when no audio is supported
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error
r Handling and Fallbacks > Audio Manager Factory > should create specifi
ic audio manager when requested
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error
r Handling and Fallbacks > SilentAudioManager > should implement all Aud
dioManager methods without errors
Silent Audio Manager initialized - no audio will be played

stdout | src/tests/physics-integration-demo.test.ts > Physics Integrati
ion Demo > should demonstrate boulder falling with sound events
Initial maze state:
Boulder at position (3,1), should fall to (3,2) then hit rock at (3,3) 
After physics simulation:
Sound events generated: 1
Boulder successfully fell from (3,1) to (3,2) with sound event

stdout | src/tests/physics-integration-demo.test.ts > Physics Integrati
ion Demo > should demonstrate boulder collision with sound events       
Boulder collision test:
Boulder at (1,1) surrounded by rocks - should not move
Boulder correctly stayed in place - no movement sounds generated       

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error
r Handling and Fallbacks > SilentAudioManager > should handle loading pr
rogress callbacks
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error
r Handling and Fallbacks > Error Recovery > should handle errors during 
 audio context creation
Using Web Audio API


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/physics-integration-demo.test.ts 0/4
 ❯ src/tests/sound-event-integration.test.ts 1/37

 Test Files 0 passed (21)
      Tests 1 passed (184)
   Start at 16:53:48
   Duration 2.74s
 ✓ src/tests/sound-event-integration.test.ts (37 tests) 38ms
   ✓ Sound Event Mapper (30)
     ✓ mapPlayerMovementToSound (6)
       ✓ should return dig sound event when player enters soil 4ms     
       ✓ should return walk sound event when player moves to empty cell
l 1ms
       ✓ should return walk sound event when player moves to diamond 0m
ms
       ✓ should return walk sound event when player moves to exit 1ms  
       ✓ should return walk sound event when player moves to bomb 0ms  
       ✓ should return null for blocked movement 0ms
     ✓ mapGameStateChangeToSound (4)
       ✓ should return death sound event when player dies 1ms
       ✓ should return victory sound event when player wins 1ms        
       ✓ should return null when game state does not change 1ms        
       ✓ should return null for invalid state transitions 0ms
     ✓ mapDiamondCollectionToSound (2)
       ✓ should return collection sound event when collecting diamond 0
0ms
       ✓ should return null for non-diamond cells 0ms
     ✓ mapExitInteractionToSound (3)
       ✓ should return door slam and victory sound events when player c
can exit 2ms
       ✓ should return empty array when player cannot exit 0ms
       ✓ should return empty array for non-exit cells 0ms
     ✓ mapSoundEventToId (10)
       ✓ should map player dig movement to dig sound ID 1ms
       ✓ should map player walk movement to walk sound ID 0ms
       ✓ should map boulder movement to boulder sound ID 0ms
       ✓ should map arrow movement to arrow sound ID 0ms
       ✓ should map collision event to thud sound ID 0ms
       ✓ should map collection event to diamond collect sound ID 0ms   
       ✓ should map death event to death sound ID 0ms
       ✓ should map victory event to victory sound ID 6ms
       ✓ should map door_slam event to door slam sound ID 0ms
       ✓ should throw error for unknown event type 2ms
     ✓ generatePlayerMoveEvents (5)
       ✓ should generate movement and collection events for diamond col
llection 1ms
       ✓ should generate movement and death events when player dies 0ms
       ✓ should generate movement, door slam, and victory events when p
player wins 1ms
       ✓ should generate dig sound when entering soil 0ms
       ✓ should generate only movement event for regular movement 0ms  
   ✓ Sound Event Emitter (7)
     ✓ createSoundEventEmitter (4)
       ✓ should create emitter with working emit function 3ms
       ✓ should emit multiple events 1ms
       ✓ should not emit when no callback is set 0ms
       ✓ should handle errors gracefully 3ms
     ✓ getSoundEventEmitter (1)
       ✓ should return the same instance on multiple calls 0ms
     ✓ emitSoundEvent (1)
       ✓ should emit single event using global emitter 1ms
     ✓ emitSoundEvents (1)
       ✓ should emit multiple events using global emitter 1ms
stdout | src/tests/physics-integration-demo.test.ts > Physics Integrati
ion Demo > should demonstrate game integration with physics and sound   
Game integration test:
Player moves right, boulder at (2,2) should fall to (2,3)
Player moved successfully and boulder physics was applied
Final player position: { x: 2, y: 1 }
Boulder moved from (2,2) to (2,3)

stdout | src/tests/physics-integration-demo.test.ts > Physics Integrati
ion Demo > should demonstrate multiple boulder physics
Multiple boulder physics test:
Two boulders at (1,1) and (3,1) should both fall
Both boulders fell successfully with sound events
Generated 2 movement sound events


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 3/9
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 3 passed (21)
      Tests 22 failed | 97 passed (184)
   Start at 16:53:48
   Duration 2.96s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
Failed to load test_sound from sounds/test.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:133
3:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudio
oBuffer > should throw error if all sources fail
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146
6:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 3/9
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 3 passed (21)
      Tests 22 failed | 97 passed (184)
   Start at 16:53:48
   Duration 2.96s
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during sound playback
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error
r Handling and Fallbacks > Error Recovery > should handle errors during 
 preloading
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error
r Handling and Fallbacks > Autoplay Policy Handling > should detect auto
oplay restrictions
Using Web Audio API

 ✓ src/tests/physics-integration-demo.test.ts (4 tests) 23ms
   ✓ Physics Integration Demo (4)
     ✓ should demonstrate boulder falling with sound events 9ms        
     ✓ should demonstrate boulder collision with sound events 2ms      
     ✓ should demonstrate game integration with physics and sound 8ms  
     ✓ should demonstrate multiple boulder physics 2ms
 ❯ src/audio/__tests__/audio-error-handling.test.ts (10 tests | 5 faile
ed) 54ms
   ❯ Audio Error Handling and Fallbacks (10)
     ❯ Audio Manager Factory (4)
       × should create WebAudioManager when Web Audio API is supported 
 23ms
       ✓ should fall back to HTML5AudioManager when Web Audio API is no
ot supported 3ms
       ✓ should fall back to SilentAudioManager when no audio is suppor
rted 2ms
       ✓ should create specific audio manager when requested 1ms       
     ❯ SilentAudioManager (2)
       × should implement all AudioManager methods without errors 4ms  
       ✓ should handle loading progress callbacks 4ms
     ❯ Error Recovery (3)
       × should handle errors during audio context creation 6ms        
       × should handle errors during sound playback 4ms
       ✓ should handle errors during preloading 2ms
     ❯ Autoplay Policy Handling (1)
       × should detect autoplay restrictions 2ms
 ❯ src/audio/__tests__/error-handling.test.ts (23 tests | 15 failed) 12
26ms
   ❯ Audio Error Handling and Fallbacks (23)
     ❯ Web Audio API Unavailable (3)
       ✓ should gracefully degrade when Web Audio API is not supported 
 7ms
       ✓ should fall back to silent mode when no audio support exists 2
2ms
       × should handle AudioContext creation failure 22ms
     ❯ Audio Context Suspension Handling (3)
       × should handle suspended audio context due to autoplay policies
s 7ms
       × should handle audio context resume failure 4ms
       ✓ should set up multiple event listeners for context resume 3ms 
     ❯ Sound File Loading Errors (3)
       × should handle failed sound file loads gracefully 13ms
       × should retry failed sound loads 7ms
       × should fall back to HTML5 audio when Web Audio loading fails c
completely 4ms
     ❯ HTML5 Audio Fallback (3)
       × should handle HTML5 audio playback errors 3ms
       × should handle autoplay blocked errors 3ms
       × should handle unsupported audio formats 3ms
     ✓ Silent Mode Fallback (2)
       ✓ should provide silent implementations for all methods 2ms     
       ✓ should return empty loading state 2ms
     ❯ Error Recovery Mechanisms (3)
       × should attempt on-demand loading when buffer not found 2ms    
       × should validate audio buffers before playback 6ms
       ✓ should handle audio context interruption on iOS Safari 4ms    
     ❯ Browser-Specific Error Handling (2)
       × should handle Safari-specific audio context issues 14ms       
       × should handle Chrome-specific audio context issues 3ms        
     ❯ Error Event Emission (2)
       × should emit error events for external handling 4ms
       × should emit fallback events when switching audio managers 2ms 
     ✓ Memory Management and Cleanup (2)
       ✓ should clean up resources on audio manager cleanup 2ms        
       ✓ should handle cleanup errors gracefully 2ms
 ✓ src/tests/audio/audio-optimization.test.ts (28 tests) 158ms
   ✓ AudioFormatUtils (14)
     ✓ isFormatSupported (3)
       ✓ should return true for supported formats 4ms
       ✓ should return false for unsupported formats 1ms
       ✓ should be case insensitive 1ms
     ✓ getBestSupportedFormat (3)
       ✓ should return mp3 as preferred format 1ms
       ✓ should return ogg if mp3 not available 0ms
       ✓ should return null if no formats supported 0ms
     ✓ getFormatFromUrl (3)
       ✓ should extract format from URL 1ms
       ✓ should handle URLs with query parameters 0ms
       ✓ should return empty string for URLs without extension 1ms     
     ✓ validateAudioHeader (5)
       ✓ should validate MP3 header with ID3 tag 1ms
       ✓ should validate MP3 header with frame sync 0ms
       ✓ should validate OGG header 0ms
       ✓ should validate WAV header 0ms
       ✓ should reject invalid headers 0ms
   ✓ AudioOptimizer (11)
     ✓ analyzeAudioBuffer (5)
       ✓ should analyze audio buffer metrics 1ms
       ✓ should provide sample rate recommendations 0ms
       ✓ should provide channel recommendations for stereo 0ms
       ✓ should provide duration recommendations for long clips 0ms    
       ✓ should provide file size recommendations 0ms
     ✓ normalizeAudioBuffer (2)
       ✓ should normalize audio buffer 42ms
       ✓ should skip normalization when disabled 1ms
     ✓ applyFadeInOut (2)
       ✓ should apply fade in and out 18ms
       ✓ should use default fade times 70ms
     ✓ getOptimizationReport (2)
       ✓ should generate optimization report for multiple files 5ms    
       ✓ should provide global recommendations 3ms
   ✓ AudioUtils (3)
     ✓ formatFileSize (1)
       ✓ should format bytes correctly 2ms
     ✓ formatDuration (1)
       ✓ should format seconds correctly 1ms
     ✓ formatCompressionRatio (1)
       ✓ should format compression ratio as percentage 0ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]    
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 3/9
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 3 passed (21)
      Tests 22 failed | 97 passed (184)
   Start at 16:53:48
   Duration 2.96s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146
6:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudio
oBuffer > should throw error if all sources fail
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146
6:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudio
oBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.ogg: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146
6:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudio
oBuffer > should handle HTTP errors
Failed to load test_sound from sounds/test.mp3: Error: HTTP 404: Not Fo
ound
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudio
oBuffer > should handle audio decoding errors
Failed to load test_sound from sounds/test.mp3: Error: Invalid audio da
ata
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:194
4:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/hooks/use-audio-settings.test.ts > useAudioSet
ttings > initialization > should handle corrupted localStorage data grac
cefully
Failed to load audio settings: SyntaxError: Unexpected token 'i', "inva
alid-json" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-a
audio-settings.ts:26:33)
    at mountStateImpl (D:\FizzBash\TheWanderer\node_modules\react-dom\c
cjs\react-dom-client.development.js:6130:24)
    at mountState (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\r
react-dom-client.development.js:6151:22)
    at Object.useState (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:22951:18)
    at process.env.NODE_ENV.exports.useState (D:\FizzBash\TheWanderer\n
node_modules\react\cjs\react.development.js:1221:34)
    at Module.useAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks
s\use-audio-settings.ts:59:37)
    at D:\FizzBash\TheWanderer\src\tests\audio\hooks\use-audio-settings
s.test.ts:90:49
    at TestComponent (D:\FizzBash\TheWanderer\node_modules\@testing-lib
brary\react\dist\pure.js:331:27)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_mo
odules\react-dom\cjs\react-dom-client.development.js:23863:20)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/13
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 5/9
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 3 passed (21)
      Tests 22 failed | 100 passed (247)
   Start at 16:53:48
   Duration 3.06s
ode (vitest 5)ode (vitest 14)ode (vitest 15)stdout | src/tests/audio-context.test.tsx > AudioContext > should provide audio context to children
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-context.test.tsx > AudioContext > should provide audio context to children
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-context.test.tsx > AudioContext > should provide audio context to children
HTML5 Audio preloaded 0/9 sounds

 ✓ src/tests/GameState-sound-integration.test.ts (9 tests) 356ms       
   ✓ GameState Sound Integration (9)
     ✓ should emit walk sound when player moves to empty cell 10ms     
     ✓ should emit dig sound when player moves to soil 1ms
     ✓ should emit collection sound when player collects diamond 5ms   
     ✓ should emit death sound when player hits bomb 112ms
     ✓ should emit victory sounds when player exits with no diamonds 10
09ms
     ✓ should not emit sounds when movement is blocked 1ms
     ✓ should not emit sounds when game is not in playing state 1ms    
     ✓ should emit death sound when running out of moves 107ms
     ✓ should not emit exit sounds when player cannot exit with diamond
ds remaining 7ms
 ✓ src/tests/game-state-sound-transitions.test.ts (7 tests) 360ms      
   ✓ Game State Sound Transitions (7)
     ✓ Death sound transitions (2)
       ✓ should stop all sounds and play death sound when player hits b
bomb 136ms
       ✓ should stop all sounds and play death sound when running out o
of moves 103ms
     ✓ Victory sound transitions (2)
       ✓ should stop all sounds and play victory sound when player exit
ts successfully 109ms
       ✓ should not allow exit when diamonds remain 3ms
     ✓ Door slam sound for exit interaction (1)
       ✓ should play door slam sound when player successfully exits 2ms
     ✓ Sound stopping behavior (2)
       ✓ should not stop sounds during normal gameplay 2ms
       ✓ should filter out death/victory sounds from regular emission w
when game ends 2ms
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > shou
uld provide playSound function that calls audio manager
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function that calls audio manager
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function that calls audio manager
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function that calls audio manager
Sound asset not found for ID: test-sound


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
 ✓ src/tests/audio/hooks/use-audio-settings.test.ts (13 tests) 94ms    
   ✓ useAudioSettings (13)
     ✓ initialization (3)
       ✓ should initialize with default settings when no stored setting
gs exist 25ms
       ✓ should load settings from localStorage when available 4ms     
       ✓ should handle corrupted localStorage data gracefully 21ms     
     ✓ mute functionality (2)
       ✓ should toggle mute state 9ms
       ✓ should persist mute state to localStorage 4ms
     ✓ volume controls (3)
       ✓ should set global volume and clamp values 3ms
       ✓ should set category volume and clamp values 4ms
       ✓ should persist volume changes to localStorage 3ms
     ✓ reset functionality (1)
       ✓ should reset all settings to defaults 5ms
     ✓ keyboard shortcuts (3)
       ✓ should toggle mute on Ctrl+M 4ms
       ✓ should toggle mute on Cmd+M (Mac) 1ms
       ✓ should not toggle mute on M without modifier keys 2ms
     ✓ localStorage error handling (1)
       ✓ should handle localStorage save errors gracefully 6ms
stdout | src/tests/audio-context.test.tsx > AudioContext > should handl
le initialization errors
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > shou
uld provide playSound function with options
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function with options
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function with options
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function with options
Sound asset not found for ID: test-sound


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s



stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should return muted state from audio manager
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should return muted state from audio manager
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should return muted state from audio manager
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\a
asset-loader.ts:160:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:278
8:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should toggle mute state
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should toggle mute state
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should toggle mute state
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-context.test.tsx > AudioContext > should call 
 preloadSounds during initialization
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-context.test.tsx > AudioContext > should call preloadSounds during initialization
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-context.test.tsx > AudioContext > should call preloadSounds during initialization
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > shou
uld handle audio manager not initialized
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s



stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
AudioContext not supported
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

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
Sound asset not found for ID: test-sound


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should allow user to control audio settings end-to-end
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
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
TypeError: toggleMute is not a function
    at handleMuteClick (D:\FizzBash\TheWanderer\src\audio\components\Au
udioControl.tsx:12:9)
    at executeDispatch (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:16368:9)
    at runWithFiberInDEV (D:\FizzBash\TheWanderer\node_modules\react-do
om\cjs\react-dom-client.development.js:1522:13)
    at processDispatchQueue (D:\FizzBash\TheWanderer\node_modules\react
t-dom\cjs\react-dom-client.development.js:16418:19)
    at D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-cli
ient.development.js:17016:9
    at batchedUpdates$1 (D:\FizzBash\TheWanderer\node_modules\react-dom
m\cjs\react-dom-client.development.js:3262:40)
    at dispatchEventForPluginEventSystem (D:\FizzBash\TheWanderer\node_
_modules\react-dom\cjs\react-dom-client.development.js:16572:7)
    at dispatchEvent (D:\FizzBash\TheWanderer\node_modules\react-dom\cj
js\react-dom-client.development.js:20658:11)
    at dispatchDiscreteEvent (D:\FizzBash\TheWanderer\node_modules\reac
ct-dom\cjs\react-dom-client.development.js:20626:11)
    at HTMLDivElement.callTheUserObjectsOperation (D:\FizzBash\TheWande
erer\node_modules\jsdom\lib\jsdom\living\generated\EventListener.js:26:3
30)
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s



stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should allow user to control audio settings end-to-end
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s



stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should allow user to control audio settings end-to-end
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSetting
gs > should return default volume from config
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s



ode (vitest 10)stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config
AudioContext not supported
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

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s



stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     

stderr | src/tests/audio-context.test.tsx > AudioContext > should allow
w manual cleanup
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
AudioContext not supported
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

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
HTML5 Audio preloaded 0/9 sounds
ode (vitest 11)

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should handle keyboard shortcuts
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
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
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should handle keyboard shortcuts
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should handle keyboard shortcuts
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-context.test.tsx > AudioContext > should prevent multiple simultaneous initializations
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-context.test.tsx > AudioContext > should prevent multiple simultaneous initializations
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-context.test.tsx > AudioContext > should prevent multiple simultaneous initializations
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSetting
gs > should handle invalid localStorage volume
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid" is not valid JSONode (vitest 12)
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-a
audio-settings.ts:26:33)
    at mountStateImpl (D:\FizzBash\TheWanderer\node_modules\react-dom\c
cjs\react-dom-client.development.js:6130:24)
    at mountState (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\r
react-dom-client.development.js:6151:22)
    at Object.useState (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:22951:18)
    at process.env.NODE_ENV.exports.useState (D:\FizzBash\TheWanderer\n
node_modules\react\cjs\react.development.js:1221:34)
    at Module.useAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks
s\use-audio-settings.ts:59:37)
    at __vi_import_1__.renderHook.wrapper (D:\FizzBash\TheWanderer\src\
\tests\audio-hooks.test.tsx:192:49)
    at TestComponent (D:\FizzBash\TheWanderer\node_modules\@testing-lib
brary\react\dist\pure.js:331:27)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_mo
odules\react-dom\cjs\react-dom-client.development.js:23863:20)
AudioContext not supported
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

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set muted state through audio manager
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set muted state through audio manager
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set muted state through audio manager
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx 0/6
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 1/7
 ❯ src/tests/audio-hooks.test.tsx 4/16
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 314ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 308ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 6 passed (21)
      Tests 26 failed | 127 passed (247)
   Start at 16:53:48
   Duration 3.17s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully



 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage
AudioContext not supported
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

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should clamp volume between 0 and 1
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should clamp volume between 0 and 1
AudioContext not supported
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

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should clamp volume between 0 and 1
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should clamp volume between 0 and 1
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should reset to defaults
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should reset to defaults
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should reset to defaults
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSetting
gs > should handle localStorage errors gracefully
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s



stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
 ❯ src/tests/audio-hooks.test.tsx (16 tests | 11 failed) 221ms
   ❯ Audio Hooks (16)
     ❯ useSound (7)
       × should provide playSound function that calls audio manager 56m
ms
       × should provide playSound function with options 11ms
       × should return muted state from audio manager 18ms
       × should toggle mute state 11ms
       ✓ should handle audio manager not initialized 10ms
       ✓ should show loading state during initialization 7ms
       × should handle playSound errors gracefully 10ms
     ❯ useAudioSettings (9)
       ✓ should return default volume from config 5ms
       × should load volume from localStorage 11ms
       ✓ should handle invalid localStorage volume 21ms
       × should set muted state through audio manager 7ms
       × should set volume and save to localStorage 10ms
       ✓ should clamp volume between 0 and 1 5ms
       × should reset to defaults 12ms
       × should handle localStorage errors gracefully 17ms
       × should handle audio manager not initialized for setMuted 7ms  

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:5
53
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\man
nagers\asset-loader.ts:156:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:192:5
55

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAsset
ts > should handle partial failures
Failed to load sound sound2: TypeError: Cannot read properties of undef
fined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:5
53
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\man
nagers\asset-loader.ts:156:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:192:5
55


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Asset loading complete: 1/2 loaded, 1 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:335
5:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress 
 tracking > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:335
5:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
 ✓ src/tests/audio/asset-loader.test.ts (16 tests) 726ms
   ✓ AssetLoader (16)
     ✓ constructor (2)
       ✓ should initialize with default options 4ms
       ✓ should accept custom options 1ms
     ✓ loadAudioBuffer (7)
       ✓ should successfully load audio buffer from first source 6ms   
       ✓ should fallback to second source if first fails 19ms
       ✓ should retry failed requests 135ms
       ✓ should throw error if all sources fail 228ms
       ✓ should handle HTTP errors 2ms
       ✓ should handle audio decoding errors 1ms
       ✓ should respect timeout 104ms
     ✓ loadAssets (2)
       ✓ should load all preload assets 2ms
       ✓ should handle partial failures 109ms
     ✓ progress tracking (2)
       ✓ should emit progress events 1ms
       ✓ should emit error events on failure 107ms
     ✓ format optimization (2)
       ✓ should prefer supported formats 1ms
       ✓ should filter unsupported formats 1ms
     ✓ cleanup (1)
       ✓ should clear all state and callbacks 1ms
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audi
io Settings Integration > complete audio settings workflow > should rese
et settings to defaults
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
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

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should reset settings to defaults
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should reset settings to defaults
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should disable volume controls when muted
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
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
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should disable volume controls when muted
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s



stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > complete audio settings workflow > should disable volume controls when muted
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should load saved settings on initialization
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
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

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should load saved settings on initialization
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should load saved settings on initialization
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
Failed to load audio settings: SyntaxError: Unexpected token 'i', "inva
alid-json" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-a
audio-settings.ts:26:33)
    at mountStateImpl (D:\FizzBash\TheWanderer\node_modules\react-dom\c
cjs\react-dom-client.development.js:6130:24)
    at mountState (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\r
react-dom-client.development.js:6151:22)
    at Object.useState (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:22951:18)
    at process.env.NODE_ENV.exports.useState (D:\FizzBash\TheWanderer\n
node_modules\react\cjs\react.development.js:1221:34)
    at useAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-au
udio-settings.ts:59:37)
    at AudioControl (D:\FizzBash\TheWanderer\src\audio\components\Audio
oControl.tsx:7:37)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_mo
odules\react-dom\cjs\react-dom-client.development.js:23863:20)
    at renderWithHooks (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:5529:22)
Failed to load audio settings: SyntaxError: Unexpected token 'i', "inva
alid-json" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-a
audio-settings.ts:26:33)
    at mountStateImpl (D:\FizzBash\TheWanderer\node_modules\react-dom\c
cjs\react-dom-client.development.js:6130:24)
    at mountState (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\r
react-dom-client.development.js:6151:22)
    at Object.useState (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:22951:18)
    at process.env.NODE_ENV.exports.useState (D:\FizzBash\TheWanderer\n
node_modules\react\cjs\react.development.js:1221:34)
    at useAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-au
udio-settings.ts:59:37)
    at AudioSettings (D:\FizzBash\TheWanderer\src\audio\components\Audi
ioSettings.tsx:20:9)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_mo
odules\react-dom\cjs\react-dom-client.development.js:23863:20)
    at renderWithHooks (D:\FizzBash\TheWanderer\node_modules\react-dom\
\cjs\react-dom-client.development.js:5529:22)
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

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/audio/__tests__/audio-settings-integration.test.tsx > Audio Settings Integration > persistence across sessions > should handle corrupted localStorage gracefully
An update to AudioProvider inside a test was not wrapped in act(...).  

When testing, code that causes React state updates should be wrapped in
nto act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the
e browser. Learn more at https://react.dev/link/wrap-tests-with-act     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization
AudioContext not supported
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
Autoplay not allowed - user interaction will be required to play audio 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
stdout | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization
HTML5 Audio preloaded 0/9 sounds

 ❯ src/tests/audio-context.test.tsx (7 tests | 5 failed) 291ms
   ❯ AudioContext (7)
     ✓ should provide audio context to children 103ms
     × should handle initialization errors 35ms
     × should call preloadSounds during initialization 16ms
     × should allow manual cleanup 34ms
     × should prevent multiple simultaneous initializations 29ms       
     ✓ should throw error when useAudioContext is used outside provider
r 21ms
     × should handle non-Error exceptions during initialization 48ms   
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx (6 tests | 1
1 failed) 446ms
   ❯ Audio Settings Integration (6)
     ❯ complete audio settings workflow (4)
       × should allow user to control audio settings end-to-end 123ms  
       ✓ should handle keyboard shortcuts 26ms
       ✓ should reset settings to defaults 167ms
       ✓ should disable volume controls when muted 60ms
     ✓ persistence across sessions (2)
       ✓ should load saved settings on initialization 43ms
       ✓ should handle corrupted localStorage gracefully 23ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 5/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 790ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 784ms
 ❯ src/tests/physics-integration-demo.test.ts 4/4
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 151 passed (247)
   Start at 16:53:48
   Duration 3.64s
ode (vitest 3)ode (vitest 7)ode (vitest 9)stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Retry 2/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Retry 2/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Retry 2/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Retry 2/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration.test.tsx 10/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.14s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.14s

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 156 passed (247)
   Start at 16:53:48
   Duration 4.00s

 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.25s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.25s

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 158 passed (247)
   Start at 16:53:48
   Duration 4.11s

 ❯ src/tests/app-sound-integration.test.tsx 13/21
   └── should not block user input during sound playback 283ms
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.58s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.57s
 ❯ src/tests/collision-sound-integration.test.ts [queued]

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 159 passed (247)
   Start at 16:53:48
   Duration 4.43s
(node:26768) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:47016) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:63236) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)
(node:26112) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)

 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.78s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.78s
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]

 Test Files 5 failed | 7 passed (21)
      Tests 39 failed | 160 passed (247)
   Start at 16:53:48
   Duration 4.64s
(node:64432) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Load error for PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Load error for PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Load error for BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network e
error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Load error for ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Load error for COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Load error for DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Load error for VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: 
 Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Load error for DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Failed to load DIAMOND_COLLECT from sounds/environment/door-slam.mp3: E
Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle preload errors gracefully
Load error for DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Preloaded 0 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should play sound with default options
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Load error for PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should play sound with custom options
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Load error for PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
 ✓ src/tests/sound-system-infrastructure.test.ts (5 tests) 15ms        
   ✓ Sound System Infrastructure (5)
     ✓ Sound Configuration (4)
       ✓ should have all required sound assets defined 5ms
       ✓ should have proper sound asset structure 1ms
       ✓ should have sound configuration with categories 1ms
       ✓ should have sound ID constants 1ms
     ✓ Audio Utilities (1)
       ✓ should detect browser audio support 5ms

 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Load error for BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should not play sound when muted
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network e
error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Load error for ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Load error for COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle missing sound buffer gracefully
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Load error for DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioMana
ager > should handle missing sound buffer gracefully
Sound buffer not found for nonexistent_sound

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Load error for VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: 
 Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Load error for DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should handle loadi
ing failures gracefully
Failed to load DIAMOND_COLLECT from sounds/environment/door-slam.mp3: E
Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should cleanup resources properly
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Load error for DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105
5:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Preloaded 0 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > enhanced preloading > should skip preload
ding in fallback mode
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle audio context creation failure
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed
    at new global.AudioContext (D:\FizzBash\TheWanderer\src\tests\audio
o-manager.test.ts:294:27)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\
\src\audio\managers\audio-manager.ts:79:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\
\audio-manager.ts:62:14)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:298:29  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > optimization reporting > should provide o
optimization report
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > optimization reporting > should provide o
optimization report
Preloaded 9 sounds


 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.88s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.88s
 ❯ src/tests/collision-sound-integration.test.ts 0/21
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 0/12

 Test Files 5 failed | 8 passed (21)
      Tests 39 failed | 165 passed (285)
   Start at 16:53:48
   Duration 4.74s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should handle empty buffer set
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > loading state management > should track l
loading state correctly
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > loading state management > should track l
loading state correctly
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should retry failed load
ds
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:219:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioMa
anager > should preload sounds using HTML5 Audio
Failed to preload PLAYER_WALK: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload PLAYER_DIG: TypeError: audio.load is not a function  
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload BOULDER_MOVE: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload ARROW_MOVE: TypeError: audio.load is not a function  
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload COLLISION_THUD: TypeError: audio.load is not a functi
ion
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DEATH_SOUND: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload VICTORY_SOUND: TypeError: audio.load is not a functio
on
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DOOR_SLAM: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DIAMOND_COLLECT: TypeError: audio.load is not a funct
tion
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio
HTML5 Audio preloaded 0 sounds


 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should play sound with HTML5 Audio
Sound asset not found for ID: test_sound

stderr | src/tests/audio-manager.test.ts > Audio Manager > SilentAudioM
Manager > should initialize in silent mode
No audio support detected, using silent mode

stderr | src/tests/audio-manager.test.ts > Audio Manager > SilentAudioM
Manager > should handle all operations silently
No audio support detected, using silent mode


 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
stdout | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create WebAudioManager when Web Audio API is supported
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported
Web Audio API not supported, using HTML5 Audio fallback

stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioM
Manager factory > should create SilentAudioManager when no audio support
t is available
No audio support detected, using silent mode
No audio support detected, using silent mode


 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Web Audio API initialized successfully


 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  ode (vitest 13)
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

(node:20764) [DEP0040] DeprecationWarning: The `punycode` module is dep
precated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was creat
ted)

 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
 ✓ src/tests/collision-sound-integration.test.ts (21 tests) 21ms       
   ✓ Collision Sound Integration Tests (21)
     ✓ Boulder Collision Detection (4)
       ✓ should detect collision when boulder hits rock 4ms
       ✓ should detect collision when boulder hits another boulder 0ms 
       ✓ should detect ground collision when boulder hits soil 1ms     
       ✓ should not detect collision in empty space 1ms
     ✓ Arrow Collision Detection (2)
       ✓ should detect collision when arrow hits rock 0ms
       ✓ should detect collision when arrow hits boulder 0ms
     ✓ Boulder Movement and Sound Events (4)
       ✓ should generate movement sound when boulder falls 3ms
       ✓ should generate collision sound when boulder cannot fall 1ms  
       ✓ should correctly identify when boulder can fall 1ms
       ✓ should correctly identify when boulder cannot fall 0ms        
     ✓ Arrow Movement and Sound Events (2)
       ✓ should generate movement sound when arrow moves 1ms
       ✓ should generate collision sound and destroy arrow when hitting
g obstacle 1ms
     ✓ Physics Engine Integration (3)
       ✓ should find all boulders in maze 1ms
       ✓ should simulate gravity for multiple boulders 1ms
       ✓ should run complete physics simulation step 1ms
     ✓ Sound Event Mapping (4)
       ✓ should map boulder collision with rock to high priority sound 
 0ms
       ✓ should map arrow collision with soil to low priority sound 0ms
       ✓ should generate object interaction events correctly 0ms       
       ✓ should generate collision sound events for multiple collisions
s 0ms
     ✓ Game State Integration (2)
       ✓ should trigger physics simulation and sound events when player
r moves 2ms
       ✓ should handle collision timing correctly 0ms
 ✓ src/tests/LargerMazeGameState.test.ts (9 tests) 12ms
   ✓ Larger Maze Game State Management - Functional Implementation (9) 
     ✓ Diamond counting and collection (2)
       ✓ should correctly count diamonds in larger maze 3ms
       ✓ should prevent exit when diamonds remain in larger maze 1ms   
     ✓ Win and lose conditions (2)
       ✓ should handle win condition correctly in larger maze 0ms      
       ✓ should handle lose condition when running out of moves 0ms    
     ✓ Multiple diamond collection scenarios (1)
       ✓ should handle multiple diamonds collection across larger maze 
 1ms
     ✓ Bomb interactions (1)
       ✓ should handle bomb interactions correctly in larger maze 0ms  
     ✓ Move counting and game mechanics (2)
       ✓ should handle move counting correctly in larger maze 1ms      
       ✓ should maintain maze integrity during multiple operations 2ms 
     ✓ Factory function integration (1)
       ✓ should work correctly with createGameState factory for larger 
 mazes 1ms
 ✓ src/tests/LargerMazeUI.test.ts (12 tests) 16ms
   ✓ Larger Maze UI Adaptation - Functional Implementation (12)        
     ✓ Maze dimension validation (2)
       ✓ should have correct larger maze dimensions 3ms
       ✓ should maintain consistent row lengths 1ms
     ✓ Maze structure validation (3)
       ✓ should have proper rock border around the maze 0ms
       ✓ should have required game elements 1ms
       ✓ should have appropriate maze composition for larger size 1ms  
     ✓ Icon mapping validation (2)
       ✓ should have icons defined for all cell types 1ms
       ✓ should have unique icons for different cell types 0ms
     ✓ Game state integration with larger maze (2)
       ✓ should create valid initial game state with larger maze 4ms   
       ✓ should correctly count diamonds in larger maze 1ms
     ✓ Maze accessibility and playability (3)
       ✓ should have sufficient empty spaces for movement 0ms
       ✓ should have balanced distribution of obstacles 0ms
       ✓ should have appropriate challenge elements for larger maze 0ms

 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > should continue working when sound playback fails
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx
x:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/s
spy/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/i
index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitt
ter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\so
ound-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-
-event-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)     
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:
:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx
x:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/s
spy/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/i
index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitt
ter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\so
ound-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-
-event-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)     
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:
:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx
x:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/s
spy/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/i
index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitt
ter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\so
ound-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-
-event-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)     
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:
:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx
x:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/s
spy/dist/index.js:96:15)
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/i
index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitt
ter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\so
ound-event-emitter.ts:32:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-
-event-emitter.ts:66:13)
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)     
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:
:22)


 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
 ✓ src/tests/GameState.test.ts (10 tests) 11ms
   ✓ GameState - Functional Implementation (10)
     ✓ movePlayer function (7)
       ✓ should collect diamond and update state correctly 3ms
       ✓ should not move when blocked by rock 1ms
       ✓ should set game state to dead when hitting bomb 1ms
       ✓ should prevent exit when diamonds remain 1ms
       ✓ should allow exit when all diamonds are collected 1ms
       ✓ should handle soil movement correctly 1ms
       ✓ should set game state to dead when running out of moves 1ms   
     ✓ createGameState factory function (3)
       ✓ should create game state with default values 1ms
       ✓ should create game state with custom initial data 1ms
       ✓ should handle player movement through factory interface 0ms   

 ❯ src/tests/app-sound-integration.test.tsx 17/21
 ❯ src/tests/audio-manager.test.ts 23/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/LargerMaze.test.ts [queued]

 Test Files 5 failed | 12 passed (21)
      Tests 42 failed | 240 passed (304)
   Start at 16:53:48
   Duration 4.96s
ode (vitest 5)ode (vitest 6)ode (vitest 15)ode (vitest 10)ode (vitest 8) ✓ src/tests/LargerMaze.test.ts (8 tests) 10ms
   ✓ Larger Maze Tests - Functional Implementation (8)
     ✓ Player movement in larger maze (2)
       ✓ should allow player to move in all directions 4ms
       ✓ should prevent movement through rock borders 1ms
     ✓ Diamond collection in larger maze (1)
       ✓ should allow player to collect diamonds across the maze 1ms   
     ✓ Exit mechanics in larger maze (1)
       ✓ should allow exit only after collecting all diamonds 1ms      
     ✓ Bomb interactions in larger maze (1)
       ✓ should cause death when hitting a bomb 1ms
     ✓ Complex navigation in larger maze (2)
       ✓ should handle complex paths with various obstacles 1ms        
       ✓ should handle sequential moves efficiently 0ms
     ✓ Factory function integration (1)
       ✓ should work correctly with createGameState factory 1ms        

 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 960ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 5 failed | 14 passed (21)
      Tests 42 failed | 253 passed (312)
   Start at 16:53:48
   Duration 5.83s
stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > should handle audio reset errors gracefully      
Failed to reset audio system: Error: Reset failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx
x:559:52
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 960ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 5 failed | 14 passed (21)
      Tests 42 failed | 253 passed (312)
   Start at 16:53:48
   Duration 5.83s
 ✓ src/tests/app-sound-integration.test.tsx (21 tests) 2027ms
   ✓ App Sound Integration (21)
     ✓ Sound System Initialization (3)
       ✓ should initialize audio system on app startup 120ms
       ✓ should not block game rendering during audio initialization 11
10ms
       ✓ should handle audio initialization errors gracefully 74ms     
     ✓ Keyboard Controls Integration (4)
       ✓ should handle game movement keys without interfering with audi
io 124ms
       ✓ should handle mute keyboard shortcut (Ctrl+M) 52ms
       ✓ should handle mute keyboard shortcut (Cmd+M) on Mac 57ms      
       ✓ should not trigger mute on M key without modifiers 49ms       
     ✓ Game Event Sound Integration (3)
       ✓ should emit sounds for player movement 104ms
       ✓ should stop all sounds when game ends 78ms
       ✓ should not emit sounds when game is over 49ms
     ✓ Audio Controls Integration (3)
       ✓ should toggle mute via button click 72ms
       ✓ should open audio settings dialog 64ms
       ✓ should display audio error messages when available 62ms       
     ✓ Performance and Responsiveness (3)
       ✓ should not block user input during sound playback  384ms      
       ✓ should handle multiple simultaneous sound events 170ms        
       ✓ should maintain game state consistency during audio operations
s 149ms
     ✓ Error Recovery (5)
       ✓ should continue working when sound playback fails 107ms       
       ✓ should handle audio context suspension gracefully 66ms        
       ✓ should show fallback mode indicator when in fallback 40ms     
       ✓ should show reset audio button when there are playback errors 
 51ms
       ✓ should handle audio reset errors gracefully 42ms
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should retry failed load
ds
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Web Audio API initialized successfully


 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 960ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 5 failed | 14 passed (21)
      Tests 42 failed | 253 passed (312)
   Start at 16:53:48
   Duration 5.83s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Retry 1/3 for sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Retry 2/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Retry 2/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 960ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 5 failed | 14 passed (21)
      Tests 42 failed | 253 passed (312)
   Start at 16:53:48
   Duration 5.83s

 ❯ src/tests/audio-manager.test.ts 23/27
   └── should handle fetch errors during preloading 1.18s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 5 failed | 14 passed (21)
      Tests 42 failed | 253 passed (312)
   Start at 16:53:48
   Duration 6.04s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Retry 2/3 for sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Retry 2/3 for sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Retry 2/3 for sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Retry 2/3 for sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Retry 2/3 for sounds/player/death.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Load error for PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Load error for PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Load error for BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network e
error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Load error for ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Load error for COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Load error for DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Err
ror: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Load error for VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: 
 Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Load error for DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Failed to load DIAMOND_COLLECT from sounds/environment/door-slam.mp3: E
Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle fetch errors during preloading
Load error for DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
   └── should handle decode errors 998ms

 Test Files 5 failed | 14 passed (21)
      Tests 42 failed | 254 passed (312)
   Start at 16:53:48
   Duration 6.91s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Preloaded 0 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Web Audio API initialized successfully


 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
   └── should handle decode errors 998ms

 Test Files 5 failed | 14 passed (21)
      Tests 42 failed | 254 passed (312)
   Start at 16:53:48
   Duration 6.91s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Retry 1/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
Retry 1/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: HTTP 404: Not Found    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
Retry 1/3 for sounds/arrow/twang.mp3: Error: HTTP 404: Not Found       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
Retry 1/3 for sounds/arrow/thud.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
Retry 1/3 for sounds/player/death.mp3: Error: HTTP 404: Not Found      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
Retry 1/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Fo
ound
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
Retry 1/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Fo
ound
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
Retry 1/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Fo
ound
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31


 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
   └── should handle decode errors 998ms

 Test Files 5 failed | 14 passed (21)
      Tests 42 failed | 254 passed (312)
   Start at 16:53:48
   Duration 6.91s

 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
   └── should handle decode errors 1.11s

 Test Files 5 failed | 14 passed (21)
      Tests 42 failed | 254 passed (312)
   Start at 16:53:48
   Duration 7.02s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Audio context suspended for 5 seconds. Click anywhere to enable audio. 


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 947ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 254 passed (312)
   Start at 16:53:48
   Duration 7.89s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Invalid 
 audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Load error for PLAYER_WALK: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Invalid au
udio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Load error for PLAYER_DIG: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Inva
alid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Load error for BOULDER_MOVE: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Invalid a
audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Load error for ARROW_MOVE: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Invali
id audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Load error for COLLISION_THUD: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Invalid
d audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Load error for DEATH_SOUND: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Err
ror: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Load error for VICTORY_SOUND: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: 
 Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Load error for DOOR_SLAM: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Failed to load DIAMOND_COLLECT from sounds/environment/door-slam.mp3: E
Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > error recovery > should handle decode err
rors
Load error for DIAMOND_COLLECT: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 947ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 254 passed (312)
   Start at 16:53:48
   Duration 7.89s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Preloaded 0 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > WebAudioManager > format fallback > should try multiple for
rmats
Web Audio API initialized successfully


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 947ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 254 passed (312)
   Start at 16:53:48
   Duration 7.89s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Retry 1/3 for sounds/player/walk.mp3: Error: 404
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:246:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/r
runner/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: HTTP 404: Not Found    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: HTTP 404: Not Found       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Retry 2/3 for sounds/arrow/thud.mp3: Error: HTTP 404: Not Found        
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Retry 2/3 for sounds/player/death.mp3: Error: HTTP 404: Not Found      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Fo
ound
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Fo
ound
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Fo
ound
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 947ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 254 passed (312)
   Start at 16:53:48
   Duration 7.89s

 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.06s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 254 passed (312)
   Start at 16:53:48
   Duration 8.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Preloaded 9 sounds


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.82s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 255 passed (312)
   Start at 16:53:48
   Duration 8.76s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should preload sounds with format filtering
Failed to preload PLAYER_WALK: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload PLAYER_DIG: TypeError: audio.load is not a function  
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload BOULDER_MOVE: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload ARROW_MOVE: TypeError: audio.load is not a function  
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload COLLISION_THUD: TypeError: audio.load is not a functi
ion
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DEATH_SOUND: TypeError: audio.load is not a function 
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload VICTORY_SOUND: TypeError: audio.load is not a functio
on
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DOOR_SLAM: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
Failed to preload DIAMOND_COLLECT: TypeError: audio.load is not a funct
tion
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:
:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:
:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.82s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 255 passed (312)
   Start at 16:53:48
   Duration 8.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should preload sounds with format filtering
HTML5 Audio preloaded 0 sounds


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.82s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 255 passed (312)
   Start at 16:53:48
   Duration 8.76s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats
Failed to preload PLAYER_WALK: Error: No supported format found for PLA
AYER_WALK
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:
:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
Failed to preload PLAYER_DIG: Error: No supported format found for PLAY
YER_DIG
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:
:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
Failed to preload BOULDER_MOVE: Error: No supported format found for BO
OULDER_MOVE
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:
:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
Failed to preload ARROW_MOVE: Error: No supported format found for ARRO
OW_MOVE
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:
:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
Failed to preload COLLISION_THUD: Error: No supported format found for 
 COLLISION_THUD
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:
:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
Failed to preload DEATH_SOUND: Error: No supported format found for DEA
ATH_SOUND
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:
:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
Failed to preload VICTORY_SOUND: Error: No supported format found for V
VICTORY_SOUND
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:
:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
Failed to preload DOOR_SLAM: Error: No supported format found for DOOR_
_SLAM
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:
:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-man      ager.t
test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)
Failed to preload DIAMOND_COLLECT: Error: No supported format found for
r DIAMOND_COLLECT
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:
:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\aud
dio\managers\audio-manager.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.t
test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist
t/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vi
itest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/ru
unner/dist/chunk-hooks.js:1574:12)


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.82s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 255 passed (312)
   Start at 16:53:48
   Duration 8.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats
HTML5 Audio preloaded 0 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > HTML5AudioManager > loading state > should provide optimiza
ation report
HTML5AudioManager report: {
  "totalSounds": 0,
  "loadedSounds": 0,
  "failedSounds": 0,
  "globalRecommendations": [
    "Consider using Web Audio API for better performance",
    "HTML5 Audio has limited optimization capabilities"
  ]
}

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > createAudioManager factory > should create WebAudioManager 
 when Web Audio API is available
Web Audio API initialized successfully


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.82s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 255 passed (312)
   Start at 16:53:48
   Duration 8.76s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is available
Web Audio API not supported, using HTML5 Audio fallback

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > createAudioManager factory > should create SilentAudioManag
ger when no audio support
No audio support detected, using silent mode
No audio support detected, using silent mode


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.82s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 255 passed (312)
   Start at 16:53:48
   Duration 8.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > integration with existing functionality > should maintain e
existing playSound functionality
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > integration with existing functionality > should maintain e
existing mute functionality
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > integration with existing functionality > should maintain e
existing mute functionality
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > integration with existing functionality > should maintain e
existing cleanup functionality
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audi
io Manager > integration with existing functionality > should maintain e
existing cleanup functionality
Preloaded 9 sounds


 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.82s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 255 passed (312)
   Start at 16:53:48
   Duration 8.76s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts (23 tests | 5 failed) 6140ms
   ❯ Enhanced Audio Manager (23)
     ❯ WebAudioManager (12)
       ✓ initialization (2)
✓ should initialize with Web Audio API support 7ms
✓ should handle audio context suspension 3ms
       ❯ enhanced preloading (4)
         × should preload sounds with progress tracking 18ms
         × should apply optimization during preloading 8ms
         × should handle loading failures gracefully 2039ms
         × should skip preloading in fallback mode 8ms
       ✓ optimization reporting (2)
✓ should provide optimization report 4ms
✓ should handle empty buffer set 2ms
       ✓ loading state management (1)
✓ should track loading state correctly 6ms
       ❯ error recovery (2)
✓ should retry failed loads  1006ms
         × should handle decode errors 2015ms
       ✓ format fallback (1)
✓ should try multiple formats  1004ms
     ✓ HTML5AudioManager (5)
       ✓ initialization (1)
✓ should initialize with HTML5 Audio support 1ms
       ✓ preloading with format optimization (2)
✓ should preload sounds with format filtering 4ms
✓ should handle unsupported formats 3ms
       ✓ loading state (2)
✓ should provide loading state 1ms
✓ should provide optimization report 1ms
     ✓ createAudioManager factory (3)
       ✓ should create WebAudioManager when Web Audio API is available 
 1ms
       ✓ should create HTML5AudioManager when only HTML5 Audio is avail
lable 1ms
       ✓ should create SilentAudioManager when no audio support 0ms    
     ✓ integration with existing functionality (3)
       ✓ should maintain existing playSound functionality 1ms
       ✓ should maintain existing mute functionality 3ms
       ✓ should maintain existing cleanup functionality 1ms

 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 6 failed | 14 passed (21)
      Tests 43 failed | 267 passed (312)
   Start at 16:53:48
   Duration 8.87s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Load error for PLAYER_WALK: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: HTTP 404: 
 Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Load error for PLAYER_DIG: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: HTTP
P 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Load error for BOULDER_MOVE: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: HTTP 404:
: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Load error for ARROW_MOVE: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: HTTP 4
404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Load error for COLLISION_THUD: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: HTTP 40
04: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Load error for DEATH_SOUND: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Err
ror: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Load error for VICTORY_SOUND: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: 
 HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Load error for DOOR_SLAM: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Failed to load DIAMOND_COLLECT from sounds/environment/door-slam.mp3: E
Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handli
ing > should handle HTTP errors during preloading
Load error for DIAMOND_COLLECT: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:3
31


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 6 failed | 14 passed (21)
      Tests 43 failed | 267 passed (312)
   Start at 16:53:48
   Duration 8.87s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Preloaded 0 sounds


 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 6 failed | 14 passed (21)
      Tests 43 failed | 267 passed (312)
   Start at 16:53:48
   Duration 8.87s
ode (vitest 2)
 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 6 failed | 14 passed (21)
      Tests 43 failed | 267 passed (312)
   Start at 16:53:48
   Duration 9.08s

 ❯ src/tests/audio-manager.test.ts 25/27
   └── should handle audio decoding errors 1.11s

 Test Files 6 failed | 14 passed (21)
      Tests 43 failed | 267 passed (312)
   Start at 16:53:48
   Duration 10.06s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle playback errors gracefully
Web Audio API initialized successfully


 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 6 failed | 14 passed (21)
      Tests 43 failed | 268 passed (312)
   Start at 16:53:48
   Duration 10.83s
 ❯ src/tests/audio-manager.test.ts (27 tests | 2 failed) 8187ms        
   ❯ Audio Manager (27)
     ❯ WebAudioManager (12)
       ✓ should initialize with Web Audio API support 6ms
       ✓ should handle muted state correctly 5ms
       ✓ should load muted preference from localStorage 1ms
       ✓ should handle localStorage errors gracefully 1ms
       ✓ should preload sounds successfully 6ms
       ✓ should handle preload errors gracefully  2045ms
       ✓ should play sound with default options 3ms
       ✓ should play sound with custom options 2ms
       ✓ should not play sound when muted 2ms
       ✓ should handle missing sound buffer gracefully 2ms
       ✓ should cleanup resources properly 2ms
       × should handle audio context creation failure 11ms
     ✓ HTML5AudioManager (6)
       ✓ should initialize with HTML5 Audio support 1ms
       ✓ should handle muted state correctly 1ms
       ✓ should preload sounds using HTML5 Audio 11ms
       ✓ should play sound with HTML5 Audio 1ms
       ✓ should not play sound when muted 1ms
       ✓ should cleanup audio elements 1ms
     ✓ SilentAudioManager (2)
       ✓ should initialize in silent mode 1ms
       ✓ should handle all operations silently 2ms
     ✓ createAudioManager factory (3)
       ✓ should create WebAudioManager when Web Audio API is supported 
 1ms
       ✓ should create HTML5AudioManager when only HTML5 Audio is suppo
orted 1ms
       ✓ should create SilentAudioManager when no audio support is avai
ilable 1ms
     ❯ Error Handling (4)
       ✓ should handle fetch errors during preloading  2024ms
       ✓ should handle HTTP errors during preloading  2025ms
       ✓ should handle audio decoding errors  2024ms
       × should handle playback errors gracefully 5ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 44 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/audio-context.test.tsx > AudioContext > should handle 
 initialization errors
AssertionError: expected 'true' to be 'false' // Object.is equality    

Expected: "false"
Received: "true"

 ❯ src/tests/audio-context.test.tsx:82:63
     80|X});
     81|
     82|Xexpect(screen.getByTestId('initialized').textContent)…
       |                                                               
^
     83|Xexpect(screen.getByTestId('manager-available').textCo…
     84|Xexpect(screen.getByTestId('error').textContent).toBe(…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/44]⎯

 FAIL  src/tests/audio-context.test.tsx > AudioContext > should call pr
reloadSounds during initialization
AssertionError: expected "spy" to be called 1 times, but got 0 times   
 ❯ src/tests/audio-context.test.tsx:98:48

     96|X});
     97|
     98|Xexpect(mockAudioManager.preloadSounds).toHaveBeenCall…
       |X^
     99|     });
    100|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/44]⎯

 FAIL  src/tests/audio-context.test.tsx > AudioContext > should allow m
manual cleanup
AssertionError: expected "spy" to be called 1 times, but got 0 times   
 ❯ src/tests/audio-context.test.tsx:124:42
    122|
    123|Xexpect(screen.getByTestId('manager-available').textCo…
    124|Xexpect(mockAudioManager.cleanup).toHaveBeenCalledTime…
       |X^
    125|     });
    126|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/44]⎯

 FAIL  src/tests/audio-context.test.tsx > AudioContext > should prevent
t multiple simultaneous initializations
AssertionError: expected "spy" to be called 1 times, but got 0 times   
 ❯ src/tests/audio-context.test.tsx:143:48
    141|
    142|         // Should not call preloadSounds again
    143|Xexpect(mockAudioManager.preloadSounds).toHaveBeenCall…
       |X^
    144|     });
    145|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/44]⎯

 FAIL  src/tests/audio-context.test.tsx > AudioContext > should handle 
 non-Error exceptions during initialization
AssertionError: expected 'null' to be 'Failed to initialize audio' // O
Object.is equality

Expected: "Failed to initialize audio"
Received: "null"

 ❯ src/tests/audio-context.test.tsx:170:57
    168|X});
    169|
    170|Xexpect(screen.getByTestId('error').textContent).toBe(…
       |X^     
    171|     });
    172| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should
d provide playSound function that calls audio manager
AssertionError: expected "spy" to be called with arguments: [ 'test-sou
und', undefined ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:63:48
     61|X});
     62|
     63|Xexpect(mockAudioManager.playSound).toHaveBeenCall…
       |X^
     64|X});
     65|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should
d provide playSound function with options
AssertionError: expected "spy" to be called with arguments: [ 'test-sou
und', …(1) ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:82:48
     80|X});
     81|
     82|Xexpect(mockAudioManager.playSound).toHaveBeenCall…
       |X^
     83|X});
     84|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should
d return muted state from audio manager
AssertionError: expected false to be true // Object.is equality        

- Expected
+ Received

- true
+ false

 ❯ src/tests/audio-hooks.test.tsx:97:44
     95|X});
     96|
     97|Xexpect(result.current.isMuted).toBe(true);        
       |X^
     98|X});
     99|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should
d toggle mute state
AssertionError: expected "spy" to be called with arguments: [ true ]   

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:116:47
    114|X});
    115|
    116|Xexpect(mockAudioManager.setMuted).toHaveBeenCalle…
       |X^
    117|X});
    118|


⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should
d handle playSound errors gracefully
AssertionError: expected "error" to be called with arguments: [ …(2) ] 

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:165:32
    163|X});
    164|
    165|Xexpect(consoleSpy).toHaveBeenCalledWith('Failed t…
       |X^
    166|XconsoleSpy.mockRestore();
    167|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[10/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should load volume from localStorage
AssertionError: expected 0.8 to be 0.6 // Object.is equality

- Expected
+ Received

- 0.6
+ 0.8

 ❯ src/tests/audio-hooks.test.tsx:186:43
    184|X});
    185|
    186|Xexpect(result.current.volume).toBe(0.6);
       |X^
    187|X});
    188|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[11/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should set muted state through audio manager
AssertionError: expected "spy" to be called with arguments: [ true ]   

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:213:47
    211|X});
    212|
    213|Xexpect(mockAudioManager.setMuted).toHaveBeenCalle…
       |X^
    214|X});
    215|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[12/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should set volume and save to localStorage
AssertionError: expected "spy" to be called with arguments: [ 'audio-vo
olume', '0.7' ]

Received:

  1st spy call:

  [
-   "audio-volume",
-   "0.7",
+   "wanderer-audio-settings",
+   "{\"isMuted\":false,\"globalVolume\":0.8,\"categoryVolumes\":{\"mov
vement\":0.8,\"collision\":0.9,\"gameState\":1}}",
  ]

  2nd spy call:

  [
-   "audio-volume",
-   "0.7",
+   "wanderer-audio-settings",
+   "{\"isMuted\":false,\"globalVolume\":0.7,\"categoryVolumes\":{\"mov
vement\":0.8,\"collision\":0.9,\"gameState\":1}}",
  ]


Number of calls: 2

 ❯ src/tests/audio-hooks.test.tsx:226:46
    224|
    225|Xexpect(result.current.volume).toBe(0.7);
    226|Xexpect(mockLocalStorage.setItem).toHaveBeenCalled…
       |X^
    227|X});
    228|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[13/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should reset to defaults
AssertionError: expected "spy" to be called with arguments: [ false ]  

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:262:47
    260|
    261|Xexpect(result.current.volume).toBe(0.8);
    262|Xexpect(mockAudioManager.setMuted).toHaveBeenCalle…
       |X^
    263|Xexpect(mockLocalStorage.removeItem).toHaveBeenCal…
    264|Xexpect(mockLocalStorage.removeItem).toHaveBeenCal…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[14/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should handle localStorage errors gracefully
AssertionError: expected "warn" to be called with arguments: [ …(2) ]  

Received:

  1st warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to save audio settings:",
+   Error {
+     "message": "Storage error",
+   },
  ]

  2nd warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "AudioContext not supported",
  ]

  3rd warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "No supported audio format found for player_walk",
  ]

  4th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to create audio element for player_walk",
  ]

  5th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "No supported audio format found for player_dig",
  ]

  6th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to create audio element for player_dig",
  ]

  7th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "No supported audio format found for boulder_move",
  ]

  8th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to create audio element for boulder_move",
  ]

  9th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "No supported audio format found for arrow_move",
  ]

  10th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to create audio element for arrow_move",
  ]

  11th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "No supported audio format found for collision_thud",
  ]

  12th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to create audio element for collision_thud",
  ]

  13th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "No supported audio format found for death_sound",
  ]

  14th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to create audio element for death_sound",
  ]

  15th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "No supported audio format found for victory_sound",
  ]

  16th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to create audio element for victory_sound",
  ]

  17th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "No supported audio format found for door_slam",
  ]

  18th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to create audio element for door_slam",
  ]

  19th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "No supported audio format found for diamond_collect",
  ]

  20th warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to create audio element for diamond_collect",
  ]

  21st warn call:

  [
-   "Failed to save volume preference:",
-   Any<Error>,
+   "Failed to save audio settings:",
+   Error {
+     "message": "Storage error",
+   },
  ]


Number of calls: 21


 ❯ src/tests/audio-hooks.test.tsx:282:32
    280|X});
    281|
    282|Xexpect(consoleSpy).toHaveBeenCalledWith('Failed t…
       |X^
    283|XconsoleSpy.mockRestore();
    284|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[15/44]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings 
 > should handle audio manager not initialized for setMuted
AssertionError: expected "warn" to be called with arguments: [ 'Audio m
manager not initialized' ]

Received:

  1st warn call:

  [
-   "Audio manager not initialized",
+   "AudioContext not supported",
  ]

  2nd warn call:

  [
-   "Audio manager not initialized",
+   "No supported audio format found for player_walk",
  ]

  3rd warn call:

  [
-   "Audio manager not initialized",
+   "Failed to create audio element for player_walk",
  ]

  4th warn call:

  [
-   "Audio manager not initialized",
+   "No supported audio format found for player_dig",
  ]

  5th warn call:

  [
-   "Audio manager not initialized",
+   "Failed to create audio element for player_dig",
  ]

  6th warn call:

  [
-   "Audio manager not initialized",
+   "No supported audio format found for boulder_move",
  ]

  7th warn call:

  [
-   "Audio manager not initialized",
+   "Failed to create audio element for boulder_move",
  ]

  8th warn call:

  [
-   "Audio manager not initialized",
+   "No supported audio format found for arrow_move",
  ]

  9th warn call:

  [
-   "Audio manager not initialized",
+   "Failed to create audio element for arrow_move",
  ]

  10th warn call:

  [
-   "Audio manager not initialized",
+   "No supported audio format found for collision_thud",
  ]

  11th warn call:

  [
-   "Audio manager not initialized",
+   "Failed to create audio element for collision_thud",
  ]

  12th warn call:

  [
-   "Audio manager not initialized",
+   "No supported audio format found for death_sound",
  ]

  13th warn call:

  [
-   "Audio manager not initialized",
+   "Failed to create audio element for death_sound",
  ]

  14th warn call:

  [
-   "Audio manager not initialized",
+   "No supported audio format found for victory_sound",
  ]

  15th warn call:

  [
-   "Audio manager not initialized",
+   "Failed to create audio element for victory_sound",
  ]

  16th warn call:

  [
-   "Audio manager not initialized",
+   "No supported audio format found for door_slam",
  ]

  17th warn call:

  [
-   "Audio manager not initialized",
+   "Failed to create audio element for door_slam",
  ]

  18th warn call:

  [
-   "Audio manager not initialized",
+   "No supported audio format found for diamond_collect",
  ]

  19th warn call:

  [
-   "Audio manager not initialized",
+   "Failed to create audio element for diamond_collect",
  ]


Number of calls: 19

 ❯ src/tests/audio-hooks.test.tsx:300:32
    298|X});
    299|
    300|Xexpect(consoleSpy).toHaveBeenCalledWith('Audio ma…
       |X^
    301|XconsoleSpy.mockRestore();
    302|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[16/44]⎯

 FAIL  src/tests/audio-manager.test.ts > Audio Manager > WebAudioManage
er > should handle audio context creation failure
AssertionError: expected true to be false // Object.is equality        

- Expected
+ Received

- false
+ true

 ❯ src/tests/audio-manager.test.ts:299:43
    297|
    298|Xconst manager = new WebAudioManager();
    299|Xexpect(manager.isSupported()).toBe(false);        
       |X^
    300|X});
    301|     });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[17/44]⎯

 FAIL  src/tests/audio-manager.test.ts > Audio Manager > Error Handling
g > should handle playback errors gracefully
AssertionError: expected "error" to be called with arguments: [ …(2) ] 

Received:

  1st error call:

  [
-   "Failed to create audio source:",
-   Any<Error>,
+   "Play error for test_sound:",
+   Error {
+     "message": "Source creation failed",
+   },
  ]


Number of calls: 1


 ❯ src/tests/audio-manager.test.ts:513:37
    511|
    512|             // Verify that error was logged
    513|Xexpect(consoleErrorSpy).toHaveBeenCalledWith('Fai…
       |X^
    514|
    515|             // Restore console.error

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[18/44]⎯

 FAIL  src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Audio Manager Factory > should create WebAudioM
Manager when Web Audio API is supported
AssertionError: expected false to be true // Object.is equality        

- Expected
+ Received

- true
+ false

 ❯ src/audio/__tests__/audio-error-handling.test.ts:96:43
     94|
     95|Xexpect(isWebAudioSupported).toHaveBeenCalled();   
     96|Xexpect(manager.isSupported()).toBe(true);
       |X^
     97|X});
     98|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[19/44]⎯

 FAIL  src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > SilentAudioManager > should implement all Audio
oManager methods without errors
AssertionError: expected true to be false // Object.is equality        

- Expected
+ Received

- false
+ true

 ❯ src/audio/__tests__/audio-error-handling.test.ts:153:39
    151|Xexpect(() => manager.playSound('test')).not.toThr…
    152|Xexpect(() => manager.setMuted(true)).not.toThrow(…
    153|Xexpect(manager.isMuted()).toBe(false);
       |X^
    154|Xexpect(manager.isSupported()).toBe(false);        
    155|Xexpect(() => manager.stopAllSounds()).not.toThrow…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[20/44]⎯

 FAIL  src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Error Recovery > should handle errors during au
udio context creation
AssertionError: expected WebAudioManager{} to be an instance of SilentA
AudioManager
 ❯ src/audio/__tests__/audio-error-handling.test.ts:211:29
    209|
    210|             // Should fall back to silent mode
    211|Xexpect(manager).toBeInstanceOf(SilentAudioManager…
       |X^
    212|Xexpect(console.error).toHaveBeenCalled();
    213|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[21/44]⎯

 FAIL  src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Error Recovery > should handle errors during so
ound playback
AssertionError: expected "playSound" to be called with arguments: [ 'te
est', undefined ]

Received:

  1st playSound call:

  [
    "test",
-   undefined,
  ]


Number of calls: 1

 ❯ src/audio/__tests__/audio-error-handling.test.ts:224:34
    222|Xmanager.playSound('test');
    223|
    224|Xexpect(playSoundSpy).toHaveBeenCalledWith('test',…
       |X^
    225|Xexpect(() => manager.playSound('test')).not.toThr…
    226|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[22/44]⎯

 FAIL  src/audio/__tests__/audio-error-handling.test.ts > Audio Error H
Handling and Fallbacks > Autoplay Policy Handling > should detect autopl
lay restrictions
AssertionError: expected false to be true // Object.is equality        

- Expected
+ Received

- true
+ false

 ❯ src/audio/__tests__/audio-error-handling.test.ts:282:43
    280|
    281|             // Should still create a manager
    282|Xexpect(manager.isSupported()).toBe(true);
       |X^
    283|
    284|X// Event listeners should be added for user inter…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[23/44]⎯

 FAIL  src/audio/__tests__/audio-settings-integration.test.tsx > Audio 
 Settings Integration > complete audio settings workflow > should allow 
 user to control audio settings end-to-end
TestingLibraryElementError: Unable to find a label with the text of: Un
nmute audio

Ignored nodes: comments, script, style
<body>
  <div>
    <div
      class="audio-control"
    >
      <button
        aria-label="Mute audio"
        class="audio-button mute-button "
        title="Mute (Ctrl+M)"
      >
        🔊
      </button>
      <button
        aria-label="Open audio settings"
        class="audio-button settings-button"
        title="Audio Settings"
      >
        ⚙️
      </button>
    </div>
  </div>
</body>
 ❯ Object.getElementError node_modules/@testing-library/dom/dist/config
g.js:37:19
 ❯ getAllByLabelText node_modules/@testing-library/dom/dist/queries/lab
bel-text.js:111:38
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:52:17       
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:95:19       
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx:113:27      
    111|
    112|             // Should now show muted state
    113|Xexpect(screen.getByLabelText('Unmute audio')).toB…
       |X^
    114|
    115|             // Open settings

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[24/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Web Audio API Unavailable > should handle AudioContex
xt creation failure

AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/audio/__tests__/error-handling.test.ts:135:43
    133|
    134|             // Should handle the error gracefully
    135|Xexpect(manager.isSupported()).toBe(false);        
       |X^
    136|Xexpect(console.error).toHaveBeenCalledWith(       
    137|Xexpect.stringContaining('Audio context error'…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[25/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Audio Context Suspension Handling > should handle sus
spended audio context due to autoplay policies
AssertionError: expected "spy" to be called at least once
 ❯ src/audio/__tests__/error-handling.test.ts:160:45
    158|
    159|             // Should attempt to resume the context
    160|Xexpect(suspendedContext.resume).toHaveBeenCalled(…
       |X^
    161|X});
    162|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[26/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Audio Context Suspension Handling > should handle aud
dio context resume failure
AssertionError: expected "warn" to be called with arguments: [ StringCo
ontaining{…}, Any<Error> ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:179:34
    177|
    178|             // Should handle resume failure gracefully        
    179|Xexpect(console.warn).toHaveBeenCalledWith(        
       |X^
    180|Xexpect.stringContaining('Failed to resume'),  
    181|Xexpect.any(Error)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[27/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Sound File Loading Errors > should handle failed soun
nd file loads gracefully
AssertionError: expected "error" to be called with arguments: [ StringC
Containing{…}, Any<Error> ]

Received:

  1st error call:

  [
-   StringContaining "Failed to load sound",
-   Any<Error>,
+   "Load error for PLAYER_WALK:",
+   Error {
+     "message": "No supported audio formats found for PLAYER_WALK",   
+   },
  ]

  2nd error call:

  [
-   StringContaining "Failed to load sound",
-   Any<Error>,
+   "Load error for PLAYER_DIG:",
+   Error {
+     "message": "No supported audio formats found for PLAYER_DIG",    
+   },
  ]

  3rd error call:

  [
-   StringContaining "Failed to load sound",
-   Any<Error>,
+   "Load error for BOULDER_MOVE:",
+   Error {
+     "message": "No supported audio formats found for BOULDER_MOVE",  
+   },
  ]

  4th error call:

  [
-   StringContaining "Failed to load sound",
-   Any<Error>,
+   "Load error for ARROW_MOVE:",
+   Error {
+     "message": "No supported audio formats found for ARROW_MOVE",    
+   },
  ]

  5th error call:

  [
-   StringContaining "Failed to load sound",
-   Any<Error>,
+   "Load error for COLLISION_THUD:",
+   Error {
+     "message": "No supported audio formats found for COLLISION_THUD",
+   },
  ]

  6th error call:

  [
-   StringContaining "Failed to load sound",
-   Any<Error>,
+   "Load error for DEATH_SOUND:",
+   Error {
+     "message": "No supported audio formats found for DEATH_SOUND",   
+   },
  ]

  7th error call:

  [
-   StringContaining "Failed to load sound",
-   Any<Error>,
+   "Load error for VICTORY_SOUND:",
+   Error {
+     "message": "No supported audio formats found for VICTORY_SOUND", 
+   },
  ]

  8th error call:

  [
-   StringContaining "Failed to load sound",
-   Any<Error>,
+   "Load error for DOOR_SLAM:",
+   Error {
+     "message": "No supported audio formats found for DOOR_SLAM",     
+   },
  ]

  9th error call:

  [
-   StringContaining "Failed to load sound",
-   Any<Error>,
+   "Load error for DIAMOND_COLLECT:",
+   Error {
+     "message": "No supported audio formats found for DIAMOND_COLLECT"
",
+   },
  ]


Number of calls: 9

 ❯ src/audio/__tests__/error-handling.test.ts:224:35
    222|
    223|             // Should log the error
    224|Xexpect(console.error).toHaveBeenCalledWith(       
       |X^
    225|Xexpect.stringContaining('Failed to load sound…
    226|Xexpect.any(Error)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[28/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Sound File Loading Errors > should retry failed sound
d loads
AssertionError: expected "spy" to be called 2 times, but got 0 times   
 ❯ src/audio/__tests__/error-handling.test.ts:250:31
    248|
    249|             // Should have retried the failed request
    250|Xexpect(mockFetch).toHaveBeenCalledTimes(2);       
       |X^
    251|X});
    252|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[29/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Sound File Loading Errors > should fall back to HTML5
5 audio when Web Audio loading fails completely
AssertionError: expected "spy" to be called with arguments: [ ObjectCon
ntaining{…} ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:262:42
    260|Xmanager.playSound('PLAYER_WALK');
    261|
    262|Xexpect(window.dispatchEvent).toHaveBeenCalledWith(
       |X^
    263|Xexpect.objectContaining({
    264|Xtype: 'audioManagerFallback'

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[30/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > HTML5 Audio Fallback > should handle HTML5 audio play
yback errors
AssertionError: expected "error" to be called with arguments: [ StringC
Containing{…}, Any<Error> ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:286:35
    284|
    285|             // Should handle the error gracefully
    286|Xexpect(console.error).toHaveBeenCalledWith(       
       |X^
    287|Xexpect.stringContaining('HTML5 audio playback…
    288|Xexpect.any(Error)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[31/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > HTML5 Audio Fallback > should handle autoplay blocked
d errors

AssertionError: expected "spy" to be called with arguments: [ 'click', 
 Any<Function>, …(1) ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:307:47
    305|
    306|             // Should set up autoplay recovery
    307|Xexpect(document.addEventListener).toHaveBeenCalle…
       |X^
    308|X'click',
    309|Xexpect.any(Function),

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[32/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > HTML5 Audio Fallback > should handle unsupported audi
io formats
AssertionError: expected "error" to be called with arguments: [ StringC
Containing{…}, Any<Error> ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:322:35
    320|Xawait expect(manager.preloadSounds()).resolves.no…
    321|
    322|Xexpect(console.error).toHaveBeenCalledWith(       
       |X^
    323|Xexpect.stringContaining('Failed to preload HT…
    324|Xexpect.any(Error)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[33/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Error Recovery Mechanisms > should attempt on-demand 
 loading when buffer not found
AssertionError: expected "log" to be called with arguments: [ StringCon
ntaining{…} ]

Received:

  1st log call:

  [
-   StringContaining "Attempting on-demand load",
+   "Web Audio API initialized successfully",
  ]


Number of calls: 1

 ❯ src/audio/__tests__/error-handling.test.ts:368:33
    366|
    367|             // Should attempt to load the sound on-demand     
    368|Xexpect(console.log).toHaveBeenCalledWith(
       |X^
    369|Xexpect.stringContaining('Attempting on-demand…
    370|X);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[34/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Error Recovery Mechanisms > should validate audio buf
ffers before playback
AssertionError: expected "warn" to be called with arguments: [ …(2) ]  

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:389:34
    387|
    388|             // Should detect and handle invalid buffer        
    389|Xexpect(console.warn).toHaveBeenCalledWith(        
       |X^
    390|Xexpect.stringContaining('Invalid buffer'),    
    391|Xexpect.any(String)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[35/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Browser-Specific Error Handling > should handle Safar
ri-specific audio context issues
AssertionError: expected "spy" to be called at least once
 ❯ src/audio/__tests__/error-handling.test.ts:442:42
    440|
    441|             // Should handle Safari-specific resume logic     
    442|Xexpect(safariContext.resume).toHaveBeenCalled();  
       |X^
    443|X});
    444|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[36/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Browser-Specific Error Handling > should handle Chrom
me-specific audio context issues
AssertionError: expected "spy" to be called at least once
 ❯ src/audio/__tests__/error-handling.test.ts:469:52
    467|
    468|             // Should handle Chrome-specific resume logic     
    469|Xexpect(chromeContext.createOscillator).toHaveBeen…
       |X^
    470|X});
    471|     });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[37/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Error Event Emission > should emit error events for e
external handling
AssertionError: expected "spy" to be called with arguments: [ ObjectCon
ntaining{…} ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:481:42
    479|
    480|             // Should emit error event
    481|Xexpect(window.dispatchEvent).toHaveBeenCalledWith(
       |X^
    482|Xexpect.objectContaining({
    483|Xtype: 'audioError',

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[38/44]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handlin
ng and Fallbacks > Error Event Emission > should emit fallback events wh
hen switching audio managers
AssertionError: expected "spy" to be called with arguments: [ ObjectCon
ntaining{…} ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:501:42
    499|
    500|             // Should emit fallback event
    501|Xexpect(window.dispatchEvent).toHaveBeenCalledWith(
       |X^
    502|Xexpect.objectContaining({
    503|Xtype: 'audioManagerFallback'

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[39/44]⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should preload sounds
s with progress tracking
AssertionError: expected 0 to be greater than 0
 ❯ src/tests/audio/enhanced-audio-manager.test.ts:148:50
    146|Xconst loadingState = manager.getLoadingState(…
    147|Xexpect(loadingState.isLoading).toBe(false);   
    148|Xexpect(loadingState.loadedCount).toBeGreaterT…
       |X^
    149|
    150|Xunsubscribe();

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[40/44]⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should apply optimiza
ation during preloading
AssertionError: expected "spy" to be called at least once
 ❯ src/tests/audio/enhanced-audio-manager.test.ts:157:55
    155|
    156|X// Verify that optimization methods were call…
    157|Xexpect(mockAudioContext.createBuffer).toHaveB…
       |X^       
    158|X});
    159|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[41/44]⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should handle loading
g failures gracefully
AssertionError: expected 0 to be greater than 0
 ❯ src/tests/audio/enhanced-audio-manager.test.ts:166:58
    164|
    165|Xconst loadingState = manager.getLoadingState(…
    166|Xexpect(loadingState.failedSounds.length).toBe…
       |X^    
    167|Xexpect(loadingState.errors.size).toBeGreaterT…
    168|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[42/44]⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > enhanced preloading > should skip preloadin
ng in fallback mode
AssertionError: expected "spy" to not be called at all, but actually be
een called 9 times

Received:

  1st spy call:

    Array [
      "sounds/player/walk.mp3",
      Object {
        "signal": AbortSignal {},
      },
    ]

  2nd spy call:

    Array [
      "sounds/player/dig.mp3",
      Object {
        "signal": AbortSignal {},
      },
    ]

  3rd spy call:

    Array [
      "sounds/boulder/Whoosh.mp3",
      Object {
        "signal": AbortSignal {},
      },
    ]

  4th spy call:

    Array [
      "sounds/arrow/twang.mp3",
      Object {
        "signal": AbortSignal {},
      },
    ]

  5th spy call:

    Array [
      "sounds/arrow/thud.mp3",
      Object {
        "signal": AbortSignal {},
      },
    ]

  6th spy call:

    Array [
      "sounds/player/death.mp3",
      Object {
        "signal": AbortSignal {},
      },
    ]

  7th spy call:

    Array [
      "sounds/environment/door-slam.mp3",
      Object {
        "signal": AbortSignal {},
      },
    ]

  8th spy call:

    Array [
      "sounds/environment/door-slam.mp3",
      Object {
        "signal": AbortSignal {},
      },
    ]

  9th spy call:

    Array [
      "sounds/environment/door-slam.mp3",
      Object {
        "signal": AbortSignal {},
      },
    ]


Number of calls: 9

 ❯ src/tests/audio/enhanced-audio-manager.test.ts:176:39
    174|Xawait manager.preloadSounds();
    175|
    176|Xexpect(mockFetch).not.toHaveBeenCalled();     
       |X^
    177|X});
    178|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[43/44]⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio 
 Manager > WebAudioManager > error recovery > should handle decode error
rs
AssertionError: expected 0 to be greater than 0
 ❯ src/tests/audio/enhanced-audio-manager.test.ts:238:58
    236|
    237|Xconst loadingState = manager.getLoadingState(…
    238|Xexpect(loadingState.failedSounds.length).toBe…
       |X^    
    239|X});
    240|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[44/44]⎯

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

Vitest caught 2 unhandled errors during the test run.
This might cause false positive tests. Resolve unhandled errors to make
e sure your tests are not affected.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: Preload failed
 ❯ SilentAudioManager.<anonymous> src/audio/__tests__/audio-error-handl
ling.test.ts:234:23
    232|
    233|Xmanager.preloadSounds = vi.fn().mockImplementatio…
    234|Xthrow new Error('Preload failed');
       |X^
    235|X});
    236|
 ❯ SilentAudioManager.mockCall node_modules/@vitest/spy/dist/index.js:9
96:15
 ❯ SilentAudioManager.spy node_modules/tinyspy/dist/index.js:47:103    
 ❯ src/audio/__tests__/audio-error-handling.test.ts:240:35
 ❯ Proxy.assertThrows node_modules/chai/chai.js:2787:5
 ❯ Proxy.methodWrapper node_modules/chai/chai.js:1706:25
 ❯ Proxy.<anonymous> node_modules/@vitest/expect/dist/index.js:1088:12 ode (vitest 1)
 ❯ Proxy.overwritingMethodWrapper node_modules/chai/chai.js:1755:33    
 ❯ Proxy.<anonymous> node_modules/@vitest/expect/dist/index.js:1420:16 
 ❯ Proxy.<anonymous> node_modules/@vitest/expect/dist/index.js:1029:14 

This error originated in "src/audio/__tests__/audio-error-handling.test
t.ts" test file. It doesn't mean the error was thrown inside the file it
tself, but while it was running.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Uncaught Exception ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
TypeError: toggleMute is not a function
 ❯ handleMuteClick src/audio/components/AudioControl.tsx:12:9
     10|     const handleMuteClick = (event: React.MouseEvent) => {    
     11|Xevent.stopPropagation();
     12|XtoggleMute();
       |X^
     13|     };
     14|

 ❯ executeDispatch node_modules/react-dom/cjs/react-dom-client.developm
ment.js:16368:9
 ❯ runWithFiberInDEV node_modules/react-dom/cjs/react-dom-client.develo
opment.js:1522:13
 ❯ processDispatchQueue node_modules/react-dom/cjs/react-dom-client.dev
velopment.js:16418:19
 ❯ node_modules/react-dom/cjs/react-dom-client.development.js:17016:9  
 ❯ batchedUpdates$1 node_modules/react-dom/cjs/react-dom-client.develop
pment.js:3262:40
 ❯ dispatchEventForPluginEventSystem node_modules/react-dom/cjs/react-d
dom-client.development.js:16572:7
 ❯ dispatchEvent node_modules/react-dom/cjs/react-dom-client.developmen
nt.js:20658:11
 ❯ dispatchDiscreteEvent node_modules/react-dom/cjs/react-dom-client.de
evelopment.js:20626:11
 ❯ HTMLDivElement.callTheUserObjectsOperation node_modules/jsdom/lib/js
sdom/living/generated/EventListener.js:26:30

This error originated in "src/audio/__tests__/audio-settings-integratio
on.test.tsx" test file. It doesn't mean the error was thrown inside the 
 file itself, but while it was running.
The latest test that might've caused the error is "should allow user to
o control audio settings end-to-end". It might mean one of the following
g:
- The error was thrown, while Vitest was running this test.
- If the error occurred after the test had been completed, this was the
e last documented test before it was thrown.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯


 Test Files  7 failed | 14 passed (21)
      Tests  44 failed | 268 passed (312)
     Errors  2 errors
   Start at  16:53:48
   Duration  10.91s (transform 2.87s, setup 4.92s, collect 6.98s, tests
s 19.33s, environment 29.38s, prepare 5.55s)

:\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
I can see there are 44 failing tests out of 312 total tests. The main issues appear to be:

Audio Context/Manager initialization issues - Many tests are failing because the audio manager isn't being properly initialized or mocked
Missing audio files - Tests are trying to load audio files that don't exist (Network errors, 404s)
Mock setup problems - Several mocks aren't working as expected
Component integration issues - Some React components aren't receiving the expected props
Let me examine some key failing test files to understand the root causes:

Read file(s)

audio-context.test.tsx

audio-hooks.test.tsx
Read file(s)

audio-context.test.tsx 70 - 91
Session Too Long
Continue
Summarize and continue in a new session.

Revert







Claude Sonnet 4.0
