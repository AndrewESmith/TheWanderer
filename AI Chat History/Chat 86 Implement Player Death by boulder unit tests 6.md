Test Files 1 failed...

New Session





You can refer to chat history found here: Chat 85 Implement Player Death by boulder unit tests 5.md  FAIL  src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonstrate game integration with physics and sound

AssertionError: expected 'boulder' to be 'empty' // Object.is equality

Expected: "empty"

Received: "boulder"

 ❯ src/tests/physics-integration-demo.test.ts:119:49

Kiro
Including Steering Documents

typescript-standards.md
I can see you have an existing spec for boulder behavior refinement. Let me check what's in your current spec to understand where we are in the process.

Read file(s)

tasks.md
I can see you're currently working on task 7 - "Implement player death from boulder collision". Based on the chat history reference and the failing test, it looks like you're having issues with a physics integration test where a boulder isn't being cleared from a position as expected.

Let me check the requirements and design documents to understand the full context before helping with this task.

Read file(s)

requirements.md

design.md
Now I understand the context. You're working on task 7 which involves implementing player death from boulder collision. Based on the failing test you mentioned, it seems like there's an issue where a boulder isn't being properly cleared from a position after a collision.

Let me help you work on this task. First, let me check the current state of the failing test to understand what exactly is going wrong.

Task: 7. Implement player death from boulder collision from 
tasks.md
Status: In Progress
Searched workspace
Finding the failing test file to understand the current issue
Read file(s)

physics-integration-demo.test.ts
Now let me check the specific failing test from the chat history to understand the exact error:

Read file(s)

Chat 85 Implement Player Death by boulder unit tests 5.md 1 - 101
I can see from the chat history that there was a failing test related to boulder audio events expecting 1 event but getting 2. Let me continue reading to see the specific error you mentioned about the physics integration test:

Searched workspace
Looking for the specific error message about boulder position not being empty
Now I can see the issue! The test is failing because after the boulder moves, the original position still contains a boulder instead of being empty. Let me look at the specific line in the test that's failing:

Searched workspace
Looking for the specific line in the physics integration test that checks for empty cell
Perfect! I found the issue. The test is failing at line 119 where it expects the original boulder position maze[2][2] to be CELL.EMPTY after the boulder has moved, but it's still showing CELL.BOULDER.

This suggests that when the boulder moves from position (2,2) to (2,3), the original position (2,2) is not being cleared properly. Let me examine the physics engine and collision detection code to see where this issue might be:

Read file(s)

physics-engine.ts
Now let me check the simulateEnhancedBoulderFall function in the collision detection file to see how it handles moving boulders and clearing the original position:

Read file(s)

collision-detection.ts 300 - 401
I can see the issue! In the simulateEnhancedBoulderFall function, when there's a collision, the function returns the original maze without clearing the boulder's old position. But when the boulder successfully moves (no collision), it should clear the old position and place the boulder in the new position.

Let me see the rest of this function:

Read file(s)

collision-detection.ts 380 - 421
Perfect! Now I can see the complete logic. The issue is clear now. In the simulateEnhancedBoulderFall function:

Line 342: It clears the old position: newMaze[boulderPosition.y]![boulderPosition.x] = CELL.EMPTY;
Line 404: It places the boulder in the new position: newMaze[newPosition.y]![newPosition.x] = CELL.BOULDER;
This logic looks correct for the case where the boulder successfully moves. However, the test is still failing, which suggests there might be an issue with how the boulder state manager is being updated or how the physics simulation is being called.

Let me check the movePlayer function in GameState.ts to see how it integrates with the physics simulation:

Read file(s)

GameState.ts
Now I can see the issue! Looking at the movePlayer function, I can see that it calls simulatePhysicsStepWithState on line 108, but there's a potential issue with how the boulder state manager is being updated.

The problem is in the sequence of operations:

Line 108: simulatePhysicsStepWithState is called with the current gameState.boulderStateManager
Lines 130-148: The boulder state manager is updated with the physics results
But the physics simulation might not be properly handling the boulder position updates
Let me check the updateBoulderPositions function to see if it's properly updating the boulder positions in the state manager:

Read file(s)

boulder-state-manager.ts
Now I think I've found the issue! Looking at the movePlayer function in GameState.ts, I can see that the boulder state manager is being updated AFTER the physics simulation, but the physics simulation is not properly updating the boulder positions in the state manager.

The issue is in the sequence:

Physics simulation runs with the old boulder state manager
The physics simulation moves boulders in the maze
But the boulder state manager still has the old positions
The updateBoulderPositions function is never called to sync the state manager with the actual maze positions
Let me check if updateBoulderPositions is being called in the movePlayer function:

Searched workspace
Checking if updateBoulderPositions is being called in the GameState.ts file
I can see that updateBoulderPositions is imported but it's not being used in the movePlayer function. This is the root cause of the issue!

The physics simulation moves the boulders in the maze, but the boulder state manager still thinks the boulders are in their old positions. When the test checks the maze, it sees the boulder in the new position, but the state manager still has the boulder registered at the old position.

Let me fix this by adding the missing updateBoulderPositions call in the movePlayer function. I need to track the position updates from the physics simulation and apply them to the boulder state manager.

First, let me check what information is available in the PhysicsSimulationResult to track position changes:

Searched workspace
Looking for the PhysicsSimulationResult interface to see what position tracking information is available
I can see that the PhysicsSimulationResult interface includes boulderPositions: Position[], which gives us the final positions of all boulders after the physics simulation. However, we need to track the position changes (from -> to) to properly update the boulder state manager.

Looking at the physics engine code, I can see that the simulateGravityWithState function tracks positionUpdates: Array<{ from: Position; to: Position }> internally, but this information is not exposed in the result.

Let me modify the physics engine to expose the position updates so we can properly update the boulder state manager:


2 edits to file

physics-engine.ts


Now I need to update all the other functions that return PhysicsSimulationResult to include the positionUpdates field:


4 edits to file

physics-engine.ts


Now I need to update the movePlayer function in GameState.ts to use the position updates to properly sync the boulder state manager:

Accepted edits to

GameState.ts


Now let's run the failing test to see if this fixes the issue:

Command
npm test -- src/tests/physics-integration-demo.test.ts
npm test -- src/tests/physics-integration-demo.test.ts
:\Windows\System32\cmd.exe - npm  test -- src/tests/physics-integration-demo.test.tspm test src/tests/physics-integration-demo.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --bail=1 src/tests/physics-integration-demo.test.ts:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 3)ode (vitest 7)ode (vitest 8)ode (vitest 10)ode (vitest 11)ode (vitest 14)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 15:47:25
   Duration 909ms
(node:56808) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/physics-integration-demo.test.ts 0/4

 Test Files 0 passed (1)
      Tests 0 passed (4)
   Start at 15:47:25
   Duration 1.21s
stdout | src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonstrate boulder falling with sound events
Initial maze state:
Boulder at position (3,1), should fall to (3,2) then hit rock at (3,3)      
After physics simulation:
Sound events generated: 1
Boulder successfully fell from (3,1) to (3,2) with sound event

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration De
emo > should demonstrate boulder collision with sound events
Boulder collision test:
Boulder at (1,1) surrounded by rocks - should not move
Boulder correctly stayed in place - no movement sounds generated

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration De
emo > should demonstrate game integration with physics and sound
Game integration test:
Player moves right to trigger boulder, then moves again to make boulder fall
Initial state:
Player position: { x: 1, y: 1 }
Moves: 55
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: false,
      isMoving: false,
      triggeredOnMove: -1
    }
  ]
]
After move 1 (trigger):
Player position: { x: 2, y: 1 }
Moves: 54
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: true,
      isMoving: false,
      triggeredOnMove: 53
    }
  ]
]
After move 2 (boulder falls):
Player position: { x: 3, y: 1 }
Moves: 53
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: true,
      isMoving: false,
      triggeredOnMove: 53
    }
  ]
]

 ❯ src/tests/physics-integration-demo.test.ts (4 tests | 1 failed) 16ms     
   ✓ Physics Integration Demo > should demonstrate boulder falling with soun
nd events 4ms
   ✓ Physics Integration Demo > should demonstrate boulder collision with so
ound events 1ms
   × Physics Integration Demo > should demonstrate game integration with phy
ysics and sound 10ms
     → expected 'boulder' to be 'empty' // Object.is equality
   · Physics Integration Demo > should demonstrate multiple boulder physics 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/physics-integration-demo.test.ts > Physics Integration Demo
o > should demonstrate game integration with physics and sound
AssertionError: expected 'boulder' to be 'empty' // Object.is equality      

