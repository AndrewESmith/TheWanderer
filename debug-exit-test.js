import { movePlayer } from "./src/GameState.js";
import { CELL } from "./src/maze.js";
import { createBoulderStateManager, updatePlayerPosition } from "./src/physics/boulder-state-manager.js";
import { updateMovementConstraints } from "./src/physics/movement-constraint-system.js";
import { createMazeLevelManager } from "./src/levels/maze-level-manager.js";
import { createLevelProgressionHandler } from "./src/levels/level-progression-handler.js";

// Helper function to create larger test maze following functional patterns
function createLargerTestMaze() {
    // Create a 12x18 maze filled with empty cells (different from level system 10x16)
    const maze = Array(12).fill(null).map(() =>
        Array(18).fill(CELL.EMPTY)
    );

    // Add a border of rocks
    for (let x = 0; x < 18; x++) {
        maze[0][x] = CELL.ROCK; // Top border
        maze[11][x] = CELL.ROCK; // Bottom border
    }
    for (let y = 0; y < 12; y++) {
        maze[y][0] = CELL.ROCK; // Left border
        maze[y][17] = CELL.ROCK; // Right border
    }

    return maze;
}

// Helper function to create test game state with larger maze
function createLargerMazeGameState(
    maze,
    player,
    score = 0,
    moves = 2000,
    diamonds = 0,
    gameState = 'playing'
) {
    const mazeCopy = maze.map(row => [...row]); // Deep copy
    const boulderStateManager = updatePlayerPosition(
        createBoulderStateManager(mazeCopy, moves),
        player
    );
    const movementConstraint = updateMovementConstraints(boulderStateManager);
    const levelManager = createMazeLevelManager();
    const levelProgressionHandler = createLevelProgressionHandler();

    return {
        maze: mazeCopy,
        player,
        score,
        moves,
        diamonds,
        gameState,
        boulderStateManager,
        movementConstraint,
        currentLevel: 1,
        levelManager,
        levelProgressionHandler,
        isGameComplete: false,
    };
}

// Debug the failing test
const testMaze = createLargerTestMaze();
testMaze[5][5] = CELL.PLAYER;
testMaze[5][6] = CELL.DIAMOND;
testMaze[5][7] = CELL.EXIT;

console.log("Initial maze setup:");
console.log("Position [5][5]:", testMaze[5][5], "(should be PLAYER)");
console.log("Position [5][6]:", testMaze[5][6], "(should be DIAMOND)");
console.log("Position [5][7]:", testMaze[5][7], "(should be EXIT)");
console.log("CELL.PLAYER:", CELL.PLAYER);
console.log("CELL.DIAMOND:", CELL.DIAMOND);
console.log("CELL.EXIT:", CELL.EXIT);

const initialState = createLargerMazeGameState(testMaze, { x: 5, y: 5 }, 0, 2000, 1, 'playing');

console.log("\nInitial state:");
console.log("Player position:", initialState.player);
console.log("Diamonds:", initialState.diamonds);
console.log("Game state:", initialState.gameState);

// Collect diamond first
const afterDiamond = movePlayer(initialState, 1, 0);
console.log("\nAfter collecting diamond:");
console.log("Player position:", afterDiamond.player);
console.log("Diamonds:", afterDiamond.diamonds);
console.log("Game state:", afterDiamond.gameState);
console.log("Maze at [5][6]:", afterDiamond.maze[5][6], "(should be PLAYER)");
console.log("Maze at [5][7]:", afterDiamond.maze[5][7], "(should be EXIT)");

// Now try to exit
const afterExit = movePlayer(afterDiamond, 1, 0);
console.log("\nAfter trying to exit:");
console.log("Player position:", afterExit.player);
console.log("Diamonds:", afterExit.diamonds);
console.log("Game state:", afterExit.gameState);
console.log("Maze at [5][7]:", afterExit.maze[5][7], "(should be PLAYER if successful)");