❯ src/tests/GameStat...

New Session





 FAIL  src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow

AssertionError: expected [ 'player_walk', 'death_sound' ] to include 'bomb_sound'

 ❯ src/tests/sound-system-e2e.test.ts:395:35

    393|             emitter.emitMultiple(deathEvents);

Kiro
Including Steering Documents

typescript-standards.md
Looking at the failing test, it expects bomb_sound to be included in the death scenario workflow, but the current sound event mapper is only returning ['player_walk', 'death_sound']. Let me examine the current sound event mapper to understand what's happening.

Read file(s)

sound-event-mapper.ts
Now let me check the failing test to understand exactly what it expects:

Read file(s)

sound-system-e2e.test.ts 380 - 401
I can see the issue! The test is simulating a player moving to a CELL.BOMB and dying, and it expects both BOMB_SOUND and DEATH_SOUND to be played. However, the current generatePlayerMoveEvents function doesn't handle bomb explosions - it only generates movement and death sounds.

Let me check what CELL.BOMB represents and how bomb explosions should be handled:

Searched workspace
Finding references to CELL.BOMB to understand how bomb interactions should work
Now let me check the comprehensive sound system test to see what the expected behavior should be:

Read file(s)

comprehensive-sound-system.test.ts 290 - 301
Now let me check the death sequence test:

Read file(s)

comprehensive-sound-system.test.ts 335 - 351
Perfect! Now I understand the issue. The tests expect that when a player moves to a CELL.BOMB, the mapPlayerMovementToSound function should return a bomb_explode event, not a regular movement event. However, the current implementation treats CELL.BOMB as a regular movement that plays a walk sound.

Looking at the comprehensive test, it expects:

When moving to CELL.BOMB, mapPlayerMovementToSound should return { type: 'bomb_explode', priority: 'high', volume: 0.9 }
In a death sequence, there should be 2 events: bomb_explode and death
But the current implementation treats bomb cells as regular movement. Let me fix this:

Accepted edits to

sound-event-mapper.ts


Now let's run the failing test to see if this fixes the issue:

Command
npm test -- --run src/tests/sound-system-e2e.test.ts
npm test -- --run src/tests/sound-system-e2e.test.ts:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-system-e2e.test.tspm test --run src/tests/sound-system-e2e.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/sound-system-e2e.test.ts

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 3)ode (vitest 4)ode (vitest 7)ode (vitest 8)ode (vitest 10)ode (vitest 11)ode (vitest 13)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:19:57
   Duration 962ms

 ❯ src/tests/sound-system-e2e.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:19:57
   Duration 1.07s
(node:60660) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.39s
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
                                                                            
                                                                            
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined      ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 1.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined
 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:19:57
   Duration 2.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 3.58s

 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 4.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
                                                                            
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 14:19:57
   Duration 5.00s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.65s

 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 5.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 14:19:57
   Duration 6.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should gracefully fallback from WebAudio to HTML5 to Silent                                      
HTML5 Audio initialized successfully                                        
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should gracefully fallback from WebAudio to HTML5 to Silent                                      
Web Audio API not supported, using HTML5 Audio fallback                     
No audio support detected, using silent mode                                
No audio support detected, using silent mode                                
                                                                            

 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 14:19:57
   Duration 7.73s

 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 7.95s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 4/17                                  

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 4/17                                  

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 4/17                                  

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 4/17                                  

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 4/17                                  

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 4/17                                  

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 4/17                                  

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 14:19:57
   Duration 9.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Audio Manager Fallback Workflow > should handle audio c
context suspension and recovery workflow
Audio context state changed to: suspended
Audio context state changed to: suspended
Audio context state changed to: suspended
Audio context state changed to: suspended
Audio context state changed to: running
Audio context state changed to: running
Audio context state changed to: running
Audio context state changed to: running
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow                                     
Audio context suspended - attempting to resume on next user interaction     
Audio context suspended - attempting to resume on next user interaction     
Audio context suspended - attempting to resume on next user interaction     
Audio context suspended - attempting to resume on next user interaction     
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should persist and restore audio settings across sessions                                          
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
Audio context state changed to: closed                                      
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should persist and restore audio settings across sessions                                          
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should handle settings corruption gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Audio context state changed to: closed
 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should handle settings corruption gracefully                                                       
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 5/17                                  

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 5/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 14:19:57
   Duration 9.79s

 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 7/17                                  

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 7/17                                  

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 7/17                                  

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 7/17                                  

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 7/17                                  

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 7/17                                  

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 7/17                                  

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 14:19:57
   Duration 10.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should handle intensi