Expected: "empty"
Received: "boulder"

 ❯ src/tests/physics-integration-demo.test.ts:119:49

    117| 
    118|         // Verify boulder fell due to physics simulation
    119|Xexpect(gameStateAfterMove2.maze[2]![2]).toBe(CELL.EMPTY); …
       |X^
    120|Xexpect(gameStateAfterMove2.maze[3]![2]).toBe(CELL.BOULDER)…
    121|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 2 passed (4)
   Start at  15:47:25
   Duration  1.31s (transform 122ms, setup 127ms, collect 113ms, tests 16ms,
, environment 552ms, prepare 151ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
The test is still failing, but I can see some important information from the debug output. Looking at the boulder state manager output, I can see that after move 2, the boulder state manager still shows the boulder at position '2,2' instead of the new position.

This suggests that the positionUpdates array is empty, which means the physics simulation is not detecting that the boulder actually moved. Let me check why this is happening.

Looking at the debug output, I can see that the boulder is triggered on move 53, but it should start moving on move 52 (the next move). However, the test shows that after move 2 (which would be move 53), the boulder state manager still shows the boulder as not moving.

Let me check the logic in getTriggeredBouldersForMove to see if there's an issue with the move number calculation:

Searched workspace
Looking at the getTriggeredBouldersForMove function to understand the move number logic
Read file(s)

boulder-state-manager.ts 248 - 266
I see the issue! Looking at the debug output:

After move 1: Boulder is triggered on move 53 (triggeredOnMove: 53)
After move 2: Current move is 53, so the boulder should start moving when currentMoveNumber - 1 === 53, which means currentMoveNumber === 54
But the current move number after move 2 is 53, not 54. This means the boulder won't start moving until the next move.

Let me check the logic in the movePlayer function to see how the move numbers are being passed to the physics simulation:

Searched workspace
Looking at how the move number is passed to the physics simulation
Searched workspace
Looking for the simulatePhysicsStepWithState call in GameState.ts
Read file(s)

GameState.ts 149 - 156
I found the issue! The physics simulation is being called with newMoves, but the boulder triggering logic is also using newMoves - 1 for the trigger move number.

Let me trace through the logic:

Move 1: Player moves right

newMoves = 54 (55 - 1)
Boulder gets triggered with triggeredOnMove: 53 (newMoves - 1)
Physics simulation runs with currentMoveNumber = 54
getTriggeredBouldersForMove looks for boulders with triggeredOnMove === 54 - 1 = 53 ✓
But the boulder was just triggered this turn, so it shouldn't move yet
Move 2: Player moves right again

newMoves = 53 (54 - 1)
Physics simulation runs with currentMoveNumber = 53
getTriggeredBouldersForMove looks for boulders with triggeredOnMove === 53 - 1 = 52 ✗
The boulder has triggeredOnMove: 53, so it doesn't match
The issue is in the triggering logic. When we trigger a boulder, we should set triggeredOnMove to the current move number, not newMoves - 1.

Let me check where the boulder triggering happens:

Searched workspace
Looking for where updateBoulderTriggers is called to see what move number is passed
Read file(s)

GameState.ts 214 - 223
I found the issue! The comment says "Trigger for next move (newMoves - 1)", but this is causing the wrong move number to be stored.

Let me trace through this again:

Move 1: Player moves right

newMoves = 54
Boulder gets triggered with triggeredOnMove: newMoves - 1 = 53
Physics simulation runs with currentMoveNumber = 54
Boulder should start moving when triggeredOnMove === currentMoveNumber - 1, so 53 === 54 - 1 = 53 ✓
Move 2: Player moves right again

newMoves = 53
Physics simulation runs with currentMoveNumber = 53
Boulder should start moving when triggeredOnMove === currentMoveNumber - 1, so 53 === 53 - 1 = 52 ✗
The issue is that we're triggering the boulder for move 53, but then on move 2 (which is move 53), we're looking for boulders triggered on move 52.

The correct logic should be:

When a boulder is triggered on move N, it should start moving on move N+1
So if we trigger on move 54, it should start moving on move 53
But we're triggering with newMoves - 1 = 53, so it should start moving on move 52
I think the issue is that we should trigger the boulder with the current move number, not newMoves - 1. Let me fix this:

Accepted edits to

GameState.ts


Now let's test this fix:

Command
npm test -- src/tests/physics-integration-demo.test.ts
npm test -- src/tests/physics-integration-demo.test.
.ts
:\Windows\System32\cmd.exe - npm  test -- src/tests/physics-integration-demo.test.tspm test src/tests/physics-integration-demo.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --bail=1 src/tests/physics-integration-demo
o.test.ts

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 4)ode (vitest 5)ode (vitest 2)ode (vitest 3)ode (vitest 12)ode (vitest 11)ode (vitest 15)
 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 15:48:44
   Duration 934ms
(node:51740) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/physics-integration-demo.test.ts 0/4

 Test Files 0 passed (1)
      Tests 0 passed (4)
   Start at 15:48:44
   Duration 1.25s
stdout | src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonstrate boulder falling with sound events
Initial maze state:
Boulder at position (3,1), should fall to (3,2) then hit rock at (3,3)      
After physics simulation:
Sound events generated: 1
Boulder successfully fell from (3,1) to (3,2) with sound event

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration De
emo > should demonstrate boulder collision with sound events
Boulder collision test:
Boulder at (1,1) surrounded by rocks - should not move
Boulder correctly stayed in place - no movement sounds generated

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration De
emo > should demonstrate game integration with physics and sound
Game integration test:
Player moves right to trigger boulder, then moves again to make boulder fall
Initial state:
Player position: { x: 1, y: 1 }
Moves: 55
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: false,
      isMoving: false,
      triggeredOnMove: -1
    }
  ]
]
After move 1 (trigger):
Player position: { x: 2, y: 1 }
Moves: 54
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: true,
      isMoving: false,
      triggeredOnMove: 54
    }
  ]
]
After move 2 (boulder falls):
Player position: { x: 3, y: 1 }
Moves: 53
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: true,
      isMoving: false,
      triggeredOnMove: 54
    }
  ]
]

 ❯ src/tests/physics-integration-demo.test.ts (4 tests | 1 failed) 18ms     
   ✓ Physics Integration Demo > should demonstrate boulder falling with soun
nd events 5ms
   ✓ Physics Integration Demo > should demonstrate boulder collision with so
ound events 1ms
   × Physics Integration Demo > should demonstrate game integration with phy
ysics and sound 10ms
     → expected 'boulder' to be 'empty' // Object.is equality
   · Physics Integration Demo > should demonstrate multiple boulder physics 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/physics-integration-demo.test.ts > Physics Integration Demo
o > should demonstrate game integration with physics and sound
AssertionError: expected 'boulder' to be 'empty' // Object.is equality      

Expected: "empty"
Received: "boulder"

 ❯ src/tests/physics-integration-demo.test.ts:119:49
    117|
    118|         // Verify boulder fell due to physics simulation
    119|Xexpect(gameStateAfterMove2.maze[2]![2]).toBe(CELL.EMPTY); …
       |X^
    120|Xexpect(gameStateAfterMove2.maze[3]![2]).toBe(CELL.BOULDER)…
    121|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 2 passed (4)
   Start at  15:48:44
   Duration  1.42s (transform 131ms, setup 118ms, collect 132ms, tests 18ms,
, environment 549ms, prepare 186ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Good! Now I can see the boulder is triggered on move 54 instead of 53. Let me trace through the logic again:

Move 1: Player moves right

newMoves = 54
Boulder gets triggered with triggeredOnMove: 54
Physics simulation runs with currentMoveNumber = 54
getTriggeredBouldersForMove looks for boulders with triggeredOnMove === 54 - 1 = 53 ✗
Boulder has triggeredOnMove: 54, so it doesn't match (correct, shouldn't move yet)
Move 2: Player moves right again

newMoves = 53
Physics simulation runs with currentMoveNumber = 53
getTriggeredBouldersForMove looks for boulders with triggeredOnMove === 53 - 1 = 52 ✗
Boulder has triggeredOnMove: 54, so it doesn't match
The issue is still there. The boulder is triggered on move 54, but it should start moving when the current move is 55 (so that 54 === 55 - 1). But we never get to move 55 because we're counting down.

I think I misunderstood the move counting logic. Let me check how the moves are counted:

Initial moves: 55
After move 1: 54
After move 2: 53
So moves are counting DOWN, not up. This means:

When we trigger a boulder on move 54, it should start moving on move 53
So getTriggeredBouldersForMove should look for triggeredOnMove === currentMoveNumber + 1
Let me fix the logic in getTriggeredBouldersForMove:

Accepted edits to

boulder-state-manager.ts


Now let's test this fix:

Command
npm test -- src/tests/physics-integration-demo.test.ts
npm test -- src/tests/physics-integration-demo.test.
.ts
:\Windows\System32\cmd.exe - npm  test -- src/tests/physics-integration-demo.test.tspm test src/tests/physics-integration-demo.test.ts
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --bail=1 src/tests/physics-integration-demo
o.test.ts

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 2)ode (vitest 5)ode (vitest 7)ode (vitest 8)ode (vitest 9)ode (vitest 11)ode (vitest 14)ode (vitest 15)
 ❯ src/tests/physics-integration-demo.test.ts [queued]

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 15:49:17
   Duration 926ms
(node:17712) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/physics-integration-demo.test.ts 0/4

 Test Files 0 passed (1)
      Tests 0 passed (4)
   Start at 15:49:17
   Duration 1.23s
stdout | src/tests/physics-integration-demo.test.ts > Physics Integration Demo > should demonstrate boulder falling with sound events
Initial maze state:
Boulder at position (3,1), should fall to (3,2) then hit rock at (3,3)      
After physics simulation:
Sound events generated: 1
Boulder successfully fell from (3,1) to (3,2) with sound event

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration De
emo > should demonstrate boulder collision with sound events
Boulder collision test:
Boulder at (1,1) surrounded by rocks - should not move
Boulder correctly stayed in place - no movement sounds generated

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration De
emo > should demonstrate game integration with physics and sound
Game integration test:
Player moves right to trigger boulder, then moves again to make boulder fall
Initial state:
Player position: { x: 1, y: 1 }
Moves: 55
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: false,
      isMoving: false,
      triggeredOnMove: -1
    }
  ]
]
After move 1 (trigger):
Player position: { x: 2, y: 1 }
Moves: 54
Boulder state manager boulders: [
  [
    '2,2',
    {
      position: [Object],
      isTriggered: true,
      isMoving: false,
      triggeredOnMove: 54
    }
  ]
]
After move 2 (boulder falls):
Player position: { x: 3, y: 1 }
Moves: 53
Boulder state manager boulders: [
  [
    '2,3',
    {
      position: [Object],
      isTriggered: true,
      isMoving: false,
      triggeredOnMove: 54
    }
  ]
]
Player moved successfully and boulder physics was applied
Final player position: { x: 3, y: 1 }
Boulder moved from (2,2) to (2,3)

