❯ src/tests/audio/se...

The labels for the c...

New Session





When a player has a collision with a bomb the BOMB_SOUND should play. 

Kiro
Including Steering Documents

typescript-standards.md
I'll help you implement the bomb sound on collision. Let me first examine the current code structure to understand how sounds and collisions are handled.

Read file(s)

TODO.md
Now let me examine the current sound integration test to understand how sounds are currently handled:

Read file(s)

app-sound-integration-comprehensive.test.tsx
Now let me look at the game logic to understand how collisions are handled and where I need to add the bomb sound:

Searched workspace
Searching for bomb collision logic in the codebase
Let me search for bomb-related code more specifically:

Searched workspace
Searching for bomb handling in the game logic
Now let me look at the sound assets and constants to understand the current sound system:

Searched workspace
Looking for BOMB_SOUND definition and sound assets
Let me look at the sound event mapping to understand how sounds are triggered:

Error(s) while reading file(s)
Searched workspace
Searching for sound event mapping files
Read file(s)

sound-event-mapper.ts
Now let me check the collision sound mapper to see if bomb collision is already handled there:

Read file(s)

collision-sound-mapper.ts
Now let me check the sound config to see the current sound types and IDs:

Read file(s)

sound-config.ts
Now let me check the ISoundEvent interface to understand the sound event structure:

Read file(s)

ISoundEvent.ts
Perfect! Now I understand the current system. I can see that:

The BOMB_SOUND is already defined in the sound config
The sound event mapper currently treats bomb collision the same as regular movement (just plays walk sound)
I need to add a specific bomb collision event type and update the mapping
Let me implement the bomb sound on collision by updating the sound event system:

Accepted edits to

ISoundEvent.ts



2 edits to file

sound-event-mapper.ts


Now I need to update the sound config to include the bomb sound in the appropriate category:

Accepted edits to

sound-config.ts


Now let me run the tests to see if my changes work correctly:

Command
npm test -- --run src/tests/sound-event-integration.test.ts

D:\FizzBash\TheWanderer>npm test -- --run src/
/tests/sound-event-integ
gration.test.ts
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-event-integration.test.tspm test --run src/tests/sound-event-integration.test.ts
> thewanderer@0.1.0 tes
st
> vitest run -c vitest.
.config.ts --run src/tes
sts/sound-event-integrat
tion.test.ts

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBas
sh/TheWanderer

ode (vitest 1)ode (vitest 2)ode (vitest 6)ode (vitest 4)
 Test Files 0 passed (1
1)
      Tests 0 passed (0
0)
   Start at 14:02:14   
   Duration 923ms      
ode (vitest 7)ode (vitest 8)ode (vitest 9)ode (vitest 10)ode (vitest 11)ode (vitest 13)ode (vitest 12)ode (vitest 15)ode (vitest 14)
 Test Files 0 passed (1)
      Tests 0 passed (0
0)
   Start at 14:02:14   
   Duration 2.03s      

 Test Files 0 passed (1)
      Tests 0 passed (0
0)
   Start at 14:02:14   
   Duration 3.01s      

 ❯ src/tests/sound-event-integration.test.ts [
[queued]

 Test Files 0 passed (1
1)
      Tests 0 passed (0
0)
   Start at 14:02:14   
   Duration 3.23s      
(node:64632) [DEP0040] DeprecationWarning: The `punycode` module is d
deprecated. Please use a
a userland alternative i
instead.
(Use `node --trace-depr
recation ...` to show wh
here the warning was cre
eated)

 ❯ src/tests/sound-even
nt-integration.test.ts 0
0/37

 Test Files 0 passed (1
1)
      Tests 0 passed (3
37)
   Start at 14:02:14   
   Duration 3.64s      
 ❯ src/tests/sound-event-integration.test.ts (37 tests | 2 failed) 51
1ms
   ✓ Sound Event Mapper
r > mapPlayerMovementToS
Sound > should return di
ig sound event when play
yer enters soil 4ms     
   ✓ Sound Event Mapper
r > mapPlayerMovementToS
Sound > should return wa
alk sound event when pla
ayer moves to empty cell
l 1ms
   ✓ Sound Event Mapper
r > mapPlayerMovementToS
Sound > should return wa
alk sound event when pla
ayer moves to diamond 0m
ms
   ✓ Sound Event Mapper
r > mapPlayerMovementToS
Sound > should return wa
alk sound event when pla
ayer moves to exit 0ms  
   × Sound Event Mapper
r > mapPlayerMovementToS
Sound > should return wa
alk sound event when pla
ayer moves to bomb 17ms 
     → expected { type:
: 'bomb_explode', …(3) }
} to deeply equal { type
e: 'movement', …(3) }   
   ✓ Sound Event Mapper
r > mapPlayerMovementToS
Sound > should return nu
ull for blocked movement
t 1ms
   ✓ Sound Event Mapper
r > mapGameStateChangeTo
oSound > should return d
death sound event when p
player dies 1ms
   ✓ Sound Event Mapper
r > mapGameStateChangeTo
oSound > should return v
victory sound event when
n player wins 0ms       
   ✓ Sound Event Mapper
r > mapGameStateChangeTo
oSound > should return n
null when game state doe
es not change 1ms       
   ✓ Sound Event Mapper
r > mapGameStateChangeTo
oSound > should return n
null for invalid state t
transitions 0ms
   ✓ Sound Event Mapper
r > mapDiamondCollection
nToSound > should return
n collection sound event
t when collecting diamon
nd 0ms
   ✓ Sound Event Mapper
r > mapDiamondCollection
nToSound > should return
n null for non-diamond c
cells 0ms
   ✓ Sound Event Mapper
r > mapExitInteractionTo
oSound > should return d
door slam and victory so
ound events when player 
 can exit 1ms
   ✓ Sound Event Mapper
r > mapExitInteractionTo
oSound > should return e
empty array when player 
 cannot exit 0ms        
   ✓ Sound Event Mapper
r > mapExitInteractionTo
oSound > should return e
empty array for non-exit
t cells 0ms
   ✓ Sound Event Mapper
r > mapSoundEventToId > 
 should map player dig m
movement to dig sound ID
D 1ms
   ✓ Sound Event Mapper
