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
import { AudioInitialization } from "./audio/components/audio-initialization";
import { AudioDebug } from "./audio/components/audio-debug";

// Test-specific maze with a bomb right next to the player for testing
const testBombMaze: MazeCell[][] = [
  [
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
  ],
  [
    CELL.ROCK,
    CELL.PLAYER,
    CELL.BOMB,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.ROCK,
  ],
  [
    CELL.ROCK,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.DIAMOND,
    CELL.EMPTY,
    CELL.ROCK,
  ],
  [
    CELL.ROCK,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.ROCK,
    CELL.ROCK,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.ROCK,
  ],
  [
    CELL.ROCK,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.ROCK,
    CELL.ROCK,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.ROCK,
  ],
  [
    CELL.ROCK,
    CELL.EMPTY,
    CELL.DIAMOND,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.ROCK,
  ],
  [
    CELL.ROCK,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.EMPTY,
    CELL.BOMB,
    CELL.EMPTY,
    CELL.ROCK,
  ],
  [
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
    CELL.ROCK,
  ],
];

const GameComponent: React.FC = () => {
  const {
    playSound,
    stopAllSounds,
    resetAudioSystem,
    hasPlaybackErrors,
    fallbackMode,
  } = useSound();

  // Check URL parameters for test-specific maze
  const useTestMaze = React.useMemo(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("testMaze") === "bomb";
    }
    return false;
  }, []);

  const [gameState, setGameState] = React.useState(() =>
    createGameState(useTestMaze ? { maze: testBombMaze } : undefined)
  );

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const [showMobileControls, setShowMobileControls] = React.useState(false);
  React.useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 800;
    setShowMobileControls(isTouch || isSmallScreen);
  }, []);

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
      // Stop all currently playing sounds before the player moves
      stopAllSounds();
      // Call the GameState method
      gameState.movePlayer(dx, dy);
      // Force re-render
      forceUpdate();
    },
    [gameState, forceUpdate, stopAllSounds]
  );

  // Handle keyboard input
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState.gameState !== "playing") return;
      if (["ArrowUp", "w", "W"].includes(e.key)) movePlayer(0, -1);
      if (["ArrowDown", "s", "S"].includes(e.key)) movePlayer(0, 1);
      if (["ArrowLeft", "a", "A"].includes(e.key)) movePlayer(-1, 0);
      if (["ArrowRight", "d", "D"].includes(e.key)) movePlayer(1, 0);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [movePlayer, gameState.gameState]);

  // Render cell (reuse previous Cell component)
  const Cell: React.FC<{ type: MazeCell }> = ({ type }) => {
    return <div className={`cell ${type}`}>{ICONS[type]}</div>;
  };

  // Handle audio system reset
  const handleAudioReset = React.useCallback(async () => {
    try {
      await resetAudioSystem();
    } catch (error) {
      // Audio reset errors are handled by the audio system
    }
  }, [resetAudioSystem]);

  return (
    <div>
      <AudioErrorDisplay />
      <AudioDebug />
      <div className="maze-grid">
        {gameState.maze.map((row: MazeCell[], y: number) =>
          row.map((cell: MazeCell, x: number) => (
            <Cell key={`${y}-${x}`} type={cell} />
          ))
        )}
      </div>
      {showMobileControls && (
        <div className="mobile-controls">
          <button className="mobile-btn up" onClick={() => movePlayer(0, -1)} aria-label="Up">▲</button>
          <div>
            <button className="mobile-btn left" onClick={() => movePlayer(-1, 0)} aria-label="Left">◀</button>
            <button className="mobile-btn down" onClick={() => movePlayer(0, 1)} aria-label="Down">▼</button>
            <button className="mobile-btn right" onClick={() => movePlayer(1, 0)} aria-label="Right">▶</button>
          </div>
        </div>
      )}
      <div className="hud">
        <div className="hud-left">
          <span>Score: {gameState.score}</span>
          <span>Diamonds left: {gameState.diamonds}</span>
          <span>Moves: {gameState.moves}</span>
          <span>
            {gameState.gameState === "dead" && "Game Over"}
            {gameState.gameState === "won" && "You Win!"}
          </span>
          {fallbackMode && (
            <span style={{ color: "#ffa500", fontSize: "0.8em" }}>
              Audio: Fallback Mode
            </span>
          )}
        </div>
        <div className="hud-right">
          <AudioControl />
          {hasPlaybackErrors && (
            <button
              onClick={handleAudioReset}
              style={{
                marginLeft: "8px",
                padding: "4px 8px",
                fontSize: "0.8em",
                backgroundColor: "#ff6b6b",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              title="Reset audio system due to playback errors"
            >
              Reset Audio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AudioProvider>
      <AudioInitialization>
        <GameComponent />
      </AudioInitialization>
    </AudioProvider>
  );
};

export default App;