stdout | src/tests/physics-integration-demo.test.ts > Physics Integration De
emo > should demonstrate multiple boulder physics
Multiple boulder physics test:
Two boulders at (1,1) and (3,1) should both fall
Both boulders fell successfully with sound events
Generated 2 movement sound events

 ✓ src/tests/physics-integration-demo.test.ts (4 tests) 15ms
   ✓ Physics Integration Demo > should demonstrate boulder falling with soun
nd events 6ms
   ✓ Physics Integration Demo > should demonstrate boulder collision with so
ound events 1ms
   ✓ Physics Integration Demo > should demonstrate game integration with phy
ysics and sound 5ms
   ✓ Physics Integration Demo > should demonstrate multiple boulder physics 
 1ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  15:49:17
   Duration  1.32s (transform 137ms, setup 120ms, collect 138ms, tests 15ms,
, environment 619ms, prepare 162ms)

ode (vitest 1):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Excellent! The test is now passing! I can see from the debug output that:

After move 1: Boulder is triggered on move 54
After move 2: Boulder state manager shows the boulder at position '2,3' (moved from '2,2')
The test output shows "Boulder moved from (2,2) to (2,3)"
The fix worked! The boulder position is now being properly updated in the state manager, and the original position is being cleared in the maze.

Let me run a broader test to make sure I didn't break anything else:

Command
npm test
npm test
:\Windows\System32\cmd.exe - npm  testpm test
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --bail=1

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 4)ode (vitest 6)ode (vitest 7)ode (vitest 9)ode (vitest 11)ode (vitest 10)ode (vitest 13)ode (vitest 15)
 Test Files 0 passed (40)
      Tests 0 passed (0)
   Start at 15:49:37
   Duration 956ms

 Test Files 0 passed (40)
      Tests 0 passed (0)
   Start at 15:49:37
   Duration 1.95s

 ❯ src/tests/sound-system-e2e.test.ts [queued]

 Test Files 0 passed (40)
      Tests 0 passed (0)
   Start at 15:49:37
   Duration 2.28s
(node:24788) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:58964) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:45220) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:28220) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:71992) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:54356) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:18756) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts [queued]
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 0 passed (0)
   Start at 15:49:37
   Duration 2.38s
(node:56252) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:71428) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:68152) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:21124) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:23000) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:11536) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:58456) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:75572) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/audio/__tests__/audio-error-handling.test.ts [queued]
 ❯ src/audio/__tests__/error-handling.test.ts [queued]
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts [queued]
 ❯ src/tests/audio/asset-loader.test.ts 0/16
 ❯ src/tests/audio/audio-optimization.test.ts [queued]
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]      
 ❯ src/tests/audio/enhanced-audio-manager.test.ts [queued]
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]    
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts [queued]
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts [queued]
 ❯ src/tests/sound-system-performance.test.ts [queued]

 Test Files 0 passed (40)
      Tests 0 passed (16)
   Start at 15:49:37
   Duration 2.82s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should successfully load audio buffer from first source
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]      
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]    
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (40)
      Tests 1 passed (200)
   Start at 15:49:37
   Duration 3.02s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]      
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]    
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (40)
      Tests 1 passed (200)
   Start at 15:49:37
   Duration 3.02s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]      
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]    
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (40)
      Tests 1 passed (200)
   Start at 15:49:37
   Duration 3.02s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:119:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]      
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]    
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (40)
      Tests 1 passed (200)
   Start at 15:49:37
   Duration 3.02s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should fallback to second source if first fails
[AssetLoader] Response for sounds/test.ogg: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/ogg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]      
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]    
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (40)
      Tests 1 passed (200)
   Start at 15:49:37
   Duration 3.02s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:138:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]      
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]    
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (40)
      Tests 1 passed (200)
   Start at 15:49:37
   Duration 3.02s


















stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should initialize with Web Audio API support
Initialized gain node pool with 5 nodes
Web Audio API initialized successfullystdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should initialize with Web Audio API support
Initialized gain node pool with 5 nodes
Web Audio API initialized successfullystdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspension
Initialized gain node pool with 5 nodes
Web Audio API initialized successfullystdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > initialization > should handle audio context suspen
nsion
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should preload sounds with pr
rogress tracking
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle muted state correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should load muted preference from localStorage
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle localStorage errors gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Hand
dling and Fallbacks > Audio Manager Factory > should create WebAudioManager w
when Web Audio API is supported
Using Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should preload sounds with pr
rogress tracking
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
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should preload sounds successfully
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
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefi
ined
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined unde
efined
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should preload sounds with pr
rogress tracking
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Hand
dling and Fallbacks > Audio Manager Factory > should fall back to HTML5AudioM
Manager when Web Audio API is not supported
Web Audio API not supported, falling back to HTML5 Audio
HTML5 Audio initialized successfully

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Hand
dling and Fallbacks > Audio Manager Factory > should fall back to SilentAudio
oManager when no audio is supported
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Hand
dling and Fallbacks > Audio Manager Factory > should create specific audio ma
anager when requested
Silent Audio Manager initialized - no audio will be played

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Initialization Performance > should initialize WebAudioMan
nager within performance budget
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Initialization Performance > should initialize HTML5AudioM
Manager within performance budget
HTML5 Audio initialized successfully


 ❯ src/audio/__tests__/audio-error-handling.test.ts 0/10
 ❯ src/audio/__tests__/error-handling.test.ts 0/23
 ❯ src/tests/audio-context.test.tsx [queued]
 ❯ src/tests/audio-manager.test.ts 0/27
 ❯ src/tests/audio/asset-loader.test.ts 1/16
 ❯ src/tests/audio/audio-optimization.test.ts 0/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx [queued]      
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 0/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts [queued]    
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 0/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 0/20

 Test Files 0 passed (40)
      Tests 1 passed (200)
   Start at 15:49:37
   Duration 3.02s
stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > SilentAudioManager > should implement all AudioManager methods without errors
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > SilentAudioManager > should handle loading progress callbacks
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during audio context creation
Using Web Audio API
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Handling and Fallbacks > Error Recovery > should handle errors during sound playback
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Hand
dling and Fallbacks > Error Recovery > should handle errors during preloading
Silent Audio Manager initialized - no audio will be played

stdout | src/audio/__tests__/audio-error-handling.test.ts > Audio Error Hand
dling and Fallbacks > Autoplay Policy Handling > should detect autoplay restr
rictions
Using Web Audio API
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete p
player movement workflow
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)



 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot re
ead properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties 
 of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read 
 properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of 
 undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read p
properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read
d properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of
f undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read proper
rties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Ca
annot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read prop
perties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot r
read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties
s of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot 
 read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read propertie
es of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
 ✓ src/tests/audio/audio-optimization.test.ts (28 tests) 79ms
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio context state changes
Audio context suspended - attempting to resume on next user interaction     


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should create and manage gain nodes correctly
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:139:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should retry failed requests
[AssetLoader] Response for sounds/test.ogg: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
 ✓ src/audio/__tests__/audio-error-handling.test.ts (10 tests) 41ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should preload sounds within performance budget
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should create buffer sources for sound playback
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
Asset loading complete: 10/10 loaded, 0 failed

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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should preload sounds within perf
formance budget
Preloaded 10 sounds

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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at processTimers (node:internal/timers:526:9)
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at processTimers (node:internal/timers:526:9)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffe
er > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should preload sounds with progress tracking
Preloaded 10 sounds

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
Failed to load test_sound from sounds/test.mp3: Error: Network error        
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Preloading Performance > should handle concurrent preloading efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should apply optimization dur
ring preloading
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 0/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 5/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 0/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 2/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 0/20        
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 0/14
 ❯ src/tests/comprehensive-sound-system.test.ts 13/36
 ❯ src/tests/game-state-sound-transitions.test.ts [queued]
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 3/20

 Test Files 2 passed (40)
      Tests 72 passed (265)
   Start at 15:49:37
   Duration 3.12s
ode (vitest 10)ode (vitest 14)stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should apply optimization during preloading
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
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should apply optimization dur
ring preloading
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should handle concurrent preloadi
ing efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Preloading Performance > should optimize network requests 
 during preloading
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should play sounds with minim
mal latency
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

 ✓ src/tests/audio/hooks/use-audio-settings.test.ts (14 tests) 63ms
 ✓ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts (20 tests) 8
85ms

 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stderr | src/tests/audio-context.test.tsx > AudioContext > should handle initialization errors
Failed to initialize audio: Error: Initialization failed
    at D:\FizzBash\TheWanderer\src\tests\audio-context.test.tsx:87:23       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runFiles (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1787:3)

stderr | src/tests/audio-context.test.tsx > AudioContext > should handle ini
itialization errors
Failed to initialize audio: Error: Initialization failed
    at D:\FizzBash\TheWanderer\src\tests\audio-context.test.tsx:87:23       
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
    at runFiles (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1787:3)

stderr | src/tests/audio-context.test.tsx > AudioContext > should allow manu
ual cleanup
An update to AudioProvider inside a test was not wrapped in act(...).       