r > mapSoundEventToId > 
 should map player walk 
 movement to walk sound 
 ID 0ms
   ✓ Sound Event Mapper
r > mapSoundEventToId > 
 should map boulder move
ement to boulder sound I
ID 0ms
   ✓ Sound Event Mapper
r > mapSoundEventToId > 
 should map arrow moveme
ent to arrow sound ID 0m
ms
   ✓ Sound Event Mapper
r > mapSoundEventToId > 
 should map collision ev
vent to thud sound ID 0m
ms
   ✓ Sound Event Mapper
r > mapSoundEventToId > 
 should map collection e
event to diamond collect
t sound ID 0ms
   ✓ Sound Event Mapper
r > mapSoundEventToId > 
 should map death event 
 to death sound ID 0ms  
   ✓ Sound Event Mapper
r > mapSoundEventToId > 
 should map victory even
nt to victory sound ID 0
0ms
   ✓ Sound Event Mapper
r > mapSoundEventToId > 
 should map door_slam ev
vent to door slam sound 
 ID 0ms
   ✓ Sound Event Mapper
r > mapSoundEventToId > 
 should throw error for 
 unknown event type 2ms 
   ✓ Sound Event Mapper
r > generatePlayerMoveEv
vents > should generate 
 movement and collection
n events for diamond col
llection 1ms
   × Sound Event Mapper
r > generatePlayerMoveEv
vents > should generate 
 movement and death even
nts when player dies 3ms
     → expected { type:
: 'bomb_explode', …(3) }
} to deeply equal { type
e: 'movement', …(3) }   
   ✓ Sound Event Mapper
r > generatePlayerMoveEv
vents > should generate 
 movement, door slam, an
nd victory events when p
player wins 1ms
   ✓ Sound Event Mapper
r > generatePlayerMoveEv
vents > should generate 
 dig sound when entering
g soil 1ms
   ✓ Sound Event Mapper
r > generatePlayerMoveEv
vents > should generate 
 only movement event for
r regular movement 1ms  
   ✓ Sound Event Emitte
er > createSoundEventEmi
itter > should create em
mitter with working emit
t function 3ms
   ✓ Sound Event Emitte
er > createSoundEventEmi
itter > should emit mult
tiple events 1ms        
   ✓ Sound Event Emitte
er > createSoundEventEmi
itter > should not emit 
 when no callback is set
t 1ms
   ✓ Sound Event Emitte
er > createSoundEventEmi
itter > should handle er
rrors gracefully 2ms    
   ✓ Sound Event Emitte
er > getSoundEventEmitte
er > should return the s
same instance on multipl
le calls 0ms
   ✓ Sound Event Emitte
er > emitSoundEvent > sh
hould emit single event 
 using global emitter 1m
ms
   ✓ Sound Event Emitte
er > emitSoundEvents > s
should emit multiple eve
ents using global emitte
er 1ms

⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯

 FAIL  src/tests/sound-
