import React, { useState, useEffect, useCallback } from "react";
import { ICONS, CELL, MazeCell, initialMaze } from "./maze";
import "./maze.css";
import "./App.css";
import { IPlayerPos } from "./Interfaces/IPlayerPos";
import { PlayerPos } from "./PlayerPos";
import { Maze } from "./maze";

const getPlayerPos = PlayerPos.getPlayerPos;

const MazeComponent: React.FC = () => {
  const [maze, setMaze] = useState<MazeCell[][]>(initialMaze);
  const mazeInstance = new Maze();
  const [player, setPlayer] = useState<IPlayerPos | null>(getPlayerPos(mazeInstance));
  const [score, setScore] = useState<number>(0);
  const [diamonds, setDiamonds] = useState<number>(
    initialMaze.flat().filter((c) => c === CELL.DIAMOND).length
  );
  const [moves, setMoves] = useState<number>(1000);
  const [gameState, setGameState] = useState<'playing' | 'dead' | 'won'>('playing');

  const movePlayer = useCallback(
    (dx: number, dy: number) => {
      if (gameState !== 'playing' || !player) return;
      const { x, y } = player;
      const nx = x + dx;
      const ny = y + dy;
      if (
        ny < 0 ||
        ny >= maze.length ||
        nx < 0 ||
        nx >= maze[0].length
      )
        return;

      const target = maze[ny][nx];
      let newMaze = maze.map((row) => [...row]);
      let newScore = score;
      let newDiamonds = diamonds;
      let newGameState: 'playing' | 'dead' | 'won' = gameState;

      // Blocked by rock or boulder
      if (target === CELL.ROCK || target === CELL.BOULDER) return;

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
        } else {
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
    },
    [maze, player, score, diamonds, gameState]
  );

  // Handle keyboard input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (["ArrowUp", "w", "W"].includes(e.key)) movePlayer(0, -1);
      if (["ArrowDown", "s", "S"].includes(e.key)) movePlayer(0, 1);
      if (["ArrowLeft", "a", "A"].includes(e.key)) movePlayer(-1, 0);
      if (["ArrowRight", "d", "D"].includes(e.key)) movePlayer(1, 0);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [movePlayer, gameState]);

  // Game over if out of moves
  useEffect(() => {
    if (moves <= 0 && gameState === 'playing') setGameState('dead');
  }, [moves, gameState]);

  // Render cell (reuse previous Cell component)
  const Cell: React.FC<{ type: MazeCell }> = ({ type }) => {
    return (
      <div className={`cell ${type}`}>
        {ICONS[type]}
      </div>
    );
  };

  return (
    <div>
      <div className="maze-grid">
        {maze.map((row, y) =>
          row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell} />)
        )}
      </div>
      <div className="hud">
        <span>Score: {score}</span>
        <span>Diamonds left: {diamonds}</span>
        <span>Moves: {moves}</span>
        <span>
          {gameState === 'dead' && 'Game Over'}
          {gameState === 'won' && 'You Win!'}
        </span>
      </div>
    </div>
  );
};

export default MazeComponent;