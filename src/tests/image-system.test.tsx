import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { ICONS, CELL } from "../maze";
import type { MazeCell } from "../maze";

// Mock CSS imports
vi.mock("../maze.css", () => ({}));
vi.mock("../App.css", () => ({}));

// Mock audio system to avoid dependencies
vi.mock("../audio/context/audio-context", () => ({
  AudioProvider: ({ children }: { children: React.ReactNode }) => children,
  useAudioContext: () => ({
    audioManager: {
      playSound: vi.fn(),
      preloadSounds: vi.fn(() => Promise.resolve()),
      setMuted: vi.fn(),
      isMuted: vi.fn(() => false),
      isSupported: vi.fn(() => true),
      stopAllSounds: vi.fn(),
    },
  }),
}));

vi.mock("../audio/hooks/use-sound", () => ({
  useSound: () => ({
    playSound: vi.fn(),
    stopAllSounds: vi.fn(),
    resetAudioSystem: vi.fn(),
    hasPlaybackErrors: false,
    fallbackMode: false,
  }),
}));

vi.mock("../audio/events/game-end-sound-manager", () => ({
  getGameEndSoundManager: () => ({
    setStopAllSoundsCallback: vi.fn(),
  }),
}));

vi.mock("../audio/events/sound-event-emitter", () => ({
  getSoundEventEmitter: () => ({
    setCallback: vi.fn(),
  }),
}));

vi.mock("../audio/components/AudioControl", () => ({
  AudioControl: () => <div data-testid="audio-control">Audio Control</div>,
}));

vi.mock("../audio/components/audio-error-display", () => ({
  AudioErrorDisplay: () => (
    <div data-testid="audio-error-display">Audio Error Display</div>
  ),
}));

vi.mock("../audio/components/audio-initialization", () => ({
  AudioInitialization: ({ children }: { children: React.ReactNode }) =>
    children,
}));

vi.mock("../audio/components/audio-debug", () => ({
  AudioDebug: () => <div data-testid="audio-debug">Audio Debug</div>,
}));

// Mock GameState
vi.mock("../GameState", () => ({
  createGameState: () => ({
    maze: [
      [CELL.ROCK, CELL.ROCK, CELL.ROCK],
      [CELL.ROCK, CELL.PLAYER, CELL.ROCK],
      [CELL.ROCK, CELL.ROCK, CELL.ROCK],
    ],
    movePlayer: vi.fn(),
    gameState: "playing",
    score: 0,
    diamonds: 0,
    moves: 0,
    currentLevel: 1,
    isGameComplete: false,
    levelManager: {
      getTotalLevels: () => 1,
      getCurrentLevel: () => ({ moveLimit: 100 }),
    },
  }),
}));