When testing, code that causes React state updates should be wrapped into ac
ct(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the brow
wser. Learn more at https://react.dev/link/wrap-tests-with-act


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Attempting to load: sounds/test.ogg
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.ogg


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should throw error if all sources fail
[AssetLoader] Error loading sounds/test.ogg: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:155:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Response for sounds/test.mp3: 404 Not Found
[AssetLoader] Response headers: { 'content-type': 'text/html' }


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
[AssetLoader] Error loading sounds/test.mp3: Error: HTTP 404: Not Found     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:178:31    

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle HTTP errors
Failed to load test_sound from sounds/test.mp3: Error: HTTP 404: Not Found  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:178:31    


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should handle audio decoding errors
[AssetLoader] Error loading sounds/test.mp3: Error: Invalid audio data      
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:207:68  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stderr | src/tests/audio/context/audio-context-debug-panel.test.tsx > AudioContext Debug Panel State Management > localStorage persistence > should handle corrupted localStorage data gracefully
Failed to load audio settings: SyntaxError: Unexpected token 'i', "invalid-json" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadAudioSettings (D:\FizzBash\TheWanderer\src\audio\context\audio-context.tsx:67:27)
    at AudioProvider (D:\FizzBash\TheWanderer\src\audio\context\audio-context.tsx:122:15)
    at Object.react-stack-bottom-frame (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:23863:20)
    at renderWithHooks (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:5529:22)
    at updateFunctionComponent (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:8897:19)
    at beginWork (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\react-dom-client.development.js:10522:18)
    at runWithFiberInDEV (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs
s\react-dom-client.development.js:1522:13)
    at performUnitOfWork (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs
s\react-dom-client.development.js:15140:22)
    at workLoopSync (D:\FizzBash\TheWanderer\node_modules\react-dom\cjs\reac
ct-dom-client.development.js:14956:41)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should apply optimization during preloading
Preloaded 10 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should play sounds with minimal latency
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should play sounds with minim
mal latency
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should play sounds with minim
mal latency
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should play sounds with minim
mal latency
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should play sounds with minim
mal latency
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should play sounds with minim
mal latency
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should play sounds with minim
mal latency
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should play sounds with minim
mal latency
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should play sounds with minim
mal latency
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should play sounds with minim
mal latency
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
Retry 1/3 for /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio-context.test.tsx > AudioContext > should handle non
n-Error exceptions during initialization
Failed to initialize audio: String error

stderr | src/tests/audio-context.test.tsx > AudioContext > should handle non
n-Error exceptions during initialization
Failed to initialize audio: String error


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should play sounds with minimal latency
Asset loading complete: 10/10 loaded, 0 failed

 ✓ src/tests/audio-context.test.tsx (7 tests) 187ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should play sounds with minimal latency
Preloaded 10 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAudioBuffer > should respect timeout
Failed to load test_sound from sounds/test.mp3: Error: Timeout loading sounds/test.mp3 after 100ms
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:163:24)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
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

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > s
should load all preload assets
[AssetLoader] Attempting to load: sounds/sound1.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound1.mp3
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound2.mp3
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
[AssetLoader] Full URL: http://localhost:3000/sounds/sound1.mp3
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound2.mp3
[AssetLoader] Response for sounds/sound1.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
[AssetLoader] Error loading sounds/sound2.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:297:40  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle rapid sequentia
al playback efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle rapid sequentia
al playback efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle rapid sequentia
al playback efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle rapid sequentia
al playback efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle rapid sequentia
al playback efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle rapid sequentia
al playback efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle rapid sequentia
al playback efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

 ✓ src/tests/audio/context/audio-context-debug-panel.test.tsx (15 tests) 234
4ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle rapid sequentia
al playback efficiently
Asset loading complete: 10/10 loaded, 0 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 8/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 0/7
 ❯ src/tests/GameState-sound-integration.test.ts 0/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 6/20

 Test Files 6 passed (40)
      Tests 137 passed (272)
   Start at 15:49:37
   Duration 3.43s
ode (vitest 12)stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle rapid sequential playback efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
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
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3ode (vitest 13)
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Sound Playback Performance > should handle concurrent soun
nd playback efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > s
should handle partial failures
[AssetLoader] Attempting to load: sounds/sound2.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/sound2.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 2/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 9/20

 Test Files 7 passed (40)
      Tests 154 passed (272)
   Start at 15:49:37
   Duration 3.64s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound2 from sounds/sound2.mp3: TypeError: Cannot read properties of undefined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:53    
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:203:30    

stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Failed to load sound sound2: TypeError: Cannot read properties of undefined (reading 'then')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:171:53    
    at new Promise (<anonymous>)
    at AssetLoader.loadAudioFile (D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:159:16)
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:203:30    


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 2/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 9/20

 Test Files 7 passed (40)
      Tests 154 passed (272)
   Start at 15:49:37
   Duration 3.64s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > loadAssets > should handle partial failures
Asset loading complete: 1/2 loaded, 1 failed

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit progress events
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit progress events
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 2/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 9/20

 Test Files 7 passed (40)
      Tests 154 passed (272)
   Start at 15:49:37
   Duration 3.64s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 2/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 9/20

 Test Files 7 passed (40)
      Tests 154 passed (272)
   Start at 15:49:37
   Duration 3.64s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Sound Playback Performance > should handle concurrent sound playback efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should manage memory efficiently during intensive use
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

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > progress track
king > should emit error events on failure
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 2/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 9/20

 Test Files 7 passed (40)
      Tests 154 passed (272)
   Start at 15:49:37
   Duration 3.64s
stderr | src/tests/audio/asset-loader.test.ts > AssetLoader > progress tracking > should emit error events on failure
[AssetLoader] Error loading sounds/test.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\asset-loader.test.ts:357:41  
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
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


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 2/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 9/20

 Test Files 7 passed (40)
      Tests 154 passed (272)
   Start at 15:49:37
   Duration 3.64s
stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats
[AssetLoader] Attempting to load: sounds/test.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/test.mp3

stdout | src/tests/audio/asset-loader.test.ts > AssetLoader > format optimization > should prefer supported formats
[AssetLoader] Response for sounds/test.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should manage memory efficiently during intensive use
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

 ✓ src/tests/audio/asset-loader.test.ts (16 tests) 689ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should manage memory efficiently duri
ing intensive use
Preloaded 10 sounds


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 2/7
 ❯ src/tests/GameState-sound-integration.test.ts 4/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 9/20

 Test Files 7 passed (40)
      Tests 154 passed (272)
   Start at 15:49:37
   Duration 3.64s
ode (vitest 15)ode (vitest 6)ode (vitest 8)ode (vitest 9) ✓ src/tests/GameState-sound-integration.test.ts (9 tests) 337ms
 ✓ src/tests/game-state-sound-transitions.test.ts (7 tests) 335ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Memory Performance > should prevent memory leaks during long-running sessions
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Memory Performance > should prevent memory leaks during lo
ong-running sessions
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should handle sound event emiss
sion efficiently
Asset loading complete: 10/10 loaded, 0 failed


 ❯ src/audio/__tests__/audio-error-handling.test.ts 10/10
 ❯ src/audio/__tests__/error-handling.test.ts 7/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/audio-optimization.test.ts 28/28
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 10/20

 Test Files 9 passed (40)
      Tests 165 passed (272)
   Start at 15:49:37
   Duration 3.95s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should handle sound event emission efficiently
Preloaded 10 sounds

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s


















stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7) ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance under event system stress
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


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance under event system stress
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance under event system stress
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Event System Performance > should maintain performance under event system stress
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should maintain performance und
der event system stress
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should maintain performance und
der event system stress
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should maintain performance und
der event system stress
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should maintain performance und
der event system stress
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should maintain performance und
der event system stress
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should maintain performance und
der event system stress
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should maintain performance und
der event system stress
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should maintain performance und
der event system stress
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Event System Performance > should maintain performance und
der event system stress
Preloaded 10 sounds


 ❯ src/audio/__tests__/error-handling.test.ts 8/23
 ❯ src/tests/audio-context.test.tsx 7/7
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/context/audio-context-debug-panel.test.tsx 15/15
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/audio/hooks/use-audio-settings-debug-panel.test.ts 20/20       
 ❯ src/tests/audio/hooks/use-audio-settings.test.ts 14/14
 ❯ src/tests/comprehensive-sound-system.test.ts 14/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 12/20

 Test Files 9 passed (40)
      Tests 168 passed (272)
   Start at 15:49:37
   Duration 4.15s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound 
 System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebA
AudioManager with Comprehensive Mocks > should handle audio decoding with moc
cked decodeAudioData
Preloaded 10 sounds


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle mocked audio context errors gracefully                                                             
Audio context error (INITIALIZATION_FAILED): Error: AudioContext creation failed                                                                        
    at fn.<anonymous> (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:565:27)                                                     
    at new mockCall (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/spy/dist/index.js:96:15)                                                      
    at new spy (file:///D:/FizzBash/TheWanderer/node_modules/tinyspy/dist/index.js:47:39)                                                               
    at WebAudioManager.initializeAudioContext (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:97:39)                                       
    at new WebAudioManager (D:\FizzBash\TheWanderer\src\audio\managers\audio-manager.ts:80:14)
    at D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:
:568:33
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chun
nk-hooks.js:1897:20
    at new Promise (<anonymous>)


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should initialize with mocked HTML5 Audio                                                                      
HTML5 Audio initialized successfully                                        
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should create audio elements for each sound                                                                    
HTML5 Audio initialized successfully                                        
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > HTML5AudioManager with Comprehensive Mocks > should create audio elements for each sound
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)
    at listOnTimeout (node:internal/timers:594:17)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should cleanup resources efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should cleanup resources efficiently
Preloaded 10 sounds

 ✓ src/audio/__tests__/error-handling.test.ts (23 tests) 1226ms
   ✓ Audio Error Handling and Fallbacks > Sound File Loading Errors > should