ive sound event workflow efficiently
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently                                         
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


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 11.87s

 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 12.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 8/17                                  

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 8/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 14:19:57
   Duration 13.07s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Performance Under Load Workflow > should maintain perfo
ormance during concurrent operations
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations                                         
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


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 13.92s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:226:28)                                                           
    at listOnTimeout (node:internal/timers:594:17)                          
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 9/17                                  

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 9/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 14:19:57
   Duration 15.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Network err
ror
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load sound DEATH_SOUND: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\sound-system-e2
2e.test.ts:226:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                                                   
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Asset loading complete: 0/10 loaded, 10 failed

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should recover from network f
failures during preloading
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
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


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
                                                                            
                                                                            
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 16.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 10/17                                 

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 10/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 14:19:57
   Duration 17.17s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                                             
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Error Recovery Workflow > should handle audio decoding 
 failures and continue operation
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


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
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


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle localStorage failures and continue operation                                               
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
Audio context state changed to: closed                                      
                                                                            

 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle localStorage failures and continue operation                                               
Failed to save muted preference: Error: Storage quota exceeded              
    at Object.<anonymous> (D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:613:27)                                                           
    at Object.mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)
    at Object.spy [as setItem] (file:///D:/FizzBash/TheWanderer/node_modules
s/tinyspy/dist/index.js:47:103)
    at WebAudioManager.saveMutedPreference (D:\FizzBash\TheWanderer\src\audi
io\managers\audio-manager.ts:603:26)
    at WebAudioManager.setMuted (D:\FizzBash\TheWanderer\src\audio\managers\
\audio-manager.ts:1020:14)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:622:34    
    at Proxy.assertThrows (file:///D:/FizzBash/TheWanderer/node_modules/chai
i/chai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/FizzBash/TheWanderer/node_modules/cha
ai/chai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/FizzBash/TheWanderer/node_modules/@vite
est/expect/dist/index.js:1088:12)
    at Proxy.overwritingMethodWrapper (file:///D:/FizzBash/TheWanderer/node_
_modules/chai/chai.js:1755:33)
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 11/17                                 

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 11/17

 Test Files 0 passed (1)
      Tests 11 passed (17)
   Start at 14:19:57
   Duration 18.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 19.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
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
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
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
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 14:19:57
   Duration 20.20s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 45 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 21.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should handle memory press
sure gracefully
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
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                                              
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
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
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


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 13 passed (17)
   Start at 14:19:57
   Duration 22.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
Attempting to reinitialize audio context                                    
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 45 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 50 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 23.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined
 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 14/17                                 

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 14 passed (17)
   Start at 14:19:57
   Duration 24.19s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Cross-Browser Compatibility Workflow > should handle we
ebkit prefixed AudioContext
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
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                                                  
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
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support                                                
HTML5 Audio initialized successfully                                        
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support                                                
Web Audio API not supported, using HTML5 Audio fallback                     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support                                                
HTML5 Audio preloaded 10/10 sounds                                          
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support                                                
Error cleaning up audio element: TypeError: audio.load is not a function    
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:449:23                                                                         
    at Map.forEach (<anonymous>)                                            
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers
s\html5-audio-manager.ts:445:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:752:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function    
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:449
9:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers
s\html5-audio-manager.ts:445:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:752:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function    
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:449
9:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers
s\html5-audio-manager.ts:445:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:752:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function    
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:449
9:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers
s\html5-audio-manager.ts:445:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:752:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function    
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:449
9:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers
s\html5-audio-manager.ts:445:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:752:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function    
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:449
9:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers
s\html5-audio-manager.ts:445:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:752:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function    
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:449
9:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers
s\html5-audio-manager.ts:445:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:752:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function    
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:449
9:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers
s\html5-audio-manager.ts:445:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:752:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function    
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:449
9:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers
s\html5-audio-manager.ts:445:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:752:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:20
Error cleaning up audio element: TypeError: audio.load is not a function    
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:449
9:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\managers
s\html5-audio-manager.ts:445:28)
    at D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.test.ts:752:21    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:20


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 15/17                                 

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 15/17

 Test Files 0 passed (1)
      Tests 15 passed (17)
   Start at 14:19:57
   Duration 24.42s

 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 25.29s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 45 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 50 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 55 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 16/17                                 

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 16/17                                 

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 16/17                                 

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 16/17                                 

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 16/17                                 

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 16/17                                 

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 16/17                                 

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 16 passed (17)
   Start at 14:19:57
   Duration 26.27s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 17/17                                 

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 17/17                                 

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 17/17                                 

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 17/17                                 

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 17/17                                 

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 17/17                                 

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 17/17                                 

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Integration with Game Events Workflow > should integrat
te with complete game event sequence
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
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence                                         
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


 ❯ src/tests/sound-system-e2e.test.ts 17/17

 Test Files 0 passed (1)
      Tests 17 passed (17)
   Start at 14:19:57
   Duration 26.48s
 ✓ src/tests/sound-system-e2e.test.ts (17 tests) 25092ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow  2079ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow  2082ms    
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow  2086ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallba
ack Workflow > should gracefully fallback from WebAudio to HTML5 to Silent 3m
ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallba
ack Workflow > should handle audio context suspension and recovery workflow  
 2073ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence
e Workflow > should persist and restore audio settings across sessions 4ms   
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence
e Workflow > should handle settings corruption gracefully 2ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Performance Under Lo
oad Workflow > should handle intensive sound event workflow efficiently  2071
1ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Performance Under Lo
oad Workflow > should maintain performance during concurrent operations  2074
4ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workf
flow > should recover from network failures during preloading  2093ms        
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workf
flow > should handle audio decoding failures and continue operation  2080ms  
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workf
flow > should handle localStorage failures and continue operation 9ms        
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Memory Management Wo
orkflow > should properly cleanup resources in complete workflow  2073ms     
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Memory Management Wo
orkflow > should handle memory pressure gracefully  2113ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compat
tibility Workflow > should handle webkit prefixed AudioContext  2085ms       
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compat
tibility Workflow > should handle different audio format support 17ms        
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Integration with Gam
me Events Workflow > should integrate with complete game event sequence  2147
7ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  14:19:57
   Duration  26.61s (transform 171ms, setup 112ms, collect 177ms, tests 25.0
09s, environment 636ms, prepare 227ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me run just the specific test that was failing:

Command
npm test -- --run src/tests/sound-system-e2e.test.ts -t "should handle death scenario workflow"
npm test -- --run src/tests/sound-system-e2e.test.ts
s -t "should handle death scenario workflow"
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-system-e2e.test.ts -t "should handle death scenario workflow"pm test --run src/tests/sound-system-e2e.test.ts -t should handle death scenario workflow
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/sound-system-e2e.test.ts -t
t should handle death scenario workflow

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 3)ode (vitest 4)ode (vitest 5)ode (vitest 6)ode (vitest 9)ode (vitest 8)ode (vitest 11)ode (vitest 10)ode (vitest 14)ode (vitest 13)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:20:42
   Duration 954ms

 ❯ src/tests/sound-system-e2e.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:20:42
   Duration 1.28s
(node:62900) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 14:20:42
   Duration 1.59s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 14:20:42
   Duration 1.69s

 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 1.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 0 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at processTimers (node:internal/timers:526:9)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at processTimers (node:internal/timers:526:9)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at processTimers (node:internal/timers:526:9)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                    
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3         

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.m
mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError
r: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17                                  

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle death scen
nario workflow
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                                               
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 3/17

 Test Files 0 passed (1)
      Tests 1 passed | 2 skipped (17)
   Start at 14:20:42
   Duration 3.75s
 ✓ src/tests/sound-system-e2e.test.ts (17 tests | 16 skipped) 2093ms        
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow  2092ms
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallba
ack Workflow > should gracefully fallback from WebAudio to HTML5 to Silent   
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallba
ack Workflow > should handle audio context suspension and recovery workflow  
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence
e Workflow > should persist and restore audio settings across sessions       
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence
e Workflow > should handle settings corruption gracefully
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Performance Under Lo
oad Workflow > should handle intensive sound event workflow efficiently      
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Performance Under Lo
oad Workflow > should maintain performance during concurrent operations      
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workf
flow > should recover from network failures during preloading
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workf
flow > should handle audio decoding failures and continue operation
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workf
flow > should handle localStorage failures and continue operation
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Memory Management Wo
orkflow > should properly cleanup resources in complete workflow
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Memory Management Wo
orkflow > should handle memory pressure gracefully
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compat
tibility Workflow > should handle webkit prefixed AudioContext
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compat
tibility Workflow > should handle different audio format support
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Integration with Gam
me Events Workflow > should integrate with complete game event sequence      

 Test Files  1 passed (1)
      Tests  1 passed | 16 skipped (17)
   Start at  14:20:42
   Duration  3.86s (transform 196ms, setup 122ms, collect 200ms, tests 2.09s
s, environment 719ms, prepare 277ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Session Too Long
Continue
Summarize and continue in a new session.


Revert


sound-event-mapper.ts






Claude Sonnet 4.0
Autopilot
