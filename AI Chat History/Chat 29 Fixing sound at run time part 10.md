❯ src/audio/managers...

New Session





 FAIL  src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently

Error: Test timed out in 5000ms.

If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".

 ❯ src/tests/sound-system-performance.test.ts:767:9

Kiro
Including Steering Documents

typescript-standards.md
I can see you have a failing test in the performance test suite. The test "should handle cleanup of multiple managers efficiently" is timing out after 5000ms. Let me examine the test file to understand what's happening.

Read file(s)

sound-system-performance.test.ts 760 - 781
Let me see more of this test to understand the full context:

Read file(s)

sound-system-performance.test.ts 767 - 801
Now let me check the WebAudioManager's cleanup method to see what might be causing the timeout:

Searched workspace
Finding the cleanup method in WebAudioManager to understand what might be causing the timeout
Let me search more broadly for the cleanup method:

Searched workspace
Searching for cleanup method implementation in the audio managers
Let me check the WebAudioManager's cleanup method specifically:

Read file(s)

audio-manager.ts 950 - 971
Read file(s)

audio-manager.ts 970 - 1001
Read file(s)

audio-manager.ts 1000 - 1021
Now let me check the stopAllSounds method which is called in cleanup, as this might be where the timeout is occurring:

Searched workspace
Finding the stopAllSounds method to see if it has any async operations
Read file(s)

audio-manager.ts 937 - 956
The issue seems to be that the test is timing out, but the cleanup method itself is synchronous. Let me check if there's an issue with the test setup or if the preloadSounds method is hanging. Let me look at the test timeout configuration and see if we can identify the root cause:

Read file(s)

sound-system-performance.test.ts 1 - 51
Let me check if there's a specific timeout configuration for this test:

Searched workspace
Looking for timeout configuration in the performance test file
The issue appears to be that the test is timing out at the default 5000ms limit. Let me check if the preloadSounds method is hanging by looking at its implementation:

Searched workspace
Finding the preloadSounds method to see if it has any infinite loops or hanging operations
Read file(s)

audio-manager.ts 873 - 901
The issue might be in the assetLoader.loadAssets method. Let me check if there's an infinite loop or hanging operation there. But first, let me run the test to see the exact error:

Command
npm test -- --run src/tests/sound-system-performance.test.ts -t "should handle cleanup of multiple managers efficiently"
npm test -- --run src/tests/sound-system-performance.test.ts -t "should handle cleanup of multiple managers efficiently"
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-system-performance.test.ts -t "should handle cleanup of multiple managers efficiently"pm test --run src/tests/sound-system-performance.test.ts -t should handle cleanup of multiple managers efficiently
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/sound-system-performance.t
test.ts -t should handle cleanup of multiple managers efficiently

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 3)ode (vitest 4)ode (vitest 1)ode (vitest 5)ode (vitest 7)ode (vitest 8)ode (vitest 10)ode (vitest 12)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:28:03
   Duration 981ms
(node:5840) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created) 

 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (1)
      Tests 0 passed (20)
   Start at 13:28:03
   Duration 1.30s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined    


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 1/20                         

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined 
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 1/20                         

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined    
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 1/20                         

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 1/20                         

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined   
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 1/20                         

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 1/20                         

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:28:03
   Duration 1.40s

 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 1.94s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined    


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined 
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined    
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined   
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 2.91s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined    


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined 
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Can
nnot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined    
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Canno
ot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined   
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load VICTORY_SOUND from /sounds/environment/door-slam.mp3: TypeEr
rror: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
                                                                           
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
Asset loading complete: 0/9 loaded, 9 failed                               
                                                                           
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Preloaded 0 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined    


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined 
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined    
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined   
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.01s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined    


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined 
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined    
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined   
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 4.99s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3        
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined    


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined 
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Can
nnot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined    
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Canno
ot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined   
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load VICTORY_SOUND from /sounds/environment/door-slam.mp3: TypeEr
rror: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
                                                                           
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  

stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
Asset loading complete: 0/9 loaded, 9 failed                               
                                                                           
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Preloaded 0 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined    


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined 
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined    
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined   
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20                        

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                     
                                                                           
                                                                           
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s
stderr | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                       
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 5.97s

 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 0 passed (1)
      Tests 1 failed | 0 passed | 15 skipped (20)
   Start at 13:28:03
   Duration 6.30s
 ❯ src/tests/sound-system-performance.test.ts (20 tests | 1 failed | 19 skipped) 5009ms
   ↓ 5. Performance Tests for Audio System > Initialization Performance > should initialize WebAudioManager within performance budget
   ↓ 5. Performance Tests for Audio System > Initialization Performance > should initialize HTML5AudioManager within performance budget
   ↓ 5. Performance Tests for Audio System > Initialization Performance > should handle multiple manager instances efficiently
   ↓ 5. Performance Tests for Audio System > Preloading Performance > shoul