-event-integration.test.
.ts > Sound Event Mapper
r > mapPlayerMovementToS
Sound > should return wa
alk sound event when pla
ayer moves to bomb      
AssertionError: expecte
ed { type: 'bomb_explode
e', …(3) } to deeply equ
ual { type: 'movement', 
 …(3) }

- Expected
+ Received

  {
-   "priority": "low", 
+   "priority": "high",
    "source": "player",
-   "type": "movement",
-   "volume": 0.6,     
+   "type": "bomb_explo
ode",
+   "volume": 0.9,     
  }

 ❯ src/tests/sound-even
nt-integration.test.ts:6
69:28

     67|Xc…
     68|
     69|Xe…
       |               
^
     70|X…
     71|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  src/tests/sound-
-event-integration.test.
.ts > Sound Event Mapper
r > generatePlayerMoveEv
vents > should generate 
 movement and death even
nts when player dies    
AssertionError: expecte
ed { type: 'bomb_explode
e', …(3) } to deeply equ
ual { type: 'movement', 
 …(3) }

- Expected
+ Received

  {
-   "priority": "low", 
+   "priority": "high",
    "source": "player",
-   "type": "movement",
-   "volume": 0.6,     
+   "type": "bomb_explo
ode",
+   "volume": 0.9,     
  }

 ❯ src/tests/sound-even
nt-integration.test.ts:3
313:31
    311|
    312|Xe…
    313|Xe…
       |               
^      
    314|X…
    315|X…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯


 Test Files  1 failed (
(1)
      Tests  2 failed |
|
 35 passed (37)        
   Start at  14:02:14  
   Duration  3.87s (tra
ansform 249ms, setup 246
6ms, collect 147ms, test
ts 51ms, environment 1.8
85s, prepare 759ms)     


ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
r
Perfect! The tests are failing because they expect the old behavior (walk sound for bomb collision), but now I'm correctly returning a bomb explosion sound. I need to update the tests to reflect the new expected behavior:

Read file(s)

sound-event-integration.test.ts 65 - 76
Accepted edits to

sound-event-integration.test.ts


Now let me find and update the other failing test:

Read file(s)

sound-event-integration.test.ts 305 - 321
Error(s) while editing

sound-event-integration.test.ts

Unable to replace text, trying a different approach...
Let me get more context around the failing test:

Read file(s)

sound-event-integration.test.ts 300 - 326
Accepted edits to

sound-event-integration.test.ts


Now I need to add a test for the new bomb_explode sound event mapping:

Read file(s)

sound-event-integration.test.ts 200 - 251
Read file(s)

sound-event-integration.test.ts 250 - 291
Accepted edits to

sound-event-integration.test.ts


Now let me run the tests again to see if they pass:

Command
npm test -- --run src/tests/sound-event-integration.test.ts
npm test -- --run src/tests/sound-event-integration.test.ts
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-event-integration.test.tspm test --run src/tests/sound-event-integration.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/sound-event-integration.test.ts:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWandererode (vitest 2)ode (vitest 4)ode (vitest 9)ode (vitest 7)ode (vitest 5)ode (vitest 6)ode (vitest 8)ode (vitest 10)ode (vitest 14)ode (vitest 12)ode (vitest 13)ode (vitest 15) Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:03:28
   Duration 946ms
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:03:28
   Duration 1.91s
(node:66932) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/sound-event-integration.test.ts 0/38

 Test Files 0 passed (1)
      Tests 0 passed (38)
   Start at 14:03:28
   Duration 2.45s
 ✓ src/tests/sound-event-integration.test.ts (38 tests) 24ms
   ✓ Sound Event Mapper > mapPlayerMovementToSound > should return dig sound event when player enters soil 3ms
   ✓ Sound Event Mapper > mapPlayerMovementToSound > should return walk sound event when player moves to empty cell 1ms
   ✓ Sound Event Mapper > mapPlayerMovementToSound > should return walk sound event when player moves to diamond 0ms
   ✓ Sound Event Mapper > mapPlayerMovementToSound > should return walk soun
nd event when player moves to exit 0ms
   ✓ Sound Event Mapper > mapPlayerMovementToSound > should return bomb expl
losion sound event when player moves to bomb 0ms
   ✓ Sound Event Mapper > mapPlayerMovementToSound > should return null for 
 blocked movement 0ms
   ✓ Sound Event Mapper > mapGameStateChangeToSound > should return death so
ound event when player dies 0ms
   ✓ Sound Event Mapper > mapGameStateChangeToSound > should return victory 
 sound event when player wins 0ms
   ✓ Sound Event Mapper > mapGameStateChangeToSound > should return null whe
en game state does not change 0ms
   ✓ Sound Event Mapper > mapGameStateChangeToSound > should return null for
r invalid state transitions 0ms
   ✓ Sound Event Mapper > mapDiamondCollectionToSound > should return collec
ction sound event when collecting diamond 0ms
   ✓ Sound Event Mapper > mapDiamondCollectionToSound > should return null f
for non-diamond cells 0ms
   ✓ Sound Event Mapper > mapExitInteractionToSound > should return door sla
am and victory sound events when player can exit 1ms
   ✓ Sound Event Mapper > mapExitInteractionToSound > should return empty ar
rray when player cannot exit 0ms
   ✓ Sound Event Mapper > mapExitInteractionToSound > should return empty ar
rray for non-exit cells 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should map player dig movement
t to dig sound ID 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should map player walk movemen
nt to walk sound ID 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should map boulder movement to
o boulder sound ID 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should map arrow movement to a
arrow sound ID 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should map collision event to 
 thud sound ID 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should map collection event to
o diamond collect sound ID 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should map death event to deat
th sound ID 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should map victory event to vi
ictory sound ID 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should map door_slam event to 
 door slam sound ID 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should map bomb_explode event 
 to bomb sound ID 0ms
   ✓ Sound Event Mapper > mapSoundEventToId > should throw error for unknown
n event type 1ms
   ✓ Sound Event Mapper > generatePlayerMoveEvents > should generate movemen
nt and collection events for diamond collection 0ms
   ✓ Sound Event Mapper > generatePlayerMoveEvents > should generate movemen
nt and death events when player dies 0ms
   ✓ Sound Event Mapper > generatePlayerMoveEvents > should generate movemen
nt, door slam, and victory events when player wins 1ms
   ✓ Sound Event Mapper > generatePlayerMoveEvents > should generate dig sou
und when entering soil 0ms
   ✓ Sound Event Mapper > generatePlayerMoveEvents > should generate only mo
ovement event for regular movement 0ms
   ✓ Sound Event Emitter > createSoundEventEmitter > should create emitter w
with working emit function 3ms
   ✓ Sound Event Emitter > createSoundEventEmitter > should emit multiple ev
vents 1ms
   ✓ Sound Event Emitter > createSoundEventEmitter > should not emit when no
o callback is set 1ms
   ✓ Sound Event Emitter > createSoundEventEmitter > should handle errors gr
racefully 2ms
   ✓ Sound Event Emitter > getSoundEventEmitter > should return the same ins
stance on multiple calls 0ms
   ✓ Sound Event Emitter > emitSoundEvent > should emit single event using g
global emitter 0ms
   ✓ Sound Event Emitter > emitSoundEvents > should emit multiple events usi
ing global emitter 0ms

 Test Files  1 passed (1)
      Tests  38 passed (38)
   Start at  14:03:28
   Duration  2.59s (transform 160ms, setup 260ms, collect 145ms, tests 24ms,
, environment 1.37s, prepare 220ms)


ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Excellent! All the sound event integration tests are now passing. Let me also run some other related tests to make sure I haven't broken anything:

Command
npm test -- --run src/tests/comprehensive-sound-system.test.ts
npm test -- --run src/tests/comprehensive-sound-syst
tem.test.ts
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/comprehensive-sound-system.test.tspm test --run src/tests/comprehensive-sound-system.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/comprehensive-sound-system.
.test.ts

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 2)ode (vitest 5)ode (vitest 8)ode (vitest 9)ode (vitest 10)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:03:46
   Duration 956ms

 ❯ src/tests/comprehensive-sound-system.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:03:46
   Duration 1.82s
(node:74480) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/comprehensive-sound-system.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:03:46
   Duration 1.93s

 ❯ src/tests/comprehensive-sound-system.test.ts 0/36

 Test Files 0 passed (1)
      Tests 0 passed (36)
   Start at 14:03:46
   Duration 2.37s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should initialize with mocked Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio context state cha
anges
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Audio context state changed to: suspended
Audio context state changed to: running


 ❯ src/tests/comprehensive-sound-system.test.ts 1/36

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed (36)
   Start at 14:03:46
   Duration 2.48s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio context state changes                                                                        
Audio context suspended - attempting to resume on next user interaction     
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 1/36

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed (36)
   Start at 14:03:46
   Duration 2.48s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should create and manage gain nodes correctly                                                                    
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 1/36

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed (36)
   Start at 14:03:46
   Duration 2.48s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/comprehensive-sound-system.test.ts 14/36

 Test Files 0 passed (1)
      Tests 2 failed | 12 passed (36)
   Start at 14:03:46
   Duration 2.91s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData                                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/comprehensive-sound-system.test.ts 14/36

 Test Files 0 passed (1)
      Tests 2 failed | 12 passed (36)
   Start at 14:03:46
   Duration 2.91s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData                                                         
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 14/36

 Test Files 0 passed (1)
      Tests 2 failed | 12 passed (36)
   Start at 14:03:46
   Duration 2.91s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 15/36

 Test Files 0 passed (1)
      Tests 2 failed | 13 passed (36)
   Start at 14:03:46
   Duration 3.67s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle mocked audio context errors gracefully                                                             
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed                                                                        
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:565:27)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:568:33
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/tests/comprehensive-sound-system.test.ts 15/36

 Test Files 0 passed (1)
      Tests 2 failed | 13 passed (36)
   Start at 14:03:46
   Duration 3.67s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should initialize with mocked HTML5 Audio                                                                      
HTML5 Audio initialized successfully                                        
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should create audio elements for ea
ach sound
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should create audio elements for ea
ach sound
HTML5 Audio preloaded 10/10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio loading events 
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio loading events 
HTML5 Audio preloaded 10/10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio playback with m
mocked play method
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio playback with m
mocked play method
HTML5 Audio preloaded 10/10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   


 ❯ src/tests/comprehensive-sound-system.test.ts 15/36

 Test Files 0 passed (1)
      Tests 2 failed | 13 passed (36)
   Start at 14:03:46
   Duration 3.67s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                                                 
    at listOnTimeout (node:internal/timers:594:17)                          
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/comprehensive-sound-system.test.ts 15/36

 Test Files 0 passed (1)
      Tests 2 failed | 13 passed (36)
   Start at 14:03:46
   Duration 3.67s

 ❯ src/tests/comprehensive-sound-system.test.ts 20/36

 Test Files 0 passed (1)
      Tests 2 failed | 18 passed (36)
   Start at 14:03:46
   Duration 4.00s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   


 ❯ src/tests/comprehensive-sound-system.test.ts 20/36

 Test Files 0 passed (1)
      Tests 2 failed | 18 passed (36)
   Start at 14:03:46
   Duration 4.97s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                                                 
    at listOnTimeout (node:internal/timers:594:17)                          
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/comprehensive-sound-system.test.ts 20/36

 Test Files 0 passed (1)
      Tests 2 failed | 18 passed (36)
   Start at 14:03:46
   Duration 4.97s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound PLAYER_WALK: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Network error 
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound PLAYER_DIG: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound BOULDER_MOVE: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound ARROW_MOVE: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3               
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                                                 
    at listOnTimeout (node:internal/timers:594:17)                          
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Network er
rror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound COLLISION_THUD: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound DEATH_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: Error: Ne
etwork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound VICTORY_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error: Netw
work error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound DOOR_SLAM: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive So    und 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error: Netw
work error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound BOMB_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Asset loading complete: 0/10 loaded, 10 failedstdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading
Preloaded 0 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK               
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' } ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK                 
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Decode failed  
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK          
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Decode failed                                                                       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Decode failed                                                                     
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Decode failed       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK              
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Decode failed                                                                           
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK             
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 5.73s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK                  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK                 
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Decode failed  
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK          
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Decode failed                                                                       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Decode failed                                                                     
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Decode failed       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK              
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
                                                                            
                                                                            
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Decode failed                                                                          
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 2 failed | 19 passed (36)
   Start at 14:03:46
   Duration 6.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Decode faile
ed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound PLAYER_WALK: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Decode failed 
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound PLAYER_DIG: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                    
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3         

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Decode f
failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound BOULDER_MOVE: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK                  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound ARROW_MOVE: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Decode fai
iled
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound COLLISION_THUD: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK                 
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Decode failed  
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Decode fail
led
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound DEATH_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK          
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Decode failed                                                                       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: Error: De
ecode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound VICTORY_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3         
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Decode failed                                                                     
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error: Deco
ode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound DOOR_SLAM: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK              
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Decode failed                                                                           
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error: Deco
ode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound DIAMOND_COLLECT: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK             
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error: Decode f
failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound BOMB_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
Asset loading complete: 0/10 loaded, 10 failedstdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
Preloaded 0 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked localStorage failures
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should complete full sound system lifecycle                                      
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should complete full sound system lifecycle                                      
Audio context state changed to: closed                                      
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36                       

 Test Files 0 passed (1)
      Tests 2 failed | 20 passed (36)
   Start at 14:03:46
   Duration 7.82s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should handle complex game scenario end-to-end
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 27/36

 Test Files 0 passed (1)
      Tests 2 failed | 25 passed (36)
   Start at 14:03:46
   Duration 8.29s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should handle fallback scenarios end-to-end                                      
Audio context error (INITIALIZATION_FAILED): Error: Web Audio not supported 
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:747:23)                                                     
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:753:29
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/tests/comprehensive-sound-system.test.ts 27/36

 Test Files 0 passed (1)
      Tests 2 failed | 25 passed (36)
   Start at 14:03:46
   Duration 8.29s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should initialize quickly without blocking                                                  
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 27/36

 Test Files 0 passed (1)
      Tests 2 failed | 25 passed (36)
   Start at 14:03:46
   Duration 8.29s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should preload sounds efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 28/36

 Test Files 0 passed (1)
      Tests 2 failed | 26 passed (36)
   Start at 14:03:46
   Duration 8.51s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle memory management efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 29/36

 Test Files 0 passed (1)
      Tests 2 failed | 27 passed (36)
   Start at 14:03:46
   Duration 8.71s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle memory management efficiently                                                 
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 29/36

 Test Files 0 passed (1)
      Tests 2 failed | 27 passed (36)
   Start at 14:03:46
   Duration 8.71s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle memory management efficiently                                                 