d retry failed sound loads  1009ms
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
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

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/player/dig.mp3                    
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3         
                                                                            
                                                                            
 ❯ src/audio/__tests__/error-handling.test.ts 23/23                         
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/asset-loader.test.ts 16/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7                       
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3                
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     
                                                                            
                                                                            
 ❯ src/audio/__tests__/error-handling.test.ts 23/23                         
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/asset-loader.test.ts 16/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7                       
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3                   
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        
                                                                            
                                                                            
 ❯ src/audio/__tests__/error-handling.test.ts 23/23                         
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/asset-loader.test.ts 16/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7                       
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                    
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3         
                                                                            
                                                                            
 ❯ src/audio/__tests__/error-handling.test.ts 23/23                         
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/asset-loader.test.ts 16/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7                       
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/player/death.mp3                  
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       
                                                                            
                                                                            
 ❯ src/audio/__tests__/error-handling.test.ts 23/23                         
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/asset-loader.test.ts 16/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7                       
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
                                                                            
                                                                            
 ❯ src/audio/__tests__/error-handling.test.ts 23/23                         
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/asset-loader.test.ts 16/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7                       
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error                                                                       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3         
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3                                                                          
                                                                            
                                                                            
 ❯ src/audio/__tests__/error-handling.test.ts 23/23                         
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/asset-loader.test.ts 16/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3               
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
                                                                            
                                                                            
 ❯ src/audio/__tests__/error-handling.test.ts 23/23                         
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/asset-loader.test.ts 16/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7                       
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3              
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   
                                                                            
                                                                            
 ❯ src/audio/__tests__/error-handling.test.ts 23/23                         
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/asset-loader.test.ts 16/16                               
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7                       
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                          
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK                  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                          
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently                                                          
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
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


 ❯ src/audio/__tests__/error-handling.test.ts 23/23
 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/asset-loader.test.ts 16/16
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-sound-transitions.test.ts 7/7
 ❯ src/tests/GameState-sound-integration.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.42s
ode (vitest 5)stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Cleanup Performance > should handle cleanup of multiple managers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Cleanup Performance > should handle cleanup of multiple ma
anagers efficiently
Preloaded 10 sounds


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 15/20

 Test Files 10 passed (40)
      Tests 192 passed (272)
   Start at 15:49:37
   Duration 4.67s
(node:65404) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 15:49:37
   Duration 4.89s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain consistent performance across operations                                           
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Regression Detection > should maintain consist
tent performance across operations
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Regression Detection > should maintain consist
tent performance across operations
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Regression Detection > should maintain consist
tent performance across operations
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Regression Detection > should maintain consist
tent performance across operations
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Regression Detection > should maintain consist
tent performance across operations
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Regression Detection > should maintain consist
tent performance across operations
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Regression Detection > should maintain consist
tent performance across operations
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Regression Detection > should maintain consist
tent performance across operations
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 15:49:37
   Duration 4.89s
(node:76232) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.                              
(Use `node --trace-deprecation ...` to show where the warning was created)  
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts [queued]                   
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/movement-constraint-system.test.ts [queued]                    
 ❯ src/tests/sound-event-integration.test.ts [queued]                       
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  
 ❯ src/tests/sound-system-performance.test.ts 16/20                         
                                                                            
 Test Files 10 passed (40)                                                  
      Tests 193 passed (272)
   Start at 15:49:37
   Duration 4.89s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain consistent performance across operations                                           
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK              
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain consistent performance across operations                                           
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK             
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Regression Detection > should maintain consistent performance across operations
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Regression Detection > should maintain consist
tent performance across operations
Preloaded 10 sounds

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
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

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should provide perfor
rmance metrics for monitoring
Preloaded 10 sounds


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts [queued]
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 16/20

 Test Files 10 passed (40)
      Tests 193 passed (272)
   Start at 15:49:37
   Duration 4.89s
(node:41256) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should track performance trends over time                                                        
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
(node:19440) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.                              
(Use `node --trace-deprecation ...` to show where the warning was created)  
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]               
 ❯ src/tests/movement-constraint-system.test.ts [queued]                    
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]                       
 ❯ src/tests/sound-event-integration.test.ts 38/38                          
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  
 ❯ src/tests/sound-system-performance.test.ts 19/20                         
                                                                            
 Test Files 12 passed (40)                                                  
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should track performance trends over time                                                        
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK                  
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should track performance trends over time                                                        
[AssetLoader] Response for /sounds/player/dig.mp3: 200 OK                   
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }            
                                                                            
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should track performance trends over time                                                        
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: 200 OK               
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should track performa
ance trends over time
[AssetLoader] Response for /sounds/arrow/twang.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should track performa
ance trends over time
[AssetLoader] Response for /sounds/arrow/thud.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should track performa
ance trends over time
[AssetLoader] Response for /sounds/player/death.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should track performa
ance trends over time
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should track performa
ance trends over time
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should track performa
ance trends over time
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests f
for Audio System > Performance Monitoring and Metrics > should track performa
ance trends over time
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should preload sounds successfully
[AssetLoader] Response for /sounds/player/walk.mp3: undefined undefined     


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should preload sounds successfully
Failed to load sound PLAYER_WALK: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Attempting to load: /sounds/player/dig.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3

stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
(node:53560) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.                              
(Use `node --trace-deprecation ...` to show where the warning was created)  
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should preload sounds successfully
Failed to load sound PLAYER_DIG: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3                
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load sound BOULDER_MOVE: TypeError: Cannot read properties of undefined (reading 'entries')                                                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3                   
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
 ✓ src/tests/sound-event-integration.test.ts (38 tests) 30ms                
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]               
 ❯ src/tests/movement-constraint-system.test.ts [queued]                    
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]                       
 ❯ src/tests/sound-event-integration.test.ts 38/38                          
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  
 ❯ src/tests/sound-system-performance.test.ts 19/20                         
                                                                            
 Test Files 12 passed (40)                                                  
      Tests 255 passed (331)                                                
   Start at 15:49:37                                                        
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully
Failed to load sound ARROW_MOVE: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                    
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3         
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should preload sounds successfully
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Attempting to load: /sounds/player/death.mp3                  
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should preload sounds successfully
Failed to load sound DEATH_SOUND: TypeError: Cannot read properties of undef
fined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                   
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should preload sounds successfully
Failed to load sound VICTORY_SOUND: TypeError: Cannot read properties of und
defined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3         
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3                                                                          
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefined (reading 'entries')                                                      
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3               
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should preload sounds successfully
Failed to load sound DIAMOND_COLLECT: TypeError: Cannot read properties of u
undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3              
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefined (reading 'entries')                                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should preload sounds successfully                                         
Preloaded 0 sounds                                                          
                                                                            
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should track performance trends over time                                                        
Asset loading complete: 10/10 loaded, 0 failed                              
                                                                            
 ✓ src/tests/collision-sound-integration.test.ts (21 tests) 25ms            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
Retry 1/3 for /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
Retry 1/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
Retry 1/3 for /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
Retry 1/3 for /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
Retry 1/3 for /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
Retry 1/3 for /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Networ
rk error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
Retry 1/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
Retry 1/3 for /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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
Retry 1/3 for /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-performance.test.ts > 5. Performance Tests for Audio System > Performance Monitoring and Metrics > should track performance trends over time                                                        
Preloaded 10 sounds                                                         
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Attempting to load: /sounds/player/walk.mp3                   
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]               
 ❯ src/tests/movement-constraint-system.test.ts [queued]                    
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]                       
 ❯ src/tests/sound-event-integration.test.ts 38/38                          
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  
 ❯ src/tests/sound-system-performance.test.ts 19/20                         

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                               
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]               
 ❯ src/tests/movement-constraint-system.test.ts [queued]                    
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]                       
 ❯ src/tests/sound-event-integration.test.ts 38/38                          
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  
 ❯ src/tests/sound-system-performance.test.ts 19/20                         

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]               
 ❯ src/tests/movement-constraint-system.test.ts [queued]                    
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]                       
 ❯ src/tests/sound-event-integration.test.ts 38/38                          
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  
 ❯ src/tests/sound-system-performance.test.ts 19/20                         

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load sound COLLISION_THUD: TypeError: Cannot read properties of un
ndefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]               
 ❯ src/tests/movement-constraint-system.test.ts [queued]                    
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]                       
 ❯ src/tests/sound-event-integration.test.ts 38/38                          
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  
 ❯ src/tests/sound-system-performance.test.ts 19/20                         

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Failed to load DEATH_SOUND from /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                   
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]               
 ❯ src/tests/movement-constraint-system.test.ts [queued]                    
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]                       
 ❯ src/tests/sound-event-integration.test.ts 38/38                          
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]               
 ❯ src/tests/movement-constraint-system.test.ts [queued]                    
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]                       
 ❯ src/tests/sound-event-integration.test.ts 38/38                          
 ❯ src/tests/sound-system-e2e.test.ts 0/17                                  
 ❯ src/tests/sound-system-performance.test.ts 19/20                         

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                     
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


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/audio-manager.test.ts 4/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/collision-sound-integration.test.ts 21/21
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Preloaded 0 sounds                                                          
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 4/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/collision-sound-integration.test.ts 21/21                      
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/game-state-movement-constraints.test.ts [queued]               
 ❯ src/tests/movement-constraint-system.test.ts [queued]
 ❯ src/tests/physics-engine-enhanced.test.ts [queued]
 ❯ src/tests/sound-event-integration.test.ts 38/38
 ❯ src/tests/sound-system-e2e.test.ts 0/17
 ❯ src/tests/sound-system-performance.test.ts 19/20

 Test Files 12 passed (40)
      Tests 255 passed (331)
   Start at 15:49:37
   Duration 5.11s
ode (vitest 10)ode (vitest 14)stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow
Audio context state changed to: closed


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow                                                     
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 1/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 1/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 1/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 1/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 1/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 1/3 for /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 1/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)
Retry 1/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 1/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
(node:75576) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.                              
(Use `node --trace-deprecation ...` to show where the warning was created)  
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3                   
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
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

 ✓ src/tests/sound-system-performance.test.ts (20 tests) 2138ms
   ✓ 5. Performance Tests for Audio System > Cleanup Performance > should ha
andle cleanup of multiple managers efficiently  416ms

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
(node:26944) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.                              
(Use `node --trace-deprecation ...` to show where the warning was created)  
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                                                 
    at listOnTimeout (node:internal/timers:594:17)                          
    at processTimers (node:internal/timers:529:7)                           
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error                 
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                                                 
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