ld preload sounds within performance budget
   ↓ 5. Performance Tests for Audio System > Preloading Performance > shoul
ld handle concurrent preloading efficiently
   ↓ 5. Performance Tests for Audio System > Preloading Performance > shoul
ld optimize network requests during preloading
   ↓ 5. Performance Tests for Audio System > Sound Playback Performance > s
should play sounds with minimal latency
   ↓ 5. Performance Tests for Audio System > Sound Playback Performance > s
should handle rapid sequential playback efficiently
   ↓ 5. Performance Tests for Audio System > Sound Playback Performance > s
should handle concurrent sound playback efficiently
   ↓ 5. Performance Tests for Audio System > Memory Performance > should ma
anage memory efficiently during intensive use
   ↓ 5. Performance Tests for Audio System > Memory Performance > should pr
revent memory leaks during long-running sessions
   ↓ 5. Performance Tests for Audio System > Event System Performance > sho
ould handle sound event generation efficiently
   ↓ 5. Performance Tests for Audio System > Event System Performance > sho
ould handle sound event emission efficiently
   ↓ 5. Performance Tests for Audio System > Event System Performance > sho
ould maintain performance under event system stress
   ↓ 5. Performance Tests for Audio System > Cleanup Performance > should c
cleanup resources efficiently
   × 5. Performance Tests for Audio System > Cleanup Performance > should h
handle cleanup of multiple managers efficiently 5007ms
     → Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument o
or configure it globally with "testTimeout".
   ↓ 5. Performance Tests for Audio System > Performance Regression Detecti
ion > should maintain consistent performance across operations
   ↓ 5. Performance Tests for Audio System > Performance Regression Detecti
ion > should detect performance bottlenecks in audio operations
   ↓ 5. Performance Tests for Audio System > Performance Monitoring and Met
trics > should provide performance metrics for monitoring
   ↓ 5. Performance Tests for Audio System > Performance Monitoring and Met
trics > should track performance trends over time

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/sound-system-performance.test.ts > 5. Performance Tests fo
or Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Error: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument o
or configure it globally with "testTimeout".
 ❯ src/tests/sound-system-performance.test.ts:767:9
    765|X});
    766|
    767|Xit('should handle cleanup of multiple managers efficientl…
       |X^
    768|Xconst managers: WebAudioManager[] = [];
    769|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 19 skipped (20)
   Start at  13:28:03
   Duration  6.44s (transform 162ms, setup 111ms, collect 170ms, tests 5.01
1s, environment 649ms, prepare 189ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Perfect! Now I can see the root cause. The test is timing out because the preloadSounds() method is failing to load assets due to an error in the asset-loader at line 174:104. The error is:

TypeError: Cannot read properties of undefined (reading 'entries')
Let me check line 174 in the asset-loader:

Read file(s)

asset-loader.ts 170 - 181
The issue is on line 174 where response.headers.entries() is being called, but response.headers is undefined. This suggests that the mock fetch in the test environment isn't properly setting up the headers. Let me check the mock setup in the performance test:

Searched workspace
Looking for the fetch mock setup in the performance test
Let me find the createPerformanceMockFetch function:

Searched workspace
Finding the createPerformanceMockFetch function definition
Read file(s)

sound-system-performance.test.ts 200 - 231
Found the issue! The mock fetch response doesn't include a headers property, but the asset-loader is trying to access response.headers.entries(). Let me fix this by updating the mock fetch to include proper headers:

Accepted edits to

sound-system-performance.test.ts


Now let's run the test again to see if it passes:

Command
npm test -- --run src/tests/sound-system-performance.test.ts -t "should handle cleanup of multiple managers efficiently"
npm test -- --run src/tests/sound-system-performanc
ce.test.ts -t "should handle cleanup of multiple managers efficiently"
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-system-performance.test.ts -t "should handle cleanup of multiple managers efficiently"pm test --run src/tests/sound-system-performance.test.ts -t should handle cleanup of multiple managers efficiently
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/sound-system-performance.t
test.ts -t should handle cleanup of multiple managers efficiently

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 1)ode (vitest 4)ode (vitest 5)ode (vitest 3)ode (vitest 6)ode (vitest 7)ode (vitest 12)ode (vitest 13)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:29:04
   Duration 956ms

 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:29:04
   Duration 1.18s
(node:61116) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created) 

 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (1)
      Tests 0 passed (20)
   Start at 13:29:04
   Duration 1.49s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 0 passed | 1 skipped (20)
   Start at 13:29:04
   Duration 1.59s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Preloaded 9 sounds


 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 0 passed (1)
      Tests 1 passed | 15 skipped (20)
   Start at 13:29:04
   Duration 1.81s
 ✓ src/tests/sound-system-performance.test.ts (20 tests | 19 skipped) 309ms
   ↓ 5. Performance Tests for Audio System > Initialization Performance > should initialize WebAudioManager within performance budget
   ↓ 5. Performance Tests for Audio System > Initialization Performance > should initialize HTML5AudioManager within performance budget
   ↓ 5. Performance Tests for Audio System > Initialization Performance > should handle multiple manager instances efficiently
   ↓ 5. Performance Tests for Audio System > Preloading Performance > shoul
