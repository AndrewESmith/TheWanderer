Execute Task: 10. In...

npm test -- src/test...

npm test -- src/test...

How do I fix the fol...

npm test -- src/test...

Execute task: 10. In...





Execute Task: 10. Integrate sound system with main App component 10. Integrate sound system with main App component

Kiro
Including Steering Documents

typescript-standards.md
I'll implement task 10 to integrate the sound system with the main App component. Let me start by examining the current App.tsx file and the existing sound system components.

Task: 10. Integrate sound system with main App component from 
tasks.md
Status: In Progress
Read file(s)

App.tsx
Now let me examine the existing audio system components to understand what's already implemented:

Searched workspace
Examining the audio directory structure to understand existing components
Let me check the current audio hooks and context to understand what's available:

Read file(s)

use-sound.ts

use-audio-settings.ts

audio-context.tsx
Now let me check the interfaces to understand the expected types:

Read file(s)

IUseSoundHook.ts

ISoundEvent.ts

IAudioManager.ts
Now let me check the current tests to understand the testing patterns:

Searched workspace
Examining the test directory structure to understand existing test patterns
Let me check the existing app sound integration test to understand what's already tested:

Read file(s)

app-sound-integration.test.tsx
Based on my analysis, I can see that the sound system integration with the App component is already quite comprehensive. However, looking at the task requirements, I need to ensure all aspects are properly implemented. Let me examine what's currently in the App.tsx and identify any gaps:

✅ Sound hooks are already integrated (useSound)
✅ Keyboard event handlers are connected
✅ Sound initialization happens during app startup via AudioProvider
✅ Sound system doesn't block game rendering
❓ Integration tests need to be verified/enhanced
Let me check if there are any missing keyboard shortcuts or sound integrations:

Read file(s)

sound-config.ts
Now let me check if there are any additional keyboard shortcuts that should be implemented. Let me look at the current keyboard handling in the App:

Searched workspace
Searching for keyboard handling in App.tsx
Let me check if there are any additional keyboard shortcuts that should be implemented by looking at the requirements:

Searched workspace
Searching for keyboard shortcuts in requirements and design documents
The keyboard shortcut for mute/unmute is already implemented in the useAudioSettings hook. Let me verify that the App component is properly handling all the sound events. Let me check the current integration more closely:

Read file(s)

sound-event-emitter.ts
Now let me check the GameState to see how sound events are being triggered:

Searched workspace
Searching for sound event emissions in GameState
The integration looks comprehensive. Let me run the existing tests to see if there are any gaps:

Command
npm test -- --run src/tests/app-sound-integration.test.tsx
npm test -- --run src/tests/app-sound-integration.test.tsx
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/app-sound-integration.test.tsxpm test --run src/tests/app-sound-integration.test.tsx
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/app-sound-integration.test.tsx

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 4)ode (vitest 5)ode (vitest 8)ode (vitest 9)ode (vitest 10)ode (vitest 11)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 16:35:27
   Duration 922ms
(node:31716) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration.test.tsx 0/18

 Test Files 0 passed (1)
      Tests 0 passed (18)
   Start at 16:35:27
   Duration 1.47s

 ❯ src/tests/app-sound-integration.test.tsx 1/18

 Test Files 0 passed (1)
      Tests 1 passed (18)
   Start at 16:35:27
   Duration 1.57s

 ❯ src/tests/app-sound-integration.test.tsx 3/18

 Test Files 0 passed (1)
      Tests 3 passed (18)
   Start at 16:35:27
   Duration 1.68s

 ❯ src/tests/app-sound-integration.test.tsx 6/18

 Test Files 0 passed (1)
      Tests 6 passed (18)
   Start at 16:35:27
   Duration 1.79s

 ❯ src/tests/app-sound-integration.test.tsx 9/18

 Test Files 0 passed (1)
      Tests 9 passed (18)
   Start at 16:35:27
   Duration 1.90s

 ❯ src/tests/app-sound-integration.test.tsx 13/18

 Test Files 0 passed (1)
      Tests 13 passed (18)
   Start at 16:35:27
   Duration 2.12s
stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > should continue working when sound playback fails
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:487:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:487:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:487:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:487:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)


 ❯ src/tests/app-sound-integration.test.tsx 16/18

 Test Files 0 passed (1)
      Tests 16 passed (18)
   Start at 16:35:27
   Duration 2.32s
 ✓ src/tests/app-sound-integration.test.tsx (18 tests) 874ms
   ✓ App Sound Integration > Sound System Initialization > should initialize audio system on app startup 47ms
   ✓ App Sound Integration > Sound System Initialization > should not block game rendering duri
ing audio initialization 31ms
   ✓ App Sound Integration > Sound System Initialization > should handle audio initialization e
errors gracefully 22ms
   ✓ App Sound Integration > Keyboard Controls Integration > should handle game movement keys w
without interfering with audio 47ms
   ✓ App Sound Integration > Keyboard Controls Integration > should handle mute keyboard shortc
cut (Ctrl+M) 31ms
   ✓ App Sound Integration > Keyboard Controls Integration > should handle mute keyboard shortc
cut (Cmd+M) on Mac 31ms
   ✓ App Sound Integration > Keyboard Controls Integration > should not trigger mute on M key w
without modifiers 16ms
   ✓ App Sound Integration > Game Event Sound Integration > should emit sounds for player movem
ment 44ms
   ✓ App Sound Integration > Game Event Sound Integration > should stop all sounds when game en
nds 47ms
   ✓ App Sound Integration > Game Event Sound Integration > should not emit sounds when game is
s over 21ms
   ✓ App Sound Integration > Audio Controls Integration > should toggle mute via button click 3
39ms
   ✓ App Sound Integration > Audio Controls Integration > should open audio settings dialog 32m
ms
   ✓ App Sound Integration > Audio Controls Integration > should display audio error messages w
when available 24ms
   ✓ App Sound Integration > Performance and Responsiveness > should not block user input durin
ng sound playback 198ms
   ✓ App Sound Integration > Performance and Responsiveness > should handle multiple simultaneo
ous sound events 90ms
   ✓ App Sound Integration > Performance and Responsiveness > should maintain game state consis
stency during audio operations 48ms
   ✓ App Sound Integration > Error Recovery > should continue working when sound playback fails
s 68ms
   ✓ App Sound Integration > Error Recovery > should handle audio context suspension gracefully
y 36ms

 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  16:35:27
   Duration  2.42s (transform 199ms, setup 115ms, collect 286ms, tests 874ms, environment 619ms
s, prepare 244ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Great! All the integration tests are passing. Now let me check if there are any additional integration aspects that need to be implemented. Let me examine the current App.tsx more closely to see if there are any missing pieces:

Searched workspace
Searching for any TODO comments or missing implementations in the App component
Let me check if there are any additional keyboard shortcuts or sound triggers that should be added by examining the requirements more closely:

Searched workspace
Searching for specific sound requirements that might need keyboard integration
The mute/unmute functionality is already implemented via the keyboard shortcut (Ctrl+M/Cmd+M) in the useAudioSettings hook. Let me check if there are any other integration aspects that might be missing by looking at the task details more carefully:

Looking at the task requirements:

✅ Add sound hooks to App.tsx for global audio management - Done (useSound hook is used)
✅ Connect keyboard event handlers to trigger appropriate sounds - Done (movement keys trigger sounds)
✅ Implement sound initialization during app startup - Done (AudioProvider initializes on mount)
✅ Ensure sound system doesn't block game rendering or input - Done (async initialization, error handling)
❓ Write integration tests for complete sound system functionality - Need to verify completeness
Let me check if there are any additional integration tests that should be added:

Searched workspace
Searching for any missing test scenarios in the integration test
The integration tests look comprehensive. Let me check if there are any additional sound integration aspects that might be missing by looking at the specific requirements from the task:

Based on my analysis, the App component integration appears to be complete. However, let me add one small enhancement to ensure the sound system is properly integrated with keyboard shortcuts. Let me check if there are any additional keyboard shortcuts that should be implemented:

Read file(s)

use-audio-settings.ts 90 - 111
The keyboard shortcut for mute (Ctrl+M/Cmd+M) is already implemented in the useAudioSettings hook. Let me verify that the App component is properly using all the sound system features by checking if there are any missing integrations:

Searched workspace
Checking if there are any sound-related features that aren't being used in App.tsx
I notice that the App component isn't using some of the advanced features from the useSound hook like resetAudioSystem, hasPlaybackErrors, and fallbackMode. Let me enhance the App component to make use of these features for better error handling and user experience:

Accepted edits to

App.tsx


Now let me add error recovery functionality and better user feedback. I'll add a reset button for audio errors and show fallback mode status:

Accepted edits to

App.tsx


Now let me add a comprehensive integration test for these new features:

Accepted edits to

app-sound-integration.test.tsx


I need to update the mock setup to support the new fallback mode test:

Accepted edits to

app-sound-integration.test.tsx


Now I need to update the beforeEach to reset the new mock variables:

Accepted edits to

app-sound-integration.test.tsx


I need to fix the test that uses the mocked useAudioContext. Let me update it properly:

Accepted edits to

app-sound-integration.test.tsx


I also need to fix the reset audio system test:

Accepted edits to

app-sound-integration.test.tsx


Now let me run the updated tests to make sure everything works:

Command
npm test -- --run src/tests/app-sound-integration.test.tsx
npm test -- --run src/tests/app-sound-integration.test.tsx
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/app-sound-integration.test.tsxpm test --run src/tests/app-sound-integration.test.tsx
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/app-sound-integration.test.tsx

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 2)ode (vitest 3)ode (vitest 6)ode (vitest 5)ode (vitest 8)ode (vitest 10)ode (vitest 13)ode (vitest 12)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 16:37:48
   Duration 965ms

 ❯ src/tests/app-sound-integration.test.tsx [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 16:37:48
   Duration 1.07s
(node:33704) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration.test.tsx 0/21

 Test Files 0 passed (1)
      Tests 0 passed (21)
   Start at 16:37:48
   Duration 1.49s

 ❯ src/tests/app-sound-integration.test.tsx 1/21

 Test Files 0 passed (1)
      Tests 1 passed (21)
   Start at 16:37:48
   Duration 1.61s

 ❯ src/tests/app-sound-integration.test.tsx 6/21

 Test Files 0 passed (1)
      Tests 6 passed (21)
   Start at 16:37:48
   Duration 1.82s

 ❯ src/tests/app-sound-integration.test.tsx 9/21

 Test Files 0 passed (1)
      Tests 9 passed (21)
   Start at 16:37:48
   Duration 1.93s

 ❯ src/tests/app-sound-integration.test.tsx 12/21

 Test Files 0 passed (1)
      Tests 12 passed (21)
   Start at 16:37:48
   Duration 2.15s

 ❯ src/tests/app-sound-integration.test.tsx 14/21

 Test Files 0 passed (1)
      Tests 14 passed (21)
   Start at 16:37:48
   Duration 2.25s
stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > should continue working when sound playback fails
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)


 ❯ src/tests/app-sound-integration.test.tsx 16/21

 Test Files 0 passed (1)
      Tests 16 passed (21)
   Start at 16:37:48
   Duration 2.36s
stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > should handle audio reset errors gracefully
Failed to reset audio system: Error: Reset failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:559:52
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

 ✓ src/tests/app-sound-integration.test.tsx (21 tests) 939ms
   ✓ App Sound Integration > Sound System Initialization > should initialize audio system on ap
pp startup 53ms
   ✓ App Sound Integration > Sound System Initialization > should not block game rendering duri
ing audio initialization 27ms
   ✓ App Sound Integration > Sound System Initialization > should handle audio initialization e
errors gracefully 25ms
   ✓ App Sound Integration > Keyboard Controls Integration > should handle game movement keys w
without interfering with audio 61ms
   ✓ App Sound Integration > Keyboard Controls Integration > should handle mute keyboard shortc
cut (Ctrl+M) 32ms
   ✓ App Sound Integration > Keyboard Controls Integration > should handle mute keyboard shortc
cut (Cmd+M) on Mac 16ms
   ✓ App Sound Integration > Keyboard Controls Integration > should not trigger mute on M key w
without modifiers 16ms
   ✓ App Sound Integration > Game Event Sound Integration > should emit sounds for player movem
ment 60ms
   ✓ App Sound Integration > Game Event Sound Integration > should stop all sounds when game en
nds 28ms
   ✓ App Sound Integration > Game Event Sound Integration > should not emit sounds when game is
s over 36ms
   ✓ App Sound Integration > Audio Controls Integration > should toggle mute via button click 4
47ms
   ✓ App Sound Integration > Audio Controls Integration > should open audio settings dialog 46m
ms
   ✓ App Sound Integration > Audio Controls Integration > should display audio error messages w
when available 46ms
   ✓ App Sound Integration > Performance and Responsiveness > should not block user input durin
ng sound playback 188ms
   ✓ App Sound Integration > Performance and Responsiveness > should handle multiple simultaneo
ous sound events 88ms
   ✓ App Sound Integration > Performance and Responsiveness > should maintain game state consis
stency during audio operations 34ms
   ✓ App Sound Integration > Error Recovery > should continue working when sound playback fails
s 50ms
   ✓ App Sound Integration > Error Recovery > should handle audio context suspension gracefully
y 21ms
   ✓ App Sound Integration > Error Recovery > should show fallback mode indicator when in fallb
back 13ms
   ✓ App Sound Integration > Error Recovery > should show reset audio button when there are pla
ayback errors 36ms
   ✓ App Sound Integration > Error Recovery > should handle audio reset errors gracefully 18ms 

 Test Files  1 passed (1)
      Tests  21 passed (21)
   Start at  16:37:48
   Duration  2.55s (transform 174ms, setup 142ms, collect 256ms, tests 939ms, environment 629ms
s, prepare 182ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer>

D:\FizzBash\TheWanderer>


D:\FizzBash\TheWanderer>




D:\FizzBash\TheWanderer>





D:\FizzBash\TheWanderer>






D:\FizzBash\TheWanderer>







D:\FizzBash\TheWanderer>








D:\FizzBash\TheWanderer>









D:\FizzBash\TheWanderer>










D:\FizzBash\TheWanderer>











D:\FizzBash\TheWanderer>












D:\FizzBash\TheWanderer
Excellent! All 21 tests are passing. The error messages in stderr are expected - they're testing error scenarios and the console.error calls are working as intended.

Now let me run a broader test to make sure I haven't broken anything else:

Command
npm test -- --run --reporter=verbose
npm test -- --run --reporter=verbose
:\Windows\System32\cmd.exe - npm  test -- --run --reporter=verbosepm test --run --reporter=verbose
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run --reporter=verbose:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWandererode (vitest 2)ode (vitest 3)ode (vitest 4)ode (vitest 5)ode (vitest 7)ode (vitest 8)ode (vitest 10)ode (vitest 11)ode (vitest 13)ode (vitest 15)ode (vitest 12) Test Files 0 passed (21)
      Tests 0 passed (0)
   Start at 16:38:11
   Duration 926ms

 ❯ src/tests/audio-hooks.test.tsx [queued]

 Test Files 0 passed (21)
      Tests 0 passed (0)
   Start at 16:38:11
   Duration 1.91s
(node:65668) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:5776) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:65712) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]

 Test Files 0 passed (21)
      Tests 0 passed (0)
   Start at 16:38:11
   Duration 2.02s
(node:37924) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:62324) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:12992) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:41468) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:66112) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a us
serland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:62952) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a us
serland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:63184) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a us
serland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:17868) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a us
serland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:48200) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a us
serland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:36852) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a us
serland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:40036) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a us
serland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:7084) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a use
erland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

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
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]

 Test Files 0 passed (21)
      Tests 0 passed (16)
   Start at 16:38:11
   Duration 2.54s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should initialize with Web Audio API support
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support
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
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-event-integration.test.ts 0/37

 Test Files 0 passed (21)
      Tests 0 passed (173)
   Start at 16:38:11
   Duration 2.64s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:116:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry fa
ailed requests
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:132:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


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
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-event-integration.test.ts 0/37

 Test Files 0 passed (21)
      Tests 0 passed (173)
   Start at 16:38:11
   Duration 2.64s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspension
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspension
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking
Preloaded 9 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle mute
ed state correctly
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should apply optimization during preloading
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should load muted 
 preference from localStorage
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should apply optimization during preloading
Preloaded 9 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle loca
alStorage errors gracefully
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sou
unds successfully
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sou
unds successfully
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
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
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-event-integration.test.ts 0/37

 Test Files 0 passed (21)
      Tests 0 passed (173)
   Start at 16:38:11
   Duration 2.64s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


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
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-event-integration.test.ts 0/37

 Test Files 0 passed (21)
      Tests 0 passed (173)
   Start at 16:38:11
   Duration 2.64s
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Audio Manager Factory > should create WebAudioManager when Web Audio API is supported        
Using Web Audio API

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Audio Manager Factory > should fall back to HTML5AudioManager when Web Audio API is not supported
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Audio Manager Factory > should fall back to SilentAudioManager when no audio is supported    
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks 
 > Audio Manager Factory > should create specific audio manager when requested
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks 
 > SilentAudioManager > should implement all AudioManager methods without errors
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks 
 > SilentAudioManager > should handle loading progress callbacks
Silent Audio Manager initialized - no audio will be played


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
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-event-integration.test.ts 0/37

 Test Files 0 passed (21)
      Tests 0 passed (173)
   Start at 16:38:11
   Duration 2.64s
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during audio context creation
Using Web Audio API

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during sound playback
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during preloading
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Autoplay Policy Handling > should detect autoplay restrictions
Using Web Audio API

 ❯ src/audio/__tests__/audio-error-handling.test.ts (10 tests | 5 failed) 44ms
   ❯ Audio Error Handling and Fallbacks (10)
     ❯ Audio Manager Factory (4)
       × should create WebAudioManager when Web Audio API is supported 18ms
       ✓ should fall back to HTML5AudioManager when Web Audio API is not supported 2ms
       ✓ should fall back to SilentAudioManager when no audio is supported 1ms
       ✓ should create specific audio manager when requested 1ms
     ❯ SilentAudioManager (2)
       × should implement all AudioManager methods without errors 4ms
       ✓ should handle loading progress callbacks 4ms
     ❯ Error Recovery (3)
       × should handle errors during audio context creation 5ms
       × should handle errors during sound playback 3ms
       ✓ should handle errors during preloading 1ms
     ❯ Autoplay Policy Handling (1)
       × should detect autoplay restrictions 2ms
 ✓ src/tests/audio/audio-optimization.test.ts (28 tests) 81ms
   ✓ AudioFormatUtils (14)
     ✓ isFormatSupported (3)
       ✓ should return true for supported formats 5ms
       ✓ should return false for unsupported formats 1ms
       ✓ should be case insensitive 1ms
     ✓ getBestSupportedFormat (3)
       ✓ should return mp3 as preferred format 1ms
       ✓ should return ogg if mp3 not available 1ms
       ✓ should return null if no formats supported 0ms
     ✓ getFormatFromUrl (3)
       ✓ should extract format from URL 1ms
       ✓ should handle URLs with query parameters 0ms
       ✓ should return empty string for URLs without extension 0ms
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
       ✓ should provide channel recommendations for stereo 1ms
       ✓ should provide duration recommendations for long clips 0ms
       ✓ should provide file size recommendations 0ms
     ✓ normalizeAudioBuffer (2)
       ✓ should normalize audio buffer 30ms
       ✓ should skip normalization when disabled 1ms
     ✓ applyFadeInOut (2)
       ✓ should apply fade in and out 16ms
       ✓ should use default fade times 13ms
     ✓ getOptimizationReport (2)
       ✓ should generate optimization report for multiple files 2ms
       ✓ should provide global recommendations 1ms
   ✓ AudioUtils (3)
     ✓ formatFileSize (1)
       ✓ should format bytes correctly 0ms
     ✓ formatDuration (1)
       ✓ should format seconds correctly 0ms
     ✓ formatCompressionRatio (1)
       ✓ should format compression ratio as percentage 0ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/13
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 3 passed (21)
      Tests 23 failed | 109 passed (214)
   Start at 16:38:11
   Duration 2.84s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:133:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw er
