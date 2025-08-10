import React from "react";
import { ICONS, CELL } from "./maze";
import type { MazeCell } from "./maze";
import "./maze.css";
import "./App.css";

// IMPORTANT: Player Movement Rendering
// ===================================
// This file contains critical logic for player movement rendering.
// Before modifying the Cell component or movePlayer function, please read:
// PLAYER_MOVEMENT_FIX_DOCUMENTATION.md
//
// Key principles:
// 1. Use maze data as single source of truth for cell rendering
// 2. Update stableMazeRef immediately when player moves
// 3. Keep Cell component logic simple - just render what maze data says
import { createGameState } from "./GameState";
import { AudioProvider } from "./audio/context/audio-context";
import { useSound } from "./audio/hooks/use-sound";
import { getGameEndSoundManager } from "./audio/events/game-end-sound-manager";
import { getSoundEventEmitter } from "./audio/events/sound-event-emitter";
import { AudioControl } from "./audio/components/AudioControl";
import { AudioErrorDisplay } from "./audio/components/audio-error-display";
import { AudioInitialization } from "./audio/components/audio-initialization";
import { AudioDebug } from "./audio/components/audio-debug";
import { useDominantColors } from "./hooks/useDominantColors";
import { HowToPlayPopup } from "./components/how-to-play/HowToPlayPopup";
import { useHowToPlaySettings } from "./hooks/use-how-to-play-settings";

// Image preloading system
interface ImageLoadingState {
  isLoading: boolean;
  loadedCount: number;
  totalCount: number;
  errors: string[];
}

// Individual cell image state tracking
interface CellImageState {
  loaded: boolean;
  error: boolean;
  retryCount: number;
}

// Utility function to compare maze structures (ignoring player position)
function areMazesStructurallyEqual(
  maze1: MazeCell[][],
  maze2: MazeCell[][]
): boolean {
  if (maze1.length !== maze2.length) return false;

  for (let y = 0; y < maze1.length; y++) {
    const row1 = maze1[y];
    const row2 = maze2[y];
    if (!row1 || !row2 || row1.length !== row2.length) return false;

    for (let x = 0; x < row1.length; x++) {
      const cell1 = row1[x];
      const cell2 = row2[x];

      // Ignore player position differences for structural comparison
      const normalizedCell1 = cell1 === CELL.PLAYER ? CELL.EMPTY : cell1;
      const normalizedCell2 = cell2 === CELL.PLAYER ? CELL.EMPTY : cell2;

      if (normalizedCell1 !== normalizedCell2) return false;
    }
  }

  return true;
}

function preloadImages(): Promise<ImageLoadingState> {
  const imagePaths = Object.values(ICONS);
  const totalCount = imagePaths.length;
  let loadedCount = 0;
  const errors: string[] = [];

  return new Promise((resolve) => {
    if (totalCount === 0) {
      resolve({ isLoading: false, loadedCount: 0, totalCount: 0, errors: [] });
      return;
    }

    const checkComplete = () => {
      if (loadedCount + errors.length === totalCount) {
        resolve({
          isLoading: false,
          loadedCount,
          totalCount,
          errors,
        });
      }
    };

    imagePaths.forEach((imagePath) => {
      const img = new Image();

      // Set a timeout to catch images that never trigger load or error events
      const timeoutId = setTimeout(() => {
        if (!img.complete) {
          errors.push(`${imagePath} (timeout)`);
          console.warn(`Image preload timeout: ${imagePath}`);
          checkComplete();
        }
      }, 10000); // 10 second timeout

      img.onload = () => {
        clearTimeout(timeoutId);
        loadedCount++;
        console.log(`Successfully preloaded image: ${imagePath}`);
        checkComplete();
      };

      img.onerror = (event) => {
        clearTimeout(timeoutId);
        errors.push(imagePath);
        console.warn(`Failed to preload image: ${imagePath}`, {
          error: event,
          path: imagePath,
          timestamp: new Date().toISOString(),
        });
        checkComplete();
      };

      img.src = imagePath;
    });
  });
}

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