Audio context state changed to: closed                                      
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 29/36                       

 Test Files 0 passed (1)
      Tests 2 failed | 27 passed (36)
   Start at 14:03:46
   Duration 8.71s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should not impact game responsiveness during audio operations
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
Preloaded 10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 31/36

 Test Files 0 passed (1)
      Tests 2 failed | 29 passed (36)
   Start at 14:03:46
   Duration 9.03s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should maintain consistent performance under stress
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 32/36

 Test Files 0 passed (1)
      Tests 2 failed | 30 passed (36)
   Start at 14:03:46
   Duration 9.25s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > Error Handling and Edge Cases > should handle all error scenarios gracefully
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed     
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:949:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:951:28
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed     
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:949:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:956:37
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)
Audio context not available for preloading
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed     
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:949:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at errorScenarios (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:963:37)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)
Failed to save muted preference: Error: Storage failed
    at Object.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:961:31)
    at Object.mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/spy/dist/index.js:96:15)
    at Object.spy [as setItem] (file:///D:/FizzBash/TheWanderer/node_modules
s/tinyspy/dist/index.js:47:103)
    at WebAudioManager.saveMutedPreference (D:\FizzBash\TheWanderer\src\audi
io\managers\audio-manager.ts:603:26)
    at WebAudioManager.setMuted (D:\FizzBash\TheWanderer\src\audio\managers\
\audio-manager.ts:1020:14)
    at errorScenarios (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:964:29)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)


 ❯ src/tests/comprehensive-sound-system.test.ts 35/36

 Test Files 0 passed (1)
      Tests 2 failed | 33 passed (36)
   Start at 14:03:46
   Duration 9.46s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > Error Handling and Edge Cases > should handle invalid sound IDs gracefully                                                          
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 35/36

 Test Files 0 passed (1)
      Tests 2 failed | 33 passed (36)
   Start at 14:03:46
   Duration 9.46s
 ❯ src/tests/comprehensive-sound-system.test.ts (36 tests | 2 failed) 7200ms
   × Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Functions and Sound Event Generation > Sound Event Mapping Functions > should correctly map all player movement scenarios 22ms
     → expected { type: 'bomb_explode', …(3) } to match object { type: 'movement', …(2) }
