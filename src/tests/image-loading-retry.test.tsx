import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { ICONS } from "../maze";
import type { MazeCell } from "../maze";

// Mock CSS imports
vi.mock("../maze.css", () => ({}));
vi.mock("../App.css", () => ({}));

describe("Image Loading Retry System", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should implement retry logic for failed image loads", async () => {
    let attemptCount = 0;
    const maxRetries = 2;

    // Mock Image to fail first two attempts, succeed on third
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src: string = "";

      constructor() {
        setTimeout(() => {
          attemptCount++;
          if (attemptCount <= maxRetries) {
            // Fail first two attempts
            if (this.onerror) {
              this.onerror();
            }
          } else {
            // Succeed on third attempt
            if (this.onload) {
              this.onload();
            }
          }
        }, 10);
      }
    } as any;

    // Simulate the loadImageWithRetry function from App.tsx
    function loadImageWithRetry(
      imagePath: string,
      maxRetries: number = 2
    ): Promise<boolean> {
      return new Promise((resolve) => {
        let retryCount = 0;

        const attemptLoad = () => {
          const img = new Image();

          img.onload = () => {
            resolve(true);
          };

          img.onerror = () => {
            retryCount++;
            if (retryCount <= maxRetries) {
              setTimeout(attemptLoad, 100); // Shorter timeout for testing
            } else {
              resolve(false);
            }
          };

          img.src = imagePath;
        };

        attemptLoad();
      });
    }

    const result = await loadImageWithRetry(ICONS.player, maxRetries);

    expect(result).toBe(true);
    expect(attemptCount).toBe(maxRetries + 1); // Should have tried 3 times total
  });

  it("should fail after maximum retry attempts", async () => {
    let attemptCount = 0;
    const maxRetries = 2;

    // Mock Image to always fail
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src: string = "";

      constructor() {
        setTimeout(() => {
          attemptCount++;
          if (this.onerror) {
            this.onerror();
          }
        }, 10);
      }
    } as any;

    function loadImageWithRetry(
      imagePath: string,
      maxRetries: number = 2
    ): Promise<boolean> {
      return new Promise((resolve) => {
        let retryCount = 0;

        const attemptLoad = () => {
          const img = new Image();

          img.onload = () => {
            resolve(true);
          };

          img.onerror = () => {
            retryCount++;
            if (retryCount <= maxRetries) {
              setTimeout(attemptLoad, 100);
            } else {
              resolve(false);
            }
          };

          img.src = imagePath;
        };

        attemptLoad();
      });
    }

    const result = await loadImageWithRetry(ICONS.diamond, maxRetries);

    expect(result).toBe(false);
    expect(attemptCount).toBe(maxRetries + 1); // Should have tried 3 times total
  });

  it("should handle timeout scenarios in preloading", async () => {
    let timeoutTriggered = false;

    // Mock Image that never triggers load or error events
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src: string = "";
      complete: boolean = false;

      constructor() {
        // Don't trigger any events to simulate timeout scenario
      }
    } as any;

    // Simulate the preloadImages function with timeout handling
    const preloadImagesWithTimeout = (): Promise<{
      isLoading: boolean;
      loadedCount: number;
      totalCount: number;
      errors: string[];
    }> => {
      const imagePaths = [ICONS.bomb]; // Test with one image
      const totalCount = imagePaths.length;
      let loadedCount = 0;
      const errors: string[] = [];

      return new Promise((resolve) => {
        imagePaths.forEach((imagePath) => {
          const img = new Image();

          // Set a timeout to catch images that never trigger load or error events
          const timeoutId = setTimeout(() => {
            if (!img.complete) {
              timeoutTriggered = true;
              errors.push(`${imagePath} (timeout)`);
              if (loadedCount + errors.length === totalCount) {
                resolve({
                  isLoading: false,
                  loadedCount,
                  totalCount,
                  errors,
                });
              }
            }
          }, 100); // Short timeout for testing

          img.onload = () => {
            clearTimeout(timeoutId);
            loadedCount++;
            if (loadedCount + errors.length === totalCount) {
              resolve({
                isLoading: false,
                loadedCount,
                totalCount,
                errors,
              });
            }
          };

          img.onerror = () => {
            clearTimeout(timeoutId);
            errors.push(imagePath);
            if (loadedCount + errors.length === totalCount) {
              resolve({
                isLoading: false,
                loadedCount,
                totalCount,
                errors,
              });
            }
          };

          img.src = imagePath;
        });
      });
    };

    const result = await preloadImagesWithTimeout();

    expect(timeoutTriggered).toBe(true);
    expect(result.errors).toContain(`${ICONS.bomb} (timeout)`);
    expect(result.loadedCount).toBe(0);
    expect(result.totalCount).toBe(1);
  });

  it("should provide detailed error information for debugging", async () => {
    const errorDetails: Array<{
      path: string;
      timestamp: string;
      error: any;
    }> = [];

    // Mock Image to simulate error with event details
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: ((event: any) => void) | null = null;
      src: string = "";

      constructor() {
        setTimeout(() => {
          if (this.onerror) {
            const mockEvent = {
              type: "error",
              target: this,
              message: "Failed to load image",
            };
            this.onerror(mockEvent);
          }
        }, 10);
      }
    } as any;

    // Simulate detailed error logging from App.tsx
    const preloadWithDetailedErrors = (): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          resolve();
        };

        img.onerror = (event) => {
          errorDetails.push({
            path: ICONS.exit,
            error: event,
            timestamp: new Date().toISOString(),
          });
          resolve();
        };

        img.src = ICONS.exit;
      });
    };

    await preloadWithDetailedErrors();

    expect(errorDetails).toHaveLength(1);
    expect(errorDetails[0]).toMatchObject({
      path: ICONS.exit,
      error: expect.any(Object),
      timestamp: expect.any(String),
    });
  });

  it("should handle mixed success and failure scenarios", async () => {
    let imageIndex = 0;
    const testImages = [ICONS.player, ICONS.rock, ICONS.diamond];

    // Mock Image to succeed on first image, fail on second, succeed on third
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src: string = "";

      constructor() {
        const currentIndex = imageIndex++;
        setTimeout(() => {
          if (currentIndex === 1) {
            // Fail the second image (rock)
            if (this.onerror) {
              this.onerror();
            }
          } else {
            // Succeed on first and third images
            if (this.onload) {
              this.onload();
            }
          }
        }, 10);
      }
    } as any;

    const preloadMixedResults = (): Promise<{
      loadedCount: number;
      totalCount: number;
      errors: string[];
    }> => {
      const totalCount = testImages.length;
      let loadedCount = 0;
      const errors: string[] = [];

      return new Promise((resolve) => {
        testImages.forEach((imagePath) => {
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

    const result = await preloadMixedResults();

    expect(result.totalCount).toBe(3);
    expect(result.loadedCount).toBe(2);
    expect(result.errors).toHaveLength(1);
    expect(result.errors).toContain(ICONS.rock);
  });
});
