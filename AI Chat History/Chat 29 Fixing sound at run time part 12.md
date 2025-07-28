This test appears to fail when it is run with other tests  FAIL  src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow

AssertionError: expected "spy" to be called at least once

 ❯ src/tests/sound-system-e2e.test.ts:666:41

    664|             const gainNodes = mockAudioContext.getGainNodes();

    665|             gainNodes.forEach(node => {

    666|                 expect(node.disconnect).toHaveBeenCalled();   

Kiro
I see the issue. The test is failing when run with other tests, which suggests there's some shared state or interference between tests. This is a common problem in test suites where mocks or global state aren't properly isolated between tests.

Let me examine the test setup and see what might be causing the interference:

Read file(s)

sound-system-e2e.test.ts 260 - 301
The issue is likely that when tests run together, there's some state pollution between tests. The problem could be:

Mock state not being properly reset between tests
Global state in the WebAudioManager that persists between tests
Shared mock instances that accumulate state
Let me check the mock implementation to see if there are any issues with state management:

Read file(s)

sound-system-e2e.test.ts 25 - 81
I can see the issue. The mock is creating new instances in beforeEach, but the problem is likely that when multiple tests run, there might be some timing issues or the mock state isn't being properly isolated.

Let me add a method to clear the gain nodes array and ensure it's called in the setup:

Read file(s)

sound-system-e2e.test.ts 125 - 151
I can see there's a clearBufferSources() method but no corresponding method to clear gain nodes. Let me add a method to clear gain nodes and ensure it's called in the test setup:

Accepted edits to

sound-system-e2e.test.ts


Now let me update the beforeEach to clear the gain nodes:

Accepted edits to

sound-system-e2e.test.ts


However, there's still a potential issue. The problem might be that the mockAudioContext is created fresh in each beforeEach, so clearing it after creation might not be necessary. The real issue might be that when tests run together, there could be some global state in the WebAudioManager itself that's not being reset.

Let me also add a more robust cleanup in the specific test to ensure it starts with a clean state:

Accepted edits to

sound-system-e2e.test.ts


Now let's run the test in isolation first to make sure it still passes:

Command
npm test -- --run src/tests/sound-system-e2e.test.ts -t "should properly cleanup resources in complete workflow"
npm test -- --run src/tests/sound-system-e2e.test.ts
s -t "should properly cleanup resources in complete workflow"
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-system-e2e.test.ts -t "should properly cleanup resources in complete workflow"pm test --run src/tests/sound-system-e2e.test.ts -t should properly cleanup resources in complete workflow
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/sound-system-e2e.test.ts -t
t should properly cleanup resources in complete workflow

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 4)ode (vitest 8)ode (vitest 6)ode (vitest 9)ode (vitest 12)ode (vitest 14)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:40:54
   Duration 944ms
(node:10752) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:40:54
   Duration 1.26s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
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

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   


 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (17)
   Start at 13:40:54
   Duration 1.36s

 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 1.91s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 12/17                                 

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   


 ❯ src/tests/sound-system-e2e.test.ts 12/17

 Test Files 0 passed (1)
      Tests 0 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 2.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load VICTORY_SOUND from /sounds/environment/door-slam.mp3: TypeErr
ror: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/sound-system-e2e.test.ts 13/17                                 

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                                                
Asset loading complete: 0/9 loaded, 9 failed                                
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Memory Management Workflow > should properly cleanup re
esources in complete workflow
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
Audio context closed unexpectedly
Audio context closed unexpectedly, attempting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 passed | 12 skipped (17)
   Start at 13:40:54
   Duration 3.43s
 ✓ src/tests/sound-system-e2e.test.ts (17 tests | 16 skipped) 2089ms        
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
   ↓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
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
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Memory Management Wo
orkflow > should properly cleanup resources in complete workflow  2088ms     
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
   Start at  13:40:54
   Duration  3.53s (transform 158ms, setup 111ms, collect 168ms, tests 2.09s
s, environment 597ms, prepare 195ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Good! The test still passes in isolation. Now let's run the entire test suite to see if it fails when run with other tests:

Command
npm test -- --run src/tests/sound-system-e2e.test.ts
npm test -- --run src/t
tests/sound-system-e2e.test.ts
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-system-e2e.test.ts
 Test Files  1 passed (1)
      Tests  1 passed | 16 skipped (17) 
   Start at  13:40:54
   Duration  3.53s (transform 158ms, setup 111ms, collect 168ms, tests 2.09s, environment 597ms, prepare 195ms)


D:\FizzBash\TheWanderer>npm test -- --run src/tests/sound-system-e2e.test.ts    
pm test --run src/tests/sound-system-e2e.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run s
src/tests/sound-system-e2e.test.ts       

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer    

ode (vitest 2)ode (vitest 1)ode (vitest 3)ode (vitest 7)ode (vitest 6)ode (vitest 8)ode (vitest 9)ode (vitest 12)ode (vitest 14)ode (vitest 13)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:41:16
   Duration 931ms

 ❯ src/tests/sound-system-e2e.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:41:16
   Duration 1.04s
(node:49192) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)      

 ❯ src/tests/sound-system-e2e.test.ts 0/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.34s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 1.98s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 0/
/17

 Test Files 0 passed (1)
      Tests 0 passed (17)
   Start at 13:41:16
   Duration 2.96s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete player mo
ovement workflow
Audio context state changed to: closed  


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                         
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.61s

 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 3.94s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 1/
/17

 Test Files 0 passed (1)
      Tests 1 passed (17)
   Start at 13:41:16
   Duration 5.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle complete game stat
te transition workflow
Audio context state changed to: closed  
Audio context state changed to: closed  


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.66s

 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 5.99s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 2/
/17

 Test Files 0 passed (1)
      Tests 2 passed (17)
   Start at 13:41:16
   Duration 6.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Complete Game Sound Wor
rkflow > should handle death scenario wor
rkflow
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle death scenario workflow                                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should gracefully fallback from WebAudio to HTML5 to Silent          
HTML5 Audio initialized successfully    
                                        
                                        
 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
                                        
                                        
                                        
                                        
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should gracefully fallback from WebAudio to HTML5 to Silent
Web Audio API not supported, using HTML5 Audio fallback
No audio support detected, using silent mode
No audio support detected, using silent 
 mode


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 3/
/17

 Test Files 0 passed (1)
      Tests 3 passed (17)
   Start at 13:41:16
   Duration 7.73s

 ❯ src/tests/sound-system-e2e.test.ts 4/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 7.96s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
                                        
                                        
                                        
                                        
                                        
                                        
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 4/
/17

 Test Files 0 passed (1)
      Tests 4 passed (17)
   Start at 13:41:16
   Duration 9.04s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Audio Manager Fallback 
 Workflow > should handle audio context s
suspension and recovery workflow
Audio context state changed to: suspende
ed
Audio context state changed to: suspende
ed
Audio context state changed to: suspende
ed
Audio context state changed to: suspende
ed
Audio context state changed to: running 
Audio context state changed to: running 
Audio context state changed to: running 
Audio context state changed to: running 
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Audio Manager Fallback Workflow > should handle audio context suspension and recovery workflow         
Audio context suspended - attempting to resume on next user interaction         
Audio context suspended - attempting to resume on next user interaction
Audio context suspended - attempting to 
 resume on next user interaction
Audio context suspended - attempting to 
 resume on next user interaction
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should persist and restore audio settings across sessions              
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
Audio context state changed to: closed  
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should persist and restore audio settings across sessions              
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should handle settings corruption gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Audio context state changed to: closed


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Settings Persistence Workflow > should handle settings corruption gracefully                           
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 5/
/17

 Test Files 0 passed (1)
      Tests 5 passed (17)
   Start at 13:41:16
   Duration 9.80s

 ❯ src/tests/sound-system-e2e.test.ts 7/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 10.04s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 7/
/17

 Test Files 0 passed (1)
      Tests 7 passed (17)
   Start at 13:41:16
   Duration 11.01s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should handle intensive sound
d event workflow efficiently
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should handle intensive sound event workflow efficiently             
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 11.88s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 8/
/17

 Test Files 0 passed (1)
      Tests 8 passed (17)
   Start at 13:41:16
   Duration 13.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Performance Under Load 
 Workflow > should maintain performance d
during concurrent operations
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Performance Under Load Workflow > should maintain performance during concurrent operations             
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Error loading /sounds/boul
lder/Whoosh.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Error loading /sounds/arro
ow/twang.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: E
Error: Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Error loading /sounds/arro
ow/thud.mp3: Error: Network error        
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Er
rror: Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
                                        
                                        
                                        
                                        
                                        
                                        
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Error loading /sounds/envi
ironment/door-slam.mp3: Error: Network er
rror
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 13.97s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 15.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 15.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 15.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 15.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 15.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Error loading /sounds/arro
ow/twang.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: E
Error: Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 15.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 15.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Error loading /sounds/play
yer/death.mp3: Error: Network error      
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 Error: Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 15.09s
                                        
                                        
                                        
                                        
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 15.09s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Error loading /sounds/diam
mond/collect.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp
p3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 15.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Error loading /sounds/play
yer/dig.mp3: Error: Network error        
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: Error: Network error     
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load sound PLAYER_DIG: Error: 
 Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Error loading /sounds/arro
ow/twang.mp3: Error: Network error       
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: Error: Network error    
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load sound ARROW_MOVE: Error: 
 Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
[AssetLoader] Error loading /sounds/envi
ironment/door-slam.mp3: Error: Network er
rror
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: Error: Netw
work error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: Error: Network 
 error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Erro
or: Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: Error: N
Network error
    at Timeout._onTimeout (D:\FizzBash\T
TheWanderer\src\tests\sound-system-e2e.te
est.ts:226:28)
    at listOnTimeout (node:internal/time
ers:594:17)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should recover from network failures 
 during preloading
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  
Audio context state changed to: closed  


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should recover from network failures during preloading                       
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 9/
/17

 Test Files 0 passed (1)
      Tests 9 passed (17)
   Start at 13:41:16
   Duration 16.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 17.03s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
                                        
                                        
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined
 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Error Recovery Workflow
w > should handle audio decoding failures
s and continue operation
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


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle audio decoding failures and continue operation                 
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle localStorage failures and continue operation                   
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
Audio context state changed to: closed  


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Error Recovery Workflow > should handle localStorage failures and continue operation                   
Failed to save muted preference: Error: Storage quota exceeded                  
    at Object.<anonymous> (D:\FizzBash\TheWanderer\src\tests\sound-system-e2e.te
est.ts:613:27)
    at Object.mockCall (file:///D:/FizzB
Bash/TheWanderer/node_modules/@vitest/spy
y/dist/index.js:96:15)
    at Object.spy [as setItem] (file:///
/D:/FizzBash/TheWanderer/node_modules/tin
nyspy/dist/index.js:47:103)
    at WebAudioManager.saveMutedPreferen
nce (D:\FizzBash\TheWanderer\src\audio\ma
anagers\audio-manager.ts:590:26)
    at WebAudioManager.setMuted (D:\Fizz
zBash\TheWanderer\src\audio\managers\audi
io-manager.ts:916:14)
    at D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:622:34        
    at Proxy.assertThrows (file:///D:/Fi
izzBash/TheWanderer/node_modules/chai/cha
ai.js:2787:5)
    at Proxy.methodWrapper (file:///D:/F
FizzBash/TheWanderer/node_modules/chai/ch
hai.js:1706:25)
    at Proxy.<anonymous> (file:///D:/Fiz
zzBash/TheWanderer/node_modules/@vitest/e
expect/dist/index.js:1088:12)
    at Proxy.overwritingMethodWrapper (f
file:///D:/FizzBash/TheWanderer/node_modu
ules/chai/chai.js:1755:33)
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 10
0/17

 Test Files 0 passed (1)
      Tests 10 passed (17)
   Start at 13:41:16
   Duration 18.02s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 19.06s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
                                        
                                        
                                        
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 12
2/17

 Test Files 0 passed (1)
      Tests 12 passed (17)
   Start at 13:41:16
   Duration 20.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should properly cleanup resources 
 in complete workflow
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


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should properly cleanup resources in complete workflow                    
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 20.25s

 ❯ src/tests/sound-system-e2e.test.ts 13/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 21.12s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 45 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 13
3/17

 Test Files 0 passed (1)
      Tests 1 failed | 12 passed (17)   
   Start at 13:41:16
   Duration 22.10s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Memory Management Workf
flow > should handle memory pressure grac
cefully
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


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Memory Management Workflow > should handle memory pressure gracefully                                  
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s
                                        
                                        
                                        
                                        
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 22.32s

 ❯ src/tests/sound-system-e2e.test.ts 14/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 23.08s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 45 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 50 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 14
4/17

 Test Files 0 passed (1)
      Tests 1 failed | 13 passed (17)   
   Start at 13:41:16
   Duration 24.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Cross-Browser Compatibi
ility Workflow > should handle webkit pre
efixed AudioContext
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


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle webkit prefixed AudioContext                      
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support                    
HTML5 Audio initialized successfully    
                                        
                                        
 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support                    
Web Audio API not supported, using HTML5 Audio fallback                         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support                    
HTML5 Audio preloaded 9/9 sounds        
                                        
                                        
 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
                                        
                                        
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Cross-Browser Compatibility Workflow > should handle different audio format support
Error cleaning up audio element: TypeError: audio.load is not a function
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:431:23
    at Map.forEach (<anonymous>)        
    at HTML5AudioManager.cleanup (D:\Fiz
zzBash\TheWanderer\src\audio\managers\htm
ml5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:736:21        
    at file:///D:/FizzBash/TheWanderer/n
node_modules/@vitest/runner/dist/chunk-ho
ooks.js:752:20
Error cleaning up audio element: TypeErr
ror: audio.load is not a function        
    at D:\FizzBash\TheWanderer\src\audio
o\managers\html5-audio-manager.ts:431:23 
    at Map.forEach (<anonymous>)        
    at HTML5AudioManager.cleanup (D:\Fiz
zzBash\TheWanderer\src\audio\managers\htm
ml5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:736:21        
    at file:///D:/FizzBash/TheWanderer/n
node_modules/@vitest/runner/dist/chunk-ho
ooks.js:752:20
Error cleaning up audio element: TypeErr
ror: audio.load is not a function        
    at D:\FizzBash\TheWanderer\src\audio
o\managers\html5-audio-manager.ts:431:23 
    at Map.forEach (<anonymous>)        
    at HTML5AudioManager.cleanup (D:\Fiz
zzBash\TheWanderer\src\audio\managers\htm
ml5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:736:21        
    at file:///D:/FizzBash/TheWanderer/n
node_modules/@vitest/runner/dist/chunk-ho
ooks.js:752:20
Error cleaning up audio element: TypeErr
ror: audio.load is not a function        
    at D:\FizzBash\TheWanderer\src\audio
o\managers\html5-audio-manager.ts:431:23 
    at Map.forEach (<anonymous>)        
    at HTML5AudioManager.cleanup (D:\Fiz
zzBash\TheWanderer\src\audio\managers\htm
ml5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:736:21        
    at file:///D:/FizzBash/TheWanderer/n
node_modules/@vitest/runner/dist/chunk-ho
ooks.js:752:20
Error cleaning up audio element: TypeErr
ror: audio.load is not a function        
    at D:\FizzBash\TheWanderer\src\audio
o\managers\html5-audio-manager.ts:431:23 
    at Map.forEach (<anonymous>)        
    at HTML5AudioManager.cleanup (D:\Fiz
zzBash\TheWanderer\src\audio\managers\htm
ml5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:736:21        
    at file:///D:/FizzBash/TheWanderer/n
node_modules/@vitest/runner/dist/chunk-ho
ooks.js:752:20
Error cleaning up audio element: TypeErr
ror: audio.load is not a function        
    at D:\FizzBash\TheWanderer\src\audio
o\managers\html5-audio-manager.ts:431:23 
    at Map.forEach (<anonymous>)        
    at HTML5AudioManager.cleanup (D:\Fiz
zzBash\TheWanderer\src\audio\managers\htm
ml5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:736:21        
    at file:///D:/FizzBash/TheWanderer/n
node_modules/@vitest/runner/dist/chunk-ho
ooks.js:752:20
Error cleaning up audio element: TypeErr
ror: audio.load is not a function        
    at D:\FizzBash\TheWanderer\src\audio
o\managers\html5-audio-manager.ts:431:23 
    at Map.forEach (<anonymous>)        
    at HTML5AudioManager.cleanup (D:\Fiz
zzBash\TheWanderer\src\audio\managers\htm
ml5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:736:21        
    at file:///D:/FizzBash/TheWanderer/n
node_modules/@vitest/runner/dist/chunk-ho
ooks.js:752:20
Error cleaning up audio element: TypeErr
ror: audio.load is not a function        
    at D:\FizzBash\TheWanderer\src\audio
o\managers\html5-audio-manager.ts:431:23 
    at Map.forEach (<anonymous>)        
    at HTML5AudioManager.cleanup (D:\Fiz
zzBash\TheWanderer\src\audio\managers\htm
ml5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:736:21        
    at file:///D:/FizzBash/TheWanderer/n
node_modules/@vitest/runner/dist/chunk-ho
ooks.js:752:20
Error cleaning up audio element: TypeErr
ror: audio.load is not a function        
    at D:\FizzBash\TheWanderer\src\audio
o\managers\html5-audio-manager.ts:431:23 
    at Map.forEach (<anonymous>)        
    at HTML5AudioManager.cleanup (D:\Fiz
zzBash\TheWanderer\src\audio\managers\htm
ml5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests
s\sound-system-e2e.test.ts:736:21        
    at file:///D:/FizzBash/TheWanderer/n
node_modules/@vitest/runner/dist/chunk-ho
ooks.js:752:20


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 1/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 1/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 15
5/17

 Test Files 0 passed (1)
      Tests 1 failed | 14 passed (17)   
   Start at 13:41:16
   Duration 24.37s

 ❯ src/tests/sound-system-e2e.test.ts 16/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 25.16s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes 
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 10 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 15 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 25 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 30 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 35 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 45 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 50 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 55 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 40 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Attempting to reinitialize audio context
Initialized gain node pool with 20 nodes
Web Audio API initialized successfully  

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/player/walk.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3
3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: T
TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/player/death.mp3: 
 TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                       


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Retry 2/3 for /sounds/environment/door-s
slam.mp3: TypeError: Cannot read properti
ies of undefined (reading 'entries')     
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
Retry 2/3 for /sounds/diamond/collect.mp
p3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 16
6/17

 Test Files 0 passed (1)
      Tests 1 failed | 15 passed (17)   
   Start at 13:41:16
   Duration 26.13s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/player/dig.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/arrow/twang.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/arrow/thud.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/player/death.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/environment/door-slam.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Attempting to load: /sound
ds/diamond/collect.mp3
[AssetLoader] Current location: http://l
localhost:3000/
[AssetLoader] Base URL: http://localhost
t:3000

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
[AssetLoader] Response for /sounds/playe
er/walk.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load PLAYER_WALK from /sounds/
/player/walk.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entrie
es')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load sound PLAYER_WALK: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load PLAYER_DIG from /sounds/p
player/dig.mp3: TypeError: Cannot read pr
roperties of undefined (reading 'entries'
')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load sound PLAYER_DIG: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined      
                                        

 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load BOULDER_MOVE from /sounds
s/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'en
ntries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load sound BOULDER_MOVE: TypeE
Error: Cannot read properties of undefine
ed (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined         
                                        

 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries') 
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load ARROW_MOVE from /sounds/a
arrow/twang.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries
s')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load sound ARROW_MOVE: TypeErr
ror: Cannot read properties of undefined 
 (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined          
                                        

 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')  
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load COLLISION_THUD from /soun
nds/arrow/thud.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entr
ries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load sound COLLISION_THUD: Typ
peError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined        
                                        

 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load DEATH_SOUND from /sounds/
/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entri
ies')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load sound DEATH_SOUND: TypeEr
rror: Cannot read properties of undefined
d (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load VICTORY_SOUND from /sound
ds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (rea
ading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load DOOR_SLAM from /sounds/en
nvironment/door-slam.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound VICTORY_SOUND: Type
eError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)
Failed to load sound DOOR_SLAM: TypeErro
or: Cannot read properties of undefined (
(reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       
    at runNextTicks (node:internal/proce
ess/task_queues:65:5)
    at listOnTimeout (node:internal/time
ers:555:9)
    at processTimers (node:internal/time
ers:529:7)


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined     
                                        

 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load DIAMOND_COLLECT from /sou
unds/diamond/collect.mp3: TypeError: Cann
not read properties of undefined (reading
g 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       

stderr | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Failed to load sound DIAMOND_COLLECT: Ty
ypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio
o\managers\asset-loader.ts:174:104       


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
Asset loading complete: 0/9 loaded, 9 failed                                    
                                        
stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
Preloaded 0 sounds

stdout | src/tests/sound-system-e2e.test
t.ts > 4. End-to-End Tests for Complete S
Sound Workflows > Integration with Game E
Events Workflow > should integrate with c
complete game event sequence
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


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Integration with Game Events Workflow > should integrate with complete game event sequence             
Audio context closed unexpectedly       
Audio context closed unexpectedly, attempting to reinitialize                   
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize
Audio context closed unexpectedly       
Audio context closed unexpectedly, attem
mpting to reinitialize


 ❯ src/tests/sound-system-e2e.test.ts 17
7/17

 Test Files 0 passed (1)
      Tests 1 failed | 16 passed (17)   
   Start at 13:41:16
   Duration 26.46s
 ❯ src/tests/sound-system-e2e.test.ts (17 tests | 1 failed) 25062ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow  2095ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state
e transition workflow  2076ms
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Complete Game Sound Work
kflow > should handle death scenario work
kflow  2093ms
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Audio Manager Fallback W
Workflow > should gracefully fallback fro
om WebAudio to HTML5 to Silent 2ms       
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Audio Manager Fallback W
Workflow > should handle audio context su
uspension and recovery workflow  2077ms  
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Settings Persistence Wor
rkflow > should persist and restore audio
o settings across sessions 3ms
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Settings Persistence Wor
rkflow > should handle settings corruptio
on gracefully 2ms
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Performance Under Load W
Workflow > should handle intensive sound 
 event workflow efficiently  2079ms      
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Performance Under Load W
Workflow > should maintain performance du
uring concurrent operations  2090ms      
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Error Recovery Workflow 
 > should recover from network failures d
during preloading  2066ms
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Error Recovery Workflow 
 > should handle audio decoding failures 
 and continue operation  2072ms
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Error Recovery Workflow 
 > should handle localStorage failures an
nd continue operation 10ms
   × 4. End-to-End Tests for Complete So
ound Workflows > Memory Management Workfl
low > should properly cleanup resources i
in complete workflow 2071ms
     → expected "spy" to be called at le
east once
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Memory Management Workfl
low > should handle memory pressure grace
efully  2103ms
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Cross-Browser Compatibil
lity Workflow > should handle webkit pref
fixed AudioContext  2074ms
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Cross-Browser Compatibil
lity Workflow > should handle different a
audio format support 17ms
   ✓ 4. End-to-End Tests for Complete So
ound Workflows > Integration with Game Ev
vents Workflow > should integrate with co
omplete game event sequence  2130ms      

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/sound-system-e2e.test.t
ts > 4. End-to-End Tests for Complete Sou
und Workflows > Memory Management Workflo
ow > should properly cleanup resources in
n complete workflow
AssertionError: expected "spy" to be cal
lled at least once
 ❯ src/tests/sound-system-e2e.test.ts:67
78:41

    676|Xconst gainNodes = …
    677|XgainNodes.forEach(…
    678|Xexpect(node.di…
       |                                
^
    679|X});
    680|X});
 ❯ src/tests/sound-system-e2e.test.ts:67
77:23

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 16 passed (17)  
   Start at  13:41:16
   Duration  26.58s (transform 163ms, se
etup 136ms, collect 160ms, tests 25.06s, 
 environment 654ms, prepare 186ms)       

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed | 16 passed (17)
   Start at  13:41:16
   Duration  26.58s (transform 163ms, setup 136ms, collect 160ms, tests 25.06s, environment 654ms, prepare 186ms)


D:\FizzBash\TheWanderer
Let me try running just a few tests together to see if we can reproduce the issue:

Command
npm test -- --run src/tests/sound-system-e2e.test.ts -t "Memory Management Workflow"
npm test -- --run src/tests/sound-system-e2e.test.ts -t "Memory Management Workflow"
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-system-e2e.test.ts -t "Memory Management Workflow"pm test --run src/tests/sound-system-e2e.test.ts -t Memory Management Workflow
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/sound-system-e2e.test.ts -t
t Memory Management Workflow

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 4)od