(1 matching property omitted from actual)
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Mapping Functions > should correc
ctly map all game state changes 1ms
   × Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Mapping Functions > should genera
ate complex event sequences correctly 4ms
     → expected 'bomb_explode' to be 'movement' // Object.is equality       
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Emitter Pure Functions > should c
create emitter with correct interface 1ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Emitter Pure Functions > should h
handle event emission without callback gracefully 1ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Emitter Pure Functions > should c
correctly map all sound event types to IDs 2ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Configuration Validation > should have 
 valid sound asset configuration 3ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Configuration Validation > should have 
 consistent sound IDs across configuration 1ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Configuration Validation > should have 
 valid category configuration 1ms
   ✓ Comprehensive Sound System Test Suite > 2. Integration Tests for React 
 Hooks and Component Interactions > should be covered by React-specific integ
gration tests 1ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should initi
ialize with mocked Web Audio API 3ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should handl
le audio context state changes 2ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should creat
te and manage gain nodes correctly 2ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should creat
te buffer sources for sound playback 55ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should handl
le audio decoding with mocked decodeAudioData  1064ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should handl
le mocked audio context errors gracefully 8ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should ini
itialize with mocked HTML5 Audio 2ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should cre
eate audio elements for each sound 3ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should han
ndle audio loading events 2ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should han
ndle audio playback with mocked play method 4ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > Mock Error Scenarios > should handle mocked network fai
ilures during preloading  2064ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > Mock Error Scenarios > should handle mocked audio decod
ding failures  2095ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > Mock Error Scenarios > should handle mocked localStorag
ge failures 15ms
   ✓ Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complet
te Sound Workflows > should complete full sound system lifecycle 93ms        
   ✓ Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complet
te Sound Workflows > should handle complex game scenario end-to-end 149ms    
   ✓ Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complet
te Sound Workflows > should handle fallback scenarios end-to-end 30ms        
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should initialize quickly without blocking 27ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should handle rapid sound playback without performance degradation 
 251ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should preload sounds efficiently 296ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should handle memory management efficiently 207ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should not impact game responsiveness during audio operations 147ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should handle concurrent audio operations efficiently 166ms        
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should maintain consistent performance under stress 220ms
   ✓ Comprehensive Sound System Test Suite > Error Handling and Edge Cases >
>
 should handle all error scenarios gracefully 53ms
   ✓ Comprehensive Sound System Test Suite > Error Handling and Edge Cases >
>
 should handle invalid sound IDs gracefully 39ms
   ✓ Comprehensive Sound System Test Suite > Error Handling and Edge Cases >
>
 should handle invalid play options gracefully 159ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound Sy
ystem Test Suite > 1. Unit Tests for Pure Functions and Sound Event Generatio
on > Sound Event Mapping Functions > should correctly map all player movement
t scenarios

AssertionError: expected { type: 'bomb_explode', …(3) } to match object { ty
ype: 'movement', …(2) }
(1 matching property omitted from actual)

- Expected
+ Received

  {
-   "priority": "low",
-   "type": "movement",
-   "volume": 0.6,
+   "priority": "high",
+   "type": "bomb_explode",
+   "volume": 0.9,
  }


 ❯ src/tests/comprehensive-sound-system.test.ts:303:40

    301|Xexpect(result).toBeNull();
    302|X} else {
    303|Xexpect(result).toMatchObject(expected);    
       |X^
    304|Xexpect(result?.source).toBe('player');     
    305|X}
 ❯ src/tests/comprehensive-sound-system.test.ts:298:27

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound Sy
ystem Test Suite > 1. Unit Tests for Pure Functions and Sound Event Generatio
on > Sound Event Mapping Functions > should generate complex event sequences 
 correctly
AssertionError: expected 'bomb_explode' to be 'movement' // Object.is equali
ity

Expected: "movement"
Received: "bomb_explode"


 ❯ src/tests/comprehensive-sound-system.test.ts:342:46
    340|X);
    341|Xexpect(deathEvents).toHaveLength(2);
    342|Xexpect(deathEvents[0]?.type).toBe('movement');     
       |X^
    343|Xexpect(deathEvents[1]?.type).toBe('death');        
    344|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯


 Test Files  1 failed (1)

      Tests  2 failed | 34 passed (36)
   Start at  14:03:46
   Duration  9.82s (transform 263ms, setup 241ms, collect 261ms, tests 7.20s
s, environment 1.29s, prepare 265ms)


ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
I can see that the comprehensive sound system tests are failing because they expect the old behavior (movement sound for bomb collision), but now I'm correctly returning a bomb explosion sound. I need to update these tests as well. Let me find and update the failing tests:

Read file(s)

comprehensive-sound-system.test.ts 290 - 311
Accepted edits to

comprehensive-sound-system.test.ts


Now let me find and update the second failing test:

Read file(s)

comprehensive-sound-system.test.ts 335 - 351
Accepted edits to

comprehensive-sound-system.test.ts


Now let me run the comprehensive sound system tests again to see if they pass:

