# The Wanderer

This game called The Wanderer is based upon an Amiga game [The Wanderer](https://openretro.org/game/736fedbc-ca4b-4a6c-9651-37efdf5adc98/edit#5c6e78f8-8b33-5aa5-8799-0deab5b2b517) ([see also](https://www.video-games-museum.com/en/game/Wanderer-The/82/3/72080)) 

## History

The game came into existance in 1991 and appears to have its origins in a MS-DOS 1988 game of the same name by a company called [mobygames.com](https://www.bing.com/images/search?view=detailV2&ccid=njwql2Qp&id=04C132F7383528DA105C45DF0D508F62A127889A&thid=OIP.njwql2Qpr9H6DoilpbylyQHaEo&mediaurl=https%3a%2f%2fcdn.mobygames.com%2ffbae36b6-aba5-11ed-bd13-02420a00019c.webp&exph=375&expw=600&q=wanderer+game+1980s&simid=607987363899065693&FORM=IRPRST&ck=9914B4738DB45F49737A7C21A52A1122&selectedIndex=0&itb=0&idpp=overlayview&ajaxhist=0&ajaxserp=0)

This Game has been created using AI, React and TypeScript. The instructions and images provided to the AI can be found under the folder _Instructions_.

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
- **Bug Fixes**: Fixed player position tracking in larger maze movement tests

### Upcoming Features

- **Interactive Boulders**: Implementation of pushable boulders by the player
- **Sound Effects**: Adding sound for game events (boulder/arrow collisions, player actions)
- **Arrow Mechanics**: Adding directional arrows with complex movement patterns
- **Enhanced Maze Generation**: Ensuring all diamonds are reachable in AI-generated mazes
- **Multiple Maze Levels**: Creating additional maze layouts with increasing difficulty
- **Level Password System**: Assigning unique passwords to each maze level for direct access
- **Cell Item Architecture**: Implementation of a cell-based component system where various items populate cells

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

```bash
# Run unit tests with Vitest
npm test

# Run tests in watch mode
npm run test:watch

# Run tests without warnings
npm run test:no-warnings

# Run end-to-end tests with Playwright
npm run test:e2e

# Run Playwright tests with UI
npm run test:e2e:ui

# Debug Playwright tests
npm run test:e2e:debug
```

The project includes comprehensive test coverage for:

- **Functional Game Logic**: Pure function testing for game state transitions
- **Player Movement Mechanics**: Immutable state updates and collision detection
- **Game State Management**: Functional patterns with proper TypeScript interfaces
- **UI Adaptation**: Responsive design testing for the larger maze dimensions
- **End-to-End Testing**: Playwright integration with MCP server automation
- **Player Position Tracking**: Coordinate system validation in the expanded maze

## Environment Variables

Environment variables should be prefixed with `VITE_` to be accessible in the client-side code. You can define them in the following files:

- `.env` - Loaded in all environments
- `.env.development` - Loaded in development mode
- `.env.production` - Loaded in production builds

**Note**: This project was migrated from Create React App, so any legacy `REACT_APP_*` variables need to be updated to use the `VITE_*` prefix. See [MigrateToVite.md](./MigrateToVite.md) for migration details.

## VS Code Integration

This project includes VS Code configurations for:

- Debugging the application in Chrome
- Debugging tests with Vitest
- Running tests from the Test Explorer

## Technologies

- **React 19.1.0** - Latest React with modern hooks and functional components
- **TypeScript 5.8.3** - Following modern TypeScript standards with interfaces over types
- **Vite 6.3.5** - Fast build tool with optimized chunking strategy and ES modules
- **Vitest 3.2.4** - Modern testing framework with native TypeScript support
- **Playwright** - End-to-end testing with MCP server integration
- **Kiro with Agent Hooks** - AI-powered development automation
- **Functional Architecture** - Pure functions and immutable state management
- **CSS Modules** - Component-scoped styling with mobile-first responsive design

## Game Features

- ✅ **16x10 maze grid** with 32px cell size (enlarged from previous 8x5)
- **Functional State Management** with immutable updates and pure functions
- **Responsive HUD** that adapts to the maze dimensions using mobile-first CSS
- **Multiple game elements** with type-safe interfaces:
  - Player character with position tracking
  - Diamonds to collect (affects exit availability)
  - Boulders to navigate around
  - Bombs to avoid (fatal on contact)
  - Exit to complete levels (requires all diamonds)
  - Soil that disappears when traversed
- **Cell-based architecture** where game elements populate individual cells
- **Move counter** with game-over mechanics when moves are exhausted
- **Test mazes** for specific gameplay scenarios and edge cases
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