rror if all sources fail
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/13
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 3 passed (21)
      Tests 23 failed | 109 passed (214)
   Start at 16:38:11
   Duration 2.84s
 ✓ src/tests/sound-event-integration.test.ts (37 tests) 25ms
   ✓ Sound Event Mapper (30)
     ✓ mapPlayerMovementToSound (6)
       ✓ should return dig sound event when player enters soil 4ms
       ✓ should return walk sound event when player moves to empty cell 1ms
       ✓ should return walk sound event when player moves to diamond 0ms
       ✓ should return walk sound event when player moves to exit 1ms
       ✓ should return walk sound event when player moves to bomb 0ms
       ✓ should return null for blocked movement 0ms
     ✓ mapGameStateChangeToSound (4)
       ✓ should return death sound event when player dies 0ms
       ✓ should return victory sound event when player wins 0ms
       ✓ should return null when game state does not change 0ms
       ✓ should return null for invalid state transitions 0ms
     ✓ mapDiamondCollectionToSound (2)
       ✓ should return collection sound event when collecting diamond 0ms
       ✓ should return null for non-diamond cells 0ms
     ✓ mapExitInteractionToSound (3)
       ✓ should return door slam and victory sound events when player can exit 1ms
       ✓ should return empty array when player cannot exit 0ms
       ✓ should return empty array for non-exit cells 0ms
     ✓ mapSoundEventToId (10)
       ✓ should map player dig movement to dig sound ID 0ms
       ✓ should map player walk movement to walk sound ID 0ms
       ✓ should map boulder movement to boulder sound ID 0ms
       ✓ should map arrow movement to arrow sound ID 0ms
       ✓ should map collision event to thud sound ID 0ms
       ✓ should map collection event to diamond collect sound ID 0ms
       ✓ should map death event to death sound ID 0ms
       ✓ should map victory event to victory sound ID 0ms
       ✓ should map door_slam event to door slam sound ID 0ms
       ✓ should throw error for unknown event type 1ms
     ✓ generatePlayerMoveEvents (5)
       ✓ should generate movement and collection events for diamond collection 1ms
       ✓ should generate movement and death events when player dies 0ms
       ✓ should generate movement, door slam, and victory events when player wins 1ms
       ✓ should generate dig sound when entering soil 1ms
       ✓ should generate only movement event for regular movement 0ms
   ✓ Sound Event Emitter (7)
     ✓ createSoundEventEmitter (4)
       ✓ should create emitter with working emit function 3ms
       ✓ should emit multiple events 1ms
       ✓ should not emit when no callback is set 0ms
       ✓ should handle errors gracefully 2ms
     ✓ getSoundEventEmitter (1)
       ✓ should return the same instance on multiple calls 0ms
     ✓ emitSoundEvent (1)
       ✓ should emit single event using global emitter 1ms
     ✓ emitSoundEvents (1)
       ✓ should emit multiple events using global emitter 1ms
 ❯ src/audio/__tests__/error-handling.test.ts (23 tests | 15 failed) 94ms
   ❯ Audio Error Handling and Fallbacks (23)
     ❯ Web Audio API Unavailable (3)
       ✓ should gracefully degrade when Web Audio API is not supported 8ms
       ✓ should fall back to silent mode when no audio support exists 2ms
       × should handle AudioContext creation failure 15ms
     ❯ Audio Context Suspension Handling (3)
       × should handle suspended audio context due to autoplay policies 6ms
       × should handle audio context resume failure 5ms
       ✓ should set up multiple event listeners for context resume 3ms
     ❯ Sound File Loading Errors (3)
       × should handle failed sound file loads gracefully 11ms
       × should retry failed sound loads 3ms
       × should fall back to HTML5 audio when Web Audio loading fails completely 3ms
     ❯ HTML5 Audio Fallback (3)
       × should handle HTML5 audio playback errors 2ms
       × should handle autoplay blocked errors 2ms
       × should handle unsupported audio formats 3ms
     ✓ Silent Mode Fallback (2)
       ✓ should provide silent implementations for all methods 2ms
       ✓ should return empty loading state 2ms
     ❯ Error Recovery Mechanisms (3)
       × should attempt on-demand loading when buffer not found 3ms
       × should validate audio buffers before playback 4ms
       ✓ should handle audio context interruption on iOS Safari 6ms
     ❯ Browser-Specific Error Handling (2)
       × should handle Safari-specific audio context issues 1ms
       × should handle Chrome-specific audio context issues 2ms
     ❯ Error Event Emission (2)
       × should emit error events for external handling 2ms
       × should emit fallback events when switching audio managers 1ms
     ✓ Memory Management and Cleanup (2)
       ✓ should clean up resources on audio manager cleanup 1ms
       ✓ should handle cleanup errors gracefully 2ms
 ✓ src/tests/collision-sound-integration.test.ts (21 tests) 15ms
   ✓ Collision Sound Integration Tests (21)
     ✓ Boulder Collision Detection (4)
       ✓ should detect collision when boulder hits rock 3ms
       ✓ should detect collision when boulder hits another boulder 0ms
       ✓ should detect ground collision when boulder hits soil 0ms
       ✓ should not detect collision in empty space 0ms
     ✓ Arrow Collision Detection (2)
       ✓ should detect collision when arrow hits rock 0ms
       ✓ should detect collision when arrow hits boulder 0ms
     ✓ Boulder Movement and Sound Events (4)
       ✓ should generate movement sound when boulder falls 2ms
       ✓ should generate collision sound when boulder cannot fall 0ms
       ✓ should correctly identify when boulder can fall 0ms
       ✓ should correctly identify when boulder cannot fall 0ms
     ✓ Arrow Movement and Sound Events (2)
       ✓ should generate movement sound when arrow moves 0ms
       ✓ should generate collision sound and destroy arrow when hitting obstacle 0ms
     ✓ Physics Engine Integration (3)
       ✓ should find all boulders in maze 1ms
       ✓ should simulate gravity for multiple boulders 1ms
       ✓ should run complete physics simulation step 1ms
     ✓ Sound Event Mapping (4)
       ✓ should map boulder collision with rock to high priority sound 0ms
       ✓ should map arrow collision with soil to low priority sound 0ms
       ✓ should generate object interaction events correctly 0ms
       ✓ should generate collision sound events for multiple collisions 0ms
     ✓ Game State Integration (2)
       ✓ should trigger physics simulation and sound events when player moves 1ms
       ✓ should handle collision timing correctly 0ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-hooks.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 4/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/13
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 3 passed (21)
      Tests 23 failed | 109 passed (214)
   Start at 16:38:11
   Duration 2.84s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw er
rror if all sources fail
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/hooks/use-audio-settings.test.ts > useAudioSettings > initialization >
> should handle corrupted localStorage data gracefully
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid-json" is not valid J
JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-audio-settings.ts:26:33) 
    at mountStateImpl (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.deve
elopment.js:6130:24)
    at mountState (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.developm
ment.js:6151:22)
    at Object.useState (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.dev
velopment.js:22951:18)
    at process.env.NODE_ENV.exports.useState (D:\FizzBash\TheWanderer\node_modules\react\cjs\re
eact.development.js:1221:34)
    at Module.useAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-audio-settings.ts:5
59:37)
    at D:\FizzBash\TheWanderer\src\tests\audio\hooks\use-audio-settings.test.ts:90:49
    at TestComponent (D:\FizzBash\TheWanderer\node_modules\@testing-library\react\dist\pure.js:
:331:27)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\reac
ct-dom-client.development.js:23863:20)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function that calls audio manager
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function that calls audio manager
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23ode (vitest 5)
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function that calls audio manager
Sound asset not found for ID: test-sound


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23ode (vitest 13)
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
                                                                                               
stdout | src/tests/audio-context.test.tsx > AudioContext > should provide audio context to children
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
stdout | src/tests/audio-context.test.tsx > AudioContext > should provide audio context to children
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:146:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle H
HTTP errors
Failed to load test_sound from sounds/test.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle a
audio decoding errors
Failed to load test_sound from sounds/test.mp3: Error: Invalid audio data
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:194:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function with options
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
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

ode (vitest 14)
 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function with options
HTML5 Audio preloaded 0/9 sounds

 ✓ src/tests/audio/hooks/use-audio-settings.test.ts (13 tests) 91ms
   ✓ useAudioSettings (13)
     ✓ initialization (3)
       ✓ should initialize with default settings when no stored settings exist 26ms
       ✓ should load settings from localStorage when available 6ms
       ✓ should handle corrupted localStorage data gracefully 19ms
     ✓ mute functionality (2)
       ✓ should toggle mute state 7ms
       ✓ should persist mute state to localStorage 4ms
     ✓ volume controls (3)
       ✓ should set global volume and clamp values 4ms
       ✓ should set category volume and clamp values 3ms
       ✓ should persist volume changes to localStorage 3ms
     ✓ reset functionality (1)
       ✓ should reset all settings to defaults 4ms
     ✓ keyboard shortcuts (3)
       ✓ should toggle mute on Ctrl+M 4ms
       ✓ should toggle mute on Cmd+M (Mac) 2ms
       ✓ should not toggle mute on M without modifier keys 2ms
     ✓ localStorage error handling (1)
       ✓ should handle localStorage save errors gracefully 4ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound function with options
Sound asset not found for ID: test-sound


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-hooks.test.tsx 0/16
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23ode (vitest 7)
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/game-state-sound-transitions.test.ts 1/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 2 failed | 4 passed (21)
      Tests 23 failed | 128 passed (258)
   Start at 16:38:11
   Duration 2.94s
ode (vitest 15)stdout | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors 
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors 
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should return muted state from audio manager
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should return muted state from audio manager
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should toggle mute state    
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should toggle mute state    
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
ode (vitest 6)stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle audio manager not initialized
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-context.test.tsx > AudioContext > should call preloadSounds during initialization
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-context.test.tsx > AudioContext > should call preloadSounds during initialization
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at 
 https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should show loading state during initialization
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors gracefully
Sound asset not found for ID: test-sound


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config
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

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at 
 https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should return default volume from config
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at 
 https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume from localStorage
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10ode (vitest 12)
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid" is not valid JSON  
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-audio-settings.ts:26:33) 
    at mountStateImpl (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:6130:24)
    at mountState (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:6151:22)
    at Object.useState (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:22951:18)
    at process.env.NODE_ENV.exports.useState (D:\FizzBash\TheWanderer\node_modules\react\cjs\react.development.js:1221:34)
    at Module.useAudioSettings (D:\FizzBash\TheWanderer\src\audio\hooks\use-audio-settings.ts:59:37)
    at __vi_import_1__.renderHook.wrapper (D:\FizzBash\TheWanderer\src\tests\audio-hooks.test.t
tsx:192:49)
    at TestComponent (D:\FizzBash\TheWanderer\node_modules\@testing-library\react\dist\pure.js:
:331:27)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\reac
ct-dom-client.development.js:23863:20)
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

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at 
 https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle invalid localStorage volume
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set muted state through audio manager
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set muted state through audio manager
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:160:24)  
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:278:40
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at 
 https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
 ✓ src/tests/game-state-sound-transitions.test.ts (7 tests) 337ms
   ✓ Game State Sound Transitions (7)
     ✓ Death sound transitions (2)
       ✓ should stop all sounds and play death sound when player hits bomb 116ms
       ✓ should stop all sounds and play death sound when running out of moves 104ms
     ✓ Victory sound transitions (2)
       ✓ should stop all sounds and play victory sound when player exits successfully 108ms    
       ✓ should not allow exit when diamonds remain 1ms
     ✓ Door slam sound for exit interaction (1)
       ✓ should play door slam sound when player successfully exits 2ms
     ✓ Sound stopping behavior (2)
       ✓ should not stop sounds during normal gameplay 2ms
       ✓ should filter out death/victory sounds from regular emission when game ends 2ms       
stdout | src/tests/audio-context.test.tsx > AudioContext > should prevent multiple simultaneous initializations
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-context.test.tsx > AudioContext > should prevent multiple simultaneous initializations
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and save to localStorage
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should clamp volume between 0 and 1
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully
 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at 
 https://react.dev/link/wrap-tests-with-act