(node:49952) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/player/walk.mp3                   
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/player/dig.mp3                    
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3         
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3                
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3                   
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                    
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3         
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/player/death.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error                                                                       
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error                                                                     
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3               
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3              
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:168:45                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/
/dist/chunk-hooks.js:1574:12)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)  
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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

stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > enhanced preloading > should handle loading failure
es gracefully
Failed to load sound BOMB_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:168:45
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully                                                                
Preloaded 0 sounds                                                          
                                                                            
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode                                                                  
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > enhanced preloading > should skip preloading in fallback mode                                                                  
Audio manager in fallback mode, skipping preload                            
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23                      
 ❯ src/tests/boulder-state-manager.test.ts [queued]                         
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18                   
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13                          
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report                                                                    
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
                                                                            
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report                                                                    
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
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > optimization reporting > should provide optimizatio
on report
Asset loading complete: 10/10 loaded, 0 failed

 ❯ src/tests/physics-engine-enhanced.test.ts (13 tests | 1 failed) 23ms     
   × Enhanced Physics Engine > simulateGravityWithState > should handle trig
ggered boulders starting to move 19ms
     → expected [] to have a length of 1 but got +0
   · Enhanced Physics Engine > simulateGravityWithState > should handle boul
lder collision with COLLISION_THUD sound
   · Enhanced Physics Engine > simulateGravityWithState > should detect play
yer collision with moving boulder
   · Enhanced Physics Engine > simulateGravityWithState > should handle mult
tiple moving boulders
   · Enhanced Physics Engine > simulatePhysicsStepWithState > should integra
ate boulder state management with physics simulation
   · Enhanced Physics Engine > simulatePhysicsStepWithState > should handle 
 arrows alongside boulder state management
   · Enhanced Physics Engine > Boulder State Tracking Functions > should cor
rrectly identify moving boulder positions
   · Enhanced Physics Engine > Boulder State Tracking Functions > should cor
rrectly identify triggered boulder positions
   · Enhanced Physics Engine > Boulder State Tracking Functions > should cat
tegorize boulders correctly
   · Enhanced Physics Engine > Boulder State Tracking Functions > should det
termine if physics should continue based on state
   · Enhanced Physics Engine > Edge Cases > should handle empty maze        
   · Enhanced Physics Engine > Edge Cases > should handle boulder at maze bo
oundary
   · Enhanced Physics Engine > Edge Cases > should handle duplicate boulder 
 positions in moving list
 ✓ src/tests/movement-constraint-system.test.ts (33 tests) 20ms

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 4/23
 ❯ src/tests/boulder-state-manager.test.ts [queued]
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 1/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/physics-engine-enhanced.test.ts 13/13
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 14 passed (40)
      Tests 1 failed | 291 passed (395)
   Start at 15:49:37
   Duration 5.38s
ode (vitest 7) ✓ src/tests/game-state-movement-constraints.test.ts (18 tests) 1ms

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 6/23
 ❯ src/tests/boulder-state-manager.test.ts 0/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed (40)
      Tests 1 failed | 293 passed (435)
   Start at 15:49:37
   Duration 5.66s
(node:17052) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.                              
(Use `node --trace-deprecation ...` to show where the warning was created)  
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 6/23                      
 ❯ src/tests/boulder-state-manager.test.ts 0/40                             
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]                    
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/LargerMaze.test.ts [queued]                                    
 ❯ src/tests/LargerMazeUI.test.ts [queued]                                  
 ❯ src/tests/movement-constraint-system.test.ts 33/33                       
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  
                                                                            
 Test Files 1 failed | 15 passed (40)                                       
      Tests 1 failed | 293 passed (435)
   Start at 15:49:37
   Duration 5.66s
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should provide optimization report                                                                    
Preloaded 10 sounds                                                         
                                                                            
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > optimization reporting > should handle empty buffer set                                                                        
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      
                                                                            
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > loading state management > should track loading state correctly                                                                
Initialized gain node pool with 5 nodes                                     
Web Audio API initialized successfully                                      

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > loading state management > should track loading sta
ate correctly
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
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > loading state management > should track loading sta
ate correctly
Asset loading complete: 10/10 loaded, 0 failed


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 6/23
 ❯ src/tests/boulder-state-manager.test.ts 0/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/LargerMaze.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts [queued]
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed (40)
      Tests 1 failed | 293 passed (435)
   Start at 15:49:37
   Duration 5.66s
 ↓ src/tests/enhanced-boulder-collision.test.ts (47 tests)
 ↓ src/tests/boulder-state-manager.test.ts (40 tests)
 ↓ src/tests/LargerMaze.test.ts (8 tests)
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > loading state management > should track loading state correctly
Preloaded 10 sounds

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads
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
[AssetLoader] Response for /sounds/environment/victory.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/environment/door-slam.mp3: 200 OK        
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/diamond/collect.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }
[AssetLoader] Response for /sounds/environment/bomb.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 8/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 0/12
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 3 skipped (40)
      Tests 1 failed | 295 passed (502)
   Start at 15:49:37
   Duration 5.77s
stderr | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads         
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.ts:226:44                                                                    
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 1/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio\enhanced-audio-manager.test.t
ts:226:44
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 8/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 0/12
 ❯ src/tests/movement-constraint-system.test.ts 33/33
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 3 skipped (40)
      Tests 1 failed | 295 passed (502)
   Start at 15:49:37
   Duration 5.77s
ode (vitest 12)ode (vitest 13)ode (vitest 15) ↓ src/tests/LargerMazeUI.test.ts (12 tests)

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts [queued]
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (502)
   Start at 15:49:37
   Duration 5.87s
ode (vitest 9)(node:33096) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/player/walk.mp3                   
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 0/10                                         
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/walk.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/player/dig.mp3                    
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3         
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 0/10                                         
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/dig.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3                
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 0/10                                         
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3                   
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 0/10                                         
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/arrow/thud.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/player/death.mp3                  
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 0/10                                         
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/player/death.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3           
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 0/10                                         
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error                                                                       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/victory.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3         
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3                                                                          
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 0/10                                         
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
    at new Promise (<anonymous>)
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/door-slam.mp3: Error: Network error       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3               
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 0/10                                         
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/diamond/collect.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3              
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 0/10                                         
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
    at new Promise (<anonymous>)                                            
    at runWithTimeout (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1863:10)                                         
    at runTest (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1574:12)                                                
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
    at runSuite (file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner
r/dist/chunk-hooks.js:1729:8)
Retry 2/3 for /sounds/environment/bomb.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 20/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 0/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 4 skipped (40)
      Tests 1 failed | 296 passed (512)
   Start at 15:49:37
   Duration 6.09s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
Attempting to reinitialize audio context
Initialized gain node pool with 5 nodes
Web Audio API initialized successfully

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete g
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

 ↓ src/tests/GameState.test.ts (10 tests)
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 2/3 for /sounds/player/walk.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 10/10                                        
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12                                     
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 2/3 for /sounds/player/dig.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 10/10                                        
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12                                     
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 2/3 for /sounds/boulder/Whoosh.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 10/10                                        
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12                                     
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                 
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 2/3 for /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                               
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
                                                                            
                                                                            
                                                                            
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                  
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 2/3 for /sounds/arrow/thud.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 10/10                                        
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12                                     
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 2/3 for /sounds/player/death.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                              
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 10/10                                        
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12                                     
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                         
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 2/3 for /sounds/environment/victory.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 10/10                                        
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12                                     
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                     
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 10/10                                        
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12                                     
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                             
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
Retry 2/3 for /sounds/diamond/collect.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                           
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
    at runNextTicks (node:internal/process/task_queues:65:5)                
    at listOnTimeout (node:internal/timers:555:9)                           
    at processTimers (node:internal/timers:529:7)                           
                                                                            
ode (vitest 5)
 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18                  
 ❯ src/tests/GameState.test.ts 10/10                                        
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeUI.test.ts 12/12                                     
 ❯ src/tests/sound-system-e2e.test.ts 1/17                                  

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                            
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
Retry 2/3 for /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                                          
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Attempting to load: /sounds/player/walk.mp3                   
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                                                 
    at listOnTimeout (node:internal/timers:594:17)                          
    at processTimers (node:internal/timers:529:7)                           
                                                                            
stderr | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Network error                                                                           
    at Timeout._onTimeout (D:\FizzBash\TheWanderer\src\tests\comprehensive-sound-system.test.ts:201:28)                                                 
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


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/comprehensive-sound-system.test.ts > Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  
Preloaded 0 sounds                                                          
                                                                            
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 21/36                       
 ❯ src/tests/enhanced-boulder-collision.test.ts 47/47                       
 ❯ src/tests/game-state-movement-constraints.test.ts 18/18
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 15 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (512)
   Start at 15:49:37
   Duration 6.29s
ode (vitest 4) ✓ src/tests/comprehensive-sound-system.test.ts (36 tests) 3303ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > WebAudioManager with Comprehensive Mocks > should handle audio decoding with mocked decodeAudioData  1064ms
   ✓ Comprehensive Sound System Test Suite > 3. Mock Implementations for Web Audio API Testing > Mock Error Scenarios > should handle mocked network failures during preloading  2067ms

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23
 ❯ src/tests/boulder-audio-events.test.ts 0/18
 ❯ src/tests/boulder-state-manager.test.ts 40/40
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMaze.test.ts 8/8
 ❯ src/tests/LargerMazeGameState.test.ts [queued]
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 16 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (530)
   Start at 15:49:37
   Duration 6.59s