ld preload sounds within performance budget
   ↓ 5. Performance Tests for Audio System > Preloading Performance > shoul
ld handle concurrent preloading efficiently
   ↓ 5. Performance Tests for Audio System > Preloading Performance > shoul
ld optimize network requests during preloading
   ↓ 5. Performance Tests for Audio System > Sound Playback Performance > s
should play sounds with minimal latency
   ↓ 5. Performance Tests for Audio System > Sound Playback Performance > s
should handle rapid sequential playback efficiently
   ↓ 5. Performance Tests for Audio System > Sound Playback Performance > s
should handle concurrent sound playback efficiently
   ↓ 5. Performance Tests for Audio System > Memory Performance > should ma
anage memory efficiently during intensive use
   ↓ 5. Performance Tests for Audio System > Memory Performance > should pr
revent memory leaks during long-running sessions
   ↓ 5. Performance Tests for Audio System > Event System Performance > sho
ould handle sound event generation efficiently
   ↓ 5. Performance Tests for Audio System > Event System Performance > sho
ould handle sound event emission efficiently
   ↓ 5. Performance Tests for Audio System > Event System Performance > sho
ould maintain performance under event system stress
   ↓ 5. Performance Tests for Audio System > Cleanup Performance > should c
cleanup resources efficiently
   ✓ 5. Performance Tests for Audio System > Cleanup Performance > should h
handle cleanup of multiple managers efficiently  307ms
   ↓ 5. Performance Tests for Audio System > Performance Regression Detecti
ion > should maintain consistent performance across operations
   ↓ 5. Performance Tests for Audio System > Performance Regression Detecti
ion > should detect performance bottlenecks in audio operations
   ↓ 5. Performance Tests for Audio System > Performance Monitoring and Met
trics > should provide performance metrics for monitoring
   ↓ 5. Performance Tests for Audio System > Performance Monitoring and Met
trics > should track performance trends over time

 Test Files  1 passed (1)
      Tests  1 passed | 19 skipped (20)
   Start at  13:29:04
   Duration  1.96s (transform 171ms, setup 110ms, collect 193ms, tests 309m
ms, environment 640ms, prepare 328ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Excellent! The test is now passing. The fix worked perfectly. Let me run all the performance tests to make sure I didn't break anything else:

Command
npm test -- --run src/tests/sound-system-performance.test.ts
npm test -- --run src/tests/sound-system-performanc
ce.test.ts
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/sound-system-performance.test.tspm test --run src/tests/sound-system-performance.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/sound-system-performance.t
test.ts

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 4)ode (vitest 6)ode (vitest 5)ode (vitest 8)ode (vitest 10)ode (vitest 14)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:29:24
   Duration 925ms
(node:46004) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created) 

 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (1)
      Tests 0 passed (20)
   Start at 13:29:24
   Duration 1.36s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Initialization Performance > should initialize WebAudioManager within performance budget
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Initialization Performance > should initialize HTML5Audi
ioManager within performance budget
HTML5 Audio initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Initialization Performance > should handle multiple mana
ager instances efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should preload sounds within pe
erformance budget
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
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


 ❯ src/tests/sound-system-performance.test.ts 1/20

 Test Files 0 passed (1)
      Tests 1 passed (20)
   Start at 13:29:24
   Duration 1.47s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should handle concurrent preloa
ading efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Preloading Performance > should optimize network request
ts during preloading
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should play sounds with min
nimal latency
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests  
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle rapid sequent
tial playback efficiently
Preloaded 9 sounds


 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 0 passed (1)
      Tests 6 passed (20)
   Start at 13:29:24
   Duration 1.68s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle concurrent so
ound playback efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle concurrent so
ound playback efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle concurrent so
ound playback efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle concurrent so
ound playback efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle concurrent so
ound playback efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle concurrent so
ound playback efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle concurrent so
ound playback efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle concurrent so
ound playback efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle concurrent so
ound playback efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Sound Playback Performance > should handle concurrent so
ound playback efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should manage memory efficiently du
uring intensive use
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Memory Performance > should prevent memory leaks during 
 long-running sessions
Preloaded 9 sounds


 ❯ src/tests/sound-system-performance.test.ts 9/20

 Test Files 0 passed (1)
      Tests 9 passed (20)
   Start at 13:29:24
   Duration 1.99s

 ❯ src/tests/sound-system-performance.test.ts 11/20

 Test Files 0 passed (1)
      Tests 11 passed (20)
   Start at 13:29:24
   Duration 2.10s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event emi
