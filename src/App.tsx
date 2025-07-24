import React from "react";
import { ICONS, CELL } from "./maze";
import type { MazeCell } from "./maze";
import "./maze.css";
import "./App.css";
import { createGameState } from "./GameState";
import { AudioProvider } from "./audio/context/audio-context";
import { useSound } from "./audio/hooks/use-sound";
import { getGameEndSoundManager } from "./audio/events/game-end-sound-manager";
import { getSoundEventEmitter } from "./audio/events/sound-event-emitter";
import { AudioControl } from "./audio/components/AudioControl";
import { AudioErrorDisplay } from "./audio/components/audio-error-display";

// Test-specific maze with a bomb right next to the player for testing
const testBombMaze: MazeCell[][] = [
  [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
  [CELL.ROCK, CELL.PLAYER, CELL.BOMB, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
  [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.ROCK],
  [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
  [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK, CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
  [CELL.ROCK, CELL.EMPTY, CELL.DIAMOND, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.ROCK],
  [CELL.ROCK, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.EMPTY, CELL.BOMB, CELL.EMPTY, CELL.ROCK],
  [CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK, CELL.ROCK],
];

const GameComponent: React.FC = () => {
  const { playSound, stopAllSounds } = useSound();

  // Check URL parameters for test-specific maze
  const useTestMaze = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('testMaze') === 'bomb';
    }
    return false;
  }, []);

  const [gameState, setGameState] = React.useState(() =>
    createGameState(useTestMaze ? { maze: testBombMaze } : undefined)
  );

  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  // Set up sound event callback and game end sound manager
  React.useEffect(() => {
    const soundEmitter = getSoundEventEmitter();
    const gameEndManager = getGameEndSoundManager();

    // Set up sound event callback
    soundEmitter.setCallback((soundId, event) => {
      playSound(soundId, { volume: event.volume });
    });

    // Set up game end sound manager callback
    gameEndManager.setStopAllSoundsCallback(stopAllSounds);

    return () => {
      soundEmitter.setCallback(null);
      gameEndManager.setStopAllSoundsCallback(null);
    };
  }, [playSound, stopAllSounds]);

  const movePlayer = React.useCallback(
    (dx: number, dy: number) => {
      // Call the GameState method
      gameState.movePlayer(dx, dy);
      // Force re-render
      forceUpdate();
    },
    [gameState, forceUpdate]
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
      <AudioErrorDisplay />
      <div className="maze-grid">
        {gameState.maze.map((row: MazeCell[], y: number) =>
          row.map((cell: MazeCell, x: number) => <Cell key={`${y}-${x}`} type={cell} />)
        )}
      </div>
      <div className="hud">
        <div className="hud-left">
          <span>Score: {gameState.score}</span>
          <span>Diamonds left: {gameState.diamonds}</span>
          <span>Moves: {gameState.moves}</span>
          <span>
            {gameState.gameState === 'dead' && 'Game Over'}
            {gameState.gameState === 'won' && 'You Win!'}
          </span>
        </div>
        <div className="hud-right">
          <AudioControl />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AudioProvider>
      <GameComponent />
    </AudioProvider>
  );
};

export default App;