Command
npm test -- --run src/tests/comprehensive-sound-system.test.ts
npm test -- --run src/tests/comprehensive-sound-syst
tem.test.ts
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/comprehensive-sound-system.test.tspm test --run src/tests/comprehensive-sound-system.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/comprehensive-sound-system.
.test.ts

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 3)ode (vitest 5)ode (vitest 9)ode (vitest 4)ode (vitest 6)ode (vitest 11)ode (vitest 12)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:04:43
   Duration 979ms

 ❯ src/tests/comprehensive-sound-system.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:04:43
   Duration 1.52s
(node:72340) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/comprehensive-sound-system.test.ts 0/36

 Test Files 0 passed (1)
      Tests 0 passed (36)
   Start at 14:04:43
   Duration 1.93s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should initialize with mocked Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio context state cha
anges
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Audio context state changed to: suspended
Audio context state changed to: running


 ❯ src/tests/comprehensive-sound-system.test.ts 1/36

 Test Files 0 passed (1)
      Tests 1 passed (36)
   Start at 14:04:43
   Duration 2.05s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio context state changes                                                                        
Audio context suspended - attempting to resume on next user interaction     
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 1/36

 Test Files 0 passed (1)
      Tests 1 passed (36)
   Start at 14:04:43
   Duration 2.05s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should create and manage gain nodes correctly                                                                    
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
Preloaded 10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/comprehensive-sound-system.test.ts 1/36

 Test Files 0 passed (1)
      Tests 1 passed (36)
   Start at 14:04:43
   Duration 2.05s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData                                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/comprehensive-sound-system.test.ts 1/36

 Test Files 0 passed (1)
      Tests 1 passed (36)
   Start at 14:04:43
   Duration 2.05s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData                                                         
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 1/36

 Test Files 0 passed (1)
      Tests 1 passed (36)
   Start at 14:04:43
   Duration 2.05s

 ❯ src/tests/comprehensive-sound-system.test.ts 14/36

 Test Files 0 passed (1)
      Tests 14 passed (36)
   Start at 14:04:43
   Duration 2.92s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 15/36

 Test Files 0 passed (1)
      Tests 15 passed (36)
   Start at 14:04:43
   Duration 3.14s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle mocked audio context errors gracefully                                                             
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed                                                                        
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:565:27)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:568:33
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/tests/comprehensive-sound-system.test.ts 15/36

 Test Files 0 passed (1)
      Tests 15 passed (36)
   Start at 14:04:43
   Duration 3.14s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should initialize with mocked HTML5 Audio                                                                      
HTML5 Audio initialized successfully                                        
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should create audio elements for ea
ach sound
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should create audio elements for ea
ach sound
HTML5 Audio preloaded 10/10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio loading events 
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio loading events 
HTML5 Audio preloaded 10/10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio playback with m
mocked play method
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio playback with m
mocked play method
HTML5 Audio preloaded 10/10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   


 ❯ src/tests/comprehensive-sound-system.test.ts 15/36

 Test Files 0 passed (1)
      Tests 15 passed (36)
   Start at 14:04:43
   Duration 3.14s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                                                 
    at listOnTimeout (node:internal/timers:594:17)                          
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/comprehensive-sound-system.test.ts 15/36

 Test Files 0 passed (1)
      Tests 15 passed (36)
   Start at 14:04:43
   Duration 3.14s

 ❯ src/tests/comprehensive-sound-system.test.ts 20/36

 Test Files 0 passed (1)
      Tests 20 passed (36)
   Start at 14:04:43
   Duration 4.00s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   


 ❯ src/tests/comprehensive-sound-system.test.ts 20/36

 Test Files 0 passed (1)
      Tests 20 passed (36)
   Start at 14:04:43
   Duration 4.98s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                                                 
    at listOnTimeout (node:internal/timers:594:17)                          
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/comprehensive-sound-system.test.ts 20/36

 Test Files 0 passed (1)
      Tests 20 passed (36)
   Start at 14:04:43
   Duration 4.98s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                                                 
    at listOnTimeout (node:internal/timers:594:17)                          
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound PLAYER_WALK: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Network error 
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound PLAYER_DIG: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound BOULDER_MOVE: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound ARROW_MOVE: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Network er
rror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound COLLISION_THUD: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound DEATH_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: Error: Ne
etwork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound VICTORY_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error: Netw
work error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound DOOR_SLAM: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error: Netw
work error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound BOMB_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
Preloaded 0 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK               
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK                  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK                 
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Decode failed  
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK          
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Decode failed                                                                       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Decode failed                                                                     
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Decode failed       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' } ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Decode failed                                                                           
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK             
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Decode failed                                                                          
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.20s

 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 5.97s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK               
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK                  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK                 
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Decode failed  
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK          
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Decode failed                                                                       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Decode failed                                                                     
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Decode failed       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK              
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Decode failed                                                                           
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK             
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Decode failed                                                                          
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 21/36

 Test Files 0 passed (1)
      Tests 21 passed (36)
   Start at 14:04:43
   Duration 6.95s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Decode faile
ed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound PLAYER_WALK: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Decode failed 
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound PLAYER_DIG: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK               
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Decode f
failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound BOULDER_MOVE: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK                  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound ARROW_MOVE: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Decode fai
iled
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound COLLISION_THUD: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK                 
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Decode failed  
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Decode fail
led
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound DEATH_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK          
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Decode failed                                                                       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: Error: De
ecode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound VICTORY_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Decode failed                                                                     
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error: Deco
ode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound DOOR_SLAM: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK              
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Decode failed                                                                           
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error: Deco
ode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound DIAMOND_COLLECT: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK             
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Decode failed                                                                          
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:655:78                                                                      
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error: Decode f
failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound BOMB_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures             
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked audio decoding failures
Preloaded 0 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked localStorage failures
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should complete full sound system lifecycle                                      
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should complete full sound system lifecycle
Audio context state changed to: closedstdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should handle complex game scenario end-to-end
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > should handle fallback scenarios end-to-end                                      
Audio context error (INITIALIZATION_FAILED): Error: Web Audio not supported 
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:747:23)                                                     
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:753:29
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should initialize quickly without blocking                                                  
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
Preloaded 10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 22/36

 Test Files 0 passed (1)
      Tests 22 passed (36)
   Start at 14:04:43
   Duration 7.20s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle memory management efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 31/36

 Test Files 0 passed (1)
      Tests 31 passed (36)
   Start at 14:04:43
   Duration 7.49s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle memory management efficiently                                                 
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
                                                                            
                                                                            
 ❯ src/tests/comprehensive-sound-system.test.ts 31/36

 Test Files 0 passed (1)
      Tests 31 passed (36)
   Start at 14:04:43
   Duration 7.49s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should handle memory management efficiently                                                 