ission efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event emi
ission efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event emi
ission efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event emi
ission efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event emi
ission efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event emi
ission efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event emi
ission efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event emi
ission efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event emi
ission efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should handle sound event emi
ission efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should maintain performance u
under event system stress
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


 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 0 passed (1)
      Tests 12 passed (20)
   Start at 13:29:24
   Duration 2.21s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance under event system stress
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance u
under event system stress
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should maintain performance u
under event system stress
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should maintain performance u
under event system stress
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should maintain performance u
under event system stress
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should maintain performance u
under event system stress
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should maintain performance u
under event system stress
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should maintain performance u
under event system stress
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should maintain performance u
under event system stress
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Event System Performance > should maintain performance u
under event system stress
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should cleanup resources efficient
tly
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 0 passed (1)
      Tests 15 passed (20)
   Start at 13:29:24
   Duration 2.42s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Cleanup Performance > should handle cleanup of multiple 
 managers efficiently
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Regression Detection > should maintain consi
istent performance across operations
Preloaded 9 sounds


 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 0 passed (1)
      Tests 16 passed (20)
   Start at 13:29:24
   Duration 2.75s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should provide performance metrics for monitoring
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should provide perf
formance metrics for monitoring
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should provide perf
formance metrics for monitoring
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should provide perf
formance metrics for monitoring
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should provide perf
formance metrics for monitoring
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should provide perf
formance metrics for monitoring
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should provide perf
formance metrics for monitoring
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should provide perf
formance metrics for monitoring
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should provide perf
formance metrics for monitoring
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should provide perf
formance metrics for monitoring
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should provide perf
formance metrics for monitoring
Preloaded 9 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests 
 for Audio System > Performance Monitoring and Metrics > should track perfor
rmance trends over time
Preloaded 9 sounds


 ❯ src/tests/sound-system-performance.test.ts 20/20

 Test Files 0 passed (1)
      Tests 20 passed (20)
   Start at 13:29:24
   Duration 2.95s
 ✓ src/tests/sound-system-performance.test.ts (20 tests) 1544ms
   ✓ 5. Performance Tests for Audio System > Initialization Performance > should initialize WebAudioManager within performance budget 8ms
   ✓ 5. Performance Tests for Audio System > Initialization Performance > should initialize HTML5AudioManager within performance budget 2ms
   ✓ 5. Performance Tests for Audio System > Initialization Performance > should handle multiple manager instances efficiently 11ms
   ✓ 5. Performance Tests for Audio System > Preloading Performance > shoul
ld preload sounds within performance budget 66ms
   ✓ 5. Performance Tests for Audio System > Preloading Performance > shoul
ld handle concurrent preloading efficiently 69ms
   ✓ 5. Performance Tests for Audio System > Preloading Performance > shoul
ld optimize network requests during preloading 60ms
   ✓ 5. Performance Tests for Audio System > Sound Playback Performance > s
should play sounds with minimal latency 44ms
   ✓ 5. Performance Tests for Audio System > Sound Playback Performance > s
should handle rapid sequential playback efficiently 88ms
   ✓ 5. Performance Tests for Audio System > Sound Playback Performance > s
should handle concurrent sound playback efficiently 79ms
   ✓ 5. Performance Tests for Audio System > Memory Performance > should ma
anage memory efficiently during intensive use 102ms
   ✓ 5. Performance Tests for Audio System > Memory Performance > should pr
revent memory leaks during long-running sessions 196ms
   ✓ 5. Performance Tests for Audio System > Event System Performance > sho
ould handle sound event generation efficiently 14ms
   ✓ 5. Performance Tests for Audio System > Event System Performance > sho
ould handle sound event emission efficiently 78ms
   ✓ 5. Performance Tests for Audio System > Event System Performance > sho
ould maintain performance under event system stress 67ms
   ✓ 5. Performance Tests for Audio System > Cleanup Performance > should c
cleanup resources efficiently 64ms
   ✓ 5. Performance Tests for Audio System > Cleanup Performance > should h
handle cleanup of multiple managers efficiently  332ms
   ✓ 5. Performance Tests for Audio System > Performance Regression Detecti
ion > should maintain consistent performance across operations 80ms
   ✓ 5. Performance Tests for Audio System > Performance Regression Detecti
ion > should detect performance bottlenecks in audio operations 15ms        
   ✓ 5. Performance Tests for Audio System > Performance Monitoring and Met
trics > should provide performance metrics for monitoring 73ms
   ✓ 5. Performance Tests for Audio System > Performance Monitoring and Met
