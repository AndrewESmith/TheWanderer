
# Diagrams

## Architecture

```mermaid
graph TD
  A["src/index.tsx"] --> B["src/App.tsx (App)"]
  B --> C["AudioProvider (audio/context/audio-context.tsx)"]
  C --> D["AudioInitialization (audio/components/audio-initialization.tsx)"]
  D --> E["GameComponent (in App.tsx)"]
  E --> F["createGameState() (GameState.ts)"]
  F --> F1["GameStateData"]
  F --> O["maze.ts (ICONS, CELL, initialMaze, getPlayerPosition)"]
  F --> K["BoulderStateManager (physics/boulder-state-manager.ts)"]
  F --> L["MovementConstraint (physics/movement-constraint-system.ts)"]
  F --> M["MazeLevelManager (levels/maze-level-manager.ts)"]
  F --> N["LevelProgressionHandler (levels/level-progression-handler.ts)"]
  E --> H["Input handling (keydown, W/A/S/D)"]
  E --> I["Rendering (maze grid, cells, CSS)"]
  I --> I1["maze.css / App.css"]
  E --> J["HUD & UI Components"]
  J --> J1["HowToPlayPopup (components/how-to-play)"]
  J --> J2["AudioControl"]
  J --> J3["AudioErrorDisplay"]
  J --> J4["AudioDebug"]
  E --> P["Audio events"]
  P --> Q["SoundEventEmitter (audio/events)"]
  P --> R["GameEndSoundManager (audio/events)"]
  F --> S["physics-engine.ts"]
  S --> S1["simulatePhysicsStepWithState()"]
  S --> S2["simulatePhysicsStep()"]
  K --> K1["updateBoulderPositions()/Movement"]
  L --> L1["updateMovementConstraints()"]


```

## UI-Layout

```mermaid
graph TB
  Root[".game-wrapper (App.tsx)"]
  Root --> HUD[".hud"]
  HUD --> HUDL[".hud-left: level, score, diamonds, moves, status, audio fallback"]
  HUD --> HUDR[".hud-right: controls (AudioControl, HowToPlay)"]
  Root --> MazeContainer[".maze-container"]
  MazeContainer --> Grid[".maze-grid (16xN)"]
  Grid --> Cell[".cell (ICONS by CELL type)"]
  Root --> MobileControls[".mobile-controls (conditional; buttons Up/Down/Left/Right)"]
  Overlay["HowToPlayPopup (modal)"] -. "blocks input when open" .-> Root
```

## Update Flow

```mermaid
flowchart LR
  A["Keydown (Arrow/WASD)"] --> B["GameComponent.movePlayer(dx, dy)"]
  B --> C{"shouldBlockPlayerMovement?\n(movement-constraint-system)"}
  C -- "Yes" --> Z["Return (blocked)"]
  C -- "No" --> D{"isValidPosition & targetCell"}
  D -- "Invalid/undefined" --> Z
  D -- "Valid" --> E{"isBlockingCell? (ROCK/BOULDER)"}
  E -- "Yes" --> Z
  E -- "No" --> F["Update maze: move PLAYER"]
  F --> G{"Cell effects"}
  G --> G1["DIAMOND: +score, -diamonds"]
  G --> G2["BOMB: state='dead'"]
  G --> G3["EXIT: if diamonds==0 then 'won' else block"]
  G1 --> H["moves-- ; out of moves? -> 'dead'"]
  G2 --> H
  G3 --> H
  H --> I["simulatePhysicsStepWithState()"]
  I --> J["updateBoulderMovement/Positions"]
  J --> K["updateMovementConstraints()"]
  K --> L{"Level complete? (levelProgressionHandler)"}
  L -- "Yes" --> M["processLevelCompletion -> next level or game complete"]
  L -- "No" --> N["Stay on level"]
  M --> O["Emit progression sounds"]
  B --> P["generatePlayerMoveEvents()"]
  P --> Q["emitSoundEvents()"]
  Q --> R["AudioManager.play/stop via useSound"]
  R --> S["UI rerender (forceUpdate)"]
  N --> S
  M --> S
```

## Game State Model

```mermaid
classDiagram
  class GameStateData {
    +MazeCell[][] maze
    +IPlayerPos player
    +number score
    +number moves
    +number diamonds
    +string gameState
    +BoulderStateManager boulderStateManager
    +MovementConstraint movementConstraint
    +number currentLevel
    +MazeLevelManager levelManager
    +LevelProgressionHandler levelProgressionHandler
    +boolean isGameComplete
  }
  class IGameState {
    +MazeCell[][] maze
    +IPlayerPos player
    +number score
    +number moves
    +number diamonds
    +string gameState
    +BoulderStateManager boulderStateManager
    +MovementConstraint movementConstraint
    +number currentLevel
    +MazeLevelManager levelManager
    +LevelProgressionHandler levelProgressionHandler
    +boolean isGameComplete
    +void movePlayer(number dx, number dy)
  }
  IGameState ..> GameStateData : exposes
  GameStateData --> MazeLevelManager
  GameStateData --> LevelProgressionHandler
  GameStateData --> BoulderStateManager
  GameStateData --> MovementConstraint
  GameStateData --> IPlayerPos
  GameStateData --> MazeCell
```