describe("Image System", () => {
  describe("ICONS constant", () => {
    it("should have correct PNG image paths for all cell types", () => {
      const expectedPaths = {
        empty: "/Empty.png",
        player: "/player.png",
        rock: "/rock.png",
        soil: "/soil.png",
        diamond: "/diamond.png",
        boulder: "/boulder.png",
        bomb: "/bomb.png",
        exit: "/exit.png",
      };

      expect(ICONS).toEqual(expectedPaths);
    });

    it("should have paths that start with forward slash for public folder access", () => {
      Object.values(ICONS).forEach((path) => {
        expect(path).toMatch(/^\/.*\.png$/);
      });
    });

    it("should have PNG file extensions", () => {
      Object.values(ICONS).forEach((path) => {
        expect(path.endsWith(".png")).toBe(true);
      });
    });

    it("should have all required cell types", () => {
      const requiredTypes = [
        "empty",
        "player",
        "rock",
        "soil",
        "diamond",
        "boulder",
        "bomb",
        "exit",
      ];
      const iconKeys = Object.keys(ICONS);

      requiredTypes.forEach((type) => {
        expect(iconKeys).toContain(type);
      });
    });

    it("should match CELL constant values", () => {
      expect(Object.keys(ICONS)).toEqual(Object.values(CELL));
    });
  });

  describe("Cell Component Image Rendering", () => {
    // Create a minimal Cell component for testing
    const TestCell: React.FC<{ type: MazeCell }> = ({ type }) => {
      const [cellImageState, setCellImageState] = React.useState({
        loaded: false,
        error: false,
        retryCount: 0,
      });

      React.useEffect(() => {
        // Simulate image loading
        const img = new Image();
        img.onload = () => {
          setCellImageState({
            loaded: true,
            error: false,
            retryCount: 0,
          });
        };
        img.onerror = () => {
          setCellImageState({
            loaded: false,
            error: true,
            retryCount: 1,
          });
        };
        img.src = ICONS[type];
      }, [type]);

      const cellStyle: React.CSSProperties = {
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };

      if (cellImageState.loaded && !cellImageState.error) {
        cellStyle.backgroundImage = `url(${ICONS[type]})`;
      }

      const cssClasses = [
        "cell",
        type,
        cellImageState.error ? "image-error" : "",
        cellImageState.loaded ? "image-loaded" : "",
        !cellImageState.loaded && !cellImageState.error ? "image-loading" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return (
        <div
          className={cssClasses}
          style={cellStyle}
          data-testid={`cell-${type}`}
          title={
            cellImageState.error
              ? `Image failed to load: ${ICONS[type]}`
              : undefined
          }
        />
      );
    };

    beforeEach(() => {
      // Mock Image constructor
      global.Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src: string = "";

        constructor() {
          // Simulate successful image loading by default
          setTimeout(() => {
            if (this.onload) {
              this.onload();
            }
          }, 0);
        }
      } as any;
    });

    it("should render cell with correct CSS classes", () => {
      render(<TestCell type="player" />);
      const cell = screen.getByTestId("cell-player");

      expect(cell).toHaveClass("cell", "player");
    });

    it("should apply background image styles when image loads successfully", async () => {
      render(<TestCell type="diamond" />);
      const cell = screen.getByTestId("cell-diamond");

      await waitFor(() => {
        expect(cell).toHaveClass("image-loaded");
      });

      expect(cell.style.backgroundImage).toBe(`url(${ICONS.diamond})`);
      expect(cell.style.backgroundSize).toBe("cover");
      expect(cell.style.backgroundPosition).toBe("center");
      expect(cell.style.backgroundRepeat).toBe("no-repeat");
    });

    it("should show loading state initially", () => {
      render(<TestCell type="rock" />);
      const cell = screen.getByTestId("cell-rock");

      expect(cell).toHaveClass("image-loading");
      expect(cell).not.toHaveClass("image-loaded");
      expect(cell).not.toHaveClass("image-error");
    });

    it("should render all cell types correctly", async () => {
      const cellTypes: MazeCell[] = [
        "empty",
        "player",
        "rock",
        "soil",
        "diamond",
        "boulder",
        "bomb",
        "exit",
      ];

      cellTypes.forEach((type) => {
        const { unmount } = render(<TestCell type={type} />);
        const cell = screen.getByTestId(`cell-${type}`);

        expect(cell).toHaveClass("cell", type);
        unmount();
      });
    });
  });

  describe("Image Loading Error Handling", () => {
    beforeEach(() => {
      // Mock console methods to avoid noise in tests
      vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should handle image loading failures gracefully", async () => {
      // Mock Image to simulate loading failure
      global.Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src: string = "";

        constructor() {
          // Simulate image loading failure
          setTimeout(() => {
            if (this.onerror) {
              this.onerror();
            }
          }, 0);
        }
      } as any;

      const TestCell: React.FC<{ type: MazeCell }> = ({ type }) => {
        const [cellImageState, setCellImageState] = React.useState({
          loaded: false,
          error: false,
          retryCount: 0,
        });

        React.useEffect(() => {
          const img = new Image();
          img.onload = () => {
            setCellImageState({
              loaded: true,
              error: false,
              retryCount: 0,
            });
          };
          img.onerror = () => {
            setCellImageState({
              loaded: false,
              error: true,
              retryCount: 1,
            });
          };
          img.src = ICONS[type];
        }, [type]);

        const cssClasses = [
          "cell",
          type,
          cellImageState.error ? "image-error" : "",
          cellImageState.loaded ? "image-loaded" : "",
          !cellImageState.loaded && !cellImageState.error
            ? "image-loading"
            : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            className={cssClasses}
            data-testid={`cell-${type}`}
            title={
              cellImageState.error
                ? `Image failed to load: ${ICONS[type]}`
                : undefined
            }
          />
        );
      };

      render(<TestCell type="bomb" />);
      const cell = screen.getByTestId("cell-bomb");

      await waitFor(() => {
        expect(cell).toHaveClass("image-error");
      });

      expect(cell).not.toHaveClass("image-loaded");
      expect(cell).not.toHaveClass("image-loading");
      expect(cell.title).toBe(`Image failed to load: ${ICONS.bomb}`);
    });

    it("should not apply background image when loading fails", async () => {
      // Mock Image to simulate loading failure
      global.Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src: string = "";

        constructor() {
          setTimeout(() => {
            if (this.onerror) {
              this.onerror();
            }
          }, 0);
        }
      } as any;

      const TestCell: React.FC<{ type: MazeCell }> = ({ type }) => {
        const [cellImageState, setCellImageState] = React.useState({
          loaded: false,
          error: false,
          retryCount: 0,
        });

        React.useEffect(() => {
          const img = new Image();
          img.onload = () => {
            setCellImageState({
              loaded: true,
              error: false,
              retryCount: 0,
            });
          };
          img.onerror = () => {
            setCellImageState({
              loaded: false,
              error: true,
              retryCount: 1,
            });
          };
          img.src = ICONS[type];
        }, [type]);

        const cellStyle: React.CSSProperties = {
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        };

        // Only add background image if it loaded successfully
        if (cellImageState.loaded && !cellImageState.error) {
          cellStyle.backgroundImage = `url(${ICONS[type]})`;
        }

        return <div style={cellStyle} data-testid={`cell-${type}`} />;
      };

      render(<TestCell type="exit" />);
      const cell = screen.getByTestId("cell-exit");

      await waitFor(() => {
        // Wait for error state
        expect(cell.style.backgroundImage).toBe("");
      });

      expect(cell.style.backgroundSize).toBe("cover");
      expect(cell.style.backgroundPosition).toBe("center");
      expect(cell.style.backgroundRepeat).toBe("no-repeat");
    });
  });

  describe("Image Preloading System", () => {
    beforeEach(() => {
      vi.spyOn(console, "log").mockImplementation(() => {});
      vi.spyOn(console, "warn").mockImplementation(() => {});
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should preload all images from ICONS constant", async () => {
      const loadedImages: string[] = [];

      // Mock Image to track which images are loaded
      global.Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src: string = "";

        constructor() {
          // Track loaded images and simulate success
          setTimeout(() => {
            loadedImages.push(this.src);
            if (this.onload) {
              this.onload();
            }
          }, 0);
        }
      } as any;

      // Simulate the preloadImages function
      const preloadImages = (): Promise<{
        loadedCount: number;
        totalCount: number;
        errors: string[];
      }> => {
        const imagePaths = Object.values(ICONS);
        const totalCount = imagePaths.length;
        let loadedCount = 0;
        const errors: string[] = [];

        return new Promise((resolve) => {
          imagePaths.forEach((imagePath) => {
            const img = new Image();
            img.onload = () => {
              loadedCount++;
              if (loadedCount + errors.length === totalCount) {
                resolve({ loadedCount, totalCount, errors });
              }
            };
            img.onerror = () => {
              errors.push(imagePath);
              if (loadedCount + errors.length === totalCount) {
                resolve({ loadedCount, totalCount, errors });
              }
            };
            img.src = imagePath;
          });
        });
      };

      const result = await preloadImages();

      expect(result.totalCount).toBe(Object.values(ICONS).length);
      expect(result.loadedCount).toBe(Object.values(ICONS).length);
      expect(result.errors).toHaveLength(0);
      expect(loadedImages).toEqual(Object.values(ICONS));
    });

    it("should handle preloading errors gracefully", async () => {
      // Mock Image to simulate some failures
      let imageCount = 0;
      global.Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src: string = "";

        constructor() {
          const currentCount = imageCount++;
          setTimeout(() => {
            // Fail every other image
            if (currentCount % 2 === 0) {
              if (this.onload) {
                this.onload();
              }
            } else {
              if (this.onerror) {
                this.onerror();
              }
            }
          }, 0);
        }
      } as any;

      const preloadImages = (): Promise<{
        loadedCount: number;
        totalCount: number;
        errors: string[];
      }> => {
        const imagePaths = Object.values(ICONS);
        const totalCount = imagePaths.length;
        let loadedCount = 0;
        const errors: string[] = [];

        return new Promise((resolve) => {
          imagePaths.forEach((imagePath) => {
            const img = new Image();
            img.onload = () => {
              loadedCount++;
              if (loadedCount + errors.length === totalCount) {
                resolve({ loadedCount, totalCount, errors });
              }
            };
            img.onerror = () => {
              errors.push(imagePath);
              if (loadedCount + errors.length === totalCount) {
                resolve({ loadedCount, totalCount, errors });
              }
            };
            img.src = imagePath;
          });
        });
      };

      const result = await preloadImages();

      expect(result.totalCount).toBe(Object.values(ICONS).length);
      expect(result.loadedCount + result.errors.length).toBe(result.totalCount);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
