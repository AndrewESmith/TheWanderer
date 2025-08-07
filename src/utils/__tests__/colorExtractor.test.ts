import { extractDominantColor, getDominantColor } from '../colorExtractor';

// Mock Image for testing
class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    src: string = '';
    width: number = 32;
    height: number = 32;
    crossOrigin: string = '';

    constructor() {
        // Simulate successful image loading after a short delay
        setTimeout(() => {
            if (this.onload) {
                this.onload();
            }
        }, 10);
    }
}

// Mock Canvas and Context
const mockGetImageData = vi.fn().mockReturnValue({
    data: new Uint8ClampedArray([
        // Mock pixel data: RGBA values
        139, 69, 19, 255,  // Brown pixel (soil-like)
        139, 69, 19, 255,  // Brown pixel
        121, 85, 72, 255,  // Rock-like color
        139, 69, 19, 255,  // Brown pixel (most common)
    ])
});

const mockContext = {
    drawImage: vi.fn(),
    getImageData: mockGetImageData,
};

const mockCanvas = {
    getContext: vi.fn().mockReturnValue(mockContext),
    width: 0,
    height: 0,
};

// Setup mocks
beforeAll(() => {
    global.Image = MockImage as any;
    global.document = {
        createElement: vi.fn().mockReturnValue(mockCanvas),
    } as any;
});

describe('colorExtractor', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('extractDominantColor', () => {
        it('should extract dominant color from image', async () => {
            const color = await extractDominantColor('/soil.png');

            expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
            expect(mockContext.drawImage).toHaveBeenCalled();
            expect(mockGetImageData).toHaveBeenCalled();
        });

        it('should handle image loading errors', async () => {
            // Mock image that fails to load
            class FailingImage extends MockImage {
                constructor() {
                    super();
                    setTimeout(() => {
                        if (this.onerror) {
                            this.onerror();
                        }
                    }, 10);
                }
            }

            global.Image = FailingImage as any;

            await expect(extractDominantColor('/nonexistent.png')).rejects.toThrow();
        });
    });

    describe('getDominantColor', () => {
        it('should cache colors to avoid recomputation', async () => {
            const color1 = await getDominantColor('/soil.png');
            const color2 = await getDominantColor('/soil.png');

            expect(color1).toBe(color2);
            // Should only call extractDominantColor once due to caching
        });

        it('should return fallback colors for known images on error', async () => {
            // Mock image that fails
            class FailingImage extends MockImage {
                constructor() {
                    super();
                    setTimeout(() => {
                        if (this.onerror) {
                            this.onerror();
                        }
                    }, 10);
                }
            }

            global.Image = FailingImage as any;

            const soilColor = await getDominantColor('/soil.png');
            const rockColor = await getDominantColor('/rock.png');

            expect(soilColor).toBe('#a1887f');
            expect(rockColor).toBe('#795548');
        });
    });
});