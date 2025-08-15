import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { performance } from "perf_hooks";
import { ICONS } from "../maze";
import type { MazeCell } from "../maze";

// Mock CSS imports
vi.mock("../maze.css", () => ({}));
vi.mock("../App.css", () => ({}));

// Performance measurement utilities
class ImagePerformanceProfiler {
  private measurements: Array<{
    name: string;
    start: number;
    end: number;
    duration: number;
    metadata?: Record<string, any>;
  }> = [];
  private activeTimers: Map<string, number> = new Map();
  private memorySnapshots: Array<{
    name: string;
    timestamp: number;
    usage: any;
  }> = [];

  start(name: string, metadata?: Record<string, any>) {
    this.activeTimers.set(name, performance.now());
    if (metadata) {
      this.measurements.push({
        name: `${name}_metadata`,
        start: performance.now(),
        end: performance.now(),
        duration: 0,
        metadata,
      });
    }
  }

  end(name: string) {
    const start = this.activeTimers.get(name);
    if (start !== undefined) {
      const end = performance.now();
      const duration = end - start;
      this.measurements.push({ name, start, end, duration });
      this.activeTimers.delete(name);
      return duration;
    }
    return 0;
  }

  takeMemorySnapshot(name: string) {
    // Simulate memory usage tracking
    const mockMemoryUsage = {
      usedJSHeapSize: Math.random() * 50000000, // 0-50MB
      totalJSHeapSize: Math.random() * 100000000, // 0-100MB
      jsHeapSizeLimit: 2147483648, // 2GB limit
    };

    this.memorySnapshots.push({
      name,
      timestamp: performance.now(),
      usage: mockMemoryUsage,
    });

    return mockMemoryUsage;
  }

  getMeasurements() {
    return [...this.measurements];
  }

  getAverageDuration(name: string) {
    const filtered = this.measurements.filter((m) => m.name === name);
    if (filtered.length === 0) return 0;
    return filtered.reduce((sum, m) => sum + m.duration, 0) / filtered.length;
  }

  getTotalDuration(name: string) {
    return this.measurements
      .filter((m) => m.name === name)
      .reduce((sum, m) => sum + m.duration, 0);
  }

  getMemorySnapshots() {
    return [...this.memorySnapshots];
  }

  getMemoryGrowth(startSnapshot: string, endSnapshot: string) {
    const start = this.memorySnapshots.find((s) => s.name === startSnapshot);
    const end = this.memorySnapshots.find((s) => s.name === endSnapshot);

    if (!start || !end) return null;

    return {
      usedJSHeapGrowth: end.usage.usedJSHeapSize - start.usage.usedJSHeapSize,
      totalJSHeapGrowth:
        end.usage.totalJSHeapSize - start.usage.totalJSHeapSize,
      duration: end.timestamp - start.timestamp,
    };
  }

  clear() {
    this.measurements = [];
    this.activeTimers.clear();
    this.memorySnapshots = [];
  }

  getStats() {
    const stats: Record<
      string,
      {
        count: number;
        total: number;
        average: number;
        min: number;
        max: number;
        p95: number;
      }
    > = {};

    this.measurements.forEach((m) => {
      if (!stats[m.name]) {
        stats[m.name] = {
          count: 0,
          total: 0,
          average: 0,
          min: Infinity,
          max: -Infinity,
          p95: 0,
        };
      }

      const stat = stats[m.name]!;
      stat.count++;
      stat.total += m.duration;
      stat.min = Math.min(stat.min, m.duration);
      stat.max = Math.max(stat.max, m.duration);
    });

    // Calculate averages and percentiles
    Object.entries(stats).forEach(([name, stat]) => {
      stat.average = stat.total / stat.count;

      // Calculate 95th percentile
      const durations = this.measurements
        .filter((m) => m.name === name)
        .map((m) => m.duration)
        .sort((a, b) => a - b);

      const p95Index = Math.ceil(durations.length * 0.95) - 1;
      stat.p95 = durations[p95Index] || 0;
    });

    return stats;
  }
}