Autoplay not allowed - user interaction will be required to play audio


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should clamp volume between 0 and 1
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should clamp volume between 0 and 1
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
                                                                                               
 ✓ src/tests/GameState-sound-integration.test.ts (9 tests) 338ms
   ✓ GameState Sound Integration (9)
     ✓ should emit walk sound when player moves to empty cell 6ms
     ✓ should emit dig sound when player moves to soil 1ms
     ✓ should emit collection sound when player collects diamond 1ms
     ✓ should emit death sound when player hits bomb 110ms
     ✓ should emit victory sounds when player exits with no diamonds 110ms
     ✓ should not emit sounds when movement is blocked 2ms
     ✓ should not emit sounds when game is not in playing state 1ms
     ✓ should emit death sound when running out of moves 102ms
     ✓ should not emit exit sounds when player cannot exit with diamonds remaining 1ms
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should reset to defaults
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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

ode (vitest 10)
 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should reset to defaults
HTML5 Audio preloaded 0/9 sounds

stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23ode (vitest 11)
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localStorage errors gracefully
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stderr | src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio manager not initialized for setMuted
An update to AudioProvider inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
 ❯ src/tests/audio-hooks.test.tsx (16 tests | 11 failed) 220ms
   ❯ Audio Hooks (16)
     ❯ useSound (7)
       × should provide playSound function that calls audio manager 58ms
       × should provide playSound function with options 21ms
       × should return muted state from audio manager 20ms
       × should toggle mute state 12ms
       ✓ should handle audio manager not initialized 10ms
       ✓ should show loading state during initialization 7ms
       × should handle playSound errors gracefully 11ms
     ❯ useAudioSettings (9)
       ✓ should return default volume from config 6ms
       × should load volume from localStorage 8ms
       ✓ should handle invalid localStorage volume 16ms
       × should set muted state through audio manager 7ms
       × should set volume and save to localStorage 10ms
       ✓ should clamp volume between 0 and 1 5ms
       × should reset to defaults 5ms
       × should handle localStorage errors gracefully 14ms
       × should handle audio manager not initialized for setMuted 8ms
stdout | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions d
during initialization
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
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
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
stdout | src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions during initialization
HTML5 Audio preloaded 0/9 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 0/21
 ❯ src/tests/audio-context.test.tsx 5/7
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 401ms
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 402ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 3 failed | 6 passed (21)
      Tests 38 failed | 148 passed (258)
   Start at 16:38:11
   Duration 3.15s
 ❯ src/tests/audio-context.test.tsx (7 tests | 5 failed) 256ms
   ❯ AudioContext (7)
     ✓ should provide audio context to children 88ms
     × should handle initialization errors 42ms
     × should call preloadSounds during initialization 32ms
     × should allow manual cleanup 32ms
     × should prevent multiple simultaneous initializations 28ms
     ✓ should throw error when useAudioContext is used outside provider 13ms
     × should handle non-Error exceptions during initialization 18ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 6/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 751ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 752ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 4 failed | 7 passed (21)
      Tests 39 failed | 163 passed (258)
   Start at 16:38:11
   Duration 3.50s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:53
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:156:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:192:55

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound sound2: TypeError: Cannot read properties of undefined (reading 'then')   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:53
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:15
56:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:192:55


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 6/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 751ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 752ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 4 failed | 7 passed (21)
      Tests 39 failed | 163 passed (258)
   Start at 16:38:11
   Duration 3.50s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Asset loading complete: 1/2 loaded, 1 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 6/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 751ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 752ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 4 failed | 7 passed (21)
      Tests 39 failed | 163 passed (258)
   Start at 16:38:11
   Duration 3.50s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:335:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit e
error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:335:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 6/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 751ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 752ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 4 failed | 7 passed (21)
      Tests 39 failed | 163 passed (258)
   Start at 16:38:11
   Duration 3.50s
 ✓ src/tests/audio/asset-loader.test.ts (16 tests) 699ms
   ✓ AssetLoader (16)
     ✓ constructor (2)
       ✓ should initialize with default options 5ms
       ✓ should accept custom options 1ms
     ✓ loadAudioBuffer (7)
       ✓ should successfully load audio buffer from first source 5ms
       ✓ should fallback to second source if first fails 14ms
       ✓ should retry failed requests 115ms
       ✓ should throw error if all sources fail 217ms
       ✓ should handle HTTP errors 3ms
       ✓ should handle audio decoding errors 2ms
       ✓ should respect timeout 106ms
     ✓ loadAssets (2)
       ✓ should load all preload assets 2ms
       ✓ should handle partial failures 117ms
     ✓ progress tracking (2)
       ✓ should emit progress events 1ms
       ✓ should emit error events on failure 105ms
     ✓ format optimization (2)
       ✓ should prefer supported formats 2ms
       ✓ should filter unsupported formats 1ms
     ✓ cleanup (1)
       ✓ should clear all state and callbacks 0ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 6/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 751ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 752ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 4 failed | 7 passed (21)
      Tests 39 failed | 163 passed (258)
   Start at 16:38:11
   Duration 3.50s
ode (vitest 4)stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Retry 2/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Retry 2/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/app-sound-integration.test.tsx 9/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 966ms
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 967ms
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/sound-event-integration.test.ts 37/37

 Test Files 4 failed | 7 passed (21)
      Tests 39 failed | 166 passed (258)
   Start at 16:38:11
   Duration 3.71s






 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 12/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.19s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.19s

 Test Files 4 failed | 7 passed (21)
      Tests 39 failed | 169 passed (258)
   Start at 16:38:11
   Duration 3.93s





 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 13/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.40s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.40s
 ❯ src/tests/LargerMazeGameState.test.ts [queued]

 Test Files 4 failed | 7 passed (21)
      Tests 39 failed | 170 passed (258)
   Start at 16:38:11
   Duration 4.15s
(node:15128) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:27596) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:9460) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:39108) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:6160) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 13/21
   └── should not block user input during sound playback 388ms
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.60s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.60s
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeGameState.test.ts 0/9
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/physics-integration-demo.test.ts [queued]

 Test Files 4 failed | 7 passed (21)
      Tests 39 failed | 170 passed (267)
   Start at 16:38:11
   Duration 4.35s
 ✓ src/tests/LargerMazeGameState.test.ts (9 tests) 13ms
   ✓ Larger Maze Game State Management - Functional Implementation (9)
     ✓ Diamond counting and collection (2)
       ✓ should correctly count diamonds in larger maze 4ms
       ✓ should prevent exit when diamonds remain in larger maze 1ms
     ✓ Win and lose conditions (2)
       ✓ should handle win condition correctly in larger maze 1ms
       ✓ should handle lose condition when running out of moves 1ms
     ✓ Multiple diamond collection scenarios (1)
       ✓ should handle multiple diamonds collection across larger maze 1ms
     ✓ Bomb interactions (1)
       ✓ should handle bomb interactions correctly in larger maze 1ms
     ✓ Move counting and game mechanics (2)
       ✓ should handle move counting correctly in larger maze 1ms
       ✓ should maintain maze integrity during multiple operations 1ms
     ✓ Factory function integration (1)
       ✓ should work correctly with createGameState factory for larger mazes 1ms
 ✓ src/tests/LargerMazeUI.test.ts (12 tests) 11ms
   ✓ Larger Maze UI Adaptation - Functional Implementation (12)
     ✓ Maze dimension validation (2)
       ✓ should have correct larger maze dimensions 2ms
       ✓ should maintain consistent row lengths 1ms
     ✓ Maze structure validation (3)
       ✓ should have proper rock border around the maze 1ms
       ✓ should have required game elements 1ms
       ✓ should have appropriate maze composition for larger size 1ms
     ✓ Icon mapping validation (2)
       ✓ should have icons defined for all cell types 1ms
       ✓ should have unique icons for different cell types 0ms
     ✓ Game state integration with larger maze (2)
       ✓ should create valid initial game state with larger maze 2ms
       ✓ should correctly count diamonds in larger maze 0ms
     ✓ Maze accessibility and playability (3)
       ✓ should have sufficient empty spaces for movement 0ms
       ✓ should have balanced distribution of obstacles 0ms
       ✓ should have appropriate challenge elements for larger maze 0ms
stdout | src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonst
trate boulder falling with sound events
Initial maze state:
Boulder at position (3,1), should fall to (3,2) then hit rock at (3,3)
After physics simulation:
Sound events generated: 1
Boulder successfully fell from (3,1) to (3,2) with sound event

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonst
trate boulder collision with sound events
Boulder collision test:
Boulder at (1,1) surrounded by rocks - should not move
Boulder correctly stayed in place - no movement sounds generated

 ✓ src/tests/GameState.test.ts (10 tests) 13ms
   ✓ GameState - Functional Implementation (10)
     ✓ movePlayer function (7)
       ✓ should collect diamond and update state correctly 4ms
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
 ✓ src/tests/LargerMaze.test.ts (8 tests) 11ms
   ✓ Larger Maze Tests - Functional Implementation (8)
     ✓ Player movement in larger maze (2)
       ✓ should allow player to move in all directions 5ms
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
stdout | src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonst
trate game integration with physics and sound
Game integration test:
Player moves right, boulder at (2,2) should fall to (2,3)
Player moved successfully and boulder physics was applied
Final player position: { x: 2, y: 1 }
Boulder moved from (2,2) to (2,3)

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonst
trate multiple boulder physics
Multiple boulder physics test:
Two boulders at (1,1) and (3,1) should both fall
Both boulders fell successfully with sound events
Generated 2 movement sound events

 ✓ src/tests/physics-integration-demo.test.ts (4 tests) 16ms
   ✓ Physics Integration Demo (4)
     ✓ should demonstrate boulder falling with sound events 8ms
     ✓ should demonstrate boulder collision with sound events 2ms
     ✓ should demonstrate game integration with physics and sound 3ms
     ✓ should demonstrate multiple boulder physics 1ms

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 14/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.70s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.70s
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]

 Test Files 4 failed | 12 passed (21)
      Tests 39 failed | 214 passed (301)
   Start at 16:38:11
   Duration 4.45s
(node:61684) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > should continue working when sound playback fails
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:16)ode (vitest 14)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 16/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 1.81s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 1.81s
 ❯ src/tests/sound-system-infrastructure.test.ts [queued]

 Test Files 4 failed | 12 passed (21)
      Tests 39 failed | 216 passed (301)
   Start at 16:38:11
   Duration 4.55s
