# Design Document

## Overview

The "How to Play" popup is a modal overlay component that provides comprehensive game instructions to new players. It follows the existing modal pattern established by the AudioSettings component, ensuring visual consistency with the game's dark theme and retro aesthetic. The popup integrates with the game's local storage system for preference persistence and provides a seamless user experience.

## Architecture

### Component Structure
```
HowToPlayPopup/
├── components/
│   ├── HowToPlayPopup.tsx          # Main popup component
│   ├── HowToPlayContent.tsx        # Content component with instructions
│   └── HowToPlayPopup.css          # Styling following game theme
├── hooks/
│   └── use-how-to-play-settings.ts # Settings management hook
└── types/
    └── how-to-play-types.ts        # TypeScript interfaces
```

### Integration Points
- **App.tsx**: Main integration point for popup display logic
- **AudioSettings.tsx**: Add "How to Play" option to settings menu
- **Local Storage**: Persist "Don't show again" preference
- **Game State**: Check first-time visit status

## Components and Interfaces

### HowToPlayPopup Component
```typescript
interface HowToPlayPopupProps {
  isOpen: boolean;
  onClose: () => void;
  triggeredFromSettings?: boolean;
}
```

**Responsibilities:**
- Render modal overlay with game instructions
- Handle "Don't show again" checkbox state
- Manage popup close behavior
- Integrate with settings hook for preference persistence

### HowToPlayContent Component
```typescript
interface HowToPlayContentProps {
  className?: string;
}
```

**Responsibilities:**
- Render structured game instructions (objective, controls, mechanics)
- Display credits section with proper formatting
- Ensure responsive layout for different screen sizes
- Maintain accessibility standards

### Settings Hook
```typescript
interface HowToPlaySettings {
  dontShowAgain: boolean;
  hasSeenInstructions: boolean;
}

interface UseHowToPlaySettingsReturn {
  settings: HowToPlaySettings;
  setDontShowAgain: (value: boolean) => void;
  markAsViewed: () => void;
  shouldShowOnStartup: () => boolean;
}
```

**Responsibilities:**
- Manage local storage persistence
- Provide settings state management
- Handle first-time visit detection
- Expose preference modification methods

## Data Models

### Local Storage Schema
```typescript
interface StoredHowToPlaySettings {
  dontShowAgain: boolean;
  hasSeenInstructions: boolean;
  lastViewedVersion?: string; // For future content updates
}
```

**Storage Key:** `wanderer-how-to-play-settings`

### Game Instructions Content
```typescript
interface GameInstruction {
  title: string;
  content: string;
  type: 'objective' | 'controls' | 'mechanics' | 'objects';
}

interface CreditsSection {
  author: string;
  authorLink: string;
  aiAssistance: string[];
  imageSources: string;
  soundSources: string;
  originalGame: {
    name: string;
    link: string;
    author: string;
    authorLink: string;
  };
  acknowledgements: string[];
}
```

## Error Handling

### Local Storage Failures
- **Graceful Degradation**: If localStorage is unavailable, default to showing popup
- **Error Logging**: Log storage errors to console for debugging
- **Fallback Behavior**: Use in-memory state as fallback

### Component Rendering Errors
- **Error Boundaries**: Wrap popup in error boundary to prevent app crashes
- **Fallback UI**: Show simple text-based instructions if component fails
- **Recovery**: Allow users to close popup even if content fails to load

### Accessibility Failures
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Screen Reader Support**: Provide proper ARIA labels and roles
- **Focus Management**: Trap focus within modal when open

## Testing Strategy

### Unit Tests
- **Settings Hook**: Test localStorage operations, preference management
- **Component Rendering**: Test popup display, content rendering, close behavior
- **Checkbox Behavior**: Test "Don't show again" functionality
- **Integration**: Test settings menu integration

### Integration Tests
- **First Visit Flow**: Test popup appears on first game load
- **Settings Integration**: Test popup opens from settings menu
- **Preference Persistence**: Test settings survive page refresh
- **Cross-Component**: Test interaction with AudioSettings component

### E2E Tests
- **New User Journey**: Complete flow from first visit to dismissal
- **Returning User**: Test popup doesn't appear for users who opted out
- **Settings Access**: Test reopening popup from settings
- **Mobile Experience**: Test responsive behavior on mobile devices

### Accessibility Tests
- **Keyboard Navigation**: Test tab order and keyboard controls
- **Screen Reader**: Test with screen reader software
- **Color Contrast**: Verify text meets accessibility standards
- **Focus Management**: Test focus trapping and restoration

## Visual Design

### Modal Styling
- **Overlay**: Semi-transparent dark background (rgba(0, 0, 0, 0.7))
- **Panel**: Dark theme matching AudioSettings (#2a2a2a background)
- **Typography**: Courier New monospace font for consistency
- **Colors**: White text (#fff) with gray accents (#ccc, #888)

### Layout Structure
```
┌─────────────────────────────────────┐
│ How to Play The Wanderer        [×] │
├─────────────────────────────────────┤
│                                     │
│ [Game Instructions Content]         │
│ • Objective                         │
│ • Controls (WASD/Arrow Keys)        │
│ • Game Objects                      │
│ • Movement Rules                    │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ [Credits Section - smaller font]    │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ ☐ Don't show again        [Close]   │
└─────────────────────────────────────┘
```

### Responsive Behavior
- **Desktop**: Fixed width (500px), centered
- **Tablet**: Max width 90vw, scrollable content
- **Mobile**: Full width with margins, optimized touch targets
- **Scrolling**: Vertical scroll for overflow content

### Animation
- **Fade In**: Smooth opacity transition on open
- **Fade Out**: Smooth opacity transition on close
- **No Motion**: Respect prefers-reduced-motion settings

## Implementation Considerations

### Performance
- **Lazy Loading**: Load popup component only when needed
- **Content Memoization**: Memoize static instruction content
- **Event Handling**: Debounce rapid open/close actions

### Browser Compatibility
- **localStorage**: Graceful fallback for unsupported browsers
- **CSS Grid/Flexbox**: Use modern layout with fallbacks
- **ES6 Features**: Ensure compatibility with target browsers

### Security
- **XSS Prevention**: Sanitize any dynamic content
- **Content Security Policy**: Ensure compliance with CSP headers
- **Safe Links**: Validate external links in credits

### Maintenance
- **Content Updates**: Design for easy instruction content updates
- **Version Tracking**: Track content version for future migrations
- **Localization Ready**: Structure for potential multi-language support