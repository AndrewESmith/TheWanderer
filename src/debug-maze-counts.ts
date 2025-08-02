// Import just the data we need without CSS
const CELL = {
    EMPTY: "empty",
    PLAYER: "player",
    ROCK: "rock",
    SOIL: "soil",
    DIAMOND: "diamond",
    BOULDER: "boulder",
    BOMB: "bomb",
    EXIT: "exit",
} as const;

// Copy the initial maze directly to avoid CSS import issues
const initialMaze = [
    // Row 0: Top border
    [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    // Row 1
    [CELL.ROCK, CELL.SOIL, CELL.DIAMOND, CELL.EMPTY, CELL.BOULDER, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.DIAMOND, CELL.EMPTY, CELL.BOULDER, CELL.SOIL, CELL.BOMB, CELL.EMPTY, CELL.ROCK],
    // Row 2
    [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.SOIL, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.ROCK],
    // Row 3
    [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.BOULDER, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.SOIL, CELL.ROCK, CELL.EMPTY, CELL.ROCK],
    // Row 4
    [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
    // Row 5
    [CELL.ROCK, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.ROCK, CELL.BOULDER, CELL.ROCK, CELL.SOIL, CELL.EMPTY, CELL.ROCK],
    // Row 6
    [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.BOULDER, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.ROCK],
    // Row 7
    [CELL.ROCK, CELL.BOMB, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.BOULDER, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK],
    // Row 8
    [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.SOIL, CELL.ROCK, CELL.SOIL, CELL.ROCK, CELL.EMPTY, CELL.EXIT, CELL.ROCK],
    // Row 9: Bottom border
    [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
];

function countElements(maze: any[][]) {
    let diamonds = 0;
    let bombs = 0;
    let exits = 0;
    let players = 0;
    let rocks = 0;

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            const cell = maze[y][x];
            switch (cell) {
                case CELL.DIAMOND:
                    diamonds++;
                    break;
                case CELL.BOMB:
                    bombs++;
                    break;
                case CELL.EXIT:
                    exits++;
                    break;
                case CELL.PLAYER:
                    players++;
                    break;
                case CELL.ROCK:
                    rocks++;
                    break;
            }
        }
    }

    return { diamonds, bombs, exits, players, rocks };
}

const counts = countElements(initialMaze);
console.log('Initial maze counts:', counts);
console.log('Maze dimensions:', initialMaze.length, 'x', initialMaze[0]?.length);