ode (vitest 7)ode (vitest 15)stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Load error for PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Load error for PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Load error for PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Load error for PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Load error for BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Load error for BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Load error for ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Load error for ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Load error for COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Load error for COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Load error for DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Load error for DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Load error for VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Load error for VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite(file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Load error for DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Load error for DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Failed to load DIAMOND_COLLECT from sounds/environment/door-slam.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Failed to load DIAMOND_COLLECT from sounds/environment/door-slam.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should handle loading failures gracefully
Load error for DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:161:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle prel
load errors gracefully
Load error for DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 20/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.02s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 2.02s

 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                          
Preloaded 0 sounds                                                                             
                                                                                               
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                                                          
Preloaded 0 sounds                                                                             
                                                                                               
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode                            
Web Audio API initialized successfully                                                         
                                                                                               
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should play sound 
 with default options
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > enhanced preloading > should skip preloading in fallback mode
Preloaded 9 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should play sound 
 with custom options
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should not play so
ound when muted
Web Audio API initialized successfully

 ✓ src/tests/sound-system-infrastructure.test.ts (5 tests) 11ms
   ✓ Sound System Infrastructure (5)
     ✓ Sound Configuration (4)
       ✓ should have all required sound assets defined 3ms
       ✓ should have proper sound asset structure 1ms
       ✓ should have sound configuration with categories 1ms
       ✓ should have sound ID constants 0ms
     ✓ Audio Utilities (1)
       ✓ should detect browser audio support 5ms
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle miss
sing sound buffer gracefully
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 20/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.02s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 2.02s

 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle missing sound buffer gracefully                                                                    
Sound buffer not found for nonexistent_sound                                                   
                                                                                               
                                                                                               
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]                            
 ❯ src/tests/app-sound-integration.test.tsx 20/21                                              
 ❯ src/tests/audio-manager.test.ts 5/27                                                        
   └── should handle preload errors gracefully 2.02s                                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                                         
   └── should handle loading failures gracefully 2.02s                                         
                                                                                               
 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report                              
Web Audio API initialized successfully                                                         
                                                                                               
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report                              
Preloaded 9 sounds                                                                             
                                                                                               
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should cleanup resources properly                                                                                
Web Audio API initialized successfully                                                         
                                                                                               
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > optimization reporting > should handle empty buffer set
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 20/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.02s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 2.02s

 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle audio context creation failure                                                                     
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed               
    at new global.AudioContext (D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:294:27)
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:79:39)                                                                             
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:62:14) 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:298:29                          
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)                                                               
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 20/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.02s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 2.02s

 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > loading state management > should track loading state correctly                          
Web Audio API initialized successfully                                                         
                                                                                               
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > loading state management > should track loading state correctly                          
Preloaded 9 sounds                                                                             
                                                                                               
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads                                               
Web Audio API initialized successfully                                                         
                                                                                               

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 20/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.02s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 2.02s

 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Retry 1/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:219:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should preload s
sounds using HTML5 Audio
Failed to preload PLAYER_WALK: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload PLAYER_DIG: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload BOULDER_MOVE: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload ARROW_MOVE: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload COLLISION_THUD: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload DEATH_SOUND: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload VICTORY_SOUND: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload DOOR_SLAM: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload DIAMOND_COLLECT: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:343:27
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 20/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.02s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 2.02s

 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stdout | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should preload sounds using HTML5 Audio                                                                        
HTML5 Audio preloaded 0 sounds                                                                 
                                                                                               
                                                                                               
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]                            
 ❯ src/tests/app-sound-integration.test.tsx 20/21                                              
 ❯ src/tests/audio-manager.test.ts 5/27                                                        
   └── should handle preload errors gracefully 2.02s                                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                                         
   └── should handle loading failures gracefully 2.02s                                         
                                                                                               
 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stderr | src/tests/audio-manager.test.ts > Audio Manager > HTML5AudioManager > should play sound with HTML5 Audio                                                                             
Sound asset not found for ID: test_sound                                                       
                                                                                               
stderr | src/tests/audio-manager.test.ts > Audio Manager > SilentAudioManager > should initialize in silent mode                                                                              
No audio support detected, using silent mode                                                   
                                                                                               
stderr | src/tests/audio-manager.test.ts > Audio Manager > SilentAudioManager > should handle all operations silently                                                                         
No audio support detected, using silent mode                                                   
                                                                                               

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 20/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.02s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 2.02s

 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stdout | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create WebAudioManager when Web Audio API is supported                                         
Web Audio API initialized successfully                                                         
                                                                                               
                                                                                               
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]                            
 ❯ src/tests/app-sound-integration.test.tsx 20/21                                              
 ❯ src/tests/audio-manager.test.ts 5/27                                                        
   └── should handle preload errors gracefully 2.02s                                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                                         
   └── should handle loading failures gracefully 2.02s                                         
                                                                                               
 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is supported                                    
Web Audio API not supported, using HTML5 Audio fallback                                        
                                                                                               
stderr | src/tests/audio-manager.test.ts > Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support is available                                   
No audio support detected, using silent mode                                                   
No audio support detected, using silent mode                                                   
                                                                                               
                                                                                               
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]                            
 ❯ src/tests/app-sound-integration.test.tsx 20/21                                              
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.02s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 2.02s

 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                                                      
Web Audio API initialized successfully                                                         
                                                                                               
                                                                                               
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]                            
 ❯ src/tests/app-sound-integration.test.tsx 20/21                                              
 ❯ src/tests/audio-manager.test.ts 5/27                                                        
   └── should handle preload errors gracefully 2.02s                                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                                         
   └── should handle loading failures gracefully 2.02s                                         
                                                                                               
 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                                                      
Retry 1/3 for sounds/player/walk.mp3: Error: Network error                                     
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41                          
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)                                                               
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                                                               
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                                                      
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > sh
hould handle audio reset errors gracefully
Failed to reset audio system: Error: Reset failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:559:52
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/app-sound-integration.test.tsx 20/21
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.02s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 2.02s

 Test Files 4 failed | 13 passed (21)
      Tests 39 failed | 225 passed (306)
   Start at 16:38:11
   Duration 4.76s
ode (vitest 6)ode (vitest 8) ✓ src/tests/app-sound-integration.test.tsx (21 tests) 1834ms
   ✓ App Sound Integration (21)
     ✓ Sound System Initialization (3)
       ✓ should initialize audio system on app startup 110ms
       ✓ should not block game rendering during audio initialization 71ms
       ✓ should handle audio initialization errors gracefully 61ms
     ✓ Keyboard Controls Integration (4)
       ✓ should handle game movement keys without interfering with audio 122ms
       ✓ should handle mute keyboard shortcut (Ctrl+M) 64ms
       ✓ should handle mute keyboard shortcut (Cmd+M) on Mac 46ms
       ✓ should not trigger mute on M key without modifiers 45ms
     ✓ Game Event Sound Integration (3)
       ✓ should emit sounds for player movement 106ms
       ✓ should stop all sounds when game ends 93ms
       ✓ should not emit sounds when game is over 61ms
     ✓ Audio Controls Integration (3)
       ✓ should toggle mute via button click 46ms
       ✓ should open audio settings dialog 95ms
       ✓ should display audio error messages when available 63ms
     ✓ Performance and Responsiveness (3)
       ✓ should not block user input during sound playback  354ms
       ✓ should handle multiple simultaneous sound events 149ms
       ✓ should maintain game state consistency during audio operations 103ms
     ✓ Error Recovery (5)
       ✓ should continue working when sound playback fails 87ms
       ✓ should handle audio context suspension gracefully 56ms
       ✓ should show fallback mode indicator when in fallback 31ms
       ✓ should show reset audio button when there are playback errors 44ms
       ✓ should handle audio reset errors gracefully 24ms

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.24s
      └── afterEach
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
   └── should handle loading failures gracefully 2.24s
      └── afterEach

 Test Files 4 failed | 14 passed (21)
      Tests 39 failed | 226 passed (306)
   Start at 16:38:11
   Duration 4.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.88s
      └── afterEach
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 4 failed | 14 passed (21)
      Tests 40 failed | 226 passed (306)
   Start at 16:38:11
   Duration 5.62s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.99s
      └── afterEach
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 4 failed | 14 passed (21)
      Tests 41 failed | 230 passed (306)
   Start at 16:38:11
   Duration 5.73s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                             
Retry 1/3 for sounds/player/walk.mp3: Error: Invalid audio                                     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)                                                               
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                                                               
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/player/death.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
Retry 1/3 for sounds/environment/door-slam.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Retry 2/3 for sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Retry 2/3 for sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Retry 2/3 for sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Retry 2/3 for sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 2.99s
      └── afterEach
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 4 failed | 14 passed (21)
      Tests 41 failed | 230 passed (306)
   Start at 16:38:11
   Duration 5.73s

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 5/27
   └── should handle preload errors gracefully 3.20s
      └── afterEach
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 4 failed | 14 passed (21)
      Tests 41 failed | 230 passed (306)
   Start at 16:38:11
   Duration 5.95s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Retry 2/3 for sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Retry 2/3 for sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Retry 2/3 for sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Retry 2/3 for sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Retry 2/3 for sounds/player/death.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Retry 2/3 for sounds/environment/door-slam.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Load error for PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Load error for PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Load error for BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Load error for ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Load error for COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Load error for DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Load error for VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Load error for DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Failed to load DIAMOND_COLLECT from sounds/environment/door-slam.mp3: Error: Network error     
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch
h errors during preloading
Load error for DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:435:41
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 6/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
   └── should handle decode errors 864ms

 Test Files 4 failed | 14 passed (21)
      Tests 41 failed | 231 passed (306)
   Start at 16:38:11
   Duration 6.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle fetch errors during preloading                                                                      
Preloaded 0 sounds                                                                             
                                                                                               
                                                                                               
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]                            
 ❯ src/tests/audio-manager.test.ts 6/27                                                        
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23                                        
   └── should handle decode errors 864ms                                                       
                                                                                               
 Test Files 4 failed | 14 passed (21)
      Tests 41 failed | 231 passed (306)
   Start at 16:38:11
   Duration 6.70s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
   └── should handle decode errors 1.19s

 Test Files 4 failed | 14 passed (21)
      Tests 42 failed | 248 passed (306)
   Start at 16:38:11
   Duration 7.02s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                                                       
Retry 1/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                       
Retry 1/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                       
Retry 1/3 for sounds/boulder/Whoosh.mp3: Error: HTTP 404: Not Found                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                       
Retry 1/3 for sounds/arrow/twang.mp3: Error: HTTP 404: Not Found                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                       
Retry 1/3 for sounds/arrow/thud.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/player/death.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
Retry 1/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
   └── should handle decode errors 1.19s

 Test Files 4 failed | 14 passed (21)
      Tests 42 failed | 248 passed (306)
   Start at 16:38:11
   Duration 7.02s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
Audio context suspended for 5 seconds. Click anywhere to enable audio.


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 933ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 248 passed (306)
   Start at 16:38:11
   Duration 7.79s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                             
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: Invalid audio                   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)                                                               
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                                                               
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Load error for PLAYER_WALK: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Load error for PLAYER_DIG: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Load error for BOULDER_MOVE: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Load error for ARROW_MOVE: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Load error for COLLISION_THUD: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Load error for DEATH_SOUND: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error: Invalid audio       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Load error for VICTORY_SOUND: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Load error for DOOR_SLAM: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Failed to load DIAMOND_COLLECT from sounds/environment/door-slam.mp3: Error: Invalid audio     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioMana
ager > error recovery > should handle decode errors
Load error for DIAMOND_COLLECT: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:233:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 933ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 248 passed (306)
   Start at 16:38:11
   Duration 7.79s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors                                             
Preloaded 0 sounds                                                                             
                                                                                               
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                            
Web Audio API initialized successfully                                                         
                                                                                               
                                                                                               
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]                            
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 933ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 248 passed (306)
   Start at 16:38:11
   Duration 7.79s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats                                            