## Maze Level Manager Class

```mermaid
classDiagram
  class MazeLevelData {
    +number levelNumber
    +MazeCell[][] maze
    +number moveLimit
    +number diamondCount
    +number bombCount
    +number rockCount
    +IPlayerPos playerStartPosition
    +IPlayerPos exitPosition
  }

  class MazeLevelManager {
    +MazeLevelData getCurrentLevel()
    +boolean hasNextLevel()
    +MazeLevelData|null advanceToNextLevel()
    +number getTotalLevels()
    +number getCurrentLevelNumber()
  }

  class LevelValidation {
    +validateLevel(level: MazeLevelData)
    +validateLevels(levels: MazeLevelData[])
  }

  class LevelErrorHandler {
    +withLevelErrorHandling(fn)
    +createLevelError(type, message, options)
    +attemptLevelRepair(level, errors)
    +createFallbackLevel(levelNumber)
    +createErrorRecoveryStrategy()
    +logLevelError(error)
  }

  MazeLevelManager --> "1..*" MazeLevelData : manages
  MazeLevelManager ..> LevelValidation : uses
  MazeLevelManager ..> LevelErrorHandler : uses
```

## Maze Level Manager Sequence

```mermaid
sequenceDiagram
  participant App
  participant GameState
  participant LevelManager as MazeLevelManager
  participant LevelProg as LevelProgressionHandler
  participant Err as LevelErrorHandler
  participant Valid as LevelValidation

  App->>GameState: movePlayer() leads to 'won' with diamonds==0
  GameState->>LevelProg: isLevelComplete('won', 0)
  LevelProg-->>GameState: true
  GameState->>LevelProg: processLevelCompletion(LevelManager)
  LevelProg->>LevelManager: hasNextLevel()
  alt has next level
    LevelProg->>LevelManager: advanceToNextLevel()
    LevelManager->>Valid: validateLevels(MAZE_LEVELS)
    Note over LevelManager,Valid: Creation-time validation already performed
    LevelManager-->>LevelProg: nextLevel
    LevelProg-->>GameState: {success:true,nextLevel, soundToPlay: door_slam}
  else no next level
    LevelProg-->>GameState: {success:true,isGameComplete:true,soundToPlay: victory}
  end
  GameState->>LevelProg: emitLevelProgressionSound(result)
  LevelProg->>App: emitSoundEvent(sound)
```

## Audio Sub-System

```mermaid
graph TD
  AP["AudioProvider (context)"] --> US["useSound hook"]
  US --> AMF["createAudioManager() (audio-manager-factory)"]
  US --> SEE["SoundEventEmitter"]
  GC["GameComponent"] --> US
  GC --> GESM["GameEndSoundManager"]
  MP["movePlayer()"] --> GPME["generatePlayerMoveEvents()"]
  GPME --> ESE["emitSoundEvents()"]; 
  ESE --> SEE
  SEE --> AM["AudioManager.play/stop"]
  AC["<AudioControl/>"] --> US
  AED["<AudioErrorDisplay/>"] --> US
  AI["<AudioInitialization/>"] --> AP
```

## Physics Engine Class

```mermaid
classDiagram
  class PositionUpdate {
    +Position from
    +Position to
  }
  class BoulderCategories {
    +Position[] moving
    +Position[] stationary
    +Position[] triggered
    +number total
  }
  class PhysicsSimulationResult {
    +MazeCell[][] newMaze
    +SoundEvent[] soundEvents
    +Position[] boulderPositions
    +Position[] arrowPositions
    +Position[] movingBoulders
    +Position[] completedBoulders
    +Position[] playerCollisions
    +PositionUpdate[] positionUpdates
  }

  class PhysicsEngine {
    +findBoulders(maze: MazeCell[][]): Position[]
    +simulateGravity(maze: MazeCell[][]): PhysicsSimulationResult
    +simulateArrows(maze: MazeCell[][], arrows): PhysicsSimulationResult
    +simulatePhysicsStep(maze: MazeCell[][], arrows?): PhysicsSimulationResult
    +simulateGravityWithState(maze, BoulderStateManager, moveNum): PhysicsSimulationResult
    +simulatePhysicsStepWithState(maze, BoulderStateManager, moveNum, arrows?): PhysicsSimulationResult
    +shouldContinuePhysics(prev: MazeCell[][], curr: MazeCell[][]): boolean
    +shouldContinuePhysicsWithState(BoulderStateManager): boolean
    +getMovingBoulderPositions(BoulderStateManager): Position[]
    +getStationaryBoulderPositions(BoulderStateManager): Position[]
    +getTriggeredBoulderPositions(BoulderStateManager): Position[]
    +categorizeBoulders(BoulderStateManager): BoulderCategories
  }

  class BoulderStateManager {
    +Map<string,BoulderState> boulders
    +number movingBoulderCount
  }

  PhysicsEngine ..> BoulderStateManager : uses
  PhysicsEngine --> PhysicsSimulationResult : returns
```