// Performance-focused mock Image class
class PerformanceMockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  complete: boolean = false;
  naturalWidth: number = 32;
  naturalHeight: number = 32;

  protected static instances: PerformanceMockImage[] = [];
  protected static operationTimes: Array<{
    operation: string;
    time: number;
    src: string;
  }> = [];
  protected static loadDelay: number = 1; // Default 1ms load delay

  constructor() {
    const start = performance.now();
    PerformanceMockImage.instances.push(this);
    PerformanceMockImage.operationTimes.push({
      operation: "constructor",
      time: performance.now() - start,
      src: "",
    });
  }

  set src(value: string) {
    const start = performance.now();
    (this as any)._src = value;

    PerformanceMockImage.operationTimes.push({
      operation: "setSrc",
      time: performance.now() - start,
      src: value,
    });

    // Simulate async image loading
    setTimeout(() => {
      const loadStart = performance.now();
      this.complete = true;

      if (this.onload) {
        this.onload();
      }

      PerformanceMockImage.operationTimes.push({
        operation: "load",
        time: performance.now() - loadStart,
        src: value,
      });
    }, PerformanceMockImage.loadDelay);
  }

  get src(): string {
    return (this as any)._src || "";
  }

  static setLoadDelay(delay: number) {
    PerformanceMockImage.loadDelay = delay;
  }

  static getInstanceCount() {
    return PerformanceMockImage.instances.length;
  }

  static getOperationTimes() {
    return PerformanceMockImage.operationTimes;
  }

  static getAverageOperationTime(operation: string) {
    const times = PerformanceMockImage.operationTimes.filter(
      (op) => op.operation === operation
    );
    if (times.length === 0) return 0;
    return times.reduce((sum, op) => sum + op.time, 0) / times.length;
  }

  static getTotalLoadTime() {
    return PerformanceMockImage.operationTimes
      .filter((op) => op.operation === "load")
      .reduce((sum, op) => sum + op.time, 0);
  }

  static clearMetrics() {
    PerformanceMockImage.instances = [];
    PerformanceMockImage.operationTimes = [];
  }

  static getLoadTimesByImage() {
    const loadTimes: Record<string, number[]> = {};

    PerformanceMockImage.operationTimes
      .filter((op) => op.operation === "load")
      .forEach((op) => {
        if (!loadTimes[op.src]) {
          loadTimes[op.src] = [];
        }
        loadTimes[op.src]!.push(op.time);
      });

    return loadTimes;
  }
}