trics > should track performance trends over time 93ms

 Test Files  1 passed (1)
      Tests  20 passed (20)
   Start at  13:29:24
   Duration  3.03s (transform 211ms, setup 123ms, collect 233ms, tests 1.54
4s, environment 611ms, prepare 160ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Perfect! All 20 performance tests are now passing. The fix was successful. Let me also run a quick check to make sure I didn't break any other tests by running a broader test suite:

Command
npm test -- --run src/tests/audio/
npm test -- --run src/tests/audio/
:\Windows\System32\cmd.exe - npm  test -- --run src/tests/audio/pm test --run src/tests/audio/
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --run src/tests/audio/

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 1)ode (vitest 5)ode (vitest 4)ode (vitest 9)ode (vitest 13)ode (vitest 14)
 Test Files 0 passed (4)
      Tests 0 passed (0)
   Start at 13:29:44
   Duration 933ms

 ❯ src/tests/audio/asset-loader.test.ts [queued]

 Test Files 0 passed (4)
      Tests 0 passed (0)
   Start at 13:29:44
   Duration 1.15s
(node:41784) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created) 
(node:38532) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created) 
(node:55024) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created) 
(node:23248) [DEP0040] DeprecationWarning: The `punycode` module is depreca
ated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created) 

 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]

 Test Files 0 passed (4)
      Tests 0 passed (16)
   Start at 13:29:44
   Duration 1.45s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuff
fer > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14

 Test Files 1 passed (4)
      Tests 29 passed (81)
   Start at 13:29:44
   Duration 1.55s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                       
[AssetLoader] Error loading sounds/test.mp3: Error: Network error          
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14

 Test Files 1 passed (4)
      Tests 29 passed (81)
   Start at 13:29:44
   Duration 1.55s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                       
[AssetLoader] Attempting to load: sounds/test.ogg                          
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
                                                                           
 ❯ src/tests/audio/asset-loader.test.ts 1/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23                     
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14

 Test Files 1 passed (4)
      Tests 29 passed (81)
   Start at 13:29:44
   Duration 1.55s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                       
Failed to load test_sound from sounds/test.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14

 Test Files 1 passed (4)
      Tests 29 passed (81)
   Start at 13:29:44
   Duration 1.55s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Response for sounds/test.ogg: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/ogg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14

 Test Files 1 passed (4)
      Tests 29 passed (81)
   Start at 13:29:44
   Duration 1.55s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                          
[AssetLoader] Error loading sounds/test.mp3: Error: Network error          
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14

 Test Files 1 passed (4)
      Tests 29 passed (81)
   Start at 13:29:44
   Duration 1.55s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support                                                               
Initialized gain node pool with 5 nodes                                    
Web Audio API initialized successfully                                     
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspension                                                                     
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > initialization > should handle audio context susp
pension
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should preload sounds with 
 progress tracking
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should preload sounds with 
 progress tracking
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

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should preload sounds with 
 progress tracking
Asset loading complete: 9/9 loaded, 0 failed

 ✓ src/tests/audio/audio-optimization.test.ts (28 tests) 54ms

 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14

 Test Files 1 passed (4)
      Tests 29 passed (81)
   Start at 13:29:44
   Duration 1.55s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

 ✓ src/tests/audio/hooks/use-audio-settings.test.ts (14 tests) 55ms        

 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23ode (vitest 3)

 Test Files 2 passed (4)
      Tests 49 passed (81)
   Start at 13:29:44
   Duration 1.76s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                          
[AssetLoader] Error loading sounds/test.mp3: Error: Network error          
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23

 Test Files 2 passed (4)
      Tests 49 passed (81)
   Start at 13:29:44
   Duration 1.76s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                          
[AssetLoader] Attempting to load: sounds/test.ogg                          
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
                                                                           
 ❯ src/tests/audio/asset-loader.test.ts 5/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23

 Test Files 2 passed (4)
      Tests 49 passed (81)
   Start at 13:29:44
   Duration 1.76s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                          
Failed to load test_sound from sounds/test.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23

 Test Files 2 passed (4)
      Tests 49 passed (81)
   Start at 13:29:44
   Duration 1.76s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                          
[AssetLoader] Response for sounds/test.ogg: 200 OK                         
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }           
                                                                           
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                
[AssetLoader] Attempting to load: sounds/test.mp3                          
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23

 Test Files 2 passed (4)
      Tests 49 passed (81)
   Start at 13:29:44
   Duration 1.76s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                
[AssetLoader] Error loading sounds/test.mp3: Error: Network error          
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23

 Test Files 2 passed (4)
      Tests 49 passed (81)
   Start at 13:29:44
   Duration 1.76s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking                                                          
Preloaded 9 sounds                                                         
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should apply optimization during preloading                                                           
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should apply optimization d
during preloading
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

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should apply optimization d
during preloading
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should apply optimization d
during preloading
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
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


 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23

 Test Files 2 passed (4)
      Tests 49 passed (81)
   Start at 13:29:44
   Duration 1.76s
