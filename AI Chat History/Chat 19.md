Including Steering Documents

typescript-standards.md
Understood. I have the context from our previous conversation and am ready to continue helping you.

Please run and repair vitest unitests

Kiro
I'll run the unit tests and fix the failing issues. Let me start by running the tests to see the current state.

Command
npm test -- --run src/tests/audio
npm t
test -- --run src/tests/audio 
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/audiopm test --run src/tests/audio
> thewanderer@0.1.0 test     
> vitest run -c vitest.config
g.ts --run src/tests/audio    

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheW
Wanderer

ode (vitest 4)ode (vitest 5)ode (vitest 6)ode (vitest 3)ode (vitest 7)ode (vitest 9)ode (vitest 10)ode (vitest 11)ode (vitest 12)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (6)     
      Tests 0 passed (0)     
   Start at 09:59:34
   Duration 967ms

 ❯ src/tests/audio-context.test.tsx [queued]

 Test Files 0 passed (6)     
      Tests 0 passed (0)     
   Start at 09:59:34
   Duration 1.73s
(node:36340) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:39344) [DEP0040] Deprec
cationWarning: The `punycode` 
 module is deprecated. Please 
 use a userland alternative in
nstead.
(Use `node --trace-deprecatio
on ...` to show where the warn
ning was created)
(node:46000) [DEP0040] Deprec
cationWarning: The `punycode` 
 module is deprecated. Please 
 use a userland alternative in
nstead.
(Use `node --trace-deprecatio
on ...` to show where the warn
ning was created)
(node:65440) [DEP0040] Deprec
cationWarning: The `punycode` 
 module is deprecated. Please 
 use a userland alternative in
nstead.
(Use `node --trace-deprecatio
on ...` to show where the warn
ning was created)
(node:2164) [DEP0040] Depreca
ationWarning: The `punycode` m
module is deprecated. Please u
use a userland alternative ins
stead.
(Use `node --trace-deprecatio
on ...` to show where the warn
ning was created)
(node:4024) [DEP0040] Depreca
ationWarning: The `punycode` m
module is deprecated. Please u
use a userland alternative ins
stead.
(Use `node --trace-deprecatio
on ...` to show where the warn
ning was created)

 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts [queued]
 ❯ src/tests/audio/asset-load
der.test.ts [queued]
 ❯ src/tests/audio/audio-opti
imization.test.ts [queued]    
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts [queued]

 Test Files 0 passed (6)     
      Tests 0 passed (0)     
   Start at 09:59:34
   Duration 1.95s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
Retry 1/2 for sounds/test.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:113:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking       
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should preload sounds 
 with progress tracking       
Loading PLAYER_WALK: 100% (lo
oaded)
Loading PLAYER_DIG: 100% (loa
aded)
Loading BOULDER_MOVE: 100% (l
loaded)
Loading ARROW_MOVE: 100% (loa
aded)
Loading COLLISION_THUD: 100% 
 (loaded)