(node:22548) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.                              
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:57000) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.                              
(Use `node --trace-deprecation ...` to show where the warning was created)  
                                                                            
 ❯ src/tests/audio-manager.test.ts 5/27                                     
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 9/23                      
 ❯ src/tests/boulder-audio-events.test.ts 0/18                              
 ❯ src/tests/boulder-state-manager.test.ts 40/40                            
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/GameState.test.ts 10/10                                        
 ❯ src/tests/LargerMaze.test.ts 8/8                                         
 ❯ src/tests/LargerMazeGameState.test.ts [queued]                           
 ❯ src/tests/LargerMazeUI.test.ts 12/12                                     
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 1 failed | 16 passed | 5 skipped (40)
      Tests 1 failed | 297 passed (530)
   Start at 15:49:37
   Duration 6.59s
ode (vitest 14) ↓ src/tests/LargerMazeGameState.test.ts (9 tests)
 ❯ src/tests/boulder-audio-events.test.ts (18 tests | 1 failed) 14ms        
   × Boulder Audio Events > BOULDER_MOVE Sound Events > should generate BOULDER_MOVE sound when boulder starts moving 12ms
     → expected [] to have a length of 1 but got +0
   · Boulder Audio Events > BOULDER_MOVE Sound Events > should generate BOULDER_MOVE sound for multiple boulders starting to move
   · Boulder Audio Events > BOULDER_MOVE Sound Events > should map BOULDER_MOVE sound event to correct sound ID
   · Boulder Audio Events > BOULDER_MOVE Sound Events > should not generate BOULDER_MOVE sound for stationary boulders
   · Boulder Audio Events > COLLISION_THUD Sound Events > should generate COLLISION_THUD sound when boulder collides with rock
   · Boulder Audio Events > COLLISION_THUD Sound Events > should generate COLLISION_THUD sound when boulder hits another boulder
   · Boulder Audio Events > COLLISION_THUD Sound Events > should detect player collision when boulder hits player
   · Boulder Audio Events > COLLISION_THUD Sound Events > should map COLLISI
ION_THUD sound event to correct sound ID
   · Boulder Audio Events > COLLISION_THUD Sound Events > should generate CO
OLLISION_THUD sound when boulder hits solid objects
   · Boulder Audio Events > Audio Event Integration > should emit boulder so
ound events through the sound system
   · Boulder Audio Events > Audio Event Integration > should handle simultan
neous boulder movements with independent sound events
   · Boulder Audio Events > Audio Event Integration > should generate both m
movement and collision sounds in sequence
   · Boulder Audio Events > Sound Event Properties > should generate BOULDER
R_MOVE sound with correct properties
   · Boulder Audio Events > Sound Event Properties > should generate COLLISI
ION_THUD sound with correct properties
   · Boulder Audio Events > Sound Event Properties > should maintain consist
tent sound event structure
   · Boulder Audio Events > Edge Cases > should handle boulder at maze bound
dary without generating invalid sounds
   · Boulder Audio Events > Edge Cases > should handle empty maze without er
rrors
   · Boulder Audio Events > Edge Cases > should handle multiple rapid boulde
er state changes
stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > error recovery > should retry failed loads
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > error recovery > should retry failed loads
[AssetLoader] Response for /sounds/player/walk.mp3: 200 OK
[AssetLoader] Response headers: { 'content-type': 'audio/mpeg' }

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > error recovery > should retry failed loads
Asset loading complete: 10/10 loaded, 0 failed

stdout | src/tests/audio/enhanced-audio-manager.test.ts > Enhanced Audio Man
nager > WebAudioManager > error recovery > should retry failed loads
Preloaded 10 sounds


 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/audio/enhanced-audio-manager.test.ts 10/23
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/LargerMazeUI.test.ts 12/12
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 2 failed | 16 passed | 6 skipped (40)
      Tests 2 failed | 298 passed (539)
   Start at 15:49:37
   Duration 6.81s
ode (vitest 1) ✓ src/tests/audio/enhanced-audio-manager.test.ts (23 tests) 3819ms
   ✓ Enhanced Audio Manager > WebAudioManager > enhanced preloading > should handle loading failures gracefully  2040ms
   ✓ Enhanced Audio Manager > WebAudioManager > error recovery > should retry failed loads  1094ms

 ❯ src/tests/audio-manager.test.ts 5/27
 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/GameState.test.ts 10/10
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 1/17

 Test Files 2 failed | 17 passed | 6 skipped (40)
      Tests 2 failed | 298 passed (539)
   Start at 15:49:37
   Duration 7.02s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Attempting to load: /sounds/player/walk.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/player/walk.mp3        


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/player/walk.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load PLAYER_WALK from /sounds/player/walk.mp3: Error: Network erro
or
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load sound PLAYER_WALK: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/player/dig.mp3                    
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/dig.mp3         
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/player/dig.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load PLAYER_DIG from /sounds/player/dig.mp3: Error: Network error 
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load sound PLAYER_DIG: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/boulder/Whoosh.mp3                
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/boulder/Whoosh.mp3     
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9ode (vitest 3)
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Error loading /sounds/boulder/Whoosh.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load BOULDER_MOVE from /sounds/boulder/Whoosh.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load sound BOULDER_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/arrow/twang.mp3                   
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/twang.mp3        
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/arrow/twang.mp3: Error: Network error   
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load ARROW_MOVE from /sounds/arrow/twang.mp3: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load sound ARROW_MOVE: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/arrow/thud.mp3                    
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/arrow/thud.mp3         
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/arrow/thud.mp3: Error: Network error    
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load COLLISION_THUD from /sounds/arrow/thud.mp3: Error: Network er
rror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load sound COLLISION_THUD: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/player/death.mp3                  
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/player/death.mp3       
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/player/death.mp3: Error: Network error  
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20                                                          
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load DEATH_SOUND from /sounds/player/death.mp3: Error: Network err
ror
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load sound DEATH_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully
[AssetLoader] Attempting to load: /sounds/environment/victory.mp3
[AssetLoader] Current location: http://localhost:3000/
[AssetLoader] Base URL: http://localhost:3000
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/victory.mp3


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/environment/victory.mp3: Error: Network error                                                                       
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load VICTORY_SOUND from /sounds/environment/victory.mp3: Error: Ne
etwork error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load sound VICTORY_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/environment/door-slam.mp3         
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/door-slam.mp3                                                                          
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: Error: Network error                                                                     
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load sound DOOR_SLAM: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/diamond/collect.mp3               
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/diamond/collect.mp3    
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/diamond/collect.mp3: Error: Network error                                                                           
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load DIAMOND_COLLECT from /sounds/diamond/collect.mp3: Error: Netw
work error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load sound DIAMOND_COLLECT: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Attempting to load: /sounds/environment/bomb.mp3              
[AssetLoader] Current location: http://localhost:3000/                      
[AssetLoader] Base URL: http://localhost:3000                               
[AssetLoader] Full URL: http://localhost:3000/sounds/environment/bomb.mp3   
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
[AssetLoader] Error loading /sounds/environment/bomb.mp3: Error: Network error                                                                          
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:155:11                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:752:26                                                           
    at file:///D:/FizzBash/TheWanderer/node_modules/@vitest/runner/dist/chunk-hooks.js:1897:20
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: Error: Network 
 error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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

stderr | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager >
> should handle preload errors gracefully
Failed to load sound BOMB_SOUND: Error: Network error
    at D:\FizzBash\TheWanderer\src\tests\audio-manager.test.ts:222:41       
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/audio-manager.test.ts > Audio Manager > WebAudioManager > should handle preload errors gracefully                                    
Preloaded 0 sounds                                                          
                                                                            
 ✓ src/tests/audio-manager.test.ts (27 tests) 4111ms                        
   ✓ Audio Manager > WebAudioManager > should preload sounds successfully  2052ms
   ✓ Audio Manager > WebAudioManager > should handle preload errors graceful
lly  2040ms
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/dig.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9                                
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/boulder/Whoosh.mp3: undefined undefined  
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9                                
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/arrow/twang.mp3: undefined undefined     
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9                                
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Error loading /sounds/arrow/twang.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104
    at runNextTicks (node:internal/process/task_queues:65:5)
    at listOnTimeout (node:internal/timers:555:9)
    at processTimers (node:internal/timers:529:7)stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/arrow/thud.mp3: undefined undefined      
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9                                
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/player/death.mp3: undefined undefined    
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9                                
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/victory.mp3: undefined undefined                                                                         
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9                                
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/door-slam.mp3: undefined undefined                                                                       
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9                                
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Error loading /sounds/environment/door-slam.mp3: TypeError: Cannot read properties of undefined (reading 'entries')                       
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
Failed to load DOOR_SLAM from /sounds/environment/door-slam.mp3: TypeError: 
 Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound DOOR_SLAM: TypeError: Cannot read properties of undefin
