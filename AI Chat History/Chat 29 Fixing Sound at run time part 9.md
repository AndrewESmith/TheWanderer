New Session





 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and Fallbacks > Sound File Loading Errors > should retry failed sound loads    

 FAIL  src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests

TypeError: Cannot read properties of undefined (reading 'then')

 ❯ src/audio/managers/asset-loader.ts:170:53

Kiro
Including Steering Documents

typescript-standards.md
I can see there's a TypeScript error in the asset-loader.ts file where it's trying to call .then() on something that's undefined. Let me examine the current files to understand the issue.

Read file(s)

asset-loader.ts

asset-loader.test.ts
Looking at the error and the code, I can see the issue is on line 170 in the loadAudioFile method. The problem is that when the fetch promise is rejected, the code tries to call .then() on the result of this.loadAudioFile(), but it's not properly handling the async/await pattern.

Let me examine line 170 more closely:

Read file(s)

asset-loader.ts 160 - 181
Read file(s)

asset-loader.ts 175 - 196
Read file(s)

asset-loader.ts 190 - 211
I found the issue! The problem is in the retry logic. The code is mixing async/await with Promise-style .then()/.catch(). In the catch block, it's trying to use await on this.loadAudioFile() which returns a Promise, but then it's trying to call .then() on the result, which would be undefined since await resolves the Promise.

The issue is that the code is already inside a .catch() block of a Promise chain, but it's trying to use async/await syntax. Let me fix this:

Accepted edits to

asset-loader.ts


Now let's run the tests to see if this fixes the issue:

Command
npm test -- src/tests/audio/asset-loader.test.ts
npm test -- src/tests/audio/asset-loader.test.ts
:\Windows\System32\cmd.exe - npm  test -- src/tests/audio/asset-loader.test.tspm test src/tests/audio/asset-loader.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts src/tests/audio/asset-loader.test.ts       

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 3)ode (vitest 5)ode (vitest 9)ode (vitest 10)ode (vitest 12)ode (vitest 13)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:22:01
   Duration 927ms
(node:46976) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/audio/asset-loader.test.ts 0/16

 Test Files 0 passed (1)
      Tests 0 passed (16)
   Start at 13:22:01
   Duration 1.15s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:22:01
   Duration 1.25s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                         
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:22:01
   Duration 1.25s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                         
[AssetLoader] Attempting to load: sounds/test.ogg                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:22:01
   Duration 1.25s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                         
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:22:01
   Duration 1.25s
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
   Start at 13:22:01
   Duration 1.25s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40  
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
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:22:01
   Duration 1.25s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:22:01
   Duration 1.47s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:22:01
   Duration 1.47s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
[AssetLoader] Attempting to load: sounds/test.ogg                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:22:01
   Duration 1.47s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:22:01
   Duration 1.47s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
[AssetLoader] Response for sounds/test.ogg: undefined undefined             
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 5/16                                
                                                                            
 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:22:01
   Duration 1.47s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
[AssetLoader] Error loading sounds/test.ogg: TypeError: Cannot read properties of undefined (reading 'entries')                                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   
Retry 1/2 for sounds/test.ogg: TypeError: Cannot read properties of undefined (reading 'entries')                                                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:174:104   


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:22:01
   Duration 1.47s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
[AssetLoader] Attempting to load: sounds/test.ogg                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:22:01
   Duration 1.47s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
Failed to load test_sound from sounds/test.ogg: TypeError: Cannot read properties of undefined (reading 'then')                                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53    
    at new Promise (<anonymous>)                                            
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:30    


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:22:01
   Duration 1.47s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Attempting to load: sounds/test.mp3                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:22:01
   Duration 1.47s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41  
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


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 1 failed | 4 passed (16)
   Start at 13:22:01
   Duration 1.47s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:22:01
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:22:01
   Duration 1.68s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Attempting to load: sounds/test.ogg                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:22:01
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41  
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
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41  
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


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:22:01
   Duration 1.68s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Attempting to load: sounds/test.ogg                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:22:01
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Error loading sounds/test.ogg: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should throw error if all sources fail
Failed to load test_sound from sounds/test.ogg: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:152:41  
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


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:22:01
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
   Start at 13:22:01
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
   Start at 13:22:01
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
   Start at 13:22:01
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors                                     
[AssetLoader] Error loading sounds/test.mp3: Error: Invalid audio data      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:204:68  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should handle audio decoding errors
Failed to load test_sound from sounds/test.mp3: Error: Invalid audio data   
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:204:68  
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


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:22:01
   Duration 1.68s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout                                                  
