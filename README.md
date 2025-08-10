# The Wanderer

This game called The Wanderer is based upon an Amiga game [The Wanderer](https://openretro.org/game/736fedbc-ca4b-4a6c-9651-37efdf5adc98/edit#5c6e78f8-8b33-5aa5-8799-0deab5b2b517) ([see also](https://www.video-games-museum.com/en/game/Wanderer-The/82/3/72080)) 

## History

The game came into existence in 1991 and appears to have its origins in a MS-DOS 1988 game of the same name by a company called [mobygames.com](https://www.bing.com/images/search?view=detailV2&ccid=njwql2Qp&id=04C132F7383528DA105C45DF0D508F62A127889A&thid=OIP.njwql2Qpr9H6DoilpbylyQHaEo&mediaurl=https%3a%2f%2fcdn.mobygames.com%2ffbae36b6-aba5-11ed-bd13-02420a00019c.webp&exph=375&expw=600&q=wanderer+game+1980s&simid=607987363899065693&FORM=IRPRST&ck=9914B4738DB45F49737A7C21A52A1122&selectedIndex=0&itb=0&idpp=overlayview&ajaxhist=0&ajaxserp=0)

This Game has been created using AI, React and TypeScript. The instructions and images provided to the AI can be found under the folder _Instructions_.

## Major Features

### 🎵 Comprehensive Audio System
- **Full Audio Integration**: Complete sound system with HTML5 Audio and Web Audio API support
- **Audio Settings Panel**: User-configurable audio settings with mute controls and debug options
- **Sound Events**: Rich audio feedback for all game interactions including:
  - Boulder movement and collision sounds
  - Player movement feedback
  - Game state transitions (victory, game over)
  - Environmental audio cues
- **Browser Compatibility**: Graceful fallback for different browser audio capabilities
- **Audio Debug Tools**: Development tools for testing and debugging audio functionality

### 🪨 Advanced Boulder Physics
- **Continuous Boulder Falling**: Boulders fall continuously until collision (per game requirements)
- **Enhanced Collision Detection**: Sophisticated physics engine with multiple collision types
- **Boulder State Management**: Intelligent tracking of boulder movement states
- **Player Death Mechanics**: Boulder-player collision detection with game over functionality
- **Performance Optimizations**: Efficient physics calculations for multiple concurrent boulders
- **Error Handling**: Comprehensive error recovery for physics edge cases

### 🎯 Multi-Level Maze System
- **5 Unique Levels**: Each with distinct layouts and increasing difficulty
- **Level Progression**: Automatic advancement through completed levels
- **Level Validation**: Built-in validation system ensuring level integrity
- **Dynamic Difficulty**: Varying move limits and element distributions per level
- **Error Recovery**: Fallback mechanisms for level loading failures
- **Level Management**: Comprehensive level state tracking and progression logic

## Changes

This project has been migrated from Create React App (react-scripts) to Vite for improved performance and developer experience. For details about the migration and its benefits, see [MigrateToVite.md](./MigrateToVite.md).

### Recent Updates

- **Functional Architecture Migration**: Refactored game state management to use pure functional programming patterns with immutable state updates
- **Enhanced Testing Framework**: Comprehensive test suite using Vitest with functional testing patterns for game mechanics
- **TypeScript Standards Compliance**: Code now follows modern TypeScript best practices with interfaces over types and functional components
- **Development Tooling**: Implemented Agent Hooks in Kiro for improved development workflow automation
- **✅ Enlarged Maze**: The maze dimensions have been increased from 8x5 to 16x10, providing a more challenging gameplay experience
- **Enhanced Game Elements**: Additional diamonds, boulders, and bombs have been strategically placed throughout the larger maze
- **Balanced Gameplay**: Game parameters have been adjusted to maintain proper difficulty with the expanded maze size
- **Improved UI Testing**: Added automated tests to verify UI adaptation for the larger maze dimensions
- **Interactive Boulders**: Implementation of pushable boulders by the player
- **Bug Fixes**: Fixed player position tracking in larger maze movement tests
- **Sound Effects**: Adding sound for game events (boulder/arrow collisions, player actions)
- **Multiple Maze Levels**: Creating additional maze layouts with increasing difficulty

### Upcoming Features

- **Arrow Mechanics**: Adding directional arrows with complex movement patterns
- **Enhanced Maze Generation**: Ensuring all diamonds are reachable in AI-generated mazes
- **Level Password System**: Assigning unique passwords to each maze level for direct access

### Completed Features

- ✅ **Functional Architecture**: Refactored to pure functional programming patterns with immutable state management
- ✅ **Modern TypeScript**: Updated to follow TypeScript best practices with interfaces and functional components
- ✅ **Enhanced Testing**: Comprehensive Vitest test suite with functional testing patterns
- ✅ **Enlarged Maze**: Expanded maze dimensions from 8x5 to 16x10 for more complex gameplay
- ✅ **Agent Hooks**: Implemented Kiro Agent Hooks for development workflow automation
- ✅ **Vite Migration**: Migrated from Create React App to Vite for improved performance

## Development

This project uses Vite for development and building. Here are the available commands:

### Setup

```bash
# Install dependencies
npm install
```

### Running the Game

```bash
# Start development server
npm start
# or
npm run dev
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

The project includes extensive test coverage across multiple testing frameworks:

```bash
# Unit Tests (Vitest)
npm test                    # Run all unit tests
npm run test:watch         # Run tests in watch mode
npm run test:no-warnings   # Run tests without Node.js warnings

# End-to-End Tests (Playwright)
npm run test:e2e           # Run Playwright E2E tests
npm run test:e2e:ui        # Run with Playwright UI
npm run test:e2e:debug     # Debug Playwright tests

# Visual Regression Tests
npm run test:visual        # Run all visual regression tests
npm run test:visual:update # Update visual baselines after UI changes
npm run test:visual:chromium # Run visual tests on Chromium only
npm run test:visual:firefox  # Run visual tests on Firefox only
npm run test:visual:webkit   # Run visual tests on WebKit only

# Specialized Test Suites
npm run test:isolated      # Run tests in isolated environment
```

#### Test Coverage Areas
- **Audio System Tests**: 50+ tests covering audio manager, sound events, and browser compatibility
- **Boulder Physics Tests**: 67+ tests for collision detection, movement constraints, and player interactions  
- **Level Management Tests**: 12+ tests for level progression, validation, and error handling
- **Game State Tests**: Comprehensive testing of game logic and state transitions
- **Integration Tests**: End-to-end testing of complete game workflows
- **Performance Tests**: Boulder physics performance and optimization validation
- **Error Handling Tests**: Comprehensive error recovery and fallback testing
- **Visual Regression Tests**: Automated UI consistency testing across browsers and screen sizes with baseline comparison

## Environment Variables

Environment variables should be prefixed with `VITE_` to be accessible in the client-side code. You can define them in the following files:

- `.env` - Loaded in all environments (currently v9.0.0)
- `.env.development` - Loaded in development mode with debug features enabled
- `.env.production` - Loaded in production builds with debug features disabled

**Note**: This project was migrated from Create React App, so any legacy `REACT_APP_*` variables need to be updated to use the `VITE_*` prefix. See [MigrateToVite.md](./MigrateToVite.md) for migration details.

## VS Code Integration

This project includes VS Code configurations for:

- Debugging the application in Chrome
- Debugging tests with Vitest
- Running tests from the Test Explorer

## MCP (Model Context Protocol) Integration

This project includes MCP server integration for enhanced development capabilities:

- **Playwright MCP Server**: Automated browser testing and interaction capabilities
- **AWS Documentation MCP Server**: Access to AWS documentation for cloud deployment research
- **Auto-approved Actions**: Pre-configured safe actions for seamless AI-assisted development

MCP configuration is managed in `.kiro/settings/mcp.json` for workspace-specific server settings.

## Technologies

- **React 19.1.0** - Latest React with modern hooks and functional components
- **TypeScript 5.8.3** - Following modern TypeScript standards with interfaces over types
- **Vite 6.3.5** - Fast build tool with optimized chunking strategy and ES modules
- **Vitest 3.2.4** - Modern testing framework with native TypeScript support
- **Playwright 1.54.1** - End-to-end testing with MCP server integration and visual regression testing
- **MCP Servers** - Model Context Protocol integration for AI-assisted development
- **Web Audio API** - Advanced audio processing and sound management
- **HTML5 Audio** - Fallback audio system for broader browser compatibility
- **Cross-env 7.0.3** - Cross-platform environment variable management
- **Kiro with Agent Hooks** - AI-powered development automation
- **Functional Architecture** - Pure functions and immutable state management
- **CSS Modules** - Component-scoped styling with mobile-first responsive design

## Game Features

- ✅ **Multi-Level Gameplay**: 5 unique levels with progressive difficulty
- ✅ **16x10 maze grid** with 32px cell size optimized for various screen sizes
- ✅ **Advanced Boulder Physics**: Continuous falling boulders with collision detection
- ✅ **Comprehensive Audio System**: Rich sound effects for all game interactions
- ✅ **Player Death Mechanics**: Boulder collision detection with game over functionality
- ✅ **Level Progression**: Automatic advancement through completed levels
- ✅ **Audio Settings**: User-configurable sound settings with mute controls
- ✅ **Performance Optimizations**: Efficient rendering and physics calculations
- ✅ **Error Recovery**: Robust error handling throughout all game systems
- ✅ **Debug Tools**: Development tools for testing audio and physics systems
- ✅ **Browser Compatibility**: Graceful fallback for different browser capabilities
- ✅ **Visual Regression Testing**: Automated UI consistency verification across browsers and screen sizes
- **Functional State Management** with immutable updates and pure functions
- **Responsive HUD** that adapts to the maze dimensions using mobile-first CSS
- **Multiple game elements** with type-safe interfaces:
  - Player character with position tracking
  - Diamonds to collect (affects exit availability)
  - Boulders with advanced physics simulation
  - Bombs to avoid (fatal on contact)
  - Exit to complete levels (requires all diamonds)
  - Soil that disappears when traversed
- **Cell-based architecture** where game elements populate individual cells
- **Move counter** with game-over mechanics when moves are exhausted
- **Comprehensive test suite** with functional testing patterns and TypeScript interfaces

## Architecture

This project follows modern TypeScript and React best practices:

### Functional Programming Patterns
- **Pure Functions**: All game logic uses pure functions with no side effects
- **Immutable State**: Game state updates create new objects rather than mutating existing ones
- **Functional Components**: React components use hooks instead of classes
- **Type Safety**: Comprehensive TypeScript interfaces for all game entities

### Code Organization
- **Interface-First Design**: TypeScript interfaces define contracts before implementation
- **Modular Structure**: Each file contains related functionality with clear separation of concerns
- **Descriptive Naming**: Variables use auxiliary verbs (isLoading, hasError) for clarity
- **Named Exports**: Functions use named exports for better tree-shaking

### Testing Strategy
- **Vitest Integration**: Modern testing framework with native TypeScript support
- **Functional Testing**: Tests focus on pure function behavior and state transitions
- **End-to-End Coverage**: Playwright tests verify complete user workflows
- **Type-Safe Tests**: All tests use proper TypeScript interfaces

### Audio Architecture
- **Multi-Manager System**: HTML5 Audio and Web Audio API managers with automatic fallback
- **Event-Driven Audio**: Sound events generated by game logic and processed by audio system
- **Context Management**: Proper AudioContext lifecycle management with user interaction handling
- **Asset Loading**: Intelligent sound asset preloading with error recovery
- **Settings Integration**: User-configurable audio settings with persistent preferences

### Physics Architecture  
- **Boulder State Management**: Comprehensive tracking of boulder movement states and triggers
- **Collision Detection System**: Multi-layered collision detection with different interaction types
- **Performance Optimization**: Efficient algorithms for handling multiple concurrent physics objects
- **Error Recovery**: Robust error handling with fallback mechanisms for physics edge cases
- **Continuous Simulation**: Real-time physics updates with proper state synchronization

### Level Management Architecture
- **Validation System**: Built-in level validation with automatic error detection and repair
- **Progressive Difficulty**: Intelligent difficulty scaling across multiple levels
- **Error Recovery**: Comprehensive fallback mechanisms for level loading failures
- **State Persistence**: Proper level progression tracking and state management

## Game Mechanics

The game follows specific behavior rules for all elements:

### Player Movement
- Move in four directions using WASD or arrow keys
- Interact with various game elements

### Object Interactions
- **Boulders**: Move downward when triggered, can be fatal to player
- **Arrows**: Move in their pointing direction when triggered
- **Diamonds**: Must collect all to enable the exit
- **Soil**: Disappears when the player moves through it
- **Bombs**: Fatal to player if touched

For complete game behavior specifications, see [gamebehaviour.md](./Instructions/gamebehaviour.md).

## Development Tools

### Audio Debug Panel
Access audio debugging tools in development mode:
- Real-time audio system status monitoring
- Individual sound testing capabilities  
- AudioContext state visualization
- Sound asset loading status display

### Physics Debug Tools
- Boulder state visualization
- Collision detection debugging
- Performance monitoring for physics calculations
- Error logging and recovery tracking

### Level Debug Utilities
- Level validation testing
- Maze layout visualization
- Element count verification
- Level progression testing

### Visual Regression Testing
Comprehensive UI consistency testing system:
- Automated screenshot comparison across browsers
- Baseline image management and updates
- Cross-browser compatibility verification
- Responsive design validation
- Game state visual tracking
- See [docs/visual-regression-testing.md](./docs/visual-regression-testing.md) for detailed usage