## Physics Engine Sequence

```mermaid
sequenceDiagram
  participant GameState
  participant Phys as PhysicsEngine
  participant BSM as BoulderStateManager

  GameState->>Phys: simulatePhysicsStepWithState(maze, BSM, moveNum, arrows)
  Phys->>Phys: simulateGravityWithState(maze, BSM, moveNum)
  Phys->>BSM: getTriggeredBouldersForMove(BSM, moveNum)
  Phys-->>Phys: triggeredBoulders
  loop for each moving boulder (bottom->top)
    Phys->>Phys: simulateEnhancedBoulderFall()
    alt moved
      Phys-->>Phys: update newMaze, positionUpdates
    else stopped
      Phys-->>Phys: completedBoulders += pos
    end
  end
  Phys-->>GameState: gravityResult (newMaze, events, positions, moving/stopped)
  Phys->>Phys: simulateArrows(newMaze, arrows)
  Phys-->>GameState: combined PhysicsSimulationResult
```

## Boulder State Manager Class

```mermaid
classDiagram
  class Position { +number x +number y }
  class PositionUpdate {
    +Position from
    +Position to
  }
  class ProximityResult {
    +Position[] adjacentBoulders
    +Position[] newlyTriggeredBoulders
  }
  class MovementConstraint {
    +boolean isPlayerMovementBlocked
    +string blockingReason
    +number estimatedDuration
  }
  class BoulderState {
    +Position position
    +boolean isTriggered
    +boolean isMoving
    +number triggeredOnMove
  }
  class BoulderStateManager {
    +Map<string,BoulderState> boulders
    +number movingBoulderCount
    +Position|null lastPlayerPosition
  }
  class BoulderAPI {
    +createBoulderStateManager(maze, move#): BoulderStateManager
    +findBoulderPositions(maze): Position[]
    +createPositionKey(Position): string
    +parsePositionKey(string): Position
    +arePositionsAdjacent(a:Position,b:Position): boolean
    +detectAdjacentBoulders(player:Position, boulders:Position[]): Position[]
    +identifyTriggeredBoulders(prev:Position|null, curr:Position, mgr:BoulderStateManager, maze?): Position[]
    +updateBoulderTriggers(mgr, triggered:Position[], move#): BoulderStateManager
    +updateBoulderMovement(mgr, moving:Position[], stopped:Position[]): BoulderStateManager
    +updateBoulderPositions(mgr, updates:PositionUpdate[]): BoulderStateManager
    +hasMovingBoulders(mgr): boolean
    +getTriggeredBouldersForMove(mgr, move#): Position[]
    +updatePlayerPosition(mgr, pos:Position): BoulderStateManager
    +createProximityResult(curr:Position, prev:Position|null, mgr:BoulderStateManager, maze?): ProximityResult
    +createMovementConstraint(mgr): MovementConstraint
  }

  BoulderAPI ..> BoulderStateManager : creates/updates
  BoulderStateManager o--> "*" BoulderState : tracks
  BoulderState --> Position
```

## Boulder State Manager Sequence

```mermaid
sequenceDiagram
  participant App
  participant GameState
  participant BSM as BoulderStateManager
  participant Phys as PhysicsEngine

  App->>GameState: movePlayer(dx, dy)
  GameState->>BSM: updatePlayerPosition(BSM, newPlayerPos)
  GameState->>BSM: createProximityResult(curr, prev, BSM, maze)
  GameState-->>GameState: {adjacentBoulders, newlyTriggeredBoulders}
  GameState->>BSM: updateBoulderTriggers(BSM, newlyTriggeredBoulders, move#)
  GameState->>Phys: simulatePhysicsStepWithState(maze, BSM, move#)
  Phys-->>GameState: result {positionUpdates, movingBoulders, completedBoulders}
  GameState->>BSM: updateBoulderMovement(BSM, movingBoulders, completedBoulders)
  GameState->>BSM: updateBoulderPositions(BSM, positionUpdates)
```