ode (vitest 4)stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Netwo
ork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                
[AssetLoader] Attempting to load: sounds/test.mp3                          
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
                                                                           
 ❯ src/tests/audio/asset-loader.test.ts 6/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                
[AssetLoader] Error loading sounds/test.mp3: Error: Network error          
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                
[AssetLoader] Attempting to load: sounds/test.ogg                          
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
                                                                           
 ❯ src/tests/audio/asset-loader.test.ts 6/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuff
fer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                
[AssetLoader] Attempting to load: sounds/test.ogg                          
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
                                                                           
 ❯ src/tests/audio/asset-loader.test.ts 6/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                
[AssetLoader] Error loading sounds/test.ogg: Error: Network error          
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuff
fer > should throw error if all sources fail
Failed to load test_sound from sounds/test.ogg: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                             
[AssetLoader] Attempting to load: sounds/test.mp3                          
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                             
[AssetLoader] Response for sounds/test.mp3: 404 Not Found
[AssetLoader] Response headers: { 'content-type': 'text/html' }


 ❯ src/tests/audio/asset-loader.test.ts 6/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                             
[AssetLoader] Error loading sounds/test.mp3: Error: HTTP 404: Not Found    
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:177:31   
                                                                           
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                             
Failed to load test_sound from sounds/test.mp3: Error: HTTP 404: Not Found 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:177:31   


 ❯ src/tests/audio/asset-loader.test.ts 6/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors                                   
[AssetLoader] Attempting to load: sounds/test.mp3                          
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors                                   
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/asset-loader.test.ts 6/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors                                   
[AssetLoader] Error loading sounds/test.mp3: Error: Invalid audio data     
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:207:68 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuff
fer > should handle audio decoding errors
Failed to load test_sound from sounds/test.mp3: Error: Invalid audio data  
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:207:68 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 6/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout                                                
[AssetLoader] Attempting to load: sounds/test.mp3                          
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
                                                                           
 ❯ src/tests/audio/asset-loader.test.ts 6/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 52 passed (81)
   Start at 13:29:44
   Duration 1.98s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 57 passed (81)
   Start at 13:29:44
   Duration 2.19s
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
 should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > 
 should handle partial failures
[AssetLoader] Attempting to load: sounds/sound1.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Response for sounds/sound1.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 57 passed (81)
   Start at 13:29:44
   Duration 2.19s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                             
[AssetLoader] Error loading sounds/sound2.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:297:40 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:297:40 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 57 passed (81)
   Start at 13:29:44
   Duration 2.19s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                             
[AssetLoader] Attempting to load: sounds/sound2.mp3                        
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
                                                                           
 ❯ src/tests/audio/asset-loader.test.ts 11/16                              
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 57 passed (81)
   Start at 13:29:44
   Duration 2.19s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                             
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')                                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53   
    at new Promise (<anonymous>)                                           
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)                                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:30   

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > 
 should handle partial failures
Failed to load sound sound2: TypeError: Cannot read properties of undefined
d (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53   
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\manager
rs\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:30   


 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 57 passed (81)
   Start at 13:29:44
   Duration 2.19s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                             
Asset loading complete: 1/2 loaded, 1 failed                               
                                                                           
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit progress events                                         
[AssetLoader] Attempting to load: sounds/test.mp3                          
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress trac
cking > should emit progress events
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress trac
cking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 57 passed (81)
   Start at 13:29:44
   Duration 2.19s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure                                 
[AssetLoader] Error loading sounds/test.mp3: Error: Network error          
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 11/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 2 passed (4)
      Tests 57 passed (81)
   Start at 13:29:44
   Duration 2.19s
ode (vitest 1)stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure                                 
[AssetLoader] Error loading sounds/test.mp3: Error: Network error          
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress trac
cking > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41 
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats                                   
[AssetLoader] Attempting to load: sounds/test.mp3                          
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

 ✓ src/tests/audio/asset-loader.test.ts (16 tests) 684ms
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/player/dig.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3               
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3                  
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
                                                                           
                                                                           
                                                                           
                                                                           
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/player/death.mp3                 
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3        
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network error      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3              
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error                                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23

 Test Files 3 passed (4)
      Tests 62 passed (81)
   Start at 13:29:44
   Duration 2.95s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/player/dig.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3               
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Network
k error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3                  
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Network e
error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/player/death.mp3                 
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3        
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load VICTORY_SOUND from /sounds/environment/door-slam.mp3: Error:
: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3              
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           

 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error: Net
twork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should handle loading failu
ures gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:165:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5) 
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                             
Asset loading complete: 0/9 loaded, 9 failed                               
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Preloaded 0 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > enhanced preloading > should skip preloading in f
fallback mode
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode                                                               
Audio manager in fallback mode, skipping preload                           
                                                                           
                                                                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23                     

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report                                                                 
Initialized gain node pool with 5 nodes                                    
Web Audio API initialized successfully                                     
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimizat
tion report
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

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > optimization reporting > should provide optimizat
tion report
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > optimization reporting > should provide optimizat
tion report
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > optimization reporting > should handle empty buff
fer set
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > loading state management > should track loading s
state correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > loading state management > should track loading s
state correctly
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

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > loading state management > should track loading s
state correctly
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > loading state management > should track loading s
state correctly
Preloaded 9 sounds


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 5/23

 Test Files 3 passed (4)
      Tests 63 passed (81)
   Start at 13:29:44
   Duration 3.81s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads       
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads       
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

 Test Files 3 passed (4)
      Tests 67 passed (81)
   Start at 13:29:44
   Duration 4.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads       
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:223:44                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:223:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 3 passed (4)
      Tests 67 passed (81)
   Start at 13:29:44
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads       
[AssetLoader] Attempting to load: /sounds/player/walk.mp3                  
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads       
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should retry failed loads       
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should retry failed loads       
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
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


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 3 passed (4)
      Tests 67 passed (81)
   Start at 13:29:44
   Duration 4.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Invalid audio  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Invalid audi
