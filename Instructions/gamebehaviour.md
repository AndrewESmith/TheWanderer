# Objective

A stick figure player navigates a randomly generated maze of rocks and soil with dangers in the form of arrows and boulders which could pierce or hit the stick figure. The goal is for the stick figure to collect diamonds while avoiding boulders and arrows. Upon successfully collecting all the diamonds the stick figure would then exit the maze and enter a newly generated puzzle of arrows, rocks, soil and boulders.

## Objects

The maze is made up of the following objects

- Rock is a solid brown square
- Soil is dotted square
- Boulders
- Arrows
- Diamonds

## Movement

### Player

The player can move up, down, left or right using the keys 'A', 'S', 'W' and 'D' or the keyboard arrow keys.

- 'A' and left arrow key is left
- 'S' and right arrow key is right
- 'W' and up arrow key is up
- 'D' and right arrow key is right

### Arrows

- Arrows move in the direction they are pointing
- Arrows move left or right on the screen
- Arrows do not enter the same location of another object
- Arrows move when
  - the player enters within one square of the arrows location
  - another Arrow enters within one square of the arrows location
- If an arrow hits a boulder it will move up one square and continue in the direction of travel it is pointing
- If an arrow hits the player the player dies and the game ends
- If an arrow hits another arrow it will stop
- If an arrow hits soil it will stop
- If an arrow hits a diamond it will stop
- If an arrow hits a log it will move down or up.
  - down if the log is sloping towards the arrows direction of travel
  - up if the log is sloping away from the arrows direction of travel

### Boulders

- Boulders move down the screen
- Boulders only move when
  - The player moves in one square of the boulder
  - An arrow moves within one square of the boulder
   Another boulder moves within one square of the boulder
- If a boulder hits an arrow it will stop
- If a boulder hits a player the player dies and the game ends
- if a boulder hits a log it will move left or right
  - left if the log is sloping to the right
  - right if the log is sloping to the left

### Rock

- does not move.

### Diamond

- does not move.

### Soil

- does not move.

### Log

- does not move

### Bomb

- does not move

### Exit

- does not move

## Attributes

### Diamonds

- block Arrow
- Block Boulder
- Disappear if player moves into the same location as the diamond
- While a diamond is visible the player can not enter the same location as the exit

### Rocks

- block Arrow
- block Boulder
- block player

### Soils

- Disappears when player enters the same location
- block arrow
- block boulder

### Bombs

- Disappears if player hits the bomb and player dies
- Disappears if a boulder hits the bomb
- Disappears if an arrow hits the bomb

### Exit

- block Arrow
- block boulder
- if player enters location of exit player disappears and new maze is generated
- player cannot enter location of exit if there is a diamond visible on the maze

## Scoring

- A point is scored when a player hits a diamond
- A player has a maximum number of moves 
- If the number of moves equals the maximum number of moves the player dies
- If the number of diamonds on the maze is zero the exit is enabled
- If the exit is enabled and the player hits the exit the maze is finished a new maze is used

## Sound

- Boulderhitting player should cause player to cry out
- Boulder hitting rock,boulder, arrow or soil should make a thud sound
- Arrow hitting rock, arrow, boulder, or soil should make a thud sound
- Player entering soil should have digging sound
- Arrow hitting player shoudl cause player to cryout