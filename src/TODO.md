# To Dos

- [X] Fix the maze
- [x] Limit number of moves
- [x] Create a unit test to confirm player dies if they run out of moves
- [x] Investigate memories
~~- [ ] How might we use cursor rules?~~ Lets look at Agent Steering
- [x] Setup Agent Steering documentation
- [x] After setting up Agent Steering can I get the agent to review the code to see if it meets criteria? If not will it suggest improvements?
- [x] Add sound see .\instructions\gamebehaviour.md for sound rules.
- [x] Get playwright running for claude.
- [x] Fix unit tests
- [x] Fix typescript syntax errors
- [x] Can I keep the audio diagnostics and have them in settings?
- [x] Fix mute audio toggle and debug toggles
- [x] Bump version, tag, create branch for sound.

## Presentation - Stop Coding and get presentation dafted

- [ ] Use Chat, Onenote and prompt to build a presentation out line
- [ ] Experimement with running game from git hub from a certain commit eg POC to show progress instead of using video.
- [ ] Use gamma.app to create our presentation
- [ ] invite family property team to review

## Version 2

- [x] Deploy the game!
- [x] Configure for Mobile
- [x] Add icon

## Version 3 - Improve sound

- [x] Arrow sound should only play if arrow moves (note there are no arrows!)
- [x] Add bomb sound on collision
- [x] Stop active sound if player presses a key.
  
## Version 4 - Add another dynamic

~~- [ ] Items in a maze should describe thems selves and their behaviour. Write a specification for the appropriate Interfaces, and methods.~~ Decided to let AI manage code. Also to look to Agent Steering

- [ ] Create rules for boulders.
  - [ ] Boulders should only move when player next to boulder.
  - [ ] If player moves away from boulder and boulder moving down lands on player it kills the player 
  - [ ] Player cannot move until boulder finishes it's movement
- [ ] Increment build number each time the application is built

## Version 5 - Maze levels

- [ ] Add support for multiple maze levels
- [ ] Create 5 maze levels
- [ ] Create specification document for maze levels.
  - [ ] When a maze is exited provide the password for the next maze level. Level 1 does not require a password
  - [ ] Allow jumping to a maze level via an assigned password. Trigger password by running into rock 6 times in a row.
  - [ ] Only play victory sound when last level is exited.

## Version 6

- [ ] Improve Graphics

## Road Map for future versions

## Version 7

- [ ] Introduce Arrows

## Version 8

- [ ] Boulders should be able to be pushed by player
- [ ] Assign a random password to each maze
- [ ] Share password with player when exiting current maze
- [ ] Use password for player to jump to another level

## Version 9

- [ ] Introduce slopes (aka logs)
- [ ] Zombies!

## Version 10 Bonus Stretch Goal

- [ ] Can AI create a maze can we ensure all diamonds reachable?
- [ ] Add maze layout rules to .\instructions\maze.md

## Version 11 AI at run time?

- [ ] can the game call AI to create a new level...?
- [ ] or Ask AI for hint?

## Done

- [x] Agent Hooks in Kiro
- [x] Enlarge maze size
- [x] Switch to Kiro to see what it can do. This gives me access to Caude Sonnet 4.0!
- [x] Introduce https://github.com/microsoft/playwright-mcp for integration tests
- [x] Investigate the value of AI generated unit tests
- [x] upgrade from react-scripts@5.0.1 to Vite
- [x] Upgrade type script once upgraded to Vite
- [x] generate unit tests
- [x] automate unit tests on launch
- [x] create a code structure
- [x] Convert to typescript
- [x] Create interfaces to allow testing
- [x] investigate playwright to play test the game
- [x] Create a check list/todo.