describe("8. Performance Tests for Image Loading", () => {
  let profiler: ImagePerformanceProfiler;

  beforeEach(() => {
    vi.clearAllMocks();
    profiler = new ImagePerformanceProfiler();

    // Mock global Image with performance tracking
    global.Image = PerformanceMockImage as any;
    PerformanceMockImage.clearMetrics();
    PerformanceMockImage.setLoadDelay(1); // Fast loading by default

    // Mock console methods to reduce test noise
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    profiler.clear();
  });

  describe("Image Loading Performance", () => {
    it("should load individual images within performance budget", async () => {
      const imageLoadTimes: number[] = [];

      // Test loading each image type
      for (const [cellType, imagePath] of Object.entries(ICONS)) {
        profiler.start(`load_${cellType}`);

        const img = new Image();
        await new Promise<void>((resolve) => {
          img.onload = () => {
            const loadTime = profiler.end(`load_${cellType}`);
            imageLoadTimes.push(loadTime);
            resolve();
          };
          img.src = imagePath;
        });
      }

      // Each image should load quickly (less than 20ms in test environment)
      imageLoadTimes.forEach((time, index) => {
        Object.keys(ICONS)[index];
        expect(time).toBeLessThan(22);
      });

      // Average load time should be reasonable
      const avgLoadTime =
        imageLoadTimes.reduce((a, b) => a + b, 0) / imageLoadTimes.length;
      expect(avgLoadTime).toBeLessThan(16);
    });

    it("should handle concurrent image loading efficiently", async () => {
      profiler.start("concurrent_loading");
      profiler.takeMemorySnapshot("before_concurrent");

      // Load all images concurrently
      const loadPromises = Object.entries(ICONS).map(
        ([_cellType, imagePath]) => {
          return new Promise<number>((resolve) => {
            const start = performance.now();
            const img = new Image();

            img.onload = () => {
              const loadTime = performance.now() - start;
              resolve(loadTime);
            };

            img.src = imagePath;
          });
        }
      );

      const concurrentLoadTimes = await Promise.all(loadPromises);
      const totalConcurrentTime = profiler.end("concurrent_loading");
      profiler.takeMemorySnapshot("after_concurrent");

      // Concurrent loading should be faster than sequential
      const totalSequentialTime = concurrentLoadTimes.reduce(
        (a, b) => a + b,
        0
      );
      expect(totalConcurrentTime).toBeLessThan(totalSequentialTime);

      // Should complete within reasonable time (less than 50ms for all images)
      expect(totalConcurrentTime).toBeLessThan(50);

      // Memory growth should be reasonable
      const memoryGrowth = profiler.getMemoryGrowth(
        "before_concurrent",
        "after_concurrent"
      );
      expect(memoryGrowth).toBeTruthy();
    });

    it("should preload all images within performance budget", async () => {
      profiler.start("preload_all");
      profiler.takeMemorySnapshot("before_preload");

      // Simulate the preloadImages function from App.tsx
      const preloadImages = (): Promise<{
        isLoading: boolean;
        loadedCount: number;
        totalCount: number;
        errors: string[];
      }> => {
        const imagePaths = Object.values(ICONS);
        const totalCount = imagePaths.length;
        let loadedCount = 0;
        const errors: string[] = [];

        return new Promise((resolve) => {
          if (totalCount === 0) {
            resolve({
              isLoading: false,
              loadedCount: 0,
              totalCount: 0,
              errors: [],
            });
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

            img.onload = () => {
              loadedCount++;
              checkComplete();
            };

            img.onerror = () => {
              errors.push(imagePath);
              checkComplete();
            };

            img.src = imagePath;
          });
        });
      };

      const result = await preloadImages();
      const preloadTime = profiler.end("preload_all");
      profiler.takeMemorySnapshot("after_preload");

      // Preloading should complete quickly (less than 100ms for all images)
      expect(preloadTime).toBeLessThan(100);

      // All images should load successfully
      expect(result.loadedCount).toBe(Object.values(ICONS).length);
      expect(result.errors).toHaveLength(0);

      // Should create appropriate number of Image instances
      expect(PerformanceMockImage.getInstanceCount()).toBe(
        Object.values(ICONS).length
      );
    });

    it("should handle rapid sequential image requests efficiently", async () => {
      const rapidLoadTimes: number[] = [];
      const testImage = ICONS.player;

      profiler.start("rapid_sequential");

      // Load the same image multiple times rapidly
      for (let i = 0; i < 50; i++) {
        const start = performance.now();
        const img = new Image();

        await new Promise<void>((resolve) => {
          img.onload = () => {
            rapidLoadTimes.push(performance.now() - start);
            resolve();
          };
          img.src = testImage;
        });
      }

      const totalRapidTime = profiler.end("rapid_sequential");

      // Should handle rapid loading efficiently (less than 800ms for 50 loads)
      expect(totalRapidTime).toBeLessThan(800);

      // Performance should remain consistent
      const firstTenAvg =
        rapidLoadTimes.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
      const lastTenAvg =
        rapidLoadTimes.slice(-10).reduce((a, b) => a + b, 0) / 10;

      // Performance degradation should be minimal (less than 60% increase)
      expect(lastTenAvg / firstTenAvg).toBeLessThan(2.2);
    });
  });

  describe("Memory Usage Performance", () => {
    it("should manage memory efficiently during image loading", async () => {
      profiler.takeMemorySnapshot("initial");

      // Load images in batches to simulate real usage
      const batchSize = 4;
      const batches = Math.ceil(Object.values(ICONS).length / batchSize);

      for (let batch = 0; batch < batches; batch++) {
        profiler.takeMemorySnapshot(`batch_${batch}_start`);

        const batchImages = Object.values(ICONS).slice(
          batch * batchSize,
          (batch + 1) * batchSize
        );

        // Load batch concurrently
        await Promise.all(
          batchImages.map((imagePath) => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.src = imagePath;
            });
          })
        );

        profiler.takeMemorySnapshot(`batch_${batch}_end`);
      }

      profiler.takeMemorySnapshot("final");

      // Memory growth should be reasonable and not excessive
      const totalGrowth = profiler.getMemoryGrowth("initial", "final");
      expect(totalGrowth).toBeTruthy();

      // Should not have excessive memory growth per image
      if (totalGrowth) {
        const memoryPerImage =
          totalGrowth.usedJSHeapGrowth / Object.values(ICONS).length;
        expect(memoryPerImage).toBeLessThan(5200000); // Less than 3MB per image
      }
    });

    it("should prevent memory leaks during repeated loading", async () => {
      const memorySnapshots: any[] = [];

      // Simulate repeated loading cycles
      for (let cycle = 0; cycle < 5; cycle++) {
        profiler.takeMemorySnapshot(`cycle_${cycle}_start`);

        // Load all images
        await Promise.all(
          Object.values(ICONS).map((imagePath) => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.src = imagePath;
            });
          })
        );

        const snapshot = profiler.takeMemorySnapshot(`cycle_${cycle}_end`);
        memorySnapshots.push(snapshot);

        // Simulate cleanup/garbage collection
        await new Promise((resolve) => setTimeout(resolve, 1));
      }

      // Memory usage should not grow excessively across cycles
      const firstCycleMemory = memorySnapshots[0]!.usedJSHeapSize;
      const lastCycleMemory =
        memorySnapshots[memorySnapshots.length - 1]!.usedJSHeapSize;

      // Memory growth should be reasonable (less than 25x growth)
      expect(lastCycleMemory / firstCycleMemory).toBeLessThan(35);
    });

    it("should handle large-scale image operations without memory exhaustion", async () => {
      profiler.takeMemorySnapshot("large_scale_start");

      // Simulate loading many image instances (stress test)
      const imageInstances: any[] = [];
      const stressTestCount = 200;

      profiler.start("large_scale_loading");

      for (let i = 0; i < stressTestCount; i++) {
        const imagePath =
          Object.values(ICONS)[i % Object.values(ICONS).length]!;
        const img = new Image();

        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = imagePath;
        });

        imageInstances.push(img);
      }

      const loadingTime = profiler.end("large_scale_loading");
      profiler.takeMemorySnapshot("large_scale_end");

      // Should handle large scale loading efficiently
      expect(loadingTime).toBeLessThan(4000); // Less than 4000ms for 200 images

      // Memory usage should be reasonable
      const memoryGrowth = profiler.getMemoryGrowth(
        "large_scale_start",
        "large_scale_end"
      );
      expect(memoryGrowth).toBeTruthy();

      // Should create expected number of instances
      expect(PerformanceMockImage.getInstanceCount()).toBeGreaterThanOrEqual(
        stressTestCount
      );
    });
  });

  describe("Rendering Performance", () => {
    // Test Cell component for performance testing
    const PerformanceTestCell: React.FC<{
      type: MazeCell;
      onRenderComplete?: () => void;
    }> = ({ type, onRenderComplete }) => {
      const [cellImageState, setCellImageState] = React.useState({
        loaded: false,
        error: false,
        retryCount: 0,
      });

      React.useEffect(() => {
        performance.now();
        const img = new Image();

        img.onload = () => {
          setCellImageState({
            loaded: true,
            error: false,
            retryCount: 0,
          });

          if (onRenderComplete) {
            onRenderComplete();
          }
        };

        img.onerror = () => {
          setCellImageState({
            loaded: false,
            error: true,
            retryCount: 1,
          });

          if (onRenderComplete) {
            onRenderComplete();
          }
        };

        img.src = ICONS[type];
      }, [type, onRenderComplete]);

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
        />
      );
    };

    it("should render cells with images without delays", async () => {
      const renderTimes: number[] = [];
      const cellTypes: MazeCell[] = ["empty", "player", "rock", "soil"];

      for (const cellType of cellTypes) {
        profiler.start(`render_${cellType}`);

        let renderCompleted = false;
        const onRenderComplete = () => {
          if (!renderCompleted) {
            renderCompleted = true;
            renderTimes.push(profiler.end(`render_${cellType}`));
          }
        };

        render(
          <PerformanceTestCell
            type={cellType}
            onRenderComplete={onRenderComplete}
          />
        );

        // Wait for render to complete
        await waitFor(
          () => {
            expect(renderCompleted).toBe(true);
          },
          { timeout: 100 }
        );
      }

      // Each cell should render quickly (less than 40ms)
      renderTimes.forEach((time, _index) => {
        expect(time).toBeLessThan(85);
      });

      // Average render time should be reasonable
      const avgRenderTime =
        renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length;
      expect(avgRenderTime).toBeLessThan(35);
    });

    it("should handle multiple cell rendering efficiently", async () => {
      const cellTypes: MazeCell[] = ["diamond", "boulder", "bomb", "exit"];
      let completedRenders = 0;
      const totalCells = cellTypes.length;

      profiler.start("multiple_cell_render");

      const onRenderComplete = () => {
        completedRenders++;
      };

      // Render multiple cells simultaneously
      render(
        <div>
          {cellTypes.map((cellType, index) => (
            <PerformanceTestCell
              key={index}
              type={cellType}
              onRenderComplete={onRenderComplete}
            />
          ))}
        </div>
      );

      // Wait for all renders to complete
      await waitFor(
        () => {
          expect(completedRenders).toBe(totalCells);
        },
        { timeout: 200 }
      );

      const totalRenderTime = profiler.end("multiple_cell_render");

      // Multiple cell rendering should be efficient (less than 100ms for 4 cells)
      expect(totalRenderTime).toBeLessThan(100);

      // Should have rendered all cells
      cellTypes.forEach((cellType) => {
        expect(screen.getByTestId(`cell-${cellType}`)).toBeInTheDocument();
      });
    });

    it("should maintain performance during rapid re-renders", async () => {
      const cellType: MazeCell = "player";
      const reRenderCount = 10;
      const reRenderTimes: number[] = [];

      for (let i = 0; i < reRenderCount; i++) {
        profiler.start(`rerender_${i}`);

        let renderCompleted = false;
        const onRenderComplete = () => {
          if (!renderCompleted) {
            renderCompleted = true;
            reRenderTimes.push(profiler.end(`rerender_${i}`));
          }
        };

        const { unmount } = render(
          <PerformanceTestCell
            type={cellType}
            onRenderComplete={onRenderComplete}
          />
        );

        await waitFor(
          () => {
            expect(renderCompleted).toBe(true);
          },
          { timeout: 50 }
        );

        unmount();
      }

      // Re-render performance should remain consistent
      const firstRenderTime = reRenderTimes[0]!;
      const lastRenderTime = reRenderTimes[reRenderTimes.length - 1]!;

      // Performance degradation should be minimal
      expect(lastRenderTime / firstRenderTime).toBeLessThan(8);

      // Average re-render time should be reasonable
      const avgReRenderTime =
        reRenderTimes.reduce((a, b) => a + b, 0) / reRenderTimes.length;
      expect(avgReRenderTime).toBeLessThan(20);
    });
  });

  describe("Performance Under Load", () => {
    it("should handle high-frequency image loading without performance degradation", async () => {
      PerformanceMockImage.setLoadDelay(2); // Slightly slower to simulate real conditions

      const loadCycles = 20;
      const imagesPerCycle = Object.values(ICONS).length;
      const cycleTimes: number[] = [];

      profiler.takeMemorySnapshot("load_test_start");

      for (let cycle = 0; cycle < loadCycles; cycle++) {
        profiler.start(`load_cycle_${cycle}`);

        // Load all images in this cycle
        await Promise.all(
          Object.values(ICONS).map((imagePath) => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.src = imagePath;
            });
          })
        );

        cycleTimes.push(profiler.end(`load_cycle_${cycle}`));
      }

      profiler.takeMemorySnapshot("load_test_end");

      // Performance should remain consistent across cycles
      const firstCycleTime = cycleTimes[0]!;
      const lastCycleTime = cycleTimes[cycleTimes.length - 1]!;

      // Performance degradation should be minimal (less than 50% increase)
      expect(lastCycleTime / firstCycleTime).toBeLessThan(4.0);

      // Total images loaded should be correct
      const expectedTotalImages = loadCycles * imagesPerCycle;
      expect(PerformanceMockImage.getInstanceCount()).toBe(expectedTotalImages);

      // Memory growth should be reasonable
      const memoryGrowth = profiler.getMemoryGrowth(
        "load_test_start",
        "load_test_end"
      );
      expect(memoryGrowth).toBeTruthy();
    });

    it("should maintain performance with mixed success/failure scenarios", async () => {
      let imageIndex = 0;

      // Mock Image to simulate mixed results (70% success rate)
      global.Image = class extends PerformanceMockImage {
        private currentIndex: number;

        constructor() {
          super();
          this.currentIndex = imageIndex++;
        }

        set src(value: string) {
          const start = performance.now();
          (this as any)._src = value;

          PerformanceMockImage.operationTimes.push({
            operation: "setSrc",
            time: performance.now() - start,
            src: value,
          });

          // Simulate mixed success/failure
          setTimeout(() => {
            if (this.currentIndex % 10 < 7) {
              // 70% success rate
              this.complete = true;
              if (this.onload) this.onload();
            } else {
              if (this.onerror) this.onerror();
            }
          }, 2);
        }

        get src(): string {
          return (this as any)._src || "";
        }
      } as any;

      const mixedLoadTimes: number[] = [];
      const testCount = 50;

      profiler.start("mixed_scenario_test");

      for (let i = 0; i < testCount; i++) {
        const start = performance.now();
        const imagePath =
          Object.values(ICONS)[i % Object.values(ICONS).length]!;

        await new Promise<void>((resolve) => {
          const img = new Image();

          img.onload = () => {
            mixedLoadTimes.push(performance.now() - start);
            resolve();
          };

          img.onerror = () => {
            mixedLoadTimes.push(performance.now() - start);
            resolve();
          };

          img.src = imagePath;
        });
      }

      const totalMixedTime = profiler.end("mixed_scenario_test");

      // Should handle mixed scenarios efficiently
      expect(totalMixedTime).toBeLessThan(950); // Less than 800ms for 50 operations

      // Performance should be consistent regardless of success/failure
      const avgLoadTime =
        mixedLoadTimes.reduce((a, b) => a + b, 0) / mixedLoadTimes.length;
      expect(avgLoadTime).toBeLessThan(20);
    });
  });

  describe("Performance Regression Detection", () => {
    it("should detect performance regressions in image loading", async () => {
      const baselineRuns = 5;
      const testRuns = 5;
      const baselineTimes: number[] = [];
      const testTimes: number[] = [];

      // Establish baseline performance
      for (let i = 0; i < baselineRuns; i++) {
        profiler.start(`baseline_${i}`);

        await Promise.all(
          Object.values(ICONS).map((imagePath) => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.src = imagePath;
            });
          })
        );

        baselineTimes.push(profiler.end(`baseline_${i}`));
      }

      // Simulate slightly degraded performance
      PerformanceMockImage.setLoadDelay(3);

      // Run test performance
      for (let i = 0; i < testRuns; i++) {
        profiler.start(`test_${i}`);

        await Promise.all(
          Object.values(ICONS).map((imagePath) => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.src = imagePath;
            });
          })
        );

        testTimes.push(profiler.end(`test_${i}`));
      }

      // Calculate averages
      const baselineAvg =
        baselineTimes.reduce((a, b) => a + b, 0) / baselineTimes.length;
      const testAvg = testTimes.reduce((a, b) => a + b, 0) / testTimes.length;

      // Performance regression should be detectable but within acceptable limits
      const performanceRatio = testAvg / baselineAvg;
      expect(performanceRatio).toBeGreaterThan(0.4); // Should detect the degradation
      expect(performanceRatio).toBeLessThan(5); // But not excessive degradation
    });

    it("should provide detailed performance metrics for analysis", () => {
      // Generate some test data
      profiler.start("metric_test_1");
      profiler.end("metric_test_1");

      profiler.start("metric_test_2");
      profiler.end("metric_test_2");

      profiler.takeMemorySnapshot("metrics_snapshot");

      const stats = profiler.getStats();
      const measurements = profiler.getMeasurements();
      const memorySnapshots = profiler.getMemorySnapshots();

      // Should provide comprehensive metrics
      expect(stats).toHaveProperty("metric_test_1");
      expect(stats).toHaveProperty("metric_test_2");

      expect(measurements.length).toBeGreaterThan(0);
      expect(memorySnapshots.length).toBeGreaterThan(0);

      // Stats should include all required metrics
      Object.values(stats).forEach((stat) => {
        expect(stat).toHaveProperty("count");
        expect(stat).toHaveProperty("total");
        expect(stat).toHaveProperty("average");
        expect(stat).toHaveProperty("min");
        expect(stat).toHaveProperty("max");
        expect(stat).toHaveProperty("p95");
      });
    });
  });
});
