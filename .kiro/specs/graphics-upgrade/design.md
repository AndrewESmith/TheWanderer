# Design Document

## Overview

The graphics upgrade transforms the maze game from emoji-based icons to PNG image assets. The current system uses the `ICONS` constant to map cell types to emoji characters, which are then displayed within CSS-styled cells. The new system will replace emoji characters with 32x32 pixel PNG images while maintaining the existing architecture and cell styling system.

The design preserves the current rendering pipeline and CSS grid layout, ensuring that the upgrade is non-breaking and maintains all existing functionality including responsive design and mobile controls.

## Architecture

### Current System
```
ICONS constant → Cell component → CSS styling → Emoji display
```

### New System
```
ICONS constant → Cell component → CSS styling → PNG image display
```

The architecture remains fundamentally the same, with only the content rendering mechanism changing from text-based emoji to image-based PNG files.

### Key Design Decisions

1. **Maintain ICONS Constant**: Keep the existing `ICONS` constant structure but change values from emoji strings to image paths
2. **CSS-Based Image Rendering**: Use CSS `background-image` property instead of inline `<img>` tags for better performance and styling control
3. **Fallback Strategy**: Implement graceful degradation to emoji if images fail to load
4. **Asset Optimization**: Leverage Vite's asset handling for optimal bundling and caching

## Components and Interfaces

### Modified Components

#### 1. ICONS Constant (src/maze.ts)
```typescript
export const ICONS = {
  empty: "/Empty.png",
  player: "/player.png", 
  rock: "/rock.png",
  soil: "/soil.png",
  diamond: "/diamond.png",
  boulder: "/boulder.png",
  bomb: "/bomb.png",
  exit: "/exit.png",
} as const;
```

#### 2. Cell Component (src/App.tsx)
The Cell component will be modified to use CSS background images instead of text content:

```typescript
const Cell: React.FC<{ type: MazeCell }> = ({ type }) => {
  return (
    <div 
      className={`cell ${type}`}
      style={{
        backgroundImage: `url(${ICONS[type]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
};
```

#### 3. CSS Enhancements (src/maze.css)
Add image-specific styling and fallback handling:

```css
.cell {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #333;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Fallback backgrounds remain for loading states */
.cell.empty { background-color: #2e7d32; }
.cell.player { background-color: #f44336; }
.cell.rock { background-color: #795548; }
.cell.soil { background-color: #a1887f; }
.cell.diamond { background-color: #fff; }
.cell.boulder { background-color: #757575; }
.cell.bomb { background-color: #000; }
.cell.exit { background-color: #ffeb3b; }
```

### Asset Management

#### Image Preloading
Implement image preloading to ensure smooth gameplay:

```typescript
const preloadImages = () => {
  Object.values(ICONS).forEach(imagePath => {
    const img = new Image();
    img.src = imagePath;
  });
};
```

#### Vite Asset Handling
Leverage Vite's public folder serving for optimal asset delivery:
- Images in `/public` folder are served directly
- No import statements needed for public assets
- Automatic optimization and caching headers

## Data Models

### Image Asset Interface
```typescript
interface ImageAsset {
  path: string;
  loaded: boolean;
  fallback?: string;
}

interface ImageAssetMap {
  [key in CellType]: ImageAsset;
}
```

### Loading State Management
```typescript
interface ImageLoadingState {
  isLoading: boolean;
  loadedCount: number;
  totalCount: number;
  errors: string[];
}
```

## Error Handling

### Image Loading Failures
1. **Individual Image Failure**: Fall back to colored background with optional emoji overlay
2. **Network Issues**: Graceful degradation to emoji-only mode
3. **Missing Assets**: Console warnings with fallback to background colors

### Implementation Strategy
```typescript
const handleImageError = (cellType: CellType) => {
  console.warn(`Failed to load image for ${cellType}, using fallback`);
  // Remove background-image, rely on background-color
};
```

### Error Recovery
- Retry mechanism for failed image loads
- Fallback to emoji mode if multiple images fail
- User notification for persistent loading issues

## Testing Strategy

### Unit Tests
1. **ICONS Constant**: Verify all paths are correctly mapped
2. **Cell Component**: Test image rendering and fallback behavior
3. **Asset Loading**: Mock image loading success/failure scenarios
4. **Error Handling**: Verify graceful degradation

### Integration Tests
1. **Full Maze Rendering**: Ensure all cell types display correctly
2. **Performance**: Verify no rendering delays or memory leaks
3. **Responsive Design**: Confirm images scale properly on different screen sizes
4. **Browser Compatibility**: Test across different browsers and devices

### Visual Regression Tests
1. **Screenshot Comparisons**: Before/after visual validation
2. **Cross-Browser Testing**: Ensure consistent appearance
3. **Mobile Testing**: Verify touch interface compatibility

### Performance Tests
1. **Loading Time**: Measure initial image load performance
2. **Memory Usage**: Monitor memory consumption with images
3. **Rendering Performance**: Ensure smooth gameplay with image assets

### Asset Validation Tests
1. **File Existence**: Verify all required PNG files are present
2. **Image Dimensions**: Confirm all images are 32x32 pixels
3. **File Format**: Validate PNG format and optimization
4. **Build Integration**: Ensure images are properly bundled in production

## Implementation Phases

### Phase 1: Core Image System
- Update ICONS constant with image paths
- Modify Cell component for image rendering
- Add basic CSS for image display

### Phase 2: Error Handling & Fallbacks
- Implement image loading error detection
- Add fallback mechanisms
- Create loading state management

### Phase 3: Performance Optimization
- Add image preloading
- Optimize CSS for better rendering performance
- Implement lazy loading if needed

### Phase 4: Testing & Validation
- Comprehensive test coverage
- Visual regression testing
- Performance benchmarking
- Cross-browser validation