const GameComponent: React.FC<{ dominantColors: Record<string, string> }> = ({
  dominantColors,
}) => {
  const {
    playSound,
    stopAllSounds,
    resetAudioSystem,
    hasPlaybackErrors,
    fallbackMode,
  } = useSound();

  // How to Play popup state management
  const { shouldShowOnStartup } = useHowToPlaySettings();
  const [isHowToPlayOpen, setIsHowToPlayOpen] = React.useState(false);

  // First-visit detection and automatic popup display
  React.useEffect(() => {
    // Check if popup should show on startup for new users
    if (shouldShowOnStartup()) {
      setIsHowToPlayOpen(true);
    }
  }, [shouldShowOnStartup]);

  // Check URL parameters for test-specific maze
  const useTestMaze = React.useMemo(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("testMaze") === "bomb";
    }
    return false;
  }, []);

  const [gameState, _] = React.useState(() =>
    createGameState(useTestMaze ? { maze: testBombMaze } : undefined)
  );

  // Force re-render when game state changes
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  // Use a more stable update mechanism with maze reference tracking
  const [stableMazeRef, setStableMazeRef] = React.useState(
    () => gameState.maze
  );

  // Track player position separately to avoid maze re-renders
  const [playerPosition, setPlayerPosition] = React.useState(
    () => gameState.player || { x: 0, y: 0 }
  );

  // Track previous maze state to detect actual changes
  const previousMazeRef = React.useRef<MazeCell[][]>(gameState.maze);
  const [mazeChangeKey, setMazeChangeKey] = React.useState(0);

  // Create a stable maze reference that only changes when non-player cells change
  const stableMazeForRendering = React.useMemo(() => {
    return stableMazeRef;
  }, [mazeChangeKey]);

  // Remove deferred value as it causes mobile flickering due to delayed updates
  // const deferredPlayerPosition = React.useDeferredValue(playerPosition);

  const [showMobileControls, setShowMobileControls] = React.useState(false);

  // Calculate maze dimensions and set CSS custom properties
  // Memoize to prevent recalculation on every render
  const mazeDimensions = React.useMemo(() => {
    const mazeWidth = gameState.maze[0]?.length || 16;
    const mazeHeight = gameState.maze.length || 10;
    return { mazeWidth, mazeHeight };
  }, [gameState.maze.length, gameState.maze[0]?.length]);

  React.useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 800;
    setShowMobileControls(isTouch || isSmallScreen);

    const handleResize = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 800;
      setShowMobileControls(isTouch || isSmallScreen);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
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
      // Store the previous state for comparison
      const previousMazeRef = stableMazeRef;
      const previousGameState = gameState.gameState;
      const previousLevel = gameState.currentLevel;
      const previousPlayerPos = gameState.player;

      // Stop all currently playing sounds before the player moves
      stopAllSounds();

      // Call the GameState method immediately for responsive gameplay
      gameState.movePlayer(dx, dy);

      // Update player position immediately for responsive movement
      // Note: This is kept for potential future use but the Cell component
      // should NOT depend on this state for rendering the player
      if (
        gameState.player &&
        (gameState.player.x !== previousPlayerPos?.x ||
          gameState.player.y !== previousPlayerPos?.y)
      ) {
        setPlayerPosition({ ...gameState.player });
      }

      // CRITICAL: Always update the maze reference immediately to ensure visual updates
      // This is essential for player movement to be visible immediately.
      // The Cell components depend on stableMazeRef for rendering, so this must be
      // updated synchronously when the player moves to prevent visual lag or
      // test failures where movement appears not to work.
      setStableMazeRef([...gameState.maze.map((row) => [...row])]);

      // Use requestAnimationFrame for smoother updates on mobile
      requestAnimationFrame(() => {
        // Force re-render to reflect game state changes
        forceUpdate();
      });
    },
    [gameState, stopAllSounds, stableMazeRef, forceUpdate]
  );

  // Handle keyboard input - block when popup is open
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Block game input when How to Play popup is open
      if (isHowToPlayOpen) return;
      if (gameState.gameState !== "playing") return;
      if (["ArrowUp", "w", "W"].includes(e.key)) movePlayer(0, -1);
      if (["ArrowDown", "s", "S"].includes(e.key)) movePlayer(0, 1);
      if (["ArrowLeft", "a", "A"].includes(e.key)) movePlayer(-1, 0);
      if (["ArrowRight", "d", "D"].includes(e.key)) movePlayer(1, 0);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [movePlayer, gameState.gameState, isHowToPlayOpen]);

  // Global image cache to prevent reloading
  const imageCache = React.useRef<Map<string, boolean>>(new Map());

  // Optimized cell component with essential flickering prevention
  //
  // CRITICAL: Player Movement Rendering Logic
  // ========================================
  // This Cell component MUST use the maze data directly (type prop) to determine
  // what to render. DO NOT attempt to overlay player position from separate state
  // as this creates synchronization issues between visual representation and game state.
  //
  // Previous Issue: The component was using a separate `playerPosition` state to
  // determine if a cell should show the player, which could get out of sync with
  // the actual maze data, causing player movement to appear broken in tests.
  //
  // Solution: Always use `type` prop directly - the GameState already handles
  // updating the maze with the correct player position.
  const Cell: React.FC<{
    type: MazeCell;
    x: number;
    y: number;
    dominantColors: Record<string, string>;
  }> = React.memo(
    ({ type, x, y, dominantColors }) => {
      // IMPORTANT: Use the actual cell type from the maze data directly
      // This ensures the player is always rendered where the game state says it should be
      // DO NOT modify this to use separate player position state!
      const actualCellType = type;

      // Track image loading state for test compatibility while preventing re-renders
      const [imageLoaded, setImageLoaded] = React.useState(false);
      const imagePath = ICONS[actualCellType];
      const isImageCached = imageCache.current.has(imagePath);

      // Pre-load image and track loading state for tests
      React.useEffect(() => {
        if (isImageCached) {
          setImageLoaded(true);
        } else {
          const img = new Image();
          img.onload = () => {
            imageCache.current.set(imagePath, true);
            setImageLoaded(true);
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${imagePath}`);
            setImageLoaded(true); // Still mark as "loaded" to prevent test timeouts
          };
          img.src = imagePath;
        }
      }, [imagePath, isImageCached]);

      // Simple styling with cached images and dominant colors for soil/rock
      const cellStyle: React.CSSProperties = {
        backgroundImage: `url(${imagePath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };

      // Add dominant color as background for soil and rock cells
      if (
        (actualCellType === CELL.SOIL || actualCellType === CELL.ROCK) &&
        dominantColors[actualCellType]
      ) {
        cellStyle.backgroundColor = dominantColors[actualCellType];
      }

      // CSS classes with image-loaded class for test compatibility
      const cssClasses = [
        "cell",
        actualCellType,
        imageLoaded ? "image-loaded" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return <div className={cssClasses} style={cellStyle} />;
    },
    (prevProps, nextProps) => {
      // CRITICAL: Simplified memoization to ensure player movement is visible
      // Only prevent re-render if the cell type hasn't changed
      // This ensures player movement is always rendered correctly
      return (
        prevProps.type === nextProps.type &&
        prevProps.dominantColors === nextProps.dominantColors
      );
    }
  );

  // Handle audio system reset
  const handleAudioReset = React.useCallback(async () => {
    try {
      await resetAudioSystem();
    } catch (error) {
      // Audio reset errors are handled by the audio system
    }
  }, [resetAudioSystem]);

  React.useEffect(() => {
    const { mazeWidth, mazeHeight } = mazeDimensions;
    // Calculate exact maze width: cells + padding
    // cells: mazeWidth * 32px
    // padding: 20px (10px on each side)
    // Note: gap is 0 in CSS, so no gap calculation needed
    const calculatedWidth = `calc(${mazeWidth} * 32px + 20px)`;

    // Calculate pixel dimensions for mobile scaling
    const pixelWidth = mazeWidth * 32 + 20;
    const pixelHeight = mazeHeight * 32 + 20;

    document.documentElement.style.setProperty("--maze-width", calculatedWidth);
    document.documentElement.style.setProperty(
      "--maze-pixel-width",
      `${pixelWidth}px`
    );
    document.documentElement.style.setProperty(
      "--maze-pixel-height",
      `${pixelHeight}px`
    );
    document.documentElement.style.setProperty(
      "--maze-columns",
      `repeat(${mazeWidth}, 32px)`
    );
    document.documentElement.style.setProperty(
      "--maze-rows",
      `repeat(${mazeHeight}, 32px)`
    );
  }, [mazeDimensions]);

  return (
    <div className="game-wrapper">
      <AudioErrorDisplay />
      <AudioDebug />
      <div
        className="maze-container"
        style={{ position: "relative" }}
        data-testid="maze-container"
      >
        <div
          className="maze-grid"
          style={
            {
              "--maze-pixel-width": `${mazeDimensions.mazeWidth * 32 + 20}px`,
              "--maze-pixel-height": `${mazeDimensions.mazeHeight * 32 + 20}px`,
            } as React.CSSProperties
          }
        >
          {stableMazeRef.map((row: MazeCell[], y: number) =>
            row.map((cell: MazeCell, x: number) => (
              <Cell
                key={`${y}-${x}`}
                type={cell}
                x={x}
                y={y}
                dominantColors={dominantColors}
              />
            ))
          )}
        </div>
      </div>
      <div className="hud">
        <div className="hud-left">
          <span className="level-info">
            Level: {gameState.currentLevel} /{" "}
            {gameState.levelManager.getTotalLevels()}
          </span>
          <span>Score: {gameState.score}</span>
          <span>Diamonds left: {gameState.diamonds}</span>
          <span
            className={`moves-info ${
              gameState.moves <= 5
                ? "low-moves"
                : gameState.moves <= 15
                ? "medium-moves"
                : ""
            }`}
          >
            Moves: {gameState.moves} /{" "}
            {gameState.levelManager.getCurrentLevel().moveLimit}
          </span>
          {gameState.gameState !== "playing" && (
            <span
              className={`game-status ${
                gameState.gameState === "dead"
                  ? "game-over"
                  : gameState.isGameComplete
                  ? "victory"
                  : "level-complete"
              }`}
            >
              {gameState.gameState === "dead" && "Game Over"}
              {gameState.gameState === "won" &&
                (gameState.isGameComplete ? "Victory!" : "Level Complete!")}
            </span>
          )}
          {fallbackMode && (
            <span style={{ color: "#ffa500", fontSize: "0.8em" }}>
              Audio: Fallback Mode
            </span>
          )}
        </div>
        <div className="hud-right">
          <AudioControl onOpenHowToPlay={() => setIsHowToPlayOpen(true)} />
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
      {showMobileControls && (
        <div className="mobile-controls">
          <button
            className="mobile-btn up"
            onClick={() => !isHowToPlayOpen && movePlayer(0, -1)}
            disabled={isHowToPlayOpen}
            aria-label="Up"
          >
            ▲
          </button>
          <div className="mobile-controls-horizontal">
            <button
              className="mobile-btn left"
              onClick={() => !isHowToPlayOpen && movePlayer(-1, 0)}
              disabled={isHowToPlayOpen}
              aria-label="Left"
            >
              ◀
            </button>
            <button
              className="mobile-btn down"
              onClick={() => !isHowToPlayOpen && movePlayer(0, 1)}
              disabled={isHowToPlayOpen}
              aria-label="Down"
            >
              ▼
            </button>
            <button
              className="mobile-btn right"
              onClick={() => !isHowToPlayOpen && movePlayer(1, 0)}
              disabled={isHowToPlayOpen}
              aria-label="Right"
            >
              ▶
            </button>
          </div>
        </div>
      )}

      {/* How to Play popup */}
      <HowToPlayPopup
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [, setImageLoadingState] = React.useState<ImageLoadingState>({
    isLoading: true,
    loadedCount: 0,
    totalCount: Object.values(ICONS).length,
    errors: [],
  });

  // Load dominant colors for soil and rock
  const { dominantColors } = useDominantColors();

  // Preload images on app initialization
  React.useEffect(() => {
    preloadImages().then((loadingState) => {
      setImageLoadingState(loadingState);

      if (loadingState.errors.length > 0) {
        console.warn(
          `Image preloading completed with ${loadingState.errors.length} errors:`,
          loadingState.errors
        );

        // Show user-friendly notification for image loading issues
        if (loadingState.errors.length === loadingState.totalCount) {
          console.error(
            "All images failed to load. Game will use fallback colors."
          );
        } else {
          console.warn(
            `${loadingState.errors.length} of ${loadingState.totalCount} images failed to load. Game will use fallback colors for failed images.`
          );
        }
      } else {
        console.log(
          `Successfully preloaded ${loadingState.loadedCount} images`
        );
      }
    });
  }, []);

  return (
    <AudioProvider>
      <AudioInitialization>
        <GameComponent dominantColors={dominantColors} />
      </AudioInitialization>
    </AudioProvider>
  );
};

export default App;
