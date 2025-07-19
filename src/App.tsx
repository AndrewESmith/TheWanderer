import React from "react";
import { ICONS } from "./maze";
import type { MazeCell } from "./maze";
import "./maze.css";
import "./App.css";
import { GameState } from "./GameState";

const App: React.FC = () => {
  const [gameState, setGameState] = React.useState(new GameState());

  const movePlayer = React.useCallback(
    (dx: number, dy: number) => {
      // Call the GameState method
      gameState.movePlayer(dx, dy);
      // Force re-render by creating a new GameState reference (shallow copy)
      setGameState(Object.assign(Object.create(Object.getPrototypeOf(gameState)), gameState));
    },
    [gameState]
  );

  // Handle keyboard input
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState.gameState !== 'playing') return;
      if (["ArrowUp", "w", "W"].includes(e.key)) movePlayer(0, -1);
      if (["ArrowDown", "s", "S"].includes(e.key)) movePlayer(0, 1);
      if (["ArrowLeft", "a", "A"].includes(e.key)) movePlayer(-1, 0);
      if (["ArrowRight", "d", "D"].includes(e.key)) movePlayer(1, 0);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [movePlayer, gameState.gameState]);

  // Game over if out of moves
  React.useEffect(() => {
    if (gameState.moves <= 0 && gameState.gameState === 'playing') {
      gameState.gameState = 'dead';
      setGameState(Object.assign(Object.create(Object.getPrototypeOf(gameState)), gameState));
    }
  }, [gameState]);

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
        {gameState.maze.map((row, y) =>
          row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell} />)
        )}
      </div>
      <div className="hud">
        <span>Score: {gameState.score}</span>
        <span>Diamonds left: {gameState.diamonds}</span>
        <span>Moves: {gameState.moves}</span>
        <span>
          {gameState.gameState === 'dead' && 'Game Over'}
          {gameState.gameState === 'won' && 'You Win!'}
        </span>
      </div>
    </div>
  );
};

export default App;