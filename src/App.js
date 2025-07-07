Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./maze.css");
require("./App.css");
const ICONS = {
    empty: "",
    player: "🧑",
    rock: "🧱",
    soil: "🟫",
    diamond: "💎",
    boulder: "🪨",
    bomb: "💣",
    exit: "🚪",
};
const CELL = {
    EMPTY: "empty",
    PLAYER: "player",
    ROCK: "rock",
    SOIL: "soil",
    DIAMOND: "diamond",
    BOULDER: "boulder",
    BOMB: "bomb",
    EXIT: "exit",
};
const initialMaze = [
    [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
    [CELL.ROCK, CELL.SOIL, CELL.DIAMOND, CELL.EMPTY, CELL.BOULDER, CELL.SOIL, CELL.BOMB, CELL.ROCK],
    [CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
    [CELL.ROCK, CELL.PLAYER, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.SOIL, CELL.EXIT, CELL.ROCK],
    [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
];
const getPlayerPos = (maze) => {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[0].length; x++) {
            if (maze[y][x] === CELL.PLAYER)
                return { x, y };
        }
    }
    return null;
};
const Maze = () => {
    const [maze, setMaze] = (0, react_1.useState)(initialMaze);
    const [player, setPlayer] = (0, react_1.useState)(getPlayerPos(initialMaze));
    const [score, setScore] = (0, react_1.useState)(0);
    const [diamonds, setDiamonds] = (0, react_1.useState)(initialMaze.flat().filter((c) => c === CELL.DIAMOND).length);
    const [moves, setMoves] = (0, react_1.useState)(1000);
    const [gameState, setGameState] = (0, react_1.useState)('playing');
    const movePlayer = (0, react_1.useCallback)((dx, dy) => {
        if (gameState !== 'playing' || !player)
            return;
        const { x, y } = player;
        const nx = x + dx;
        const ny = y + dy;
        if (ny < 0 ||
            ny >= maze.length ||
            nx < 0 ||
            nx >= maze[0].length)
            return;
        const target = maze[ny][nx];
        let newMaze = maze.map((row) => [...row]);
        let newScore = score;
        let newDiamonds = diamonds;
        let newGameState = gameState;
        // Blocked by rock or boulder
        if (target === CELL.ROCK || target === CELL.BOULDER)
            return;
        // Diamond: collect
        if (target === CELL.DIAMOND) {
            newScore += 10;
            newDiamonds -= 1;
        }
        // Soil: disappears
        if (target === CELL.SOIL || target === CELL.DIAMOND) {
            newMaze[ny][nx] = CELL.PLAYER;
            newMaze[y][x] = CELL.EMPTY;
        }
        // Bomb: die
        else if (target === CELL.BOMB) {
            newMaze[ny][nx] = CELL.PLAYER;
            newMaze[y][x] = CELL.EMPTY;
            newGameState = 'dead';
        }
        // Exit: only if all diamonds collected
        else if (target === CELL.EXIT) {
            if (newDiamonds === 0) {
                newMaze[ny][nx] = CELL.PLAYER;
                newMaze[y][x] = CELL.EMPTY;
                newGameState = 'won';
            }
            else {
                return;
            }
        }
        // Empty: just move
        else if (target === CELL.EMPTY) {
            newMaze[ny][nx] = CELL.PLAYER;
            newMaze[y][x] = CELL.EMPTY;
        }
        setMaze(newMaze);
        setPlayer({ x: nx, y: ny });
        setScore(newScore);
        setDiamonds(newDiamonds);
        setMoves((m) => m - 1);
        setGameState(newGameState);
    }, [maze, player, score, diamonds, gameState]);
    // Handle keyboard input
    (0, react_1.useEffect)(() => {
        const handleKey = (e) => {
            if (gameState !== 'playing')
                return;
            if (["ArrowUp", "w", "W"].includes(e.key))
                movePlayer(0, -1);
            if (["ArrowDown", "s", "S"].includes(e.key))
                movePlayer(0, 1);
            if (["ArrowLeft", "a", "A"].includes(e.key))
                movePlayer(-1, 0);
            if (["ArrowRight", "d", "D"].includes(e.key))
                movePlayer(1, 0);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [movePlayer, gameState]);
    // Game over if out of moves
    (0, react_1.useEffect)(() => {
        if (moves <= 0 && gameState === 'playing')
            setGameState('dead');
    }, [moves, gameState]);
    // Render cell (reuse previous Cell component)
    const Cell = ({ type }) => {
        return ((0, jsx_runtime_1.jsx)("div", { className: `cell ${type}`, children: ICONS[type] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "maze-grid", children: maze.map((row, y) => row.map((cell, x) => (0, jsx_runtime_1.jsx)(Cell, { type: cell }, `${y}-${x}`))) }), (0, jsx_runtime_1.jsxs)("div", { className: "hud", children: [(0, jsx_runtime_1.jsxs)("span", { children: ["Score: ", score] }), (0, jsx_runtime_1.jsxs)("span", { children: ["Diamonds left: ", diamonds] }), (0, jsx_runtime_1.jsxs)("span", { children: ["Moves: ", moves] }), (0, jsx_runtime_1.jsxs)("span", { children: [gameState === 'dead' && 'Game Over', gameState === 'won' && 'You Win!'] })] })] }));
};
exports.default = Maze;