[AssetLoader] Attempting to load: sounds/test.mp3                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 1 failed | 5 passed (16)
   Start at 13:22:01
   Duration 1.68s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:22:01
   Duration 1.90s
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

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > s
should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > s
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

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:22:01
   Duration 1.90s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                               
[AssetLoader] Error loading sounds/sound2.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:294:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:294:40  
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


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:22:01
   Duration 1.90s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                               
[AssetLoader] Attempting to load: sounds/sound2.mp3                         
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:22:01
   Duration 1.90s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                               
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')                                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53    
    at new Promise (<anonymous>)                                            
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:30    

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > s
should handle partial failures
Failed to load sound sound2: TypeError: Cannot read properties of undefined 
 (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53    
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers
s\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:30    


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:22:01
   Duration 1.90s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                               
Asset loading complete: 1/2 loaded, 1 failed                                
                                                                            
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit progress events                                           
[AssetLoader] Attempting to load: sounds/test.mp3                           
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress track
king > should emit progress events
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress track
king > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:22:01
   Duration 1.90s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure                                   
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:354:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:354:41  
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


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 1 failed | 10 passed (16)
   Start at 13:22:01
   Duration 1.90s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:354:41  
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

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress track
king > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:354:41  
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

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimiz
zation > should prefer supported formats
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimiz
zation > should prefer supported formats
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

 ❯ src/tests/audio/asset-loader.test.ts (16 tests | 1 failed) 769ms
   ✓ AssetLoader > constructor > should initialize with default options 3ms 
   ✓ AssetLoader > constructor > should accept custom options 0ms
   ✓ AssetLoader > loadAudioBuffer > should successfully load audio buffer f
from first source 5ms
   ✓ AssetLoader > loadAudioBuffer > should fallback to second source if fir
rst fails 7ms
   × AssetLoader > loadAudioBuffer > should retry failed requests 212ms     
     → Cannot read properties of undefined (reading 'then')
   ✓ AssetLoader > loadAudioBuffer > should throw error if all sources fail 
 212ms
   ✓ AssetLoader > loadAudioBuffer > should handle HTTP errors 1ms
   ✓ AssetLoader > loadAudioBuffer > should handle audio decoding errors 1ms
   ✓ AssetLoader > loadAudioBuffer > should respect timeout 107ms
   ✓ AssetLoader > loadAssets > should load all preload assets 1ms
   ✓ AssetLoader > loadAssets > should handle partial failures 108ms        
   ✓ AssetLoader > progress tracking > should emit progress events 1ms      
   ✓ AssetLoader > progress tracking > should emit error events on failure 1
107ms
   ✓ AssetLoader > format optimization > should prefer supported formats 1ms
   ✓ AssetLoader > format optimization > should filter unsupported formats 0
0ms
   ✓ AssetLoader > cleanup > should clear all state and callbacks 0ms       

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer 
 > should retry failed requests
TypeError: Cannot read properties of undefined (reading 'then')
 ❯ src/audio/managers/asset-loader.ts:170:53
    168|Xconsole.log(`[AssetLoader] Base URL: ${window.location…
    169|
    170|Xfetch(url, { signal: controller.signal })
       |X^
    171|X.then(response => {
    172|XclearTimeout(timeoutId);
 ❯ AssetLoader.loadAudioFile src/audio/managers/asset-loader.ts:159:16      
 ❯ src/audio/managers/asset-loader.ts:202:30

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 15 passed (16)
   Start at  13:22:01
   Duration  2.05s (transform 78ms, setup 113ms, collect 51ms, tests 769ms, 
 environment 643ms, prepare 172ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
I see the issue now. The error is still occurring because there's another problem. Looking at the error, it seems like the fetch function is returning undefined in some cases. Let me examine the test more closely to understand what's happening:

Read file(s)

asset-loader.test.ts 130 - 151
I see the issue! In the retry test, the third mock response doesn't have status, statusText, or headers properties, which are being accessed in the code. Let me check what the code is trying to access:

Read file(s)

asset-loader.ts 170 - 181
The issue is that the mock response in the test doesn't have the headers property, so response.headers.entries() is failing. Let me fix the test:

Accepted edits to

asset-loader.test.ts


Now let's run the test again to see if this fixes the issue:

Command
npm test -- src/tests/audio/asset-loader.test.ts
npm test -- src/tests/audio/asset-loader.test.ts
:\Windows\System32\cmd.exe - npm  test -- src/tests/audio/asset-loader.test.tspm test src/tests/audio/asset-loader.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts src/tests/audio/asset-loader.test.ts       

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 3)ode (vitest 4)ode (vitest 5)ode (vitest 6)ode (vitest 7)ode (vitest 11)ode (vitest 13)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:22:41
   Duration 928ms
(node:49840) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/audio/asset-loader.test.ts 0/16

 Test Files 0 passed (1)
      Tests 0 passed (16)
   Start at 13:22:41
   Duration 1.14s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:22:41
   Duration 1.24s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                         
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:22:41
   Duration 1.24s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                         
[AssetLoader] Attempting to load: sounds/test.ogg                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:22:41
   Duration 1.24s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails                         
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:22:41
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
   Start at 13:22:41
   Duration 1.24s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40  
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
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 1/16

 Test Files 0 passed (1)
      Tests 1 passed (16)
   Start at 13:22:41
   Duration 1.24s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 5 passed (16)
   Start at 13:22:41
   Duration 1.35s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 5 passed (16)
   Start at 13:22:41
   Duration 1.35s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
[AssetLoader] Attempting to load: sounds/test.ogg                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 5 passed (16)
   Start at 13:22:41
   Duration 1.35s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/
/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 5 passed (16)
   Start at 13:22:41
   Duration 1.35s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests                                            
[AssetLoader] Response for sounds/test.ogg: 200 OK                          
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 5 passed (16)
   Start at 13:22:41
   Duration 1.35s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
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


 ❯ src/tests/audio/asset-loader.test.ts 5/16

 Test Files 0 passed (1)
      Tests 5 passed (16)
   Start at 13:22:41
   Duration 1.35s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Attempting to load: sounds/test.ogg                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
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
Retry 1/2 for sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
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


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Attempting to load: sounds/test.ogg                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail                                  
[AssetLoader] Error loading sounds/test.ogg: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should throw error if all sources fail
Failed to load test_sound from sounds/test.ogg: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
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


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                               
[AssetLoader] Attempting to load: sounds/test.mp3                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Response for sounds/test.mp3: 404 Not Found
[AssetLoader] Response headers: { 'content-type': 'text/html' }


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                               
[AssetLoader] Error loading sounds/test.mp3: Error: HTTP 404: Not Found     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:177:31    
                                                                            
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors                                               
Failed to load test_sound from sounds/test.mp3: Error: HTTP 404: Not Found  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:177:31    


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors                                     
[AssetLoader] Attempting to load: sounds/test.mp3                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors                                     
[AssetLoader] Error loading sounds/test.mp3: Error: Invalid audio data      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:207:68  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should handle audio decoding errors
Failed to load test_sound from sounds/test.mp3: Error: Invalid audio data   
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:207:68  
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


 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout                                                  
[AssetLoader] Attempting to load: sounds/test.mp3                           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 6/16

 Test Files 0 passed (1)
      Tests 6 passed (16)
   Start at 13:22:41
   Duration 1.57s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 11 passed (16)
   Start at 13:22:41
   Duration 1.78s
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

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > s
should load all preload assets
Asset loading complete: 2/2 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > s
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

 Test Files 0 passed (1)
      Tests 11 passed (16)
   Start at 13:22:41
   Duration 1.78s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                               
[AssetLoader] Error loading sounds/sound2.mp3: Error: Network error         
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:297:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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
Retry 1/2 for sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:297:40  
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


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 11 passed (16)
   Start at 13:22:41
   Duration 1.78s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                               
[AssetLoader] Attempting to load: sounds/sound2.mp3                         
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
                                                                            
                                                                            
 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 11 passed (16)
   Start at 13:22:41
   Duration 1.78s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                               
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')                                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53    
    at new Promise (<anonymous>)                                            
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:30    

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > s
should handle partial failures
Failed to load sound sound2: TypeError: Cannot read properties of undefined 
 (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:170:53    
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers
s\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:202:30    


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 11 passed (16)
   Start at 13:22:41
   Duration 1.78s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures                                               
Asset loading complete: 1/2 loaded, 1 failed                                
                                                                            
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit progress events                                           
[AssetLoader] Attempting to load: sounds/test.mp3                           
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress track
king > should emit progress events
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress track
king > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 11 passed (16)
   Start at 13:22:41
   Duration 1.78s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure                                   
[AssetLoader] Error loading sounds/test.mp3: Error: Network error           
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
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
Retry 1/2 for sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41  
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


 ❯ src/tests/audio/asset-loader.test.ts 11/16

 Test Files 0 passed (1)
      Tests 11 passed (16)
   Start at 13:22:41
   Duration 1.78s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41  
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

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress track
king > should emit error events on failure
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41  
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

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimiz
zation > should prefer supported formats
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimiz
zation > should prefer supported formats
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

 ✓ src/tests/audio/asset-loader.test.ts (16 tests) 665ms
   ✓ AssetLoader > constructor > should initialize with default options 3ms 
   ✓ AssetLoader > constructor > should accept custom options 0ms
   ✓ AssetLoader > loadAudioBuffer > should successfully load audio buffer f
from first source 5ms
   ✓ AssetLoader > loadAudioBuffer > should fallback to second source if fir
rst fails 6ms
   ✓ AssetLoader > loadAudioBuffer > should retry failed requests 105ms     
   ✓ AssetLoader > loadAudioBuffer > should throw error if all sources fail 
 216ms
   ✓ AssetLoader > loadAudioBuffer > should handle HTTP errors 3ms
   ✓ AssetLoader > loadAudioBuffer > should handle audio decoding errors 1ms
   ✓ AssetLoader > loadAudioBuffer > should respect timeout 105ms
   ✓ AssetLoader > loadAssets > should load all preload assets 1ms
   ✓ AssetLoader > loadAssets > should handle partial failures 108ms        
   ✓ AssetLoader > progress tracking > should emit progress events 1ms      
   ✓ AssetLoader > progress tracking > should emit error events on failure 1
106ms
   ✓ AssetLoader > format optimization > should prefer supported formats 1ms
   ✓ AssetLoader > format optimization > should filter unsupported formats 0
0ms
   ✓ AssetLoader > cleanup > should clear all state and callbacks 0ms       

 Test Files  1 passed (1)
      Tests  16 passed (16)
   Start at  13:22:41
   Duration  1.90s (transform 76ms, setup 106ms, collect 49ms, tests 665ms, 
 environment 580ms, prepare 179ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Great! All the tests are now passing. Let me also run the other failing test to make sure it's fixed too:

Command
npm test -- src/audio/__tests__/error-handling.test.ts
npm test -- src/audio/__tests__/error-handling.test.
.ts
:\Windows\System32\cmd.exe - npm  test -- src/audio/__tests__/error-handling.test.tspm test src/audio/__tests__/error-handling.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts src/audio/__tests__/error-handling.test.ts 

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 3)ode (vitest 4)ode (vitest 9)ode (vitest 6)ode (vitest 8)ode (vitest 11)ode (vitest 13)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:23:00
   Duration 975ms
(node:54816) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/audio/__tests__/error-handling.test.ts 0/23

 Test Files 0 passed (1)
      Tests 0 passed (23)
   Start at 13:23:00
   Duration 1.20s

 ❯ src/audio/__tests__/error-handling.test.ts 1/23

 Test Files 0 passed (1)
      Tests 1 passed (23)
   Start at 13:23:00
   Duration 1.30s

 ❯ src/audio/__tests__/error-handling.test.ts 7/23

 Test Files 0 passed (1)
      Tests 7 passed (23)
   Start at 13:23:00
   Duration 1.96s

 ❯ src/audio/__tests__/error-handling.test.ts 7/23

 Test Files 0 passed (1)
      Tests 7 passed (23)
   Start at 13:23:00
   Duration 2.93s

 ❯ src/audio/__tests__/error-handling.test.ts 8/23

 Test Files 0 passed (1)
      Tests 1 failed | 7 passed (23)
   Start at 13:23:00
   Duration 3.37s
 ❯ src/audio/__tests__/error-handling.test.ts (23 tests | 1 failed) 2163ms  
   ✓ Audio Error Handling and Fallbacks > Web Audio API Unavailable > should gracefully degrade when Web Audio API is not supported 4ms
   ✓ Audio Error Handling and Fallbacks > Web Audio API Unavailable > should fall back to silent mode when no audio support exists 1ms
   ✓ Audio Error Handling and Fallbacks > Web Audio API Unavailable > should handle AudioContext creation failure 2ms
   ✓ Audio Error Handling and Fallbacks > Audio Context Suspension Handling 
 > should handle suspended audio context due to autoplay policies 23ms       
   ✓ Audio Error Handling and Fallbacks > Audio Context Suspension Handling 
 > should handle audio context resume failure 16ms
   ✓ Audio Error Handling and Fallbacks > Audio Context Suspension Handling 
 > should set up multiple event listeners for context resume 2ms
   ✓ Audio Error Handling and Fallbacks > Sound File Loading Errors > should
d handle failed sound file loads gracefully 2ms
   × Audio Error Handling and Fallbacks > Sound File Loading Errors > should
d retry failed sound loads 2021ms
     → Cannot read properties of undefined (reading 'then')
   ✓ Audio Error Handling and Fallbacks > Sound File Loading Errors > should
d fall back to HTML5 audio when Web Audio loading fails completely 59ms      
   ✓ Audio Error Handling and Fallbacks > HTML5 Audio Fallback > should hand
dle HTML5 audio playback errors 1ms
   ✓ Audio Error Handling and Fallbacks > HTML5 Audio Fallback > should hand
dle autoplay blocked errors 14ms
   ✓ Audio Error Handling and Fallbacks > HTML5 Audio Fallback > should hand
dle unsupported audio formats 1ms
   ✓ Audio Error Handling and Fallbacks > Silent Mode Fallback > should prov
vide silent implementations for all methods 1ms
   ✓ Audio Error Handling and Fallbacks > Silent Mode Fallback > should retu
urn empty loading state 1ms
   ✓ Audio Error Handling and Fallbacks > Error Recovery Mechanisms > should
d attempt on-demand loading when buffer not found 1ms
   ✓ Audio Error Handling and Fallbacks > Error Recovery Mechanisms > should
d validate audio buffers before playback 1ms
   ✓ Audio Error Handling and Fallbacks > Error Recovery Mechanisms > should
d handle audio context interruption on iOS Safari 1ms
   ✓ Audio Error Handling and Fallbacks > Browser-Specific Error Handling > 
 should handle Safari-specific audio context issues 2ms
   ✓ Audio Error Handling and Fallbacks > Browser-Specific Error Handling > 
 should handle Chrome-specific audio context issues 1ms
   ✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit
t error events for external handling 1ms
   ✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit
t fallback events when switching audio managers 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > sh
hould clean up resources on audio manager cleanup 2ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > sh
hould handle cleanup errors gracefully 2ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/audio/__tests__/error-handling.test.ts > Audio Error Handling and
d Fallbacks > Sound File Loading Errors > should retry failed sound loads    
TypeError: Cannot read properties of undefined (reading 'then')
 ❯ src/audio/managers/asset-loader.ts:170:53
    168|Xconsole.log(`[AssetLoader] Base URL: ${window.location…
    169|
    170|Xfetch(url, { signal: controller.signal })
       |X^
    171|X.then(response => {
    172|XclearTimeout(timeoutId);
 ❯ AssetLoader.loadAudioFile src/audio/managers/asset-loader.ts:159:16      
 ❯ src/audio/managers/asset-loader.ts:202:30

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 22 passed (23)
   Start at  13:23:00
   Duration  3.49s (transform 142ms, setup 128ms, collect 133ms, tests 2.16s
s, environment 598ms, prepare 173ms)


ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
There's still one failing test in the error-handling.test.ts file. Let me examine that test to see what's different:

Searched workspace
Finding the failing test in error-handling.test.ts
Read file(s)

error-handling.test.ts 266 - 301
I see the issue! This test is also missing the required properties in the mock response. Let me fix it:

Accepted edits to

error-handling.test.ts


Now let's run the error-handling test again:

Command
npm test -- src/audio/__tests__/error-handling.test.ts
npm test -- src/audio/__tests__/error-handling.test.
.ts
:\Windows\System32\cmd.exe - npm  test -- src/audio/__tests__/error-handling.test.tspm test src/audio/__tests__/error-handling.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts src/audio/__tests__/error-handling.test.ts 

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 2)ode (vitest 3)ode (vitest 7)ode (vitest 8)ode (vitest 6)ode (vitest 10)ode (vitest 9)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:23:41
   Duration 931ms

 ❯ src/audio/__tests__/error-handling.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 13:23:41
   Duration 1.15s
(node:57940) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/audio/__tests__/error-handling.test.ts 0/23

 Test Files 0 passed (1)
      Tests 0 passed (23)
   Start at 13:23:41
   Duration 1.47s

 ❯ src/audio/__tests__/error-handling.test.ts 1/23

 Test Files 0 passed (1)
      Tests 1 passed (23)
   Start at 13:23:41
   Duration 1.58s

 ❯ src/audio/__tests__/error-handling.test.ts 7/23

 Test Files 0 passed (1)
      Tests 7 passed (23)
   Start at 13:23:41
   Duration 1.90s

 ❯ src/audio/__tests__/error-handling.test.ts 8/23

 Test Files 0 passed (1)
      Tests 8 passed (23)
   Start at 13:23:41
   Duration 2.67s
 ✓ src/audio/__tests__/error-handling.test.ts (23 tests) 1190ms
   ✓ Audio Error Handling and Fallbacks > Web Audio API Unavailable > should gracefully degrade when Web Audio API is not supported 5ms
   ✓ Audio Error Handling and Fallbacks > Web Audio API Unavailable > should fall back to silent mode when no audio support exists 2ms
   ✓ Audio Error Handling and Fallbacks > Web Audio API Unavailable > should handle AudioContext creation failure 5ms
   ✓ Audio Error Handling and Fallbacks > Audio Context Suspension Handling 
 > should handle suspended audio context due to autoplay policies 30ms       
   ✓ Audio Error Handling and Fallbacks > Audio Context Suspension Handling 
 > should handle audio context resume failure 30ms
   ✓ Audio Error Handling and Fallbacks > Audio Context Suspension Handling 
 > should set up multiple event listeners for context resume 4ms
   ✓ Audio Error Handling and Fallbacks > Sound File Loading Errors > should
d handle failed sound file loads gracefully 5ms
   ✓ Audio Error Handling and Fallbacks > Sound File Loading Errors > should
d retry failed sound loads  1017ms
   ✓ Audio Error Handling and Fallbacks > Sound File Loading Errors > should
d fall back to HTML5 audio when Web Audio loading fails completely 61ms      
   ✓ Audio Error Handling and Fallbacks > HTML5 Audio Fallback > should hand
dle HTML5 audio playback errors 1ms
   ✓ Audio Error Handling and Fallbacks > HTML5 Audio Fallback > should hand
dle autoplay blocked errors 14ms
   ✓ Audio Error Handling and Fallbacks > HTML5 Audio Fallback > should hand
dle unsupported audio formats 2ms
   ✓ Audio Error Handling and Fallbacks > Silent Mode Fallback > should prov
vide silent implementations for all methods 1ms
   ✓ Audio Error Handling and Fallbacks > Silent Mode Fallback > should retu
urn empty loading state 1ms
   ✓ Audio Error Handling and Fallbacks > Error Recovery Mechanisms > should
d attempt on-demand loading when buffer not found 1ms
   ✓ Audio Error Handling and Fallbacks > Error Recovery Mechanisms > should
d validate audio buffers before playback 1ms
   ✓ Audio Error Handling and Fallbacks > Error Recovery Mechanisms > should
d handle audio context interruption on iOS Safari 1ms
   ✓ Audio Error Handling and Fallbacks > Browser-Specific Error Handling > 
 should handle Safari-specific audio context issues 1ms
   ✓ Audio Error Handling and Fallbacks > Browser-Specific Error Handling > 
 should handle Chrome-specific audio context issues 1ms
   ✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit
t error events for external handling 1ms
   ✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit
t fallback events when switching audio managers 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > sh
hould clean up resources on audio manager cleanup 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > sh
hould handle cleanup errors gracefully 2ms

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Start at  13:23:41
   Duration  2.80s (transform 152ms, setup 155ms, collect 143ms, tests 1.19s
s, environment 810ms, prepare 195ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer>should handle Chrome-specific audio context issues 1ms
   ✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit error events for external handling 1ms
   ✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit fallback events when switching audio managers 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should clean up resources on audio manager cleanup 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should handle cleanup errors gracefully 2ms

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Start at  13:23:41
   Duration  2.80s (transform 152ms, setup 155ms, collect 143ms, tests 1.19s, environment 810ms, prepare 195ms)


D:\FizzBash\TheWanderer>   ✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit error events for external handling 1ms
   ✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit fallback events when switching audio managers 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should clean up resources on audio manager cleanup 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should handle cleanup errors gracefully 2ms

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Start at  13:23:41
   Duration  2.80s (transform 152ms, setup 155ms, collect 143ms, tests 1.19s, environment 810ms, prepare 195ms)


D:\FizzBash\TheWanderer> error events for external handling 1ms
   ✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit fallback events when switching audio managers 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should clean up resources on audio manager cleanup 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should handle cleanup errors gracefully 2ms

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Start at  13:23:41
   Duration  2.80s (transform 152ms, setup 155ms, collect 143ms, tests 1.19s, environment 810ms, prepare 195ms)


D:\FizzBash\TheWanderer>   ✓ Audio Error Handling and Fallbacks > Error Event Emission > should emit fallback events when switching audio managers 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should clean up resources on audio manager cleanup 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should handle cleanup errors gracefully 2ms

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Start at  13:23:41
   Duration  2.80s (transform 152ms, setup 155ms, collect 143ms, tests 1.19s, environment 810ms, prepare 195ms)


D:\FizzBash\TheWanderer> fallback events when switching audio managers 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should clean up resources on audio manager cleanup 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should handle cleanup errors gracefully 2ms

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Start at  13:23:41
   Duration  2.80s (transform 152ms, setup 155ms, collect 143ms, tests 1.19s, environment 810ms, prepare 195ms)


D:\FizzBash\TheWanderer>   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should clean up resources on audio manager cleanup 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should handle cleanup errors gracefully 2ms

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Start at  13:23:41
   Duration  2.80s (transform 152ms, setup 155ms, collect 143ms, tests 1.19s, environment 810ms, prepare 195ms)


D:\FizzBash\TheWanderer>ould clean up resources on audio manager cleanup 1ms
   ✓ Audio Error Handling and Fallbacks > Memory Management and Cleanup > should handle cleanup errors gracefully 2ms

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Start at  13:23:41
   Duration  2.80s (transform 152ms, setup 155ms, collect 143ms, tests 1.19s, environment 810ms, prepare 195ms)


D:\FizzBash\TheWanderer
Perfect! All tests are now passing. Let me run a broader test to make sure I haven't broken anything else:

Command
npm test

Revert


asset-loader.ts

asset-loader.test.ts

error-handling.test.ts






Claude Sonnet 4.0
Autopilot