Audio context state changed to: closed                                      
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 5. Performance Tests for Audio System > should not impact game responsiveness during audio operations
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
Preloaded 10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
Preloaded 10 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
Preloaded 10 sounds


 ❯ src/tests/comprehensive-sound-system.test.ts 31/36

 Test Files 0 passed (1)
      Tests 31 passed (36)
   Start at 14:04:43
   Duration 7.49s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > Error Handling and Edge Cases > should handle all error scenarios gracefully
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed     
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:949:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:951:28
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed     
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:949:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:956:37
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)
Audio context not available for preloading
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed     
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:949:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at errorScenarios (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:963:37)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)
Failed to save muted preference: Error: Storage failed
    at Object.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:961:31)
    at Object.mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/spy/dist/index.js:96:15)
    at Object.spy [as setItem] (file:///D:/FizzBash/TheWanderer/node_modules
s/tinyspy/dist/index.js:47:103)
    at WebAudioManager.saveMutedPreference (D:\FizzBash\TheWanderer\src\audi
io\managers\audio-manager.ts:603:26)
    at WebAudioManager.setMuted (D:\FizzBash\TheWanderer\src\audio\managers\
\audio-manager.ts:1020:14)
    at errorScenarios (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:964:29)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid so
ound IDs gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
Preloaded 10 sounds

 ✓ src/tests/comprehensive-sound-system.test.ts (36 tests) 5654ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Mapping Functions > should correc
ctly map all player movement scenarios 5ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Mapping Functions > should correc
ctly map all game state changes 1ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Mapping Functions > should genera
ate complex event sequences correctly 2ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Emitter Pure Functions > should c
create emitter with correct interface 1ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Emitter Pure Functions > should h
handle event emission without callback gracefully 1ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Event Emitter Pure Functions > should c
correctly map all sound event types to IDs 3ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Configuration Validation > should have 
 valid sound asset configuration 3ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Configuration Validation > should have 
 consistent sound IDs across configuration 1ms
   ✓ Comprehensive Sound System Test Suite > 1. Unit Tests for Pure Function
ns and Sound Event Generation > Sound Configuration Validation > should have 
 valid category configuration 1ms
   ✓ Comprehensive Sound System Test Suite > 2. Integration Tests for React 
 Hooks and Component Interactions > should be covered by React-specific integ
gration tests 1ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should initi
ialize with mocked Web Audio API 3ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should handl
le audio context state changes 2ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should creat
te and manage gain nodes correctly 2ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should creat
te buffer sources for sound playback 43ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should handl
le audio decoding with mocked decodeAudioData  1030ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should handl
le mocked audio context errors gracefully 7ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should ini
itialize with mocked HTML5 Audio 1ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should cre
eate audio elements for each sound 2ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should han
ndle audio loading events 1ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should han
ndle audio playback with mocked play method 2ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > Mock Error Scenarios > should handle mocked network fai
ilures during preloading  2047ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > Mock Error Scenarios > should handle mocked audio decod
ding failures  2070ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > Mock Error Scenarios > should handle mocked localStorag
ge failures 3ms
   ✓ Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complet
te Sound Workflows > should complete full sound system lifecycle 26ms        
   ✓ Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complet
te Sound Workflows > should handle complex game scenario end-to-end 23ms     
   ✓ Comprehensive Sound System Test Suite > 4. End-to-End Tests for Complet
te Sound Workflows > should handle fallback scenarios end-to-end 3ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should initialize quickly without blocking 3ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should handle rapid sound playback without performance degradation 
 39ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should preload sounds efficiently 35ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should handle memory management efficiently 60ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should not impact game responsiveness during audio operations 41ms 
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should handle concurrent audio operations efficiently 48ms
   ✓ Comprehensive Sound System Test Suite > 5. Performance Tests for Audio 
 System > should maintain consistent performance under stress 47ms
   ✓ Comprehensive Sound System Test Suite > Error Handling and Edge Cases >
>
 should handle all error scenarios gracefully 33ms
   ✓ Comprehensive Sound System Test Suite > Error Handling and Edge Cases >
>
 should handle invalid sound IDs gracefully 17ms
   ✓ Comprehensive Sound System Test Suite > Error Handling and Edge Cases >