io
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Invalid audio  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Invalid audio 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/death.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Inval
lid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Invalid audio      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Invalid aud
dio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23

 Test Files 3 passed (4)
      Tests 67 passed (81)
   Start at 13:29:44
   Duration 4.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Invalid audio  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/player/dig.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3               
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Invalid audio                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3                  
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Invalid audio  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/player/death.mp3                 
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
                                                                           
                                                                           
                                                                           
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Invalid audio 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3        
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Invalid audio                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Invalid audio      
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3              
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Invalid audio                                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 5.93s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
Audio context suspended for 5 seconds. Click anywhere to enable audio.     

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Invalid audio  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Invalid aud
dio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load sound PLAYER_WALK: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/player/dig.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load sound PLAYER_DIG: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3               
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Invalid audio                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Invalid
d audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load sound BOULDER_MOVE: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
                                                                           
                                                                           
                                                                           
                                                                           
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Invalid audio  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Invalid audi
io
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load sound ARROW_MOVE: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Invalid audio   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Invalid a
audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load sound COLLISION_THUD: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/player/death.mp3                 
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Invalid audio 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Invalid au
udio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load sound DEATH_SOUND: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3        
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK       
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Invalid audio                                                                   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load VICTORY_SOUND from /sounds/environment/door-slam.mp3: Error:
: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error: Inv
valid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Failed to load sound VICTORY_SOUND: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Failed to load sound DOOR_SLAM: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3              
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Invalid audio                                                                         
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:244:68                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error: Inv
valid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > error recovery > should handle decode errors     
Failed to load sound DIAMOND_COLLECT: Error: Invalid audio
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:244:68
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
Asset loading complete: 0/9 loaded, 9 failed                               
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors     
Preloaded 0 sounds                                                         

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
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
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined 
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined    
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined     
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined   
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined und
defined
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: 404            
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:257:44                                                                  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                         
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: 404
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:257:44
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runne
er/dist/chunk-hooks.js:1729:8)
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read
d properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot rea
ad properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: C
Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23

 Test Files 3 passed (4)
      Tests 68 passed (81)
   Start at 13:29:44
   Duration 7.02s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/player/dig.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined     


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3               
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined 


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3                  
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined     


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/player/death.mp3                 
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined   


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties o
of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3        
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined und
defined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read pro
operties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3              
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.01s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/player/dig.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined     


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3               
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined 


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Can
nnot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3                  
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined    


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                   
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined     


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Canno
ot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/player/death.mp3                 
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined   


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot
t read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of unde
efined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3        
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined und
defined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)               
    at listOnTimeout (node:internal/timers:555:9)                          
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load VICTORY_SOUND from /sounds/environment/door-slam.mp3: TypeEr
rror: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3              
[AssetLoader] Current location: http://localhost:3000/                     
[AssetLoader] Base URL: http://localhost:3000                              
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  
                                                                           
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError:
: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > WebAudioManager > format fallback > should try multiple formats    
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104  


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
Asset loading complete: 0/9 loaded, 9 failed                               
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > format fallback > should try multiple formats    
Preloaded 0 sounds                                                         

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > HTML5AudioManager > initialization > should initialize with HTML5 A
Audio support
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > HTML5AudioManager > preloading with format optimization > should pr
reload sounds with format filtering
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > HTML5AudioManager > preloading with format optimization > should pr
reload sounds with format filtering
HTML5 Audio preloaded 9/9 sounds


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should preload sounds with format filtering                                         
Error cleaning up audio element: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:431:23                                                                       
    at Map.forEach (<anonymous>)                                           
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manager
rs\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:43
31:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manager
rs\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:43
31:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manager
rs\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:43
31:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manager
rs\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:43
31:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manager
rs\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:43
31:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manager
rs\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:43
31:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manager
rs\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:43
31:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manager
rs\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1442:25)
Error cleaning up audio element: TypeError: audio.load is not a function   
    at D:\FizzBash\TheWanderer\src\audio\managers\html5-audio-manager.ts:43
31:23
    at Map.forEach (<anonymous>)
    at HTML5AudioManager.cleanup (D:\FizzBash\TheWanderer\src\audio\manager
rs\html5-audio-manager.ts:427:28)
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.
.ts:286:21
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chu
unk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest
t/runner/dist/chunk-hooks.js:1863:10)
    at runHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1436:51)
    at callSuiteHook (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1442:25)


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                                                   
HTML5 Audio initialized successfully                                       
                                                                           
                                                                           
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23                    

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
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


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > preloading with format optimization > should handle unsupported formats                                                   
HTML5 Audio preloaded 0/9 sounds                                           
                                                                           
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > HTML5AudioManager > loading state > should provide loading state   
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > HTML5AudioManager > loading state > should provide optimization rep
port
HTML5 Audio initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > HTML5AudioManager > loading state > should provide optimization rep
port
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

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > createAudioManager factory > should create WebAudioManager when Web
b Audio API is available
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > createAudioManager factory > should create HTML5AudioManager when o
only HTML5 Audio is available
HTML5 Audio initialized successfully


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create HTML5AudioManager when only HTML5 Audio is available                                               
Web Audio API not supported, using HTML5 Audio fallback                    
                                                                           
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > createAudioManager factory > should create SilentAudioManager when no audio support
No audio support detected, using silent mode
No audio support detected, using silent mode


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
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

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > integration with existing functionality > should maintain existing 
 playSound functionality
Asset loading complete: 9/9 loaded, 0 failed


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 11/23

 Test Files 3 passed (4)
      Tests 69 passed (81)
   Start at 13:29:44
   Duration 8.98s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing playSound functionality
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > integration with existing functionality > should maintain existing mute functionality
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

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > integration with existing functionality > should maintain existing 
 mute functionality
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > integration with existing functionality > should maintain existing 
 mute functionality
Preloaded 9 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > integration with existing functionality > should maintain existing 
 cleanup functionality
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

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > integration with existing functionality > should maintain existing 
 cleanup functionality
Asset loading complete: 9/9 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Ma
anager > integration with existing functionality > should maintain existing 
 cleanup functionality
Preloaded 9 sounds


 ❯ src/tests/audio/enhanced-audio-manager.test.ts 22/23

 Test Files 3 passed (4)
      Tests 80 passed (81)
   Start at 13:29:44
   Duration 9.20s
 ✓ src/tests/audio/enhanced-audio-manager.test.ts (23 tests) 7671ms        
   ✓ Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully  2016ms
   ✓ Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads  1075ms
   ✓ Enhanced Audio Manager > WebAudioManager > error recovery > should handle decode errors  2015ms
   ✓ Enhanced Audio Manager > WebAudioManager > format fallback > should tr
ry multiple formats  2021ms

 Test Files  4 passed (4)
      Tests  81 passed (81)
   Start at  13:29:44
   Duration  9.30s (transform 378ms, setup 518ms, collect 582ms, tests 8.46
6s, environment 3.15s, prepare 802ms)

ode (vitest 2):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
The tests are running successfully. Let me summarize what I fixed:

Summary
I successfully fixed the failing performance test "should handle cleanup of multiple managers efficiently" that was timing out after 5000ms.

Root Cause
The test was failing because the mock fetch function in the performance test suite was missing proper headers implementation. The asset-loader was trying to access response.headers.entries() but response.headers was undefined, causing a TypeError: Cannot read properties of undefined (reading 'entries') error.

Solution
I updated the createPerformanceMockFetch function in src/tests/sound-system-performance.test.ts to include proper mock headers:

// Before (missing headers)
resolve({
    ok: true,
    arrayBuffer: () => { /* ... */ }
});

// After (with proper headers)
resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: {
        entries: () => [['content-type', 'audio/mpeg']],
        get: (name: string) => name === 'content-type' ? 'audio/mpeg' : null
    },
    arrayBuffer: () => { /* ... */ }
});
Result
The failing test now passes consistently
All 20 performance tests are passing
The fix doesn't break any existing functionality
Asset loading now works properly in the test environment with proper logging of response headers
The test was timing out because the preloadSounds() method was hanging due to the fetch error, but now it completes successfully and the cleanup performance test can proceed to measure the actual cleanup performance as intended.


1 change accepted
(
View all
)
Revert


sound-system-performance.test.ts






Claude Sonnet 4.0
Autopilot
