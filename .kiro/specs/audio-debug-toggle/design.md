# Design Document

## Overview

This feature extends the existing audio settings system to include a toggle control for the Audio Debug Panel visibility. The design leverages the established patterns in the audio system, including the AudioSettings component, useAudioSettings hook, and localStorage persistence. The implementation will be minimal and focused, adding the debug panel visibility state to the existing AudioSettings interface and persisting it alongside other audio preferences.

## Architecture

### Integration Points

The feature integrates with existing components without requiring architectural changes:

1. **AudioSettings Component**: Add a new checkbox control for debug panel visibility
2. **useAudioSettings Hook**: Extend to include debug panel state management
3. **AudioContext**: Extend settings interface to include debug panel visibility
4. **AudioDebug Component**: Modify to conditionally render based on settings
5. **localStorage**: Extend existing audio settings storage to include debug preference

### State Management Flow

```
User toggles checkbox → AudioSettings → useAudioSettings → AudioContext → localStorage
                                                                      ↓
AudioDebug Component ← Conditional rendering ← Settings state ← AudioContext
```

## Components and Interfaces

### Extended AudioSettings Interface

```typescript
interface AudioSettings {
  isMuted: boolean;
  globalVolume: number;
  categoryVolumes: Record<string, number>;
  showDebugPanel: boolean; // New property
}
```

### Updated useAudioSettings Hook Interface

```typescript
interface UseAudioSettingsHook {
  // ... existing properties
  showDebugPanel: boolean;
  setShowDebugPanel: (show: boolean) => void;
}
```

### AudioDebug Component Props

```typescript
interface AudioDebugProps {
  isVisible?: boolean; // Optional prop for external control
}
```

## Data Models

### Extended Default Settings

```typescript
const DEFAULT_SETTINGS: AudioSettings = {
  isMuted: false,
  globalVolume: SOUND_CONFIG.globalVolume,
  categoryVolumes: Object.fromEntries(
    Object.entries(SOUND_CONFIG.categories).map(([key, category]) => [
      key,
      category.volume,
    ])
  ),
  showDebugPanel: false, // Default to hidden
};
```

### localStorage Schema Extension

The existing `wanderer-audio-settings` localStorage key will be extended to include:

```json
{
  "isMuted": false,
  "globalVolume": 0.8,
  "categoryVolumes": { ... },
  "showDebugPanel": false
}
```

## Error Handling

### Backward Compatibility

The implementation will handle cases where existing localStorage data doesn't include the new `showDebugPanel` property:

1. **Missing Property**: Default to `false` (hidden) when loading settings
2. **Invalid Data**: Gracefully handle corrupted localStorage with fallback to defaults
3. **Type Safety**: Ensure boolean coercion for the showDebugPanel value

### Production Safety

```typescript
// Ensure debug panel is never shown in production
const shouldShowDebugPanel = process.env.NODE_ENV === 'development' && showDebugPanel;
```

## Testing Strategy

### Unit Testing

1. **Settings Persistence**: Test that debug panel visibility is saved/loaded from localStorage
2. **Default State**: Verify debug panel defaults to hidden
3. **Production Mode**: Ensure debug controls are not rendered in production
4. **Reset Functionality**: Verify debug panel visibility resets with other settings

### Integration Testing

1. **Settings Modal**: Test checkbox interaction updates the debug panel visibility
2. **Component Rendering**: Verify AudioDebug component shows/hides based on settings
3. **Cross-Session Persistence**: Test that preferences persist across browser sessions

### Test Cases

```typescript
describe('Audio Debug Panel Toggle', () => {
  it('should default to hidden state');
  it('should persist visibility preference to localStorage');
  it('should restore visibility preference from localStorage');
  it('should hide debug controls in production mode');
  it('should reset debug panel visibility with other settings');
  it('should toggle debug panel visibility from settings');
});
```

## Implementation Details

### AudioSettings Component Changes

Add a new setting group for development-only controls:

```typescript
{process.env.NODE_ENV === 'development' && (
  <div className="setting-group">
    <h3>Developer Options</h3>
    <label className="debug-toggle">
      <input
        type="checkbox"
        checked={showDebugPanel}
        onChange={(e) => setShowDebugPanel(e.target.checked)}
      />
      <span className="toggle-slider"></span>
      Show Audio Debug Panel
    </label>
  </div>
)}
```

### AudioContext Extension

Add debug panel state management to the existing context:

```typescript
const setShowDebugPanel = useCallback((show: boolean) => {
  setState((prev) => ({
    ...prev,
    settings: { ...prev.settings, showDebugPanel: show },
  }));
}, []);
```

### AudioDebug Component Modification

Update the component to conditionally render based on settings:

```typescript
export function AudioDebug() {
  const { showDebugPanel } = useAudioSettings();
  
  if (process.env.NODE_ENV !== "development" || !showDebugPanel) {
    return null;
  }
  
  // ... existing component logic
}
```

## Performance Considerations

### Minimal Impact

The feature adds minimal overhead:

1. **State Management**: Single boolean property in existing settings object
2. **Rendering**: Conditional rendering with early return for hidden state
3. **Storage**: Negligible localStorage size increase
4. **Bundle Size**: No additional dependencies or significant code increase

### Development-Only Code

The debug panel controls will be tree-shaken out of production builds through the `process.env.NODE_ENV` checks, ensuring no production impact.

## Security Considerations

### Production Safety

1. **Environment Checks**: Debug controls only available in development mode
2. **No Sensitive Data**: Debug panel only shows audio system status, no sensitive information
3. **Local Storage**: Settings stored locally, no external data transmission

## Browser Compatibility

### Existing Compatibility

The feature leverages existing browser APIs already used in the audio system:

1. **localStorage**: Already used for audio settings persistence
2. **React State**: Standard React state management patterns
3. **CSS**: Uses existing styling patterns from the audio settings

## Migration Strategy

### Seamless Integration

The feature is designed for seamless integration:

1. **Backward Compatible**: Existing localStorage data remains valid
2. **Default Hidden**: New installations default to hidden debug panel
3. **No Breaking Changes**: All existing functionality remains unchanged
4. **Progressive Enhancement**: Feature adds capability without affecting existing users

## UI/UX Design

### Consistent Styling

The debug panel toggle will use the same visual design as the existing mute toggle:

1. **Toggle Switch**: Same slider design and interaction pattern
2. **Color Scheme**: Consistent with existing audio settings theme
3. **Typography**: Same font family and sizing as other settings
4. **Spacing**: Consistent margins and padding with other setting groups

### User Experience

1. **Intuitive Placement**: Grouped under "Developer Options" section
2. **Clear Labeling**: "Show Audio Debug Panel" clearly describes functionality
3. **Immediate Feedback**: Debug panel appears/disappears immediately when toggled
4. **Persistent State**: User preference remembered across sessions