Loading DEATH_SOUND: 100% (lo
oaded)
Loading VICTORY_SOUND: 100% (
(loaded)
Loading DOOR_SLAM: 100% (load
ded)
Loading DIAMOND_COLLECT: 100%
% (loaded)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should preload sounds 
 with progress tracking       
Asset loading complete: 9/9 l
loaded, 0 failed

stdout | src/tests/audio-mana
ager.test.ts > Audio Manager >
> WebAudioManager > should pre
eload sounds successfully     
Loading PLAYER_WALK: 0% (load
ding)
Loading PLAYER_WALK: 0% (fail
led)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (faile
ed)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (fai
iled)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (faile
ed)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (f
failed)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (fail
led)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (fa
ailed)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (failed
d)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(failed)


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully     
Failed to load sound PLAYER_WALK: Error: No supported audio formats found for PLAYER_WALK
    at AssetLoader.loadAudioBuffer (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound PLAYER_D
DIG: Error: No supported audio
o formats found for PLAYER_DIG
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound BOULDER_
_MOVE: Error: No supported aud
dio formats found for BOULDER_
_MOVE
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound ARROW_MO
OVE: Error: No supported audio
o formats found for ARROW_MOVE
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound COLLISIO
ON_THUD: Error: No supported a
audio formats found for COLLIS
SION_THUD
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DEATH_SO
OUND: Error: No supported audi
io formats found for DEATH_SOU
UND
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound VICTORY_
_SOUND: Error: No supported au
udio formats found for VICTORY
Y_SOUND
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DOOR_SLA
AM: Error: No supported audio 
 formats found for DOOR_SLAM  
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11

    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DIAMOND_
_COLLECT: Error: No supported 
 audio formats found for DIAMO
OND_COLLECT
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound PLAYER_W
WALK: Error: No supported audi
io formats found for PLAYER_WA
ALK
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound PLAYER_D
DIG: Error: No supported audio
o formats found for PLAYER_DIG
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound BOULDER_
_MOVE: Error: No supported aud
dio formats found for BOULDER_
_MOVE
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound ARROW_MO
OVE: Error: No supported audio
o formats found for ARROW_MOVE
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound COLLISIO
ON_THUD: Error: No supported a
audio formats found for COLLIS
SION_THUD
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DEATH_SO
OUND: Error: No supported audi
io formats found for DEATH_SOU
UND
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound VICTORY_
_SOUND: Error: No supported au
udio formats found for VICTORY
Y_SOUND
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    atfile:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DOOR_SLA
AM: Error: No supported audio 
 formats found for DOOR_SLAM  
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DIAMOND_
_COLLECT: Error: No supported 
 audio formats found for DIAMO
OND_COLLECT
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:177:27
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully     
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully     
Preloading complete: 0/9 sounds loaded


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully     
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


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_WALK: 0% (failed)
Loading PLAYER_DIG: 0% (loading)
Loading PLAYER_DIG: 0% (failed)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (fai
iled)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (faile
ed)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (f
failed)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (fail
led)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (fa
ailed)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (failed
d)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(failed)


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load sound PLAYER_WALK: Error: No supported audio formats found for PLAYER_WALK
    at AssetLoader.loadAudioBuffer (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound PLAYER_D
DIG: Error: No supported audio
o formats found for PLAYER_DIG
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound BOULDER_
_MOVE: Error: No supported aud
dio formats found for BOULDER_
_MOVE
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound ARROW_MO
OVE: Error: No supported audio
o formats found for ARROW_MOVE
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound COLLISIO
ON_THUD: Error: No supported a
audio formats found for COLLIS
SION_THUD
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DEATH_SO
OUND: Error: No supported audi
io formats found for DEATH_SOU
UND
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound VICTORY_
_SOUND: Error: No supported au
udio formats found for VICTORY
Y_SOUND
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DOOR_SLA
AM: Error: No supported audio 
 formats found for DOOR_SLAM  
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DIAMOND_
_COLLECT: Error: No supported 
 audio formats found for DIAMO
OND_COLLECT
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound PLAYER_W
WALK: Error: No supported audi
io formats found for PLAYER_WA
ALK
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound PLAYER_D
DIG: Error: No supported audio
o formats found for PLAYER_DIG
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound BOULDER_
_MOVE: Error: No supported aud
dio formats found for BOULDER_
_MOVE
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound ARROW_MO
OVE: Error: No supported audio
o formats found for ARROW_MOVE
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound COLLISIO
ON_THUD: Error: No supported a
audio formats found for COLLIS
SION_THUD
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DEATH_SO
OUND: Error: No supported audi
io formats found for DEATH_SOU
UND
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound VICTORY_
_SOUND: Error: No supported au
udio formats found for VICTORY
Y_SOUND
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DOOR_SLA
AM: Error: No supported audio 
 formats found for DOOR_SLAM  
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
Failed to load sound DIAMOND_
_COLLECT: Error: No supported 
 audio formats found for DIAMO
OND_COLLECT
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:220:27)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:189:34
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Preloading complete: 0/9 sounds loaded


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
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

stderr | src/tests/audio-mana
ager.test.ts > Audio Manager >
> WebAudioManager > should han
ndle missing sound buffer grac
cefully
Sound buffer not found for ID
D: nonexistent_sound

stderr | src/tests/audio-mana
ager.test.ts > Audio Manager >
> WebAudioManager > should han
ndle audio context creation fa
ailure
Failed to initialize audio co
ontext: Error: AudioContext cr
reation failed
    at new global.AudioContex
xt (D:\FizzBash\TheWanderer\sr
rc\tests\audio-manager.test.ts
s:256:27)
    at WebAudioManager.initia
alizeAudioContext (D:\FizzBash
h\TheWanderer\src\audio\manage
ers\audio-manager.ts:67:39)   
    at new WebAudioManager (D
D:\FizzBash\TheWanderer\src\au
udio\managers\audio-manager.ts
s:51:14)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:260:29
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio
HTML5 Audio: Preloaded 9 sounds


 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported
Web Audio API not supported, using HTML5 Audio fallback   

stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create SilentAudioMan
nager when no audio support is
s available
No audio support detected, us
sing silent mode


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Failed to load sound PLAYER_WALK: ReferenceError: Audio is not defined
    at AssetLoader.supportsFormat (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:402:34
Failed to load sound PLAYER_D
DIG: ReferenceError: Audio is 
 not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:402:34
Failed to load sound BOULDER_
_MOVE: ReferenceError: Audio i
is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:402:34
Failed to load sound ARROW_MO
OVE: ReferenceError: Audio is 
 not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:402:34
Failed to load sound COLLISIO
ON_THUD: ReferenceError: Audio
o is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:402:34
Failed to load sound DEATH_SO
OUND: ReferenceError: Audio is
s not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:402:34
Failed to load sound VICTORY_
_SOUND: ReferenceError: Audio 
 is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:402:34
Failed to load sound DOOR_SLA
AM: ReferenceError: Audio is n
not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:402:34
Failed to load sound DIAMOND_
_COLLECT: ReferenceError: Audi
io is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:402:34


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading
Preloading complete: 0/9 soun
nds loaded


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
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


 ❯ src/tests/audio-context.te
est.tsx [queued]
 ❯ src/tests/audio-hooks.test
t.tsx [queued]
 ❯ src/tests/audio-manager.te
est.ts 0/27
 ❯ src/tests/audio/asset-load
der.test.ts 0/16
 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 0/23    

 Test Files 0 passed (6)     
      Tests 1 passed (94)    
   Start at 09:59:34
   Duration 2.15s
 ❯ src/tests/audio/audio-optimization.test.ts (28 tests | 5 failed) 100ms
   ✓ AudioFormatUtils > isFormatSupported > should return true for supported formats 6ms
   ✓ AudioFormatUtils > isFormatSupported > should return false for unsupported formats 1ms
   ✓ AudioFormatUtils > isFormatSupported > should be case
e insensitive 1ms
   ✓ AudioFormatUtils > getBe
estSupportedFormat > should re
eturn mp3 as preferred format 
 0ms
   ✓ AudioFormatUtils > getBe
estSupportedFormat > should re
eturn ogg if mp3 not available
e 0ms
   ✓ AudioFormatUtils > getBe
estSupportedFormat > should re
eturn null if no formats suppo
orted 0ms
   ✓ AudioFormatUtils > getFo
ormatFromUrl > should extract 
 format from URL 0ms
   ✓ AudioFormatUtils > getFo
ormatFromUrl > should handle U
URLs with query parameters 0ms
   ✓ AudioFormatUtils > getFo
ormatFromUrl > should return e
empty string for URLs without 
 extension 0ms
   ✓ AudioFormatUtils > valid
dateAudioHeader > should valid
date MP3 header with ID3 tag 0
0ms
   × AudioFormatUtils > valid
dateAudioHeader > should valid
date MP3 header with frame syn
nc 12ms
     → expected false to be t
true // Object.is equality    
   ✓ AudioFormatUtils > valid
dateAudioHeader > should valid
date OGG header 0ms
   ✓ AudioFormatUtils > valid
dateAudioHeader > should valid
date WAV header 0ms
   ✓ AudioFormatUtils > valid
dateAudioHeader > should rejec
ct invalid headers 0ms        
   ✓ AudioOptimizer > analyze
eAudioBuffer > should analyze 
 audio buffer metrics 1ms     
   × AudioOptimizer > analyze
eAudioBuffer > should provide 
 sample rate recommendations 5
5ms
     → expected [ …(3) ] to i
include StringContaining "redu
ucing sample rate"
   × AudioOptimizer > analyze
eAudioBuffer > should provide 
 channel recommendations for s
stereo 1ms
     → expected [ …(3) ] to i
include StringContaining "Conv
vert to mono"
   × AudioOptimizer > analyze
eAudioBuffer > should provide 
 duration recommendations for 
 long clips 1ms
     → expected [ …(4) ] to i
include StringContaining{…}   
   × AudioOptimizer > analyze
eAudioBuffer > should provide 
 file size recommendations 1ms
     → expected [ …(3) ] to i
include StringContaining{…}   
   ✓ AudioOptimizer > normali
izeAudioBuffer > should normal
lize audio buffer 26ms        
   ✓ AudioOptimizer > normali
izeAudioBuffer > should skip n
normalization when disabled 0m
ms
   ✓ AudioOptimizer > applyFa
adeInOut > should apply fade i
in and out 16ms
   ✓ AudioOptimizer > applyFa
adeInOut > should use default 
 fade times 18ms
   ✓ AudioOptimizer > getOpti
imizationReport > should gener
rate optimization report for m
multiple files 1ms
   ✓ AudioOptimizer > getOpti
imizationReport > should provi
ide global recommendations 1ms
   ✓ AudioUtils > formatFileS
Size > should format bytes cor
rrectly 0ms
   ✓ AudioUtils > formatDurat
tion > should format seconds c
correctly 0ms
   ✓ AudioUtils > formatCompr
ressionRatio > should format c
compression ratio as percentag
ge 0ms
stdout | src/tests/audio-mana
ager.test.ts > Audio Manager >
> Error Handling > should hand
dle HTTP errors during preload
ding
Loading PLAYER_WALK: 0% (load
ding)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load sound PLAYER_WALK: ReferenceError: Audio is not defined
    at AssetLoader.supportsFormat (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:415:34
Failed to load sound PLAYER_D
DIG: ReferenceError: Audio is 
 not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:415:34
Failed to load sound BOULDER_
_MOVE: ReferenceError: Audio i
is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:415:34
Failed to load sound ARROW_MO
OVE: ReferenceError: Audio is 
 not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:415:34
Failed to load sound COLLISIO
ON_THUD: ReferenceError: Audio
o is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:415:34
Failed to load sound DEATH_SO
OUND: ReferenceError: Audio is
s not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:415:34
Failed to load sound VICTORY_
_SOUND: ReferenceError: Audio 
 is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:415:34
Failed to load sound DOOR_SLA
AM: ReferenceError: Audio is n
not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:415:34
Failed to load sound DIAMOND_
_COLLECT: ReferenceError: Audi
io is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:415:34


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Preloading complete: 0/9 soun
nds loaded


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
                             
                             
                             
                             
                             
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


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors     
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_DIG: 0% (loading)
Loading BOULDER_MOVE: 0% (loading)
Loading ARROW_MOVE: 0% (loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors     
Failed to load sound PLAYER_WALK: ReferenceError: Audio is not defined
    at AssetLoader.supportsFormat (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:118:23)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:431:34
Failed to load sound PLAYER_D
DIG: ReferenceError: Audio is 
 not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:431:34
Failed to load sound BOULDER_
_MOVE: ReferenceError: Audio i
is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:431:34
Failed to load sound ARROW_MO
OVE: ReferenceError: Audio is 
 not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:431:34
Failed to load sound COLLISIO
ON_THUD: ReferenceError: Audio
o is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:431:34
Failed to load sound DEATH_SO
OUND: ReferenceError: Audio is
s not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:431:34
Failed to load sound VICTORY_
_SOUND: ReferenceError: Audio 
 is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:431:34
Failed to load sound DOOR_SLA
AM: ReferenceError: Audio is n
not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:431:34
Failed to load sound DIAMOND_
_COLLECT: ReferenceError: Audi
io is not defined
    at AssetLoader.supportsFo
ormat (D:\FizzBash\TheWanderer
r\src\audio\managers\asset-loa
ader.ts:118:23)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:140:25
    at Array.filter (<anonymo
ous>)
    at AssetLoader.filterSupp
portedSources (D:\FizzBash\The
eWanderer\src\audio\managers\a
asset-loader.ts:138:24)       
    at AssetLoader.loadAudioB
Buffer (D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:217:24)
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:283:43
    at Array.map (<anonymous>
>)
    at AssetLoader.loadAssets
s (D:\FizzBash\TheWanderer\src
c\audio\managers\asset-loader.
.ts:281:44)
    at WebAudioManager.preloa
adSounds (D:\FizzBash\TheWande
erer\src\audio\managers\audio-
-manager.ts:248:58)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:431:34


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors     
Asset loading complete: 0/9 loaded, 9 failed

stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle audio decoding errors     
Preloading complete: 0/9 sounds loaded


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
                             
                             
                             
                             
                             
                             
                             
                             
                             
                             
                             
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

stderr | src/tests/audio-mana
ager.test.ts > Audio Manager >
> Error Handling > should hand
dle playback errors gracefully
Failed to create audio source
e: Error: Source creation fail
led
    at MockAudioContext.<anon
nymous> (D:\FizzBash\TheWander
rer\src\tests\audio-manager.te
est.ts:441:27)
    at MockAudioContext.mockC
Call (file:///D:/FizzBash/TheW
Wanderer/node_modules/@vitest/
/spy/dist/index.js:96:15)     
    at MockAudioContext.spy [
[as createBufferSource] (file:
:///D:/FizzBash/TheWanderer/no
ode_modules/tinyspy/dist/index
x.js:47:103)
    at WebAudioManager.create
eAudioSource (D:\FizzBash\TheW
Wanderer\src\audio\managers\au
udio-manager.ts:170:52)       
    at WebAudioManager.playSo
ound (D:\FizzBash\TheWanderer\
\src\audio\managers\audio-mana
ager.ts:213:33)
    at D:\FizzBash\TheWandere
er\src\tests\audio-manager.tes
st.ts:452:34
    at Proxy.assertThrows (fi
ile:///D:/FizzBash/TheWanderer
r/node_modules/chai/chai.js:27
787:5)
    at Proxy.methodWrapper (f
file:///D:/FizzBash/TheWandere
er/node_modules/chai/chai.js:1
1706:25)
    at Proxy.<anonymous> (fil
le:///D:/FizzBash/TheWanderer/
/node_modules/@vitest/expect/d
dist/index.js:1088:12)        
    at Proxy.overwritingMetho
odWrapper (file:///D:/FizzBash
h/TheWanderer/node_modules/cha
ai/chai.js:1755:33)


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
 ❯ src/tests/audio-manager.test.ts (27 tests | 1 failed) 96ms
   ✓ Audio Manager > WebAudioManager > should initialize with Web Audio API support 4ms
   ✓ Audio Manager > WebAudioManager > should handle muted state correctly 3ms
   ✓ Audio Manager > WebAudioManager > should load muted preference from localStorage 0ms
   ✓ Audio Manager > WebAudio
oManager > should handle local
lStorage errors gracefully 0ms
   × Audio Manager > WebAudio
oManager > should preload soun
nds successfully 32ms
     → expected "spy" to be c
called at least once
   ✓ Audio Manager > WebAudio
oManager > should handle prelo
oad errors gracefully 12ms    
   ✓ Audio Manager > WebAudio
oManager > should play sound w
with default options 2ms      
   ✓ Audio Manager > WebAudio
oManager > should play sound w
with custom options 1ms       
   ✓ Audio Manager > WebAudio
oManager > should not play sou
und when muted 1ms
   ✓ Audio Manager > WebAudio
oManager > should handle missi
ing sound buffer gracefully 1m
ms
   ✓ Audio Manager > WebAudio
oManager > should cleanup reso
ources properly 1ms
   ✓ Audio Manager > WebAudio
oManager > should handle audio
o context creation failure 1ms
   ✓ Audio Manager > HTML5Aud
dioManager > should initialize
e with HTML5 Audio support 1ms
   ✓ Audio Manager > HTML5Aud
dioManager > should handle mut
ted state correctly 1ms       
   ✓ Audio Manager > HTML5Aud
dioManager > should preload so
ounds using HTML5 Audio 5ms   
   ✓ Audio Manager > HTML5Aud
dioManager > should play sound
d with HTML5 Audio 1ms        
   ✓ Audio Manager > HTML5Aud
dioManager > should not play s
sound when muted 1ms
   ✓ Audio Manager > HTML5Aud
dioManager > should cleanup au
udio elements 1ms
   ✓ Audio Manager > SilentAu
udioManager > should initializ
ze in silent mode 0ms
   ✓ Audio Manager > SilentAu
udioManager > should handle al
ll operations silently 1ms    
   ✓ Audio Manager > createAu
udioManager factory > should c
create WebAudioManager when We
eb Audio API is supported 1ms 
   ✓ Audio Manager > createAu
udioManager factory > should c
create HTML5AudioManager when 
 only HTML5 Audio is supported
d 1ms
   ✓ Audio Manager > createAu
udioManager factory > should c
create SilentAudioManager when
n no audio support is availabl
le 1ms
   ✓ Audio Manager > Error Ha
andling > should handle fetch 
 errors during preloading 6ms 
   ✓ Audio Manager > Error Ha
andling > should handle HTTP e
errors during preloading 7ms  
   ✓ Audio Manager > Error Ha
andling > should handle audio 
 decoding errors 6ms
   ✓ Audio Manager > Error Ha
andling > should handle playba
ack errors gracefully 2ms     

 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests        
Retry 1/2 for sounds/test.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:129:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 retry failed requests        
Failed to load test_sound fro
om sounds/test.mp3: Error: Net
twork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:130:40
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 throw error if all sources fa
ail
Retry 1/2 for sounds/test.mp3
3: Error: Network error       
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:143:41
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking       
Optimization recommendations for PLAYER_WALK: [
  'Consider reducing sample rate from 44100Hz to 22050Hz',
  'Convert to mono for game sound effects to reduce file size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for PLAYER_DIG: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for BOULDER_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for ARROW_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for COLLISION_THUD: [        
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DEATH_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for VICTORY_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DOOR_SLAM: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DIAMOND_COLLECT: [       
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Preloading complete: 9/9 soun
nds loaded

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should apply optimizat
tion during preloading        
Loading PLAYER_WALK: 0% (load
ding)
Loading PLAYER_WALK: 0% (load
ding)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should apply optimizat
tion during preloading        
Loading PLAYER_WALK: 100% (lo
oaded)
Loading PLAYER_DIG: 100% (loa
aded)
Loading BOULDER_MOVE: 100% (l
loaded)
Loading ARROW_MOVE: 100% (loa
aded)
Loading COLLISION_THUD: 100% 
 (loaded)
Loading DEATH_SOUND: 100% (lo
oaded)
Loading VICTORY_SOUND: 100% (
(loaded)
Loading DOOR_SLAM: 100% (load
ded)
Loading DIAMOND_COLLECT: 100%
% (loaded)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should apply optimizat
tion during preloading        
Asset loading complete: 9/9 l
loaded, 0 failed


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:143:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 throw error if all sources fa
ail
Retry 1/2 for sounds/test.ogg
g: Error: Network error       
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:143:41
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should apply optimization during preloading        
Optimization recommendations for PLAYER_WALK: [
  'Consider reducing sample rate from 44100Hz to 22050Hz',
  'Convert to mono for game sound effects to reduce file size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for PLAYER_DIG: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for BOULDER_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for ARROW_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for COLLISION_THUD: [        
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DEATH_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for VICTORY_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DOOR_SLAM: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DIAMOND_COLLECT: [       
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Preloading complete: 9/9 soun
nds loaded

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Loading PLAYER_WALK: 0% (load
ding)
Loading PLAYER_WALK: 0% (load
ding)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)


 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45   
    at file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/player/d
dig.mp3: Error: Network error 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/
/whoosh.mp3: Error: Network er
rror
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/tw
wang.mp3: Error: Network error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/environm
ment/thud.mp3: Error: Network 
 error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/player/w
whaaa.mp3: Error: Network erro
or
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/environm
ment/victory.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/environm
ment/door-slam.mp3: Error: Net
twork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/environm
ment/collect.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 throw error if all sources fa
ail
Failed to load test_sound fro
om sounds/test.ogg: Error: Net
twork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:143:41
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

ode (vitest 3)ode (vitest 6)
 ❯ src/tests/audio-context.te
est.tsx 0/7
 ❯ src/tests/audio-hooks.test
t.tsx 0/16
 ❯ src/tests/audio/asset-load
der.test.ts 5/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 3/23    

 Test Files 2 failed | 0 pass
sed (6)
      Tests 10 failed | 53 pa
assed (117)
   Start at 09:59:34
   Duration 2.52s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
Retry 1/2 for sounds/test.mp3: Error: HTTP 404: Not Found 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:165:31

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should 
 handle HTTP errors
Failed to load test_sound fro
om sounds/test.mp3: Error: Net
twork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:143:41
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 handle HTTP errors
Retry 1/2 for sounds/test.ogg
g: Error: Network error       
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:143:41
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 handle HTTP errors
Failed to load test_sound fro
om sounds/test.ogg: Error: Net
twork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:143:41
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 handle audio decoding errors 
Retry 1/2 for sounds/test.mp3
3: Error: Invalid audio data  
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:167:68
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio-cont
text.test.tsx > AudioContext >
> should allow manual cleanup 
An update to AudioProvider in
nside a test was not wrapped i
in act(...).

When testing, code that cause
es React state updates should 
 be wrapped into act(...):    

act(() => {
  /* fire events that update 
 state */
});
/* assert on the output */   

This ensures that you're test
ting the behavior the user wou
uld see in the browser. Learn 
 more at https://react.dev/lin
nk/wrap-tests-with-act        


 ❯ src/tests/audio-hooks.test
t.tsx 1/16
 ❯ src/tests/audio/asset-load
der.test.ts 7/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 1 pass
sed (6)
      Tests 12 failed | 62 pa
assed (117)
   Start at 09:59:34
   Duration 2.87s
 ✓ src/tests/audio-context.test.tsx (7 tests) 217ms       

 ❯ src/tests/audio-hooks.test.tsx 1/16
 ❯ src/tests/audio/asset-loader.test.ts 7/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23    

 Test Files 2 failed | 1 passed (6)
      Tests 12 failed | 62 pa
assed (117)
   Start at 09:59:34
   Duration 2.87s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized      
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):    

act(() => {
  /* fire events that update 
 state */
});
/* assert on the output */   

This ensures that you're test
ting the behavior the user wou
uld see in the browser. Learn 
 more at https://react.dev/lin
nk/wrap-tests-with-act        

stderr | src/tests/audio-hook
ks.test.tsx > Audio Hooks > us
seSound > should show loading 
 state during initialization  
An update to AudioProvider in
nside a test was not wrapped i
in act(...).

When testing, code that cause
es React state updates should 
 be wrapped into act(...):    

act(() => {
  /* fire events that update 
 state */
});
/* assert on the output */   

This ensures that you're test
ting the behavior the user wou
uld see in the browser. Learn 
 more at https://react.dev/lin
nk/wrap-tests-with-act        

stderr | src/tests/audio-hook
ks.test.tsx > Audio Hooks > us
seAudioSettings > should retur
rn default volume from config 
An update to AudioProvider in
nside a test was not wrapped i
in act(...).

When testing, code that cause
es React state updates should 
 be wrapped into act(...):    

act(() => {
  /* fire events that update 
 state */
});
/* assert on the output */   

This ensures that you're test
ting the behavior the user wou
uld see in the browser. Learn 
 more at https://react.dev/lin
nk/wrap-tests-with-act        

stderr | src/tests/audio-hook
ks.test.tsx > Audio Hooks > us
seAudioSettings > should load 
 volume from localStorage     
An update to AudioProvider in
nside a test was not wrapped i
in act(...).

When testing, code that cause
es React state updates should 
 be wrapped into act(...):    

act(() => {
  /* fire events that update 
 state */
});
/* assert on the output */   

This ensures that you're test
ting the behavior the user wou
uld see in the browser. Learn 
 more at https://react.dev/lin
nk/wrap-tests-with-act        

stderr | src/tests/audio-hook
ks.test.tsx > Audio Hooks > us
seAudioSettings > should handl
le invalid localStorage volume
An update to AudioProvider in
nside a test was not wrapped i
in act(...).

When testing, code that cause
es React state updates should 
 be wrapped into act(...):    

act(() => {
  /* fire events that update 
 state */
});
/* assert on the output */   

This ensures that you're test
ting the behavior the user wou
uld see in the browser. Learn 
 more at https://react.dev/lin
nk/wrap-tests-with-act        

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 handle audio decoding errors 
Failed to load test_sound fro
om sounds/test.mp3: Error: Net
twork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:143:41
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 handle audio decoding errors 
Retry 1/2 for sounds/test.ogg
g: Error: Network error       
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:143:41
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio-hook
ks.test.tsx > Audio Hooks > us
seAudioSettings > should set v
volume and save to localStorag
ge
An update to AudioProvider in
nside a test was not wrapped i
in act(...).

When testing, code that cause
es React state updates should 
 be wrapped into act(...):    

act(() => {
  /* fire events that update 
 state */
});
/* assert on the output */   

This ensures that you're test
ting the behavior the user wou
uld see in the browser. Learn 
 more at https://react.dev/lin
nk/wrap-tests-with-act        

stderr | src/tests/audio-hook
ks.test.tsx > Audio Hooks > us
seAudioSettings > should clamp
p volume between 0 and 1      
An update to AudioProvider in
nside a test was not wrapped i
in act(...).

When testing, code that cause
es React state updates should 
 be wrapped into act(...):    

act(() => {
  /* fire events that update 
 state */
});
/* assert on the output */   

This ensures that you're test
ting the behavior the user wou
uld see in the browser. Learn 
 more at https://react.dev/lin
nk/wrap-tests-with-act        


 ❯ src/tests/audio-hooks.test
t.tsx 1/16
 ❯ src/tests/audio/asset-load
der.test.ts 7/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 1 pass
sed (6)
      Tests 12 failed | 62 pa
assed (117)
   Start at 09:59:34
   Duration 2.87s
ode (vitest 4)stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):    

act(() => {
  /* fire events that update 
 state */
});
/* assert on the output */   

This ensures that you're test
ting the behavior the user wou
uld see in the browser. Learn 
 more at https://react.dev/lin
nk/wrap-tests-with-act        

stderr | src/tests/audio-hook
ks.test.tsx > Audio Hooks > us
seAudioSettings > should handl
le audio manager not initializ
zed for setMuted
An update to AudioProvider in
nside a test was not wrapped i
in act(...).

When testing, code that cause
es React state updates should 
 be wrapped into act(...):    

act(() => {
  /* fire events that update 
 state */
});
/* assert on the output */   

This ensures that you're test
ting the behavior the user wou
uld see in the browser. Learn 
 more at https://react.dev/lin
nk/wrap-tests-with-act        


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 3.08s
 ✓ src/tests/audio-hooks.test.tsx (16 tests) 112ms        

 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 passed (6)
      Tests 13 failed | 77 passed (117)
   Start at 09:59:34
   Duration 3.08s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors 
Failed to load test_sound from sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:143:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 3.08s
ode (vitest 5)stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:157:24)
    at listOnTimeout (node:in
nternal/timers:594:17)        
    at processTimers (node:in
nternal/timers:529:7)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 respect timeout
Retry 1/3 for sounds/test.ogg
g: Error: Network error       
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:143:41
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 respect timeout
Retry 1/3 for sounds/test.mp3
3: TypeError: Cannot read prop
perties of undefined (reading 
 'ok')
    at D:\FizzBash\TheWandere
er\src\audio\managers\asset-lo
oader.ts:164:35

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/player/w
walk.mp3: Error: Network error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/player/d
dig.mp3: Error: Network error 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/boulder/
/whoosh.mp3: Error: Network er
rror
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/arrow/tw
wang.mp3: Error: Network error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/environm
ment/thud.mp3: Error: Network 
 error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhan      ced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/player/w
whaaa.mp3: Error: Network erro
or
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/environm
ment/victory.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/environm
ment/door-slam.mp3: Error: Net
twork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/environm
ment/collect.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 3.93s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Retry 2/3 for sounds/test.ogg: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:143:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/asse
et-loader.test.ts > AssetLoade
er > loadAudioBuffer > should 
 respect timeout
Retry 2/3 for sounds/test.mp3
3: Error: Network error       
    at D:\FizzBash\TheWandere
er\src\tests\audio\asset-loade
er.test.ts:143:41
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Loading PLAYER_WALK: 50% (loading)


 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 1/3 for sounds/player/w
walk.ogg: Error: Network error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Loading PLAYER_DIG: 50% (loading)


 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 1/3 for sounds/player/d
dig.ogg: Error: Network error 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Loading BOULDER_MOVE: 50% (loading)


 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s












stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 1/3 for sounds/boulder/
/whoosh.ogg: Error: Network er
rror
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Loading ARROW_MOVE: 50% (loading)


 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 1/3 for sounds/arrow/tw
wang.ogg: Error: Network error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Loading COLLISION_THUD: 50% (loading)


 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load COLLISION_THUD from sounds/environment/thud.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 1/3 for sounds/environm
ment/thud.ogg: Error: Network 
 error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Loading DEATH_SOUND: 50% (loading)


 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load DEATH_SOUND from sounds/player/whaaa.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 1/3 for sounds/player/w
whaaa.ogg: Error: Network erro
or
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Loading VICTORY_SOUND: 50% (loading)


 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load VICTORY_SOUND from sounds/environment/victory.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 1/3 for sounds/environm
ment/victory.ogg: Error: Netwo
ork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Loading DOOR_SLAM: 50% (loading)


 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 1/3 for sounds/environm
ment/door-slam.ogg: Error: Net
twork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Loading DIAMOND_COLLECT: 50% (loading)


 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Failed to load DIAMOND_COLLECT from sounds/environment/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 1/3 for sounds/environm
ment/collect.ogg: Error: Netwo
ork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 8/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 13 failed | 77 pa
assed (117)
   Start at 09:59:34
   Duration 4.93s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:143:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 11/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 15 failed | 78 pa
assed (117)
   Start at 09:59:34
   Duration 5.27s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed


 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 15 failed | 78 pa
assed (117)
   Start at 09:59:34
   Duration 5.27s












stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:237:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 11/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 15 failed | 78 pa
assed (117)
   Start at 09:59:34
   Duration 5.27s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Asset loading complete: 2/2 loaded, 0 failed


 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 15 failed | 78 pa
assed (117)
   Start at 09:59:34
   Duration 5.27s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
Retry 1/2 for sounds/test.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:294:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/asset-load
der.test.ts 11/16
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 2 failed | 2 pass
sed (6)
      Tests 15 failed | 78 pa
assed (117)
   Start at 09:59:34
   Duration 5.27s
ode (vitest 2)stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:294:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 15 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.00s
                             
                             
                             
                             
                             
                             
                             
                             
                             
 ❯ src/tests/audio/asset-loader.test.ts (16 tests | 5 failed) 3277ms
   ✓ AssetLoader > constructor > should initialize with default options 5ms
   ✓ AssetLoader > constructor > should accept custom options 1ms
   ✓ AssetLoader > loadAudioBuffer > should successfully l
load audio buffer from first s
source 5ms
   × AssetLoader > loadAudioB
Buffer > should fallback to se
econd source if first fails 13
35ms
     → expected 2nd "spy" cal
ll to have been called with [ 
 'sounds/test.ogg', Any<Object
t> ]
   ✓ AssetLoader > loadAudioB
Buffer > should retry failed r
requests 108ms
   ✓ AssetLoader > loadAudioB
Buffer > should throw error if
f all sources fail 219ms      
   × AssetLoader > loadAudioB
Buffer > should handle HTTP er
rrors 226ms
     → expected [Function] to
o throw error including 'HTTP 
 404: Not Found' but got 'Netw
work error'
   × AssetLoader > loadAudioB
Buffer > should handle audio d
decoding errors 214ms
     → expected [Function] to
o throw error including 'Inval
lid audio data' but got 'Netwo
ork error'
   × AssetLoader > loadAudioB
Buffer > should respect timeou
ut 2130ms
     → expected [Function] to
o throw error including 'Timeo
out' but got 'Network error'  
   ✓ AssetLoader > loadAssets
s > should load all preload as
ssets 2ms
   × AssetLoader > loadAssets
s > should handle partial fail
lures 111ms
     → expected 2 to be 1 // 
 Object.is equality
   ✓ AssetLoader > progress t
tracking > should emit progres
ss events 1ms
   ✓ AssetLoader > progress t
tracking > should emit error e
events on failure 113ms       
   ✓ AssetLoader > format opt
timization > should prefer sup
pported formats 2ms
   ✓ AssetLoader > format opt
timization > should filter uns
supported formats 1ms
   ✓ AssetLoader > cleanup > 
 should clear all state and ca
allbacks 0ms

 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 15 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/player/walk.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:152:45
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/player/d
dig.ogg: Error: Network error 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/boulder/
/whoosh.ogg: Error: Network er
rror
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/arrow/tw
wang.ogg: Error: Network error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/environm
ment/thud.ogg: Error: Network 
 error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/player/w
whaaa.ogg: Error: Network erro
or
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file        :///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/environm
ment/victory.ogg: Error: Netwo
ork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/environm
ment/door-slam.ogg: Error: Net
twork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Retry 2/3 for sounds/environm
ment/collect.ogg: Error: Netwo
ork error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 4/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 15 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Loading PLAYER_WALK: 0% (failed)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Failed to load PLAYER_WALK from sounds/player/walk.ogg: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound PLAYER_W
WALK: Error: Network error    
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Failed to load sound PLAYER_W
WALK: Error: Network error    
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Loading PLAYER_DIG: 0% (failed)                           
                             
                             
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Failed to load PLAYER_DIG from sounds/player/dig.ogg: Error: Network error             
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound PLAYER_D
DIG: Error: Network error     
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Failed to load sound PLAYER_D
DIG: Error: Network error     
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Loading BOULDER_MOVE: 0% (failed)                         
                             
                             
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.ogg: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound BOULDER_
_MOVE: Error: Network error   
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Failed to load sound BOULDER_
_MOVE: Error: Network error   
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Loading ARROW_MOVE: 0% (failed)                           
                             
                             
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Failed to load ARROW_MOVE from sounds/arrow/twang.ogg: Error: Network error            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound ARROW_MO
OVE: Error: Network error     
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Failed to load sound ARROW_MO
OVE: Error: Network error     
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Loading COLLISION_THUD: 0% (failed)                       
                             
                             
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Failed to load COLLISION_THUD from sounds/environment/thud.ogg: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound COLLISIO
ON_THUD: Error: Network error 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Failed to load sound COLLISIO
ON_THUD: Error: Network error 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Loading DEATH_SOUND: 0% (failed)                          
                             
                             
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Failed to load DEATH_SOUND from sounds/player/whaaa.ogg: Error: Network error          
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound DEATH_SO
OUND: Error: Network error    
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Failed to load sound DEATH_SO
OUND: Error: Network error    
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Loading VICTORY_SOUND: 0% (failed)                        
                             
                             
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Failed to load VICTORY_SOUND from sounds/environment/victory.ogg: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound VICTORY_
_SOUND: Error: Network error  
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Failed to load sound VICTORY_
_SOUND: Error: Network error  
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Loading DOOR_SLAM: 0% (failed)                            
                             
                             
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Failed to load DOOR_SLAM from sounds/environment/door-slam.ogg: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound DOOR_SLA
AM: Error: Network error      
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Failed to load sound DOOR_SLA
AM: Error: Network error      
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Loading DIAMOND_COLLECT: 0% (failed)                      
                             
                             
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Failed to load DIAMOND_COLLECT from sounds/environment/collect.ogg: Error: Network error                            
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound DIAMOND_
_COLLECT: Error: Network error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Failed to load sound DIAMOND_
_COLLECT: Error: Network error
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:152:45   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at processTicksAndRejecti
ions (node:internal/process/ta
ask_queues:105:5)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully          
Asset loading complete: 0/9 loaded, 9 failed              
                             
stdout | src/tests/audio/enhanced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should handle loading 
 failures gracefully
Preloading complete: 0/9 soun
nds loaded


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
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

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > enhanced preloa
ading > should skip preloading
g in fallback mode
Audio context not available, 
 skipping preload


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report              
Loading PLAYER_WALK: 0% (loading)                         
Loading PLAYER_WALK: 0% (loading)                         
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > optimization re
eporting > should provide opti
imization report
Loading PLAYER_WALK: 100% (lo
oaded)
Loading PLAYER_DIG: 100% (loa
aded)
Loading BOULDER_MOVE: 100% (l
loaded)
Loading ARROW_MOVE: 100% (loa
aded)
Loading COLLISION_THUD: 100% 
 (loaded)
Loading DEATH_SOUND: 100% (lo
oaded)
Loading VICTORY_SOUND: 100% (
(loaded)
Loading DOOR_SLAM: 100% (load
ded)
Loading DIAMOND_COLLECT: 100%
% (loaded)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > optimization re
eporting > should provide opti
imization report
Asset loading complete: 9/9 l
loaded, 0 failed

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > optimization re
eporting > should provide opti
imization report
Optimization recommendations 
 for PLAYER_WALK: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for PLAYER_DIG: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for BOULDER_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for ARROW_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for COLLISION_THUD: [        
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DEATH_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for VICTORY_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DOOR_SLAM: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DIAMOND_COLLECT: [       
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Preloading complete: 9/9 soun
nds loaded


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 5/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 16 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 6.56s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > loading state management > should track loading state correctly
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > loading state m
management > should track load
ding state correctly
Loading PLAYER_WALK: 100% (lo
oaded)
Loading PLAYER_DIG: 100% (loa
aded)
Loading BOULDER_MOVE: 100% (l
loaded)
Loading ARROW_MOVE: 100% (loa
aded)
Loading COLLISION_THUD: 100% 
 (loaded)
Loading DEATH_SOUND: 100% (lo
oaded)
Loading VICTORY_SOUND: 100% (
(loaded)
Loading DOOR_SLAM: 100% (load
ded)
Loading DIAMOND_COLLECT: 100%
% (loaded)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > loading state m
management > should track load
ding state correctly
Asset loading complete: 9/9 l
loaded, 0 failed

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > loading state m
management > should track load
ding state correctly
Optimization recommendations 
 for PLAYER_WALK: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for PLAYER_DIG: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for BOULDER_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for ARROW_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for COLLISION_THUD: [        
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DEATH_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for VICTORY_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DOOR_SLAM: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DIAMOND_COLLECT: [       
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Preloading complete: 9/9 soun
nds loaded

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should retry failed loads  
Loading PLAYER_WALK: 0% (load
ding)
Loading PLAYER_WALK: 0% (load
ding)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 9/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 20 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 7.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads  
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:210:44   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 9/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 20 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 7.01s
                             
                             
                             
                             
                             
                             
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Loading PLAYER_DIG: 100% (loaded)
Loading BOULDER_MOVE: 100% (loaded)
Loading ARROW_MOVE: 100% (loaded)
Loading COLLISION_THUD: 100% 
 (loaded)
Loading DEATH_SOUND: 100% (lo
oaded)
Loading VICTORY_SOUND: 100% (
(loaded)
Loading DOOR_SLAM: 100% (load
ded)
Loading DIAMOND_COLLECT: 100%
% (loaded)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 9/23    

 Test Files 3 failed | 2 pass
sed (6)
      Tests 20 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 7.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads  
Loading PLAYER_WALK: 100% (loaded)

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should retry failed loads  
Asset loading complete: 9/9 l
loaded, 0 failed

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should retry failed loads  
Optimization recommendations 
 for PLAYER_DIG: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for BOULDER_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for ARROW_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for COLLISION_THUD: [        
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DEATH_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for VICTORY_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DOOR_SLAM: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DIAMOND_COLLECT: [       
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for PLAYER_WALK: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Preloading complete: 9/9 soun
nds loaded

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Loading PLAYER_WALK: 0% (load
ding)
Loading PLAYER_WALK: 0% (load
ding)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 7.97s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Retry 1/3 for sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/player/d
dig.mp3: Error: Invalid audio 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/boulder/
/whoosh.mp3: Error: Invalid au
udio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/arrow/tw
wang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/environm
ment/thud.mp3: Error: Invalid 
 audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/player/w
whaaa.mp3: Error: Invalid audi
io
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/environm
ment/victory.mp3: Error: Inval
lid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/environm
ment/door-slam.mp3: Error: Inv
valid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Retry 1/3 for sounds/environm
ment/collect.mp3: Error: Inval
lid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 7.97s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 passed (6)
      Tests 21 failed | 83 passed (117)
   Start at 09:59:34
   Duration 8.18s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Retry 2/3 for sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/player/d
dig.mp3: Error: Invalid audio 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/boulder/
/whoosh.mp3: Error: Invalid au
udio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/arrow/tw
wang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/environm
ment/thud.mp3: Error: Invalid 
 audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/player/w
whaaa.mp3: Error: Invalid audi
io
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/environm
ment/victory.mp3: Error: Inval
lid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/environm
ment/door-slam.mp3: Error: Inv
valid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/environm
ment/collect.mp3: Error: Inval
lid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 9.04s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading PLAYER_WALK: 50% (loading)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Invalid audio           
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 1/3 for sounds/player/w
walk.ogg: Error: Invalid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading PLAYER_DIG: 50% (loading)                         
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
                             
                             
                             
                             
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 1/3 for sounds/player/d
dig.ogg: Error: Invalid audio 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading BOULDER_MOVE: 50% (loading)                       
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.mp3: Error: Invalid audio       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 1/3 for sounds/boulder/
/whoosh.ogg: Error: Invalid au
udio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading ARROW_MOVE: 50% (loading)                         
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Invalid audio            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 1/3 for sounds/arrow/tw
wang.ogg: Error: Invalid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading COLLISION_THUD: 50% (loading)                     
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load COLLISION_THUD from sounds/environment/thud.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 1/3 for sounds/environm
ment/thud.ogg: Error: Invalid 
 audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading DEATH_SOUND: 50% (loading)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load DEATH_SOUND from sounds/player/whaaa.mp3: Error: Invalid audio          
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 1/3 for sounds/player/w
whaaa.ogg: Error: Invalid audi
io
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading VICTORY_SOUND: 50% (loading)                      
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load VICTORY_SOUND from sounds/environment/victory.mp3: Error: Invalid audio 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 1/3 for sounds/environm
ment/victory.ogg: Error: Inval
lid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading DOOR_SLAM: 50% (loading)                          
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 1/3 for sounds/environm
ment/door-slam.ogg: Error: Inv
valid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading DIAMOND_COLLECT: 50% (loading)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load DIAMOND_COLLECT from sounds/environment/collect.mp3: Error: Invalid audio                            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 1/3 for sounds/environm
ment/collect.ogg: Error: Inval
lid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 10.00s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Retry 2/3 for sounds/player/walk.ogg: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/player/d
dig.ogg: Error: Invalid audio 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/boulder/
/whoosh.ogg: Error: Invalid au
udio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/arrow/tw
wang.ogg: Error: Invalid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/environm
ment/thud.ogg: Error: Invalid 
 audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/player/w
whaaa.ogg: Error: Invalid audi
io
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/environm
ment/victory.ogg: Error: Inval
lid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/environm
ment/door-slam.ogg: Error: Inv
valid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Retry 2/3 for sounds/environm
ment/collect.ogg: Error: Inval
lid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 21 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.04s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23   

 Test Files 3 failed | 2 passed (6)
      Tests 21 failed | 83 passed (117)
   Start at 09:59:34
   Duration 11.29s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load PLAYER_WALK from sounds/player/walk.ogg: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound PLAYER_W
WALK: Error: Invalid audio    
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading PLAYER_WALK: 0% (failed)                          
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
                             
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load sound PLAYER_WALK: Error: Invalid audio    
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading PLAYER_DIG: 0% (failed)                           
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load PLAYER_DIG from sounds/player/dig.ogg: Error: Invalid audio             
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound PLAYER_D
DIG: Error: Invalid audio     
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Failed to load sound PLAYER_D
DIG: Error: Invalid audio     
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading BOULDER_MOVE: 0% (failed)                         
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load BOULDER_MOVE from sounds/boulder/whoosh.ogg: Error: Invalid audio       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound BOULDER_
_MOVE: Error: Invalid audio   
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Failed to load sound BOULDER_
_MOVE: Error: Invalid audio   
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading ARROW_MOVE: 0% (failed)                           
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load ARROW_MOVE from sounds/arrow/twang.ogg: Error: Invalid audio            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound ARROW_MO
OVE: Error: Invalid audio     
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Failed to load sound ARROW_MO
OVE: Error: Invalid audio     
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading COLLISION_THUD: 0% (failed)                       
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load COLLISION_THUD from sounds/environment/thud.ogg: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound COLLISIO
ON_THUD: Error: Invalid audio 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Failed to load sound COLLISIO
ON_THUD: Error: Invalid audio 
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading DEATH_SOUND: 0% (failed)                          
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load DEATH_SOUND from sounds/player/whaaa.ogg: Error: Invalid audio          
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound DEATH_SO
OUND: Error: Invalid audio    
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Failed to load sound DEATH_SO
OUND: Error: Invalid audio    
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading VICTORY_SOUND: 0% (failed)                        
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load VICTORY_SOUND from sounds/environment/victory.ogg: Error: Invalid audio 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound VICTORY_
_SOUND: Error: Invalid audio  
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Failed to load sound VICTORY_
_SOUND: Error: Invalid audio  
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading DOOR_SLAM: 0% (failed)                            
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load DOOR_SLAM from sounds/environment/door-slam.ogg: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound DOOR_SLA
AM: Error: Invalid audio      
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Failed to load sound DOOR_SLA
AM: Error: Invalid audio      
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Loading DIAMOND_COLLECT: 0% (failed)                      
                             
                             
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Failed to load DIAMOND_COLLECT from sounds/environment/collect.ogg: Error: Invalid audio                            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
Failed to load sound DIAMOND_
_COLLECT: Error: Invalid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)

stderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Failed to load sound DIAMOND_
_COLLECT: Error: Invalid audio
    at D:\FizzBash\TheWandere
er\src\tests\audio\enhanced-au
udio-manager.test.ts:223:68   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Asset loading complete: 0/9 loaded, 9 failed              
                             
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebA
AudioManager > error recovery 
 > should handle decode errors
Preloading complete: 0/9 soun
nds loaded


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
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


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                            
Loading PLAYER_WALK: 0% (loading)                         
Loading PLAYER_WALK: 0% (loading)                         
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Retry 1/3 for sounds/player/walk.mp3: Error: 404
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:236:44   
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:155:11
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:752:26
    at file:///D:/FizzBash/Th
heWanderer/node_modules/@vites
st/runner/dist/chunk-hooks.js:
:1897:20
    at new Promise (<anonymou
us>)
    at runWithTimeout (file:/
///D:/FizzBash/TheWanderer/nod
de_modules/@vitest/runner/dist
t/chunk-hooks.js:1863:10)     
    at runTest (file:///D:/Fi
izzBash/TheWanderer/node_modul
les/@vitest/runner/dist/chunk-
-hooks.js:1574:12)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)
    at runSuite (file:///D:/F
FizzBash/TheWanderer/node_modu
ules/@vitest/runner/dist/chunk
k-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                            
Loading PLAYER_DIG: 100% (loaded)                         
Loading BOULDER_MOVE: 100% (loaded)                       
Loading ARROW_MOVE: 100% (loa
aded)
Loading COLLISION_THUD: 100% 
 (loaded)
Loading DEATH_SOUND: 100% (lo
oaded)
Loading VICTORY_SOUND: 100% (
(loaded)
Loading DOOR_SLAM: 100% (load
ded)
Loading DIAMOND_COLLECT: 100%
% (loaded)


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 11.94s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Loading PLAYER_WALK: 100% (loaded)

stdout | src/tests/audio/enhanced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > format fallback
k > should try multiple format
ts
Asset loading complete: 9/9 l
loaded, 0 failed

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > WebA
AudioManager > format fallback
k > should try multiple format
ts
Optimization recommendations 
 for PLAYER_DIG: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for BOULDER_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for ARROW_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for COLLISION_THUD: [        
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DEATH_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for VICTORY_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DOOR_SLAM: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DIAMOND_COLLECT: [       
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for PLAYER_WALK: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Preloading complete: 9/9 soun
nds loaded


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 11/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 22 failed | 83 pa
assed (117)
   Start at 09:59:34
   Duration 13.22s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 13/23   

 Test Files 3 failed | 2 passed (6)
      Tests 23 failed | 84 passed (117)
   Start at 09:59:34
   Duration 14.19s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 13/23   

 Test Files 3 failed | 2 passed (6)
      Tests 23 failed | 84 passed (117)
   Start at 09:59:34
   Duration 15.25s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 13/23   

 Test Files 3 failed | 2 passed (6)
      Tests 23 failed | 84 passed (117)
   Start at 09:59:34
   Duration 16.24s

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 13/23   

 Test Files 3 failed | 2 passed (6)
      Tests 23 failed | 84 passed (117)
   Start at 09:59:34
   Duration 17.23s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats
No supported formats for PLAYER_WALK
No supported formats for PLAYER_DIG
No supported formats for BOUL
LDER_MOVE
No supported formats for ARRO
OW_MOVE
No supported formats for COLL
LISION_THUD
No supported formats for DEAT
TH_SOUND
No supported formats for VICT
TORY_SOUND
No supported formats for DOOR
R_SLAM
No supported formats for DIAM
MOND_COLLECT


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 13/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 23 failed | 84 pa
assed (117)
   Start at 09:59:34
   Duration 18.28s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats
HTML5 Audio: Preloaded 0 sounds                           
                             
                             
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 13/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 23 failed | 84 pa
assed (117)
   Start at 09:59:34
   Duration 18.28s
                             
                             
                             
                             
                             
                             
                             
                             
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is available
Web Audio API not supported, using HTML5 Audio fallbackstderr | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > crea
ateAudioManager factory > shou
uld create SilentAudioManager 
 when no audio support        
No audio support detected, us
sing silent mode


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 13/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 23 failed | 84 pa
assed (117)
   Start at 09:59:34
   Duration 18.28s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality 
Loading PLAYER_WALK: 0% (loading)                         
Loading PLAYER_WALK: 0% (loading)                         
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > inte
egration with existing functio
onality > should maintain exis
sting playSound functionality 
Loading PLAYER_WALK: 100% (lo
oaded)
Loading PLAYER_DIG: 100% (loa
aded)
Loading BOULDER_MOVE: 100% (l
loaded)
Loading ARROW_MOVE: 100% (loa
aded)
Loading COLLISION_THUD: 100% 
 (loaded)
Loading DEATH_SOUND: 100% (lo
oaded)
Loading VICTORY_SOUND: 100% (
(loaded)
Loading DOOR_SLAM: 100% (load
ded)
Loading DIAMOND_COLLECT: 100%
% (loaded)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > inte
egration with existing functio
onality > should maintain exis
sting playSound functionality 
Asset loading complete: 9/9 l
loaded, 0 failed


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 13/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 23 failed | 84 pa
assed (117)
   Start at 09:59:34
   Duration 18.28s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality 
Optimization recommendations for PLAYER_WALK: [
  'Consider reducing sample rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for PLAYER_DIG: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for BOULDER_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for ARROW_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for COLLISION_THUD: [        
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DEATH_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for VICTORY_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DOOR_SLAM: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DIAMOND_COLLECT: [       
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Preloading complete: 9/9 soun
nds loaded


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 14/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 24 failed | 84 pa
assed (117)
   Start at 09:59:34
   Duration 18.49s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality 
Sound buffer not found for ID: player_walk


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 21/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 26 failed | 89 pa
assed (117)
   Start at 09:59:34
   Duration 18.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing mute functionality      
Loading PLAYER_WALK: 0% (loading)                         
Loading PLAYER_WALK: 0% (loading)                         
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > inte
egration with existing functio
onality > should maintain exis
sting mute functionality      
Loading PLAYER_WALK: 100% (lo
oaded)
Loading PLAYER_DIG: 100% (loa
aded)
Loading BOULDER_MOVE: 100% (l
loaded)
Loading ARROW_MOVE: 100% (loa
aded)
Loading COLLISION_THUD: 100% 
 (loaded)
Loading DEATH_SOUND: 100% (lo
oaded)
Loading VICTORY_SOUND: 100% (
(loaded)
Loading DOOR_SLAM: 100% (load
ded)
Loading DIAMOND_COLLECT: 100%
% (loaded)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > inte
egration with existing functio
onality > should maintain exis
sting mute functionality      
Asset loading complete: 9/9 l
loaded, 0 failed

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > inte
egration with existing functio
onality > should maintain exis
sting mute functionality      
Optimization recommendations 
 for PLAYER_WALK: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for PLAYER_DIG: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for BOULDER_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for ARROW_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for COLLISION_THUD: [        
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DEATH_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for VICTORY_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DOOR_SLAM: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DIAMOND_COLLECT: [       
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Preloading complete: 9/9 soun
nds loaded


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 21/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 26 failed | 89 pa
assed (117)
   Start at 09:59:34
   Duration 18.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing cleanup functionality   
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_WALK: 0% (loading)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading PLAYER_DIG: 0% (loadi
ing)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading BOULDER_MOVE: 0% (loa
ading)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading ARROW_MOVE: 0% (loadi
ing)
Loading COLLISION_THUD: 0% (l
loading)
Loading COLLISION_THUD: 0% (l
loading)
Loading DEATH_SOUND: 0% (load
ding)
Loading DEATH_SOUND: 0% (load
ding)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading VICTORY_SOUND: 0% (lo
oading)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DOOR_SLAM: 0% (loadin
ng)
Loading DIAMOND_COLLECT: 0% (
(loading)
Loading DIAMOND_COLLECT: 0% (
(loading)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > inte
egration with existing functio
onality > should maintain exis
sting cleanup functionality   
Loading PLAYER_WALK: 100% (lo
oaded)
Loading PLAYER_DIG: 100% (loa
aded)
Loading BOULDER_MOVE: 100% (l
loaded)
Loading ARROW_MOVE: 100% (loa
aded)
Loading COLLISION_THUD: 100% 
 (loaded)
Loading DEATH_SOUND: 100% (lo
oaded)
Loading VICTORY_SOUND: 100% (
(loaded)
Loading DOOR_SLAM: 100% (load
ded)
Loading DIAMOND_COLLECT: 100%
% (loaded)

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > inte
egration with existing functio
onality > should maintain exis
sting cleanup functionality   
Asset loading complete: 9/9 l
loaded, 0 failed

stdout | src/tests/audio/enha
anced-audio-manager.test.ts > 
 Enhanced Audio Manager > inte
egration with existing functio
onality > should maintain exis
sting cleanup functionality   
Optimization recommendations 
 for PLAYER_WALK: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for PLAYER_DIG: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for BOULDER_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for ARROW_MOVE: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for COLLISION_THUD: [        
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DEATH_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for VICTORY_SOUND: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DOOR_SLAM: [
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Optimization recommendations 
 for DIAMOND_COLLECT: [       
  'Consider reducing sample r
rate from 44100Hz to 22050Hz',
  'Convert to mono for game s
sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]
Preloading complete: 9/9 soun
nds loaded


 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts 22/23   

 Test Files 3 failed | 2 pass
sed (6)
      Tests 27 failed | 89 pa
assed (117)
   Start at 09:59:34
   Duration 19.02s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts (23 tests | 17 failed) 17013ms       
   × Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support 13ms  
     → Cannot read properties of undefined (reading 'catch')
   × Enhanced Audio Manager >
> WebAudioManager > initializa
ation > should handle audio co
ontext suspension 3ms
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> WebAudioManager > enhanced p
preloading > should preload so
ounds with progress tracking 1
191ms
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> WebAudioManager > enhanced p
preloading > should apply opti
imization during preloading 15
59ms
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> WebAudioManager > enhanced p
preloading > should handle loa
ading failures gracefully 4051
1ms
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> WebAudioManager > enhanced p
preloading > should skip prelo
oading in fallback mode 3ms   
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> WebAudioManager > optimizati
ion reporting > should provide
e optimization report 125ms   
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> WebAudioManager > optimizati
ion reporting > should handle 
 empty buffer set 2ms
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> WebAudioManager > loading st
tate management > should track
k loading state correctly 131m
ms
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> WebAudioManager > error reco
overy > should retry failed lo
oads 1117ms
     → expected "spy" to be c
called 2 times, but got 10 tim
mes
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> WebAudioManager > error reco
overy > should handle decode e
errors 4042ms
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> WebAudioManager > format fal
llback > should try multiple f
formats 1301ms
     → expected "spy" to be c
called 2 times, but got 10 tim
mes
     → Cannot read properties
s of undefined (reading 'catch
h')
   ✓ Enhanced Audio Manager >
> HTML5AudioManager > initiali
ization > should initialize wi
ith HTML5 Audio support 3ms   
   × Enhanced Audio Manager >
> HTML5AudioManager > preloadi
ing with format optimization >
> should preload sounds with f
format filtering 5013ms       
     → Test timed out in 5000
0ms.
If this is a long-running tes
st, pass a timeout value as th
he last argument or configure 
 it globally with "testTimeout
t".
   ✓ Enhanced Audio Manager >
> HTML5AudioManager > preloadi
ing with format optimization >
> should handle unsupported fo
ormats 8ms
   ✓ Enhanced Audio Manager >
> HTML5AudioManager > loading 
 state > should provide loadin
ng state 2ms
   × Enhanced Audio Manager >
> HTML5AudioManager > loading 
 state > should provide optimi
ization report 11ms
     → expected [ Array(1) ] 
 to include StringContaining "
"Web Audio API"
   ✓ Enhanced Audio Manager >
> createAudioManager factory >
> should create WebAudioManage
er when Web Audio API is avail
lable 4ms
   ✓ Enhanced Audio Manager >
> createAudioManager factory >
> should create HTML5AudioMana
ager when only HTML5 Audio is 
 available 3ms
   ✓ Enhanced Audio Manager >
> createAudioManager factory >
> should create SilentAudioMan
nager when no audio support 3m
ms
   × Enhanced Audio Manager >
> integration with existing fu
unctionality > should maintain
n existing playSound functiona
ality 317ms
     → expected "spy" to be c
called at least once
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> integration with existing fu
unctionality > should maintain
n existing mute functionality 
 234ms
     → Cannot read properties
s of undefined (reading 'catch
h')
   × Enhanced Audio Manager >
> integration with existing fu
unctionality > should maintain
n existing cleanup functionali
ity 274ms
     → Cannot read properties
s of undefined (reading 'catch
h')
     → Cannot read properties
s of undefined (reading 'catch
h')

⎯⎯⎯⎯⎯⎯ Failed Tests 28 ⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/audio-manage
er.test.ts > Audio Manager > W
WebAudioManager > should prelo
oad sounds successfully       

AssertionError: expected "spy
y" to be called at least once 
 ❯ src/tests/audio-manager.te
est.ts:180:31

    178| 
    179|X// Shou…
    180|Xexpect(…
       |                     
^
    181|X});
    182|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/32]⎯

 FAIL  src/tests/audio/asset-
-loader.test.ts > AssetLoader 
 > loadAudioBuffer > should fa
allback to second source if fi
irst fails
AssertionError: expected 2nd 
 "spy" call to have been calle
ed with [ 'sounds/test.ogg', A
Any<Object> ]

- Expected
+ Received

  [
-   "sounds/test.ogg",       
+   "sounds/test.mp3",       
    Any<Object>,
  ]

 ❯ src/tests/audio/asset-load
der.test.ts:124:31

    122|Xexpect(…
    123|Xexpect(…
    124|Xexpect(…
       |                     
^
    125|X});
    126|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/32]⎯

 FAIL  src/tests/audio/asset-
-loader.test.ts > AssetLoader 
 > loadAudioBuffer > should ha
andle HTTP errors
AssertionError: expected [Fun
nction] to throw error includi
ing 'HTTP 404: Not Found' but 
 got 'Network error'

Expected: "HTTP 404: Not Foun
nd"
Received: "Network error"    

 ❯ src/tests/audio/asset-load
der.test.ts:157:13
    155|X});     
    156|
    157|Xawait e…
       |X^       
    158|Xass…
    159|X).rejec…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/32]⎯

 FAIL  src/tests/audio/asset-
-loader.test.ts > AssetLoader 
 > loadAudioBuffer > should ha
andle audio decoding errors   
AssertionError: expected [Fun
nction] to throw error includi
ing 'Invalid audio data' but g
got 'Network error'

Expected: "Invalid audio data
a"
Received: "Network error"    

 ❯ src/tests/audio/asset-load
der.test.ts:169:13
    167|XmockAud…
    168|
    169|Xawait e…
       |X^       
    170|Xass…
    171|X).rejec…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/32]⎯

 FAIL  src/tests/audio/asset-
-loader.test.ts > AssetLoader 
 > loadAudioBuffer > should re
espect timeout
AssertionError: expected [Fun
nction] to throw error includi
ing 'Timeout' but got 'Network
k error'

Expected: "Timeout"
Received: "Network error"    

 ❯ src/tests/audio/asset-load
der.test.ts:181:13
    179|X);      
    180|
    181|Xawait e…
       |X^       
    182|Xslo…
    183|X).rejec…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/32]⎯

 FAIL  src/tests/audio/asset-
-loader.test.ts > AssetLoader 
 > loadAssets > should handle 
 partial failures
AssertionError: expected 2 to
o be 1 // Object.is equality  

- Expected
+ Received

- 1
+ 2

 ❯ src/tests/audio/asset-load
der.test.ts:241:34
    239|Xconst b…
    240|
    241|Xexpect(…
       |                     
^
    242|Xexpect(…
    243|Xexpect(…


⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/32]⎯

 FAIL  src/tests/audio/audio-
-optimization.test.ts > AudioF
FormatUtils > validateAudioHea
ader > should validate MP3 hea
ader with frame sync
AssertionError: expected fals
se to be true // Object.is equ
uality

- Expected
+ Received

- true
+ false

 ❯ src/tests/audio/audio-opti
imization.test.ts:108:36      
    106|
    107|Xconst r…
    108|Xexpect(…
       |                     
^
    109|Xexpect(…
    110|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/32]⎯

 FAIL  src/tests/audio/audio-
-optimization.test.ts > AudioO
Optimizer > analyzeAudioBuffer
r > should provide sample rate
e recommendations
AssertionError: expected [ …(
(3) ] to include StringContain
ning "reducing sample rate"   
 ❯ src/tests/audio/audio-opti
imization.test.ts:194:46      
    192|Xconst a…
    193|
    194|Xexpect(…
       |                     
^   
    195|Xexp…
    196|X);      

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/32]⎯

 FAIL  src/tests/audio/audio-
-optimization.test.ts > AudioO
Optimizer > analyzeAudioBuffer
r > should provide channel rec
commendations for stereo      
AssertionError: expected [ …(
(3) ] to include StringContain
ning "Convert to mono"        
 ❯ src/tests/audio/audio-opti
imization.test.ts:202:46      
    200|Xconst a…
    201|
    202|Xexpect(…
       |                     
^   
    203|Xexp…
    204|X);      

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/32]⎯

 FAIL  src/tests/audio/audio-
-optimization.test.ts > AudioO
Optimizer > analyzeAudioBuffer
r > should provide duration re
ecommendations for long clips 
AssertionError: expected [ …(
(4) ] to include StringContain
ning{…}
 ❯ src/tests/audio/audio-opti
imization.test.ts:211:46      
    209|Xconst a…
    210|
    211|Xexpect(…
       |                     
^   
    212|Xexp…
    213|X);      

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[10/32]⎯

 FAIL  src/tests/audio/audio-
-optimization.test.ts > AudioO
Optimizer > analyzeAudioBuffer
r > should provide file size r
recommendations
AssertionError: expected [ …(
(3) ] to include StringContain
ning{…}
 ❯ src/tests/audio/audio-opti
imization.test.ts:221:46      
    219|Xconst a…
    220|
    221|Xexpect(…
       |                     
^   
    222|Xexp…
    223|X);      

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[11/32]⎯

 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > initialization > 
 should initialize with Web Au
udio API support
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > initialization > 
 should handle audio context s
suspension
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > enhanced preloadi
ing > should preload sounds wi
ith progress tracking
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > enhanced preloadi
ing > should apply optimizatio
on during preloading

 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > enhanced preloadi
ing > should handle loading fa
ailures gracefully
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > enhanced preloadi
ing > should skip preloading i
in fallback mode
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > optimization repo
orting > should provide optimi
ization report
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > optimization repo
orting > should handle empty b
buffer set
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > loading state man
nagement > should track loadin
ng state correctly
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > error recovery > 
 should retry failed loads    
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > error recovery > 
 should handle decode errors  
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > format fallback >
>
 should try multiple formats 
TypeError: Cannot read proper
rties of undefined (reading 'c
catch')
 ❯ WebAudioManager.cleanup sr
rc/audio/managers/audio-manage
er.ts:366:43

    364|X// Close au…
    365|Xif (this.st…
    366|Xthis.st…
       |                     
^      
    367|Xcon…
    368|X});     
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts:107:21  

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[12/32]⎯

 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > error recovery > 
 should retry failed loads    
AssertionError: expected "spy
y" to be called 2 times, but g
got 10 times
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts:219:35  

    217| 
    218|X// …
    219|Xexp…
       |                     
^
    220|X});     
    221|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[13/32]⎯

 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > WebAud
dioManager > format fallback >
>
 should try multiple formats 
AssertionError: expected "spy
y" to be called 2 times, but g
got 10 times
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts:245:35  
    243|
    244|X// …
    245|Xexp…
       |                     
^
    246|X});     
    247|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[14/32]⎯

 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > HTML5A
AudioManager > preloading with
h format optimization > should
d preload sounds with format f
filtering
Error: Test timed out in 5000
0ms.
If this is a long-running tes
st, pass a timeout value as th
he last argument or configure 
 it globally with "testTimeout
t".
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts:268:13  
    266|
    267|Xdescribe('p…
    268|Xit('sho…
       |X^       
    269|Xawa…
    270|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[15/32]⎯

 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > HTML5A
AudioManager > loading state >
> should provide optimization 
 report
AssertionError: expected [ Ar
rray(1) ] to include StringCon
ntaining "Web Audio API"      
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts:301:54  

    299|Xcon…
    300|Xexp…
    301|Xexp…
       |                     
                             
    ^
    302|X…
    303|X);  

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[16/32]⎯

 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > integr
ration with existing functiona
ality > should maintain existi
ing playSound functionality   
AssertionError: expected "spy
y" to be called at least once 
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts:359:57  
    357|ode (vitest 1)
    358|X// Shou…
    359|Xexpect(…
       |                     
                             
       ^
    360|X});
    361|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[17/32]⎯

 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > integr
ration with existing functiona
ality > should maintain existi
ing playSound functionality   

 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > integr
ration with existing functiona
ality > should maintain existi
ing mute functionality        
 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > integr
ration with existing functiona
ality > should maintain existi
ing cleanup functionality     
TypeError: Cannot read proper
rties of undefined (reading 'c
catch')
 ❯ WebAudioManager.cleanup sr
rc/audio/managers/audio-manage
er.ts:366:43
    364|X// Close au…
    365|Xif (this.st…
    366|Xthis.st…
       |                     
^      
    367|Xcon…
    368|X});     
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts:352:21  

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[18/32]⎯

 FAIL  src/tests/audio/enhanc
ced-audio-manager.test.ts > En
nhanced Audio Manager > integr
ration with existing functiona
ality > should maintain existi
ing cleanup functionality     
TypeError: Cannot read proper
rties of undefined (reading 'c
catch')
 ❯ WebAudioManager.cleanup sr
rc/audio/managers/audio-manage
er.ts:366:43
    364|X// Close au…
    365|Xif (this.st…
    366|Xthis.st…
       |                     
^      
    367|Xcon…
    368|X});     
 ❯ src/tests/audio/enhanced-a
audio-manager.test.ts:371:21  

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[19/32]⎯


 Test Files  4 failed | 2 pas
ssed (6)
      Tests  28 failed | 89 p
passed (117)
   Start at  09:59:34        
   Duration  19.22s (transfor
rm 787ms, setup 228ms, collect
t 2.13s, tests 20.81s, environ
nment 7.20s, prepare 1.63s)   

:\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
I can see there are multiple issues with the tests. Let me analyze the main problems and fix them systematically:

Main issues identified:
Cannot read properties of undefined (reading 'catch') - This suggests there's an issue with promise handling in the cleanup method
Several test expectations are failing due to mocking issues
Audio format validation issues
Test timeout issues
Let me start by examining and fixing the core issues:

Read file(s)

audio-manager.ts 360 - 371
The issue is that this.state.audioContext might be undefined. Let me fix this:

Accepted edits to

audio-manager.ts


Now let me check the audio format validation issue:

Read file(s)

audio-optimization.ts 100 - 121
Read file(s)

audio-optimization.ts 115 - 136
The MP3 frame sync validation looks correct. Let me check the test to see what's expected:

Read file(s)

audio-optimization.test.ts 100 - 116
The issue is with the byte order. Let me fix the MP3 frame sync validation:

Accepted edits to

audio-optimization.ts


Now let me fix the asset loader test issues. The main problem seems to be with the mocking and error handling:

Read file(s)

asset-loader.ts 115 - 126
The issue is that Audio is not defined in the test environment. Let me add a check for this:

Accepted edits to

asset-loader.ts


Now let me fix the timeout issue in the asset loader. The problem is that the response might be undefined:

Read file(s)

asset-loader.ts 160 - 171
Accepted edits to

asset-loader.ts


Now let me fix the audio optimization recommendations. The issue is that the recommendations are not being generated correctly:

Read file(s)

audio-optimization.ts 180 - 201
The recommendations look correct. Let me check the test to see what's expected:

Read file(s)

audio-optimization.test.ts 185 - 206
The tests are expecting the recommendations to be there, but they're not being generated. Let me check the mock buffer setup:

Read file(s)

audio-optimization.test.ts 150 - 171
The mock buffer looks correct. The issue might be that the recommendations are being generated but the test is not finding them. Let me check if there's an issue with the string matching. Let me run a specific test to see what's happening:

Command
npm test -- --run src/tests/audio/audio-optimization.test.ts -t "should provide sample rate recommendations"
npm t
test -- --run src/tests/audio/
/audio-optimization.test.ts -t
t "should provide sample rate 
 recommendations"
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/audio/audio-optimization.test.ts -t "should provide sample rate recommendations"pm test --run src/tests/audio/audio-optimization.test.ts -t should provide sample rate recommendations
> thewanderer@0.1.0 test     
> vitest run -c vitest.config
g.ts --run src/tests/audio/aud
dio-optimization.test.ts -t sh
hould provide sample rate reco
ommendations

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheW
Wanderer

ode (vitest 1)ode (vitest 3)ode (vitest 5)ode (vitest 6)ode (vitest 9)ode (vitest 10)ode (vitest 15)
 Test Files 0 passed (1)     
      Tests 0 passed (0)     
   Start at 10:02:02
   Duration 942ms

 ❯ src/tests/audio/audio-optimization.test.ts [queued]    

 Test Files 0 passed (1)     
      Tests 0 passed (0)     
   Start at 10:02:02
   Duration 1.16s
(node:42708) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        

 Test Files 0 passed (1)     
      Tests 0 passed | 1 skip
pped (28)
   Start at 10:02:02
   Duration 1.26s
 ❯ src/tests/audio/audio-optimization.test.ts (28 tests | 1 failed | 27 skipped) 12ms  
   ↓ AudioFormatUtils > isFormatSupported > should return true for supported formats   
   ↓ AudioFormatUtils > isFormatSupported > should return false for unsupported formats
   ↓ AudioFormatUtils > isFor
rmatSupported > should be case
e insensitive
   ↓ AudioFormatUtils > getBe
estSupportedFormat > should re
eturn mp3 as preferred format 
   ↓ AudioFormatUtils > getBe
estSupportedFormat > should re
eturn ogg if mp3 not available
   ↓ AudioFormatUtils > getBe
estSupportedFormat > should re
eturn null if no formats suppo
orted
   ↓ AudioFormatUtils > getFo
ormatFromUrl > should extract 
 format from URL
   ↓ AudioFormatUtils > getFo
ormatFromUrl > should handle U
URLs with query parameters    
   ↓ AudioFormatUtils > getFo
ormatFromUrl > should return e
empty string for URLs without 
 extension
   ↓ AudioFormatUtils > valid
dateAudioHeader > should valid
date MP3 header with ID3 tag  
   ↓ AudioFormatUtils > valid
dateAudioHeader > should valid
date MP3 header with frame syn
nc
   ↓ AudioFormatUtils > valid
dateAudioHeader > should valid
date OGG header
   ↓ AudioFormatUtils > valid
dateAudioHeader > should valid
date WAV header
   ↓ AudioFormatUtils > valid
dateAudioHeader > should rejec
ct invalid headers
   ↓ AudioOptimizer > analyze
eAudioBuffer > should analyze 
 audio buffer metrics
   × AudioOptimizer > analyze
eAudioBuffer > should provide 
 sample rate recommendations 1
11ms
     → expected [ …(3) ] to i
include StringContaining "redu
ucing sample rate"
   ↓ AudioOptimizer > analyze
eAudioBuffer > should provide 
 channel recommendations for s
stereo
   ↓ AudioOptimizer > analyze
eAudioBuffer > should provide 
 duration recommendations for 
 long clips
   ↓ AudioOptimizer > analyze
eAudioBuffer > should provide 
 file size recommendations    
   ↓ AudioOptimizer > normali
izeAudioBuffer > should normal
lize audio buffer
   ↓ AudioOptimizer > normali
izeAudioBuffer > should skip n
normalization when disabled   
   ↓ AudioOptimizer > applyFa
adeInOut > should apply fade i
in and out
   ↓ AudioOptimizer > applyFa
adeInOut > should use default 
 fade times
   ↓ AudioOptimizer > getOpti
imizationReport > should gener
rate optimization report for m
multiple files
   ↓ AudioOptimizer > getOpti
imizationReport > should provi
ide global recommendations    
   ↓ AudioUtils > formatFileS
Size > should format bytes cor
rrectly
   ↓ AudioUtils > formatDurat
tion > should format seconds c
correctly
   ↓ AudioUtils > formatCompr
ressionRatio > should format c
compression ratio as percentag
ge

⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/audio/audio-
-optimization.test.ts > AudioO
Optimizer > analyzeAudioBuffer
r > should provide sample rate
e recommendations

AssertionError: expected [ …(
(3) ] to include StringContain
ning "reducing sample rate"   
 ❯ src/tests/audio/audio-opti
imization.test.ts:194:46      
    192|Xconst a…
    193|
    194|Xexpect(…
       |                     
^   
    195|Xexp…
    196|X);      

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)    
      Tests  1 failed | 27 sk
kipped (28)
   Start at  10:02:02        
   Duration  1.42s (transform
m 93ms, setup 40ms, collect 58
8ms, tests 12ms, environment 7
701ms, prepare 246ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me add some debugging to see what recommendations are actually being generated:

Accepted edits to

audio-optimization.test.ts


Command
npm test -- --run src/tests/audio/audio-optimization.test.ts -t "should provide sample rate recommendations"
npm t
test -- --run src/tests/audio/
/audio-optimization.test.ts -t
t "should provide sample rate 
 recommendations"
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/audio/audio-optimization.test.ts -t "should provide sample rate recommendations"pm test --run src/tests/audio/audio-optimization.test.ts -t should provide sample rate recommendations
> thewanderer@0.1.0 test     
> vitest run -c vitest.config
g.ts --run src/tests/audio/aud
dio-optimization.test.ts -t sh
hould provide sample rate reco
ommendations

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheW
Wanderer

ode (vitest 2)ode (vitest 3)ode (vitest 5)ode (vitest 7)ode (vitest 8)ode (vitest 10)ode (vitest 11)ode (vitest 14)ode (vitest 13)ode (vitest 15)
 Test Files 0 passed (1)     
      Tests 0 passed (0)     
   Start at 10:02:31
   Duration 955ms

 ❯ src/tests/audio/audio-optimization.test.ts [queued]    

 Test Files 0 passed (1)     
      Tests 0 passed (0)     
   Start at 10:02:31
   Duration 1.06s
(node:20328) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        

 Test Files 0 passed (1)     
      Tests 0 passed | 1 skip
pped (28)
   Start at 10:02:31
   Duration 1.17s
stdout | src/tests/audio/audio-optimization.test.ts > AudioOptimizer > analyzeAudioBuffer > should provide sample rate recommendations           
Generated recommendations: [ 
  'Consider reducing sample rate from 44100Hz to 22050Hz',
  'Convert to mono for game sound effects to reduce file s
size',
  'File size (861KB) exceeds 
 recommended maximum (100KB)' 
]


 ❯ src/tests/audio/audio-opti
imization.test.ts 1/28        

 Test Files 0 passed (1)     
      Tests 0 passed | 1 skip
pped (28)
   Start at 10:02:31
   Duration 1.17s
 ❯ src/tests/audio/audio-optimization.test.ts (28 tests | 1 failed | 27 skipped) 19ms  
   ↓ AudioFormatUtils > isFormatSupported > should return true for supported formats   
   ↓ AudioFormatUtils > isFormatSupported > should return false for unsupported formats
   ↓ AudioFormatUtils > isFor
rmatSupported > should be case
e insensitive
   ↓ AudioFormatUtils > getBe
estSupportedFormat > should re
eturn mp3 as preferred format 
   ↓ AudioFormatUtils > getBe
estSupportedFormat > should re
eturn ogg if mp3 not available
   ↓ AudioFormatUtils > getBe
estSupportedFormat > should re
eturn null if no formats suppo
orted
   ↓ AudioFormatUtils > getFo
ormatFromUrl > should extract 
 format from URL
   ↓ AudioFormatUtils > getFo
ormatFromUrl > should handle U
URLs with query parameters    
   ↓ AudioFormatUtils > getFo
ormatFromUrl > should return e
empty string for URLs without 
 extension
   ↓ AudioFormatUtils > valid
dateAudioHeader > should valid
date MP3 header with ID3 tag  
   ↓ AudioFormatUtils > valid
dateAudioHeader > should valid
date MP3 header with frame syn
nc
   ↓ AudioFormatUtils > valid
dateAudioHeader > should valid
date OGG header
   ↓ AudioFormatUtils > valid
dateAudioHeader > should valid
date WAV header
   ↓ AudioFormatUtils > valid
dateAudioHeader > should rejec
ct invalid headers
   ↓ AudioOptimizer > analyze
eAudioBuffer > should analyze 
 audio buffer metrics
   × AudioOptimizer > analyze
eAudioBuffer > should provide 
 sample rate recommendations 1
17ms
     → expected [ …(3) ] to i
include StringContaining "redu
ucing sample rate"
   ↓ AudioOptimizer > analyze
eAudioBuffer > should provide 
 channel recommendations for s
stereo
   ↓ AudioOptimizer > analyze
eAudioBuffer > should provide 
 duration recommendations for 
 long clips
   ↓ AudioOptimizer > analyze
eAudioBuffer > should provide 
 file size recommendations    
   ↓ AudioOptimizer > normali
izeAudioBuffer > should normal
lize audio buffer
   ↓ AudioOptimizer > normali
izeAudioBuffer > should skip n
normalization when disabled   
   ↓ AudioOptimizer > applyFa
adeInOut > should apply fade i
in and out
   ↓ AudioOptimizer > applyFa
adeInOut > should use default 
 fade times
   ↓ AudioOptimizer > getOpti
imizationReport > should gener
rate optimization report for m
multiple files
   ↓ AudioOptimizer > getOpti
imizationReport > should provi
ide global recommendations    
   ↓ AudioUtils > formatFileS
Size > should format bytes cor
rrectly
   ↓ AudioUtils > formatDurat
tion > should format seconds c
correctly
   ↓ AudioUtils > formatCompr
ressionRatio > should format c
compression ratio as percentag
ge

⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/audio/audio-
-optimization.test.ts > AudioO
Optimizer > analyzeAudioBuffer
r > should provide sample rate
e recommendations
AssertionError: expected [ …(
(3) ] to include StringContain
ning "reducing sample rate"   
 ❯ src/tests/audio/audio-opti
imization.test.ts:195:46      

    193| 
    194|Xconsole…
    195|Xexpect(…
       |                     
^   
    196|Xexp…
    197|X);      

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)    
      Tests  1 failed | 27 sk
kipped (28)
   Start at  10:02:31        
   Duration  1.35s (transform
m 100ms, setup 39ms, collect 6
62ms, tests 19ms, environment 
 653ms, prepare 208ms)        

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me check the AudioOptimizer class to see if there's an issue with the options:

Read file(s)

audio-optimization.ts 170 - 191
Session Too Long
Continue
Summarize and continue in a new session.