Retry 1/3 for sounds/player/walk.mp3: Error: 404                                               
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:246:44           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)                                                               
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                                                               
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Retry 2/3 for sounds/player/walk.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Retry 2/3 for sounds/player/dig.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Retry 2/3 for sounds/boulder/Whoosh.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Retry 2/3 for sounds/arrow/twang.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Retry 2/3 for sounds/arrow/thud.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Retry 2/3 for sounds/player/death.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Retry 2/3 for sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 933ms
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 248 passed (306)
   Start at 16:38:11
   Duration 7.79s

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.15s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 248 passed (306)
   Start at 16:38:11
   Duration 8.00s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.91s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should preload sounds with format filtering      
Failed to preload PLAYER_WALK: TypeError: audio.load is not a function                         
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27                      
    at new Promise (<anonymous>)                                                               
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23                      
    at Array.map (<anonymous>)                                                                 
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:953:59)                                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:305:31           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload PLAYER_DIG: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload BOULDER_MOVE: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload ARROW_MOVE: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload COLLISION_THUD: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload DEATH_SOUND: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload VICTORY_SOUND: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload DOOR_SLAM: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
Failed to preload DIAMOND_COLLECT: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:971:27
    at new Promise (<anonymous>)
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:967:23
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:305:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.91s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should preload sounds with format filtering      
HTML5 Audio preloaded 0 sounds                                                                 
                                                                                               
                                                                                               
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]                            
 ❯ src/tests/audio-manager.test.ts 24/27                                                       
   └── should handle HTTP errors during preloading 1.91s                                       
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23                                        
                                                                                               
 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                
Failed to preload PLAYER_WALK: Error: No supported format found for PLAYER_WALK                
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:27                      
    at Array.map (<anonymous>)                                                                 
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:953:59)                                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:320:31           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
Failed to preload PLAYER_DIG: Error: No supported format found for PLAYER_DIG
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
Failed to preload BOULDER_MOVE: Error: No supported format found for BOULDER_MOVE
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
Failed to preload ARROW_MOVE: Error: No supported format found for ARROW_MOVE
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
Failed to preload COLLISION_THUD: Error: No supported format found for COLLISION_THUD
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
Failed to preload DEATH_SOUND: Error: No supported format found for DEATH_SOUND
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
Failed to preload VICTORY_SOUND: Error: No supported format found for VICTORY_SOUND
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
Failed to preload DOOR_SLAM: Error: No supported format found for DOOR_SLAM
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
Failed to preload DIAMOND_COLLECT: Error: No supported format found for DIAMOND_COLLECT        
    at D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:964:27
    at Array.map (<anonymous>)
    at HTML5AudioManager.preloadSounds (D:\FizzBash\TheWanderer\src\audio\managers\audio-manage
er.ts:953:59)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:320:31
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.91s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                
HTML5 Audio preloaded 0 sounds                                                                 
                                                                                               
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > loading state > should provide optimization report                                     
HTML5AudioManager report: {                                                                    
  "totalSounds": 0,                                                                            
  "loadedSounds": 0,                                                                           
  "failedSounds": 0,                                                                           
  "globalRecommendations": [
    "Consider using Web Audio API for better performance",
    "HTML5 Audio has limited optimization capabilities"
  ]
}

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioM
Manager factory > should create WebAudioManager when Web Audio API is available
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.91s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is available            
Web Audio API not supported, using HTML5 Audio fallback                                        
                                                                                               
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support                        
No audio support detected, using silent mode                                                   
No audio support detected, using silent mode                                                   
                                                                                               
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading
Failed to load PLAYER_WALK from sounds/player/walk.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Load error for PLAYER_WALK: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Failed to load PLAYER_DIG from sounds/player/dig.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Load error for PLAYER_DIG: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.91s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality                 
Web Audio API initialized successfully                                                         
                                                                                               
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality                 
Preloaded 9 sounds                                                                             
                                                                                               
                                                                                               
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]                            
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.91s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                                                       
Failed to load BOULDER_MOVE from sounds/boulder/Whoosh.mp3: Error: HTTP 404: Not Found         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                       
    at runNextTicks (node:internal/process/task_queues:65:5)                                   
    at listOnTimeout (node:internal/timers:555:9)                                              
    at processTimers (node:internal/timers:529:7)                                              
                                                                                               
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                                                       
Load error for BOULDER_MOVE: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Failed to load ARROW_MOVE from sounds/arrow/twang.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Load error for ARROW_MOVE: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Failed to load COLLISION_THUD from sounds/arrow/thud.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Load error for COLLISION_THUD: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Failed to load DEATH_SOUND from sounds/player/death.mp3: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Load error for DEATH_SOUND: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.91s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing mute functionality                      
Web Audio API initialized successfully                                                         
                                                                                               
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing mute functionality                      
Preloaded 9 sounds                                                                             
                                                                                               
                                                                                               
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]                            
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.91s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                                                       
Failed to load VICTORY_SOUND from sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31                       
    at runNextTicks (node:internal/process/task_queues:65:5)                                   
    at listOnTimeout (node:internal/timers:555:9)                                              
    at processTimers (node:internal/timers:529:7)                                              
                                                                                               
stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                                                       
Load error for VICTORY_SOUND: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Failed to load DOOR_SLAM from sounds/environment/door-slam.mp3: Error: HTTP 404: Not Found     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Load error for DOOR_SLAM: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Failed to load DIAMOND_COLLECT from sounds/environment/door-slam.mp3: Error: HTTP 404: Not Foun
nd
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31

stderr | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP 
 errors during preloading
Load error for DIAMOND_COLLECT: Error: HTTP 404: Not Found
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:168:31


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.91s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing cleanup functionality                   
Web Audio API initialized successfully                                                         
                                                                                               
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle HTTP errors during preloading                                                                       
Preloaded 0 sounds                                                                             
                                                                                               
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing cleanup functionality                   
Preloaded 9 sounds


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 24/27
   └── should handle HTTP errors during preloading 1.91s
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 12/23

 Test Files 4 failed | 14 passed (21)
      Tests 43 failed | 249 passed (306)
   Start at 16:38:11
   Duration 8.76s
ode (vitest 2) ❯ src/tests/audio/enhanced-audio-manager.test.ts (23 tests | 5 failed) 6155ms
   ❯ Enhanced Audio Manager (23)
     ❯ WebAudioManager (12)
       ✓ initialization (2)
X✓ should initialize with Web Audio API support 8ms
X✓ should handle audio context suspension 3ms
       ❯ enhanced preloading (4)
         × should preload sounds with progress tracking 15ms
         × should apply optimization during preloading 8ms
         × should handle loading failures gracefully 2030ms
         × should skip preloading in fallback mode 7ms
       ✓ optimization reporting (2)
✓ should provide optimization report 5ms
✓ should handle empty buffer set 3ms
       ✓ loading state management (1)
✓ should track loading state correctly 4ms
       ❯ error recovery (2)
✓ should retry failed loads  1014ms
         × should handle decode errors 2030ms
       ✓ format fallback (1)
✓ should try multiple formats  1008ms
     ✓ HTML5AudioManager (5)
       ✓ initialization (1)
✓ should initialize with HTML5 Audio support 1ms
       ✓ preloading with format optimization (2)
✓ should preload sounds with format filtering 6ms
✓ should handle unsupported formats 4ms
       ✓ loading state (2)
✓ should provide loading state 1ms
✓ should provide optimization report 1ms
     ✓ createAudioManager factory (3)
       ✓ should create WebAudioManager when Web Audio API is available 1ms
       ✓ should create HTML5AudioManager when only HTML5 Audio is available 1ms
       ✓ should create SilentAudioManager when no audio support 1ms
     ✓ integration with existing functionality (3)
       ✓ should maintain existing playSound functionality 2ms
       ✓ should maintain existing mute functionality 1ms
       ✓ should maintain existing cleanup functionality 1ms

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 25/27

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 261 passed (306)
   Start at 16:38:11
   Duration 8.97s

 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 25/27
   └── should handle audio decoding errors 1.17s

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 261 passed (306)
   Start at 16:38:11
   Duration 10.05s
stdout | src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle playback errors gracefully
Web Audio API initialized successfully


 ❯ src/audio/__tests__/audio-settings-integration.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 26/27

 Test Files 5 failed | 14 passed (21)
      Tests 43 failed | 262 passed (306)
   Start at 16:38:11
   Duration 10.80s
 ❯ src/tests/audio-manager.test.ts (27 tests | 3 failed) 8182ms
   ❯ Audio Manager (27)
     ❯ WebAudioManager (12)
       ✓ should initialize with Web Audio API support 7ms
       × should handle muted state correctly 21ms
       ✓ should load muted preference from localStorage 2ms
       ✓ should handle localStorage errors gracefully 1ms
       ✓ should preload sounds successfully 5ms
       ✓ should handle preload errors gracefully  2027ms
       ✓ should play sound with default options 3ms
       ✓ should play sound with custom options 2ms
       ✓ should not play sound when muted 2ms
       ✓ should handle missing sound buffer gracefully 2ms
       ✓ should cleanup resources properly 2ms
       × should handle audio context creation failure 7ms
     ✓ HTML5AudioManager (6)
       ✓ should initialize with HTML5 Audio support 1ms
       ✓ should handle muted state correctly 1ms
       ✓ should preload sounds using HTML5 Audio 9ms
       ✓ should play sound with HTML5 Audio 1ms
       ✓ should not play sound when muted 0ms
       ✓ should cleanup audio elements 0ms
     ✓ SilentAudioManager (2)
       ✓ should initialize in silent mode 0ms
       ✓ should handle all operations silently 1ms
     ✓ createAudioManager factory (3)
       ✓ should create WebAudioManager when Web Audio API is supported 1ms
       ✓ should create HTML5AudioManager when only HTML5 Audio is supported 0ms
       ✓ should create SilentAudioManager when no audio support is available 0ms
     ❯ Error Handling (4)
       ✓ should handle fetch errors during preloading  2031ms
       ✓ should handle HTTP errors during preloading  2027ms
       ✓ should handle audio decoding errors  2022ms
       × should handle playback errors gracefully 2ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Suites 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/audio/__tests__/audio-settings-integration.test.tsx [ src/audio/__tests__/audio-sett
tings-integration.test.tsx ]
ReferenceError: jest is not defined
 ❯ src/audio/__tests__/audio-settings-integration.test.tsx:30:17

     28| // Mock Web Audio API
     29| const mockAudioContext = {
     30|     createGain: jest.fn(() => ({
       |X^
     31|Xconnect: jest.fn(),
     32|Xgain: {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/45]⎯


⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 44 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors   
AssertionError: expected 'true' to be 'false' // Object.is equality

Expected: "false"
Received: "true"

 ❯ src/tests/audio-context.test.tsx:82:63
     80|X});
     81|
     82|Xexpect(screen.getByTestId('initialized').textContent).toBe('false');
       |X^
     83|Xexpect(screen.getByTestId('manager-available').textContent).toBe('false');    
     84|Xexpect(screen.getByTestId('error').textContent).toBe('Initialization failed');

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/45]⎯

 FAIL  src/tests/audio-context.test.tsx > AudioContext > should call preloadSounds during initi
ialization
AssertionError: expected "spy" to be called 1 times, but got 0 times
 ❯ src/tests/audio-context.test.tsx:98:48
     96|X});
     97|
     98|Xexpect(mockAudioManager.preloadSounds).toHaveBeenCalledTimes(1);
       |X^
     99|     });
    100|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/45]⎯

 FAIL  src/tests/audio-context.test.tsx > AudioContext > should allow manual cleanup
AssertionError: expected "spy" to be called 1 times, but got 0 times
 ❯ src/tests/audio-context.test.tsx:124:42
    122|
    123|Xexpect(screen.getByTestId('manager-available').textContent).toBe('false');    
    124|Xexpect(mockAudioManager.cleanup).toHaveBeenCalledTimes(1);
       |X^
    125|     });
    126|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/45]⎯

 FAIL  src/tests/audio-context.test.tsx > AudioContext > should prevent multiple simultaneous i
initializations
AssertionError: expected "spy" to be called 1 times, but got 0 times
 ❯ src/tests/audio-context.test.tsx:143:48
    141|
    142|         // Should not call preloadSounds again
    143|Xexpect(mockAudioManager.preloadSounds).toHaveBeenCalledTimes(1);
       |X^
    144|     });
    145|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/45]⎯

 FAIL  src/tests/audio-context.test.tsx > AudioContext > should handle non-Error exceptions dur
ring initialization
AssertionError: expected 'null' to be 'Failed to initialize audio' // Object.is equality       

Expected: "Failed to initialize audio"
Received: "null"

 ❯ src/tests/audio-context.test.tsx:170:57
    168|X});
    169|
    170|Xexpect(screen.getByTestId('error').textContent).toBe('Failed to initialize au…
       |X^
    171|     });
    172| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound funct
tion that calls audio manager
AssertionError: expected "spy" to be called with arguments: [ 'test-sound', undefined ]        

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:63:48
     61|X});
     62|
     63|Xexpect(mockAudioManager.playSound).toHaveBeenCalledWith('test-sound', und…
       |X^
     64|X});
     65|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should provide playSound funct
tion with options
AssertionError: expected "spy" to be called with arguments: [ 'test-sound', …(1) ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:82:48
     80|X});
     81|
     82|Xexpect(mockAudioManager.playSound).toHaveBeenCalledWith('test-sound', opt…
       |X^
     83|X});
     84|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should return muted state from
m audio manager

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

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should toggle mute state      
AssertionError: expected "spy" to be called with arguments: [ true ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:116:47
    114|X});
    115|
    116|Xexpect(mockAudioManager.setMuted).toHaveBeenCalledWith(true);
       |X^
    117|X});
    118|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[10/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useSound > should handle playSound errors
s gracefully
AssertionError: expected "error" to be called with arguments: [ …(2) ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:165:32
    163|X});
    164|
    165|Xexpect(consoleSpy).toHaveBeenCalledWith('Failed to play sound test-sound:…
       |X^
    166|XconsoleSpy.mockRestore();
    167|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[11/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should load volume fro
om localStorage
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

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[12/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set muted state
e through audio manager
AssertionError: expected "spy" to be called with arguments: [ true ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:213:47
    211|X});
    212|
    213|Xexpect(mockAudioManager.setMuted).toHaveBeenCalledWith(true);
       |X^
    214|X});
    215|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[13/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should set volume and 
 save to localStorage
AssertionError: expected "spy" to be called with arguments: [ 'audio-volume', '0.7' ]

Received:

  1st spy call:

  [
-   "audio-volume",
-   "0.7",
+   "wanderer-audio-settings",
+   "{\"isMuted\":false,\"globalVolume\":0.8,\"categoryVolumes\":{\"movement\":0.8,\"collision\
\":0.9,\"gameState\":1}}",
  ]

  2nd spy call:

  [
-   "audio-volume",
-   "0.7",
+   "wanderer-audio-settings",
+   "{\"isMuted\":false,\"globalVolume\":0.7,\"categoryVolumes\":{\"movement\":0.8,\"collision\
\":0.9,\"gameState\":1}}",
  ]


Number of calls: 2

 ❯ src/tests/audio-hooks.test.tsx:226:46
    224|
    225|Xexpect(result.current.volume).toBe(0.7);
    226|Xexpect(mockLocalStorage.setItem).toHaveBeenCalledWith('audio-volume', '0.…
       |X^
    227|X});
    228|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[14/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should reset to defaul
lts
AssertionError: expected "spy" to be called with arguments: [ false ]

Number of calls: 0

 ❯ src/tests/audio-hooks.test.tsx:262:47
    260|
    261|Xexpect(result.current.volume).toBe(0.8);
    262|Xexpect(mockAudioManager.setMuted).toHaveBeenCalledWith(false);
       |X^
    263|Xexpect(mockLocalStorage.removeItem).toHaveBeenCalledWith('audio-volume'); 
    264|Xexpect(mockLocalStorage.removeItem).toHaveBeenCalledWith('audio-muted');  

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[15/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle localSto
orage errors gracefully
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
    282|Xexpect(consoleSpy).toHaveBeenCalledWith('Failed to save volume preference…
       |X^
    283|XconsoleSpy.mockRestore();
    284|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[16/45]⎯

 FAIL  src/tests/audio-hooks.test.tsx > Audio Hooks > useAudioSettings > should handle audio ma
anager not initialized for setMuted
AssertionError: expected "warn" to be called with arguments: [ 'Audio manager not initialized' 
 ]

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
    300|Xexpect(consoleSpy).toHaveBeenCalledWith('Audio manager not initialized'); 
       |X^
    301|XconsoleSpy.mockRestore();
    302|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[17/45]⎯

 FAIL  src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle muted 
 state correctly
AssertionError: expected "spy" to be called with arguments: [ 'audio-muted', 'true' ]

Received:

  1st spy call:

  [
-   "audio-muted",
+   "wanderer-audio-muted",
    "true",
  ]


Number of calls: 1

 ❯ src/tests/audio-manager.test.ts:181:46
    179|Xmanager.setMuted(true);
    180|Xexpect(manager.isMuted()).toBe(true);
    181|Xexpect(mockLocalStorage.setItem).toHaveBeenCalledWith('audio-muted', 'tru…
       |X^
    182|
    183|Xmanager.setMuted(false);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[18/45]⎯

 FAIL  src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle audio 
 context creation failure
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

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[19/45]⎯

 FAIL  src/tests/audio-manager.test.ts > Audio Manager > Error Handling > should handle playbac
ck errors gracefully
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
    513|Xexpect(consoleErrorSpy).toHaveBeenCalledWith('Failed to create audio sour…
       |X^
    514|
    515|             // Restore console.error

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[20/45]⎯

 FAIL  src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > 
 Audio Manager Factory > should create WebAudioManager when Web Audio API is supported
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

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[21/45]⎯

 FAIL  src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > 
 SilentAudioManager > should implement all AudioManager methods without errors
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/audio/__tests__/audio-error-handling.test.ts:153:39
    151|Xexpect(() => manager.playSound('test')).not.toThrow();
    152|Xexpect(() => manager.setMuted(true)).not.toThrow();
    153|Xexpect(manager.isMuted()).toBe(false);
       |X^
    154|Xexpect(manager.isSupported()).toBe(false);
    155|Xexpect(() => manager.stopAllSounds()).not.toThrow();

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[22/45]⎯

 FAIL  src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > 
 Error Recovery > should handle errors during audio context creation
AssertionError: expected WebAudioManager{} to be an instance of SilentAudioManager
 ❯ src/audio/__tests__/audio-error-handling.test.ts:211:29
    209|
    210|             // Should fall back to silent mode
    211|Xexpect(manager).toBeInstanceOf(SilentAudioManager);
       |X^
    212|Xexpect(console.error).toHaveBeenCalled();
    213|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[23/45]⎯

 FAIL  src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > 
 Error Recovery > should handle errors during sound playback
AssertionError: expected "playSound" to be called with arguments: [ 'test', undefined ]        

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
    224|Xexpect(playSoundSpy).toHaveBeenCalledWith('test', undefined);
       |X^
    225|Xexpect(() => manager.playSound('test')).not.toThrow();
    226|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[24/45]⎯

 FAIL  src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > 
 Autoplay Policy Handling > should detect autoplay restrictions
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
    284|             // Event listeners should be added for user interaction

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[25/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Web Au
udio API Unavailable > should handle AudioContext creation failure
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
    137|Xexpect.stringContaining('Audio context error'),

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[26/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Audio 
 Context Suspension Handling > should handle suspended audio context due to autoplay policies   
AssertionError: expected "spy" to be called at least once
 ❯ src/audio/__tests__/error-handling.test.ts:160:45
    158|
    159|             // Should attempt to resume the context
    160|Xexpect(suspendedContext.resume).toHaveBeenCalled();
       |X^
    161|X});
    162|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[27/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Audio 
 Context Suspension Handling > should handle audio context resume failure
AssertionError: expected "warn" to be called with arguments: [ StringContaining{…}, Any<Error> 
 ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:179:34
    177|
    178|             // Should handle resume failure gracefully
    179|Xexpect(console.warn).toHaveBeenCalledWith(
       |X^
    180|Xexpect.stringContaining('Failed to resume'),
    181|Xexpect.any(Error)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[28/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Sound 
 File Loading Errors > should handle failed sound file loads gracefully
AssertionError: expected "error" to be called with arguments: [ StringContaining{…}, Any<Error>
> ]

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
+     "message": "No supported audio formats found for DIAMOND_COLLECT",
+   },
  ]


Number of calls: 9

 ❯ src/audio/__tests__/error-handling.test.ts:224:35
    222|
    223|             // Should log the error
    224|Xexpect(console.error).toHaveBeenCalledWith(
       |X^
    225|Xexpect.stringContaining('Failed to load sound'),
    226|Xexpect.any(Error)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[29/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Sound 
 File Loading Errors > should retry failed sound loads
AssertionError: expected "spy" to be called 2 times, but got 0 times
 ❯ src/audio/__tests__/error-handling.test.ts:250:31
    248|
    249|             // Should have retried the failed request
    250|Xexpect(mockFetch).toHaveBeenCalledTimes(2);
       |X^
    251|X});
    252|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[30/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Sound 
 File Loading Errors > should fall back to HTML5 audio when Web Audio loading fails completely  
AssertionError: expected "spy" to be called with arguments: [ ObjectContaining{…} ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:262:42
    260|Xmanager.playSound('PLAYER_WALK');
    261|
    262|Xexpect(window.dispatchEvent).toHaveBeenCalledWith(
       |X^
    263|Xexpect.objectContaining({
    264|Xtype: 'audioManagerFallback'

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[31/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > HTML5 
 Audio Fallback > should handle HTML5 audio playback errors
AssertionError: expected "error" to be called with arguments: [ StringContaining{…}, Any<Error>
> ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:286:35
    284|
    285|             // Should handle the error gracefully
    286|Xexpect(console.error).toHaveBeenCalledWith(
       |X^
    287|Xexpect.stringContaining('HTML5 audio playback error'),
    288|Xexpect.any(Error)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[32/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > HTML5 
 Audio Fallback > should handle autoplay blocked errors
AssertionError: expected "spy" to be called with arguments: [ 'click', Any<Function>, …(1) ]   

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:307:47
    305|
    306|             // Should set up autoplay recovery
    307|Xexpect(document.addEventListener).toHaveBeenCalledWith(
       |X^
    308|X'click',
    309|Xexpect.any(Function),

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[33/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > HTML5 
 Audio Fallback > should handle unsupported audio formats
AssertionError: expected "error" to be called with arguments: [ StringContaining{…}, Any<Error>
> ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:322:35
    320|Xawait expect(manager.preloadSounds()).resolves.not.toThrow();
    321|
    322|Xexpect(console.error).toHaveBeenCalledWith(
       |X^
    323|Xexpect.stringContaining('Failed to preload HTML5 sound'),
    324|Xexpect.any(Error)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[34/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Error 
 Recovery Mechanisms > should attempt on-demand loading when buffer not found
AssertionError: expected "log" to be called with arguments: [ StringContaining{…} ]

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
    369|Xexpect.stringContaining('Attempting on-demand load')
    370|X);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[35/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Error 
 Recovery Mechanisms > should validate audio buffers before playback
AssertionError: expected "warn" to be called with arguments: [ …(2) ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:389:34
    387|
    388|             // Should detect and handle invalid buffer
    389|Xexpect(console.warn).toHaveBeenCalledWith(
       |X^
    390|Xexpect.stringContaining('Invalid buffer'),
    391|Xexpect.any(String)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[36/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Browse
er-Specific Error Handling > should handle Safari-specific audio context issues
AssertionError: expected "spy" to be called at least once
 ❯ src/audio/__tests__/error-handling.test.ts:442:42
    440|
    441|             // Should handle Safari-specific resume logic
    442|Xexpect(safariContext.resume).toHaveBeenCalled();
       |X^
    443|X});
    444|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[37/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Browse
er-Specific Error Handling > should handle Chrome-specific audio context issues
AssertionError: expected "spy" to be called at least once
 ❯ src/audio/__tests__/error-handling.test.ts:469:52
    467|
    468|             // Should handle Chrome-specific resume logic
    469|Xexpect(chromeContext.createOscillator).toHaveBeenCalled();
       |X^
    470|X});
    471|     });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[38/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Error 
 Event Emission > should emit error events for external handling
AssertionError: expected "spy" to be called with arguments: [ ObjectContaining{…} ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:481:42
    479|
    480|             // Should emit error event
    481|Xexpect(window.dispatchEvent).toHaveBeenCalledWith(
       |X^
    482|Xexpect.objectContaining({
    483|Xtype: 'audioError',

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[39/45]⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Error 
 Event Emission > should emit fallback events when switching audio managers
AssertionError: expected "spy" to be called with arguments: [ ObjectContaining{…} ]

Number of calls: 0

 ❯ src/audio/__tests__/error-handling.test.ts:501:42
    499|
    500|             // Should emit fallback event
    501|Xexpect(window.dispatchEvent).toHaveBeenCalledWith(
       |X^
    502|Xexpect.objectContaining({
    503|Xtype: 'audioManagerFallback'

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[40/45]⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManage
er > enhanced preloading > should preload sounds with progress tracking
AssertionError: expected 0 to be greater than 0
 ❯ src/tests/audio/enhanced-audio-manager.test.ts:148:50

    146|Xconst loadingState = manager.getLoadingState();
    147|Xexpect(loadingState.isLoading).toBe(false);
    148|Xexpect(loadingState.loadedCount).toBeGreaterThan(0);
       |X^
    149|
    150|Xunsubscribe();

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[41/45]⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManage
er > enhanced preloading > should apply optimization during preloading
AssertionError: expected "spy" to be called at least once
 ❯ src/tests/audio/enhanced-audio-manager.test.ts:157:55
    155|
    156|                 // Verify that optimization methods were called
    157|Xexpect(mockAudioContext.createBuffer).toHaveBeenCalled();
       |X^
    158|X});
    159|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[42/45]⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManage
er > enhanced preloading > should handle loading failures gracefully
AssertionError: expected 0 to be greater than 0
 ❯ src/tests/audio/enhanced-audio-manager.test.ts:166:58
    164|
    165|Xconst loadingState = manager.getLoadingState();
    166|Xexpect(loadingState.failedSounds.length).toBeGreaterThan(0);
       |X^
    167|Xexpect(loadingState.errors.size).toBeGreaterThan(0);
    168|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[43/45]⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManage
er > enhanced preloading > should skip preloading in fallback mode
AssertionError: expected "spy" to not be called at all, but actually been called 9 times       

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

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[44/45]⎯

 FAIL  src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManage
er > error recovery > should handle decode errors
AssertionError: expected 0 to be greater than 0
 ❯ src/tests/audio/enhanced-audio-manager.test.ts:238:58
    236|
    237|Xconst loadingState = manager.getLoadingState();
    238|Xexpect(loadingState.failedSounds.length).toBeGreaterThan(0);
       |X^
    239|X});
    240|X});

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[45/45]⎯

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not
t affected.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: Preload failed
 ❯ SilentAudioManager.<anonymous> src/audio/__tests__/audio-error-handling.test.ts:234:23      
    232|
    233|Xmanager.preloadSounds = vi.fn().mockImplementation(() => {
    234|Xthrow new Error('Preload failed');
       |X^
    235|X});
    236|
 ❯ SilentAudioManager.mockCall node_modules/@vitest/spy/dist/index.js:96:15ode (vitest 1)
 ❯ SilentAudioManager.spy node_modules/tinyspy/dist/index.js:47:103
 ❯ src/audio/__tests__/audio-error-handling.test.ts:240:35
 ❯ Proxy.assertThrows node_modules/chai/chai.js:2787:5
 ❯ Proxy.methodWrapper node_modules/chai/chai.js:1706:25
 ❯ Proxy.<anonymous> node_modules/@vitest/expect/dist/index.js:1088:12
 ❯ Proxy.overwritingMethodWrapper node_modules/chai/chai.js:1755:33
 ❯ Proxy.<anonymous> node_modules/@vitest/expect/dist/index.js:1420:16
 ❯ Proxy.<anonymous> node_modules/@vitest/expect/dist/index.js:1029:14

This error originated in "src/audio/__tests__/audio-error-handling.test.ts" test file. It doesn
n't mean the error was thrown inside the file itself, but while it was running.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯


 Test Files  7 failed | 14 passed (21)
      Tests  44 failed | 262 passed (306)
     Errors  1 error
   Start at  16:38:11
   Duration  10.85s (transform 2.19s, setup 5.24s, collect 5.07s, tests 18.45s, environment 27.
.76s, prepare 5.10s)

:\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me run a more focused test to check the core functionality:

Command
npm test -- --run src/tests/GameState.test.ts src/tests/app-sound-integration.test.tsx
npm test -- --run src/tests/GameState.test.ts src/tests/app-sound-integ
gration.test.tsx
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/GameState.test.ts src/tests/app-sound-integration.test.tsxpm test --run src/tests/GameState.test.ts src/tests/app-sound-integration.test.tsx
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/GameState.test.ts src/tests/app-sound-integrat
tion.test.tsx

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 3)ode (vitest 4)ode (vitest 5)ode (vitest 8)ode (vitest 7)ode (vitest 9)ode (vitest 10)ode (vitest 13)ode (vitest 15)
 Test Files 0 passed (2)
      Tests 0 passed (0)
   Start at 16:38:45
   Duration 939ms
(node:28344) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:56452) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

 ❯ src/tests/app-sound-integration.test.tsx [queued]
 ❯ src/tests/GameState.test.ts 0/10

 Test Files 0 passed (2)
      Tests 0 passed (10)
   Start at 16:38:45
   Duration 1.26s
ode (vitest 2) ✓ src/tests/GameState.test.ts (10 tests) 7ms

 ❯ src/tests/app-sound-integration.test.tsx 1/21

 Test Files 1 passed (2)
      Tests 11 passed (31)
   Start at 16:38:45
   Duration 1.47s

 ❯ src/tests/app-sound-integration.test.tsx 3/21

 Test Files 1 passed (2)
      Tests 13 passed (31)
   Start at 16:38:45
   Duration 1.57s

 ❯ src/tests/app-sound-integration.test.tsx 6/21

 Test Files 1 passed (2)
      Tests 16 passed (31)
   Start at 16:38:45
   Duration 1.68s

 ❯ src/tests/app-sound-integration.test.tsx 11/21

 Test Files 1 passed (2)
      Tests 21 passed (31)
   Start at 16:38:45
   Duration 2.01s

 ❯ src/tests/app-sound-integration.test.tsx 14/21

 Test Files 1 passed (2)
      Tests 24 passed (31)
   Start at 16:38:45
   Duration 2.12s
stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > should continue working when sound playback fails
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)
Failed to emit sound event: Error: Sound playback failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:493:23
    at mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15) 
    at spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:103)
    at D:\FizzBash\TheWanderer\src\App.tsx:51:7
    at emit (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:25:13)
    at Array.forEach (<anonymous>)
    at Object.emitMultiple (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:32:
:16)
    at emitSoundEvents (D:\FizzBash\TheWanderer\src\audio\events\sound-event-emitter.ts:66:13) 
    at movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:150:7)
    at Object.movePlayer (D:\FizzBash\TheWanderer\src\GameState.ts:191:22)

stderr | src/tests/app-sound-integration.test.tsx > App Sound Integration > Error Recovery > sh
hould handle audio reset errors gracefully
Failed to reset audio system: Error: Reset failed
    at D:\FizzBash\TheWanderer\src\tests\app-sound-integration.test.tsx:559:52
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20 
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-h
hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js
s:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.j
js:1729:8)


 ❯ src/tests/app-sound-integration.test.tsx 20/21

 Test Files 1 passed (2)
      Tests 30 passed (31)
   Start at 16:38:45
   Duration 2.32s
 ✓ src/tests/app-sound-integration.test.tsx (21 tests) 931ms

 Test Files  2 passed (2)
      Tests  31 passed (31)
   Start at  16:38:45
   Duration  2.38s (transform 233ms, setup 216ms, collect 391ms, tests 938ms, environment 1.27s, prepare 355ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Retry

Kiro
Including Steering Documents

typescript-standards.md
I'll implement task 10 to integrate the sound system with the main App component. Let me start by updating the task status and examining the current App.tsx file.

Task: 10. Integrate sound system with main App component from 
tasks.md
Status: In Progress
Revert







Claude Sonnet 4.0
Autopilot