>
 should handle invalid play options gracefully 47ms

 Test Files  1 passed (1)
      Tests  36 passed (36)
   Start at  14:04:43
   Duration  7.68s (transform 206ms, setup 178ms, collect 208ms, tests 5.65s
s, environment 967ms, prepare 206ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me run a more focused test to check if my changes work:

Command
npm test -- --run src/tests/sound-event-integration.test.ts src/tests/comprehensive-sound-system.test.ts --reporter=basic
npm test -- --run src/tests/sound-event-integration.
.test.ts src/tests/comprehensive-sound-system.test.ts --reporter=basic
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-event-integration.test.ts src/tests/comprehensive-sound-system.test.ts --reporter=basicpm test --run src/tests/sound-event-integration.test.ts src/tests/comprehensive-sound-system.test.ts --reporter=basic
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/sound-event-integration.tes
st.ts src/tests/comprehensive-sound-system.test.ts --reporter=basic

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

 DEPRECATED  'basic' reporter is deprecated and will be removed in Vitest v3
3.
Remove 'basic' from 'reporters' option. To match 'basic' reporter 100%, use 
 configuration:
{
  "test": {
    "reporters": [
      [
        "default",
        {
          "summary": false
        }
      ]
    ]
  }
}
ode (vitest 5)ode (vitest 1)ode (vitest 3)ode (vitest 4)ode (vitest 6)ode (vitest 8)ode (vitest 7)ode (vitest 12)ode (vitest 10)ode (vitest 13)ode (vitest 11)ode (vitest 15)
(node:50292) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

(node:52664) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ✓ src/tests/sound-event-integration.test.ts (38 tests) 87ms

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should initialize with mocked Web Aud
dio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio context state cha
anges
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Audio context state changed to: suspended
Audio context state changed to: running

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio context state cha
anges
Audio context suspended - attempting to resume on next user interaction     


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create and manage gain nodes c
correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
Asset loading complete: 10/10 loaded, 0 failed


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should create buffer sources for soun
nd playback
Preloaded 10 sounds


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

ode (vitest 2)
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
Asset loading complete: 10/10 loaded, 0 failed


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
Preloaded 10 sounds


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle mocked audio context er
rrors gracefully
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation fa
ailed
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:565:27)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:568:33
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should initialize with mocked HTML5
5 Audio
HTML5 Audio initialized successfully


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should create audio elements for ea
ach sound
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should create audio elements for ea
ach sound
HTML5 Audio preloaded 10/10 sounds


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio loading events 
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio loading events 
HTML5 Audio preloaded 10/10 sounds


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio playback with m
mocked play method
HTML5 Audio initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML
L5AudioManager with Comprehensive Mocks > should handle audio playback with m
mocked play method
HTML5 Audio preloaded 10/10 sounds


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound PLAYER_WALK: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Network error 
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound PLAYER_DIG: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound BOULDER_MOVE: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound ARROW_MOVE: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Network er
rror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound COLLISION_THUD: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound DEATH_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: Error: Ne
etwork error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound VICTORY_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error: Netw
work error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound DOOR_SLAM: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error: Netw
work error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Failed to load sound BOMB_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Asset loading complete: 0/10 loaded, 10 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked network failures during preloading  
Preloaded 0 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Decode failed  
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Decode f
failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/victory.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Decode
e failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Decode failed       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Decode faile
ed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Decode fail
led
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Decode failed  
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Decode f
failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Decode
e failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Decode failed       
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Decode faile
ed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Decode fail
led
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Decode faile
ed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound PLAYER_WALK: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Decode failed 
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound PLAYER_DIG: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Decode f
failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound BOULDER_MOVE: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Decode failed   
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound ARROW_MOVE: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Decode failed    
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Decode fai
iled
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound COLLISION_THUD: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Decode failed  
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Decode fail
led
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound DEATH_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Decode f
failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: Error: De
ecode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound VICTORY_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Decode
e failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error: Deco
ode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound DOOR_SLAM: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Decode faile
ed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error: Deco
ode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound DIAMOND_COLLECT: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Decode fail
led
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error: Decode f
failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Failed to load sound BOMB_SOUND: Error: Decode failed
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:655:78
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Asset loading complete: 0/10 loaded, 10 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked audio decoding failures
Preloaded 0 sounds

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
k Error Scenarios > should handle mocked localStorage failures
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
Preloaded 10 sounds

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld complete full sound system lifecycle
Audio context state changed to: closed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle complex game scenario end-to-end
Preloaded 10 sounds

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 4. End-to-End Tests for Complete Sound Workflows > shoul
ld handle fallback scenarios end-to-end
Audio context error (INITIALIZATION_FAILED): Error: Web Audio not supported 
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:747:23)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:753:29
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should initializ
ze quickly without blocking
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
Asset loading complete: 10/10 loaded, 0 failed


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle ra
apid sound playback without performance degradation
Preloaded 10 sounds


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
Asset loading complete: 10/10 loaded, 0 failed


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should preload s
sounds efficiently
Preloaded 10 sounds


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
Asset loading complete: 10/10 loaded, 0 failed


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
Preloaded 10 sounds


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle me
emory management efficiently
Audio context state changed to: closed


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
Asset loading complete: 10/10 loaded, 0 failed


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should not impac
ct game responsiveness during audio operations
Preloaded 10 sounds


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
Asset loading complete: 10/10 loaded, 0 failed


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should handle co
oncurrent audio operations efficiently
Preloaded 10 sounds


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 5. Performance Tests for Audio System > should maintain 
 consistent performance under stress
Preloaded 10 sounds


stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle all error 
 scenarios gracefully
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed     
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:949:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:951:28
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed     
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:949:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:956:37
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)
Audio context not available for preloading
Audio context error (INITIALIZATION_FAILED): Error: AudioContext failed     
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:949:31)
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/sp
py/dist/index.js:96:15)
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/in
ndex.js:47:39)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\a
audio\managers\audio-manager.ts:97:39)
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio
o-manager.ts:80:14)
    at errorScenarios (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:963:37)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)
Failed to save muted preference: Error: Storage failed
    at Object.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-s
sound-system.test.ts:961:31)
    at Object.mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/spy/dist/index.js:96:15)
    at Object.spy [as setItem] (file:///D:/FizzBash/TheWanderer/node_modules
s/tinyspy/dist/index.js:47:103)
    at WebAudioManager.saveMutedPreference (D:\FizzBash\TheWanderer\src\audi
io\managers\audio-manager.ts:603:26)
    at WebAudioManager.setMuted (D:\FizzBash\TheWanderer\src\audio\managers\
\audio-manager.ts:1020:14)
    at errorScenarios (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound
d-system.test.ts:964:29)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:971:30
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid so
ound IDs gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
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
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > Error Handling and Edge Cases > should handle invalid pl
lay options gracefully
Preloaded 10 sounds


 ✓ src/tests/comprehensive-sound-system.test.ts (36 tests) 7253ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > WebAudioManager with Comprehensive Mocks > should handl
le audio decoding with mocked decodeAudioData  1145ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > Mock Error Scenarios > should handle mocked network fai
ilures during preloading  2103ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web
b Audio API Testing > Mock Error Scenarios > should handle mocked audio decod
ding failures  2101ms


 Test Files  2 passed (2)
      Tests  74 passed (74)
   Start at  14:05:15
   Duration  14.48s (transform 1.20s, setup 1.32s, collect 1.55s, tests 7.34
4s, environment 7.31s, prepare 1.37s)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Session Too Long
Continue
Summarize and continue in a new session.


Revert


ISoundEvent.ts

sound-event-mapper.ts

sound-config.ts

sound-event-integration.test.ts

comprehensive-sound-system.test.ts






Claude Sonnet 4.0
Autopilot
