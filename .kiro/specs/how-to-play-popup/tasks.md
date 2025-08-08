# Implementation Plan

- [x] 1. Create TypeScript interfaces and types

  - Define HowToPlayPopupProps, HowToPlaySettings, and related interfaces
  - Create types for game instructions content structure and credits data
  - _Requirements: 1.1, 4.1, 5.1_

- [x] 2. Implement settings management hook

  - Create use-how-to-play-settings.ts hook for localStorage operations
  - Implement preference persistence with graceful fallback for localStorage failures
  - Add methods for managing "Don't show again" and first-visit detection
  - _Requirements: 2.1, 2.2, 2.3, 3.3_

- [x] 3. Create HowToPlayContent component

  - Build component to render structured game instructions (objective, controls, mechanics)
  - Include comprehensive game object descriptions and movement rules
  - Add credits section with proper formatting and external links
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 4. Implement main HowToPlayPopup component

  - Create modal overlay component following AudioSettings pattern
  - Implement "Don't show again" checkbox with state management
  - Add close button and escape key handling
  - Integrate with settings hook for preference management
  - _Requirements: 1.1, 1.4, 2.1, 2.2, 6.1, 6.2, 6.5_

- [x] 5. Create CSS styling for popup components

  - Style modal overlay and panel following game's dark theme
  - Implement responsive design for desktop, tablet, and mobile
  - Add proper typography and spacing for readability
  - Ensure accessibility compliance with color contrast and focus indicators
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 6. Integrate popup with main App component

  - Add first-visit detection logic to App.tsx
  - Implement automatic popup display for new users
  - Add state management for popup open/close behavior
  - Ensure popup blocks game interaction when displayed
  - _Requirements: 1.1, 1.2, 1.4, 2.3_

- [x] 7. Add "How to Play" option to AudioSettings menu

  - Modify AudioSettings component to include "How to Play" button
  - Implement click handler to open popup from settings
  - Ensure proper state management between settings and popup
  - _Requirements: 3.1, 3.2, 3.4_

- [ ] 8. Implement keyboard navigation and accessibility




  - Add proper ARIA labels and roles for screen readers
  - Implement focus trapping within modal when open
  - Add keyboard shortcuts (escape to close)
  - Ensure tab order follows logical flow
  - _Requirements: 6.4, 6.5_

- [ ] 9. Create unit tests for settings hook
  - Test localStorage operations with mocked storage
  - Test preference management methods (setDontShowAgain, markAsViewed)
  - Test first-visit detection logic and shouldShowOnStartup method
  - Test error handling for localStorage failures
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 10. Create unit tests for popup components
  - Test HowToPlayContent component rendering with all instruction sections
  - Test HowToPlayPopup component open/close behavior and checkbox functionality
  - Test integration with settings hook and preference updates
  - Test keyboard event handling and accessibility features
  - _Requirements: 1.1, 1.2, 1.3, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 11. Create integration tests for popup workflow
  - Test complete first-visit user journey from app load to popup dismissal
  - Test settings menu integration and popup reopening functionality
  - Test preference persistence across page refreshes
  - Test interaction blocking while popup is displayed
  - _Requirements: 1.1, 1.4, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4_

- [ ] 12. Add E2E tests for user workflows
  - Test new user experience with automatic popup display
  - Test returning user experience with popup suppression
  - Test settings access workflow for reopening instructions
  - Test responsive behavior on different screen sizes
  - _Requirements: 1.1, 1.2, 2.3, 3.1, 3.2, 6.4_