ned (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/diamond/collect.mp3: undefined undefined 
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9                                
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
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


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
[AssetLoader] Response for /sounds/environment/bomb.mp3: undefined undefined
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36                       
 ❯ src/tests/LargerMazeGameState.test.ts 9/9                                
 ❯ src/tests/sound-system-e2e.test.ts 2/17                                  

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
                                                                            
                                                                            
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
[AssetLoader] Error loading /sounds/environment/bomb.mp3: TypeError: Cannot read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow
Failed to load BOMB_SOUND from /sounds/environment/bomb.mp3: TypeError: Cann
not read properties of undefined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   

stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Failed to load sound BOMB_SOUND: TypeError: Cannot read properties of undefi
ined (reading 'entries')
    at D:\FizzBash\TheWanderer\src\audio\managers\asset-loader.ts:175:104   


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
Asset loading complete: 0/10 loaded, 10 failed                              
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
Preloaded 0 sounds                                                          
                                                                            
stdout | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Comple
ete Sound Workflows > Complete Game Sound Workflow > should handle complete g
game state transition workflow
Audio context state changed to: closed
Audio context state changed to: closed


 ❯ src/tests/boulder-audio-events.test.ts 18/18
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
stderr | src/tests/sound-system-e2e.test.ts > 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow                                               
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
Audio context closed unexpectedly                                           
Audio context closed unexpectedly, attempting to reinitialize               
                                                                            
                                                                            
 ❯ src/tests/boulder-audio-events.test.ts 18/18                             
 ❯ src/tests/comprehensive-sound-system.test.ts 36/36
 ❯ src/tests/LargerMazeGameState.test.ts 9/9
 ❯ src/tests/sound-system-e2e.test.ts 2/17

 Test Files 2 failed | 18 passed | 6 skipped (40)
      Tests 2 failed | 300 passed (539)
   Start at 15:49:37
   Duration 7.22s
 ✓ src/tests/sound-system-e2e.test.ts (17 tests) 4215ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete player movement workflow  2113ms
   ✓ 4. End-to-End Tests for Complete Sound Workflows > Complete Game Sound Workflow > should handle complete game state transition workflow  2099ms    

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/boulder-audio-events.test.ts > Boulder Audio Events > BOULDER_MOVE Sound Events > should generate BOULDER_MOVE sound when boulder starts moving
AssertionError: expected [] to have a length of 1 but got +0

- Expected
+ Received

- 1
+ 0

 ❯ src/tests/boulder-audio-events.test.ts:60:36
     58|X);
     59|
     60|Xexpect(movementSounds).toHaveLength(1);
       |X^
     61|Xexpect(movementSounds[0]).toEqual({
     62|Xtype: 'movement',

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  src/tests/physics-engine-enhanced.test.ts > Enhanced Physics Engine >
> simulateGravityWithState > should handle triggered boulders starting to mov
ve
AssertionError: expected [] to have a length of 1 but got +0

- Expected
+ Received

- 1
+ 0

 ❯ src/tests/physics-engine-enhanced.test.ts:45:36
     43|Xevent => event.type === 'movement' && event.source…
     44|X);
     45|Xexpect(movementSounds).toHaveLength(1);
       |X^
     46|Xexpect(movementSounds[0]?.volume).toBe(0.8);
     47|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯



 Test Files  2 failed | 19 passed | 6 skipped (40)
      Tests  2 failed | 300 passed (539)
   Start at  15:49:37
   Duration  7.35s (transform 2.23s, setup 7.09s, collect 6.35s, tests 20.98
8s, environment 39.48s, prepare 7.22s)

ode (vitest 2):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Let me run a more focused test to check the boulder-related tests:

Command
npm test -- --run boulder
npm test -- --run boulder
:\Windows\System32\cmd.exe - npm  test -- --run boulderpm test --run boulder
> thewanderer@0.1.0 test
> vitest run -c vitest.config.ts --bail=1 --run boulder

:\Windows\system32\cmd.exe ode (vitest)
 RUN  v3.2.4 D:/FizzBash/TheWanderer

ode (vitest 1)ode (vitest 2)ode (vitest 3)ode (vitest 5)ode (vitest 7)ode (vitest 8)ode (vitest 9)ode (vitest 10)ode (vitest 12)ode (vitest 13)
 Test Files 0 passed (5)
      Tests 0 passed (0)
   Start at 15:50:02
   Duration 908ms

 ❯ src/tests/boulder-audio-events.test.ts [queued]

 Test Files 0 passed (5)
      Tests 0 passed (0)
   Start at 15:50:02
   Duration 1.23s
(node:61716) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:41092) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:13932) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:45092) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  
(node:46016) [DEP0040] DeprecationWarning: The `punycode` module is deprecat
ted. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)  

 ❯ src/tests/boulder-audio-events.test.ts [queued]
 ❯ src/tests/boulder-audio-mute-integration.test.ts [queued]
 ❯ src/tests/boulder-player-death.test.ts [queued]
 ❯ src/tests/boulder-state-manager.test.ts 0/40
 ❯ src/tests/enhanced-boulder-collision.test.ts [queued]

 Test Files 0 passed (5)
      Tests 0 passed (40)
   Start at 15:50:02
   Duration 1.56s
 ❯ src/tests/boulder-state-manager.test.ts (40 tests | 1 failed) 35ms       
   ✓ Boulder State Manager > Position utilities > should create position key correctly 2ms
   ✓ Boulder State Manager > Position utilities > should parse position key correctly 1ms
   ✓ Boulder State Manager > Position utilities > should handle zero coordinates 0ms
   ✓ Boulder State Manager > Boulder position detection > should find all boulder positions in maze 2ms
   ✓ Boulder State Manager > Boulder position detection > should return empty array for maze with no boulders 1ms
   ✓ Boulder State Manager > Boulder position detection > should handle empt
ty maze 0ms
   ✓ Boulder State Manager > Boulder state manager creation > should create 
 initial boulder state manager correctly 0ms
   ✓ Boulder State Manager > Boulder state manager creation > should handle 
 maze with no boulders 0ms
   ✓ Boulder State Manager > Position adjacency detection > should detect or
rthogonal adjacency 0ms
   ✓ Boulder State Manager > Position adjacency detection > should detect di
iagonal adjacency 0ms
   ✓ Boulder State Manager > Position adjacency detection > should not detec
ct non-adjacent positions 0ms
   ✓ Boulder State Manager > Position adjacency detection > should not consi
ider same position as adjacent 0ms
   ✓ Boulder State Manager > Adjacent boulder detection > should detect boul
lders adjacent to player 0ms
   ✓ Boulder State Manager > Adjacent boulder detection > should return empt
ty array when no boulders are adjacent 0ms
   ✓ Boulder State Manager > Adjacent boulder detection > should handle boun
ndary edge cases correctly 0ms
   ✓ Boulder State Manager > Adjacent boulder detection > should handle all 
 8 adjacent positions correctly 1ms
   ✓ Boulder State Manager > Adjacent boulder detection > should handle nega
ative coordinates correctly 0ms
   ✓ Boulder State Manager > Triggered boulder identification > should ident
tify newly triggered boulders when player moves 1ms
   ✓ Boulder State Manager > Triggered boulder identification > should not t
trigger boulders that were already adjacent 0ms
   ✓ Boulder State Manager > Triggered boulder identification > should trigg
ger all adjacent boulders when no previous position 0ms
   ✓ Boulder State Manager > Triggered boulder identification > should handl
le boundary edge cases for triggered boulder identification 0ms
   ✓ Boulder State Manager > Triggered boulder identification > should handl
le player movement across maze boundaries correctly 0ms
   ✓ Boulder State Manager > Boulder trigger updates > should update boulder
r states when triggered 1ms
   ✓ Boulder State Manager > Boulder trigger updates > should not re-trigger
r already triggered boulders 0ms
   ✓ Boulder State Manager > Boulder movement updates > should update moving
g boulder states correctly 0ms
   ✓ Boulder State Manager > Boulder movement updates > should update stoppe
ed boulder states correctly 0ms
   ✓ Boulder State Manager > Boulder movement updates > should not allow neg
gative moving boulder count 0ms
   ✓ Boulder State Manager > Boulder position updates > should update boulde
er positions correctly 1ms
   ✓ Boulder State Manager > Boulder position updates > should preserve boul
lder state data when updating positions 0ms
   ✓ Boulder State Manager > Moving boulder detection > should detect when b
boulders are moving 0ms
   ✓ Boulder State Manager > Moving boulder detection > should detect when n
no boulders are moving 0ms
   × Boulder State Manager > Triggered boulders for move > should return bou
ulders triggered on previous move 15ms
     → expected [] to have a length of 2 but got +0
   · Boulder State Manager > Triggered boulders for move > should not return
n boulders already moving
   · Boulder State Manager > Triggered boulders for move > should not return
n boulders triggered on different moves
   · Boulder State Manager > Player position tracking > should update player
r position correctly
   · Boulder State Manager > Player position tracking > should handle null t
to position update
   · Boulder State Manager > Proximity result creation > should create proxi
imity result with adjacent and newly triggered boulders
   · Boulder State Manager > Proximity result creation > should handle null 
 previous position
   · Boulder State Manager > Movement constraint creation > should create co
onstraint with no blocking when no boulders are moving
   · Boulder State Manager > Movement constraint creation > should create co
onstraint with blocking when boulders are moving
 ↓ src/tests/boulder-audio-events.test.ts (18 tests)
 ✓ src/tests/enhanced-boulder-collision.test.ts (47 tests) 26ms
 ↓ src/tests/boulder-player-death.test.ts (6 tests)
 ↓ src/tests/boulder-audio-mute-integration.test.ts (9 tests)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/tests/boulder-state-manager.test.ts > Boulder State Manager > Tri
iggered boulders for move > should return boulders triggered on previous move
AssertionError: expected [] to have a length of 2 but got +0

- Expected
+ Received

- 2
+ 0

 ❯ src/tests/boulder-state-manager.test.ts:456:36

    454|X// Check for move 6 (should return boulders triggered …
    455|Xconst bouldersToMove = getTriggeredBouldersForMove(upd…
    456|Xexpect(bouldersToMove).toHaveLength(2);
       |X^
    457|Xexpect(bouldersToMove).toContainEqual({ x: 1, y: 1 }); 
    458|Xexpect(bouldersToMove).toContainEqual({ x: 1, y: 3 }); 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed | 1 passed | 3 skipped (5)
      Tests  1 failed | 78 passed (120)
   Start at  15:50:02
   Duration  1.82s (transform 595ms, setup 787ms, collect 970ms, tests 61ms,
, environment 4.31s, prepare 1.10s)

ode (vitest 1)ode (vitest 4)ode (vitest 5):\Windows\System32\cmd.exe
D:\FizzBash\TheWanderer
Session Too Long
Continue
Summarize and continue in a new session.


Revert


physics-engine.ts

GameState.ts

boulder-state-manager.ts






Claude Sonnet 4.0
Autopilot
