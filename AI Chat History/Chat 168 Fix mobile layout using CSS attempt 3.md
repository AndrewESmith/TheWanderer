When mobile phone is...

Mobile layout in por...

New Session





The mobile layout is still wrong. 

Kiro
Including Steering Documents

typescript-standards.md
I'll help you fix the mobile layout. Let me first examine the current CSS and App.tsx files to understand the issue.

Read file(s)

maze.css

App.tsx
Now let me check the chat history to understand what specific mobile layout issues you're experiencing:

Read file(s)

Chat 167 Fix mobile layout attempt 2.md
Let

before you go further in portrait mode the maze right edge is offscreen and the black border doesn't completely surround the maze. In landscape mode the the maze doesn't fully draw. The hud and movement buttons do not scale to the screen orientation

Kiro
I see the issues clearly now. The mobile layout has several problems:

Portrait mode: Maze right edge is offscreen, black border incomplete
Landscape mode: Maze doesn't fully draw
HUD and controls: Don't scale properly with screen orientation
Let me fix these issues with a comprehensive mobile layout solution:


4 edits to file

maze.css


Now let me also update the mobile controls to be more responsive and properly sized:

Accepted edits to

maze.css


Now let me also update the HUD responsive styles to ensure it scales properly:


2 edits to file

maze.css


Now let me also update the App.tsx to remove the inline scaling logic since we're handling it all in CSS now:

Accepted edits to

App.tsx


Let me also remove the unused mobile scale state and related code:


2 edits to file

App.tsx


Now let me add one more important CSS rule to ensure the maze container properly handles overflow:

Accepted edits to

maze.css


Perfect! Now I've implemented a comprehensive mobile layout fix that addresses all the issues you mentioned:

Key Fixes Applied:
1. Portrait Mode Issues Fixed
Right edge offscreen: Now uses proper viewport calculations calc((100vw - 20px) / var(--maze-pixel-width)) to ensure maze fits within screen width
Incomplete black border: Transform origin set to center top and proper scaling ensures the entire maze with borders is visible
Responsive scaling: Different scale factors for different screen sizes (0.8 for tablets, 0.6 for phones, 0.5 for very small screens)
2. Landscape Mode Issues Fixed
Maze not fully drawing: Now scales based on both width AND height constraints using min() function
Proper centering: Uses center center transform origin for landscape
Height-aware scaling: Takes into account available height minus HUD and controls space
3. HUD and Controls Scaling
Responsive HUD: Width adjusts to calc(100vw - 20px) on mobile, font sizes scale down appropriately
Mobile controls: Properly sized and centered, with touch-friendly button sizes
Orientation-aware: Different sizing for portrait vs landscape modes
4. Technical Improvements
CSS-only scaling: Removed JavaScript scaling logic, everything handled in CSS for better performance
Viewport units: Uses 100dvh (dynamic viewport height) for better mobile browser support
Overflow handling: Prevents horizontal scrolling while allowing scaled content to be visible
Touch optimization: Added proper touch-action and tap-highlight styles
5. Screen Size Breakpoints
768px and below: General mobile optimizations
480px and below: More aggressive scaling for small phones
360px and below: Ultra-compact layout for foldable phones
Landscape specific: Special handling for landscape orientation
The maze should now:

✅ Fit completely within the screen in both orientations
✅ Show complete black borders on all sides
✅ Have properly scaled HUD and controls
✅ Center perfectly without shifting to the right
✅ Handle all screen sizes from large tablets to small foldable phones
Test this on your mobile device and let me know if you see any remaining issues!


11 changes accepted
(
View all
)
Revert


maze.css

App.tsx






Claude Sonnet 4.0
Autopilot
