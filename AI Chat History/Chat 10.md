# Migrating from React Scripts to Vite

## Initial Setup

I'll help you create a spec for upgrading your project from React Scripts to Vite. Let's start by creating a new feature spec for this task.

### Creating Directory Structure

Let's create the necessary directory structure for the spec:

```
mkdir .kiro\specs\vite-migration
```

### Creating Specification Documents

Now let's create the requirements document for the Vite migration:
- Created `requirements.md`

Now, let's create the design document:
- Created `design.md`

Now, let's create the tasks document:
- Created `tasks.md`

I've created a complete spec for migrating your project from React Scripts to Vite. The spec includes:

- **Requirements Document** - Outlines the goals and acceptance criteria for the migration
- **Design Document** - Details the architectural changes and migration strategy
- **Tasks Document** - Provides a step-by-step implementation plan with specific coding tasks

The migration will help resolve the Jest/Vitest conflicts you've been experiencing while also providing a faster development experience with Vite.

## Implementation Plan

To start implementing this migration, you can open the tasks.md file and click "Start task" next to any task item. I recommend starting with task 1 (Set up Vite and remove React Scripts) and proceeding in the order listed.

The tasks are organized in a logical sequence to ensure a smooth migration:

1. First, set up the basic Vite infrastructure
2. Then configure the build system and development server
3. Update CSS processing and import paths
4. Configure VS Code integration
5. Test and verify everything works
6. Update documentation

## Task 1: Set up Vite and remove React Scripts

Let's start implementing the first task from our migration plan. First, let's look at the current package.json to understand what we need to change.

### Installing Vite and Plugins

```
npm install --save-dev vite @vitejs/plugin-react
```

### Removing React Scripts

```
npm uninstall react-scripts
```

### Updating Package.json Scripts

Updated the package.json scripts to use Vite instead of react-scripts.

## Task 2: Configure Vite

### Creating Vite Configuration

Created `vite.config.js` with React plugin.

### Creating HTML Entry Point

Created `index.html` in the root directory based on the existing one.

### Configuring Environment Variables

Created environment files:
- `.env`
- `.env.development`
- `.env.production`

### Setting Up Asset Handling

Updated the Vite configuration to handle assets properly.

## Task 3: Update Build System

### Updating Scripts

- Replaced start script with Vite dev command
- Replaced build script with Vite build command
- Updated test scripts

### Creating Vitest Configuration

Created `vitest.config.js` file that works well with Vite.

## Task 4: Configure CSS Processing

### Setting Up CSS Imports

Updated Vite configuration to support CSS modules and preprocessing.

### Updating CSS Mocking for Tests

Updated the vitest.config.js file to ensure CSS mocking works correctly.

## Task 5: Configure VS Code Integration

### Updating VS Code Settings

Updated VS Code settings to work with our new Vite setup.

### Creating Debugging Configurations

Created a launch.json file for debugging.

## Task 6: Update Documentation

### Updating README

Updated the README with information about the Vite migration.

### Documenting Migration Changes

Created a MIGRATION.md file to document the changes.

## Testing the Migration

### Running Tests

```
npm test
```

Test results:
- All tests passing
- 3 tests passed in tests/GameState.test.ts

### Starting Development Server

```
npm start
```

The development server is running successfully at http://localhost:3000/.

## TypeScript Upgrade

### Installing Latest TypeScript

```
npm install --save-dev typescript@latest
```

Upgraded to TypeScript version 5.8.3.

### Updating TypeScript Configuration

Updated tsconfig.json to take advantage of TypeScript 5.8 features:
- Added verbatimModuleSyntax option
- Updated target and module settings
- Added strict null checks

Created tsconfig.node.json file for Vite.

### Fixing TypeScript Errors

Fixed several TypeScript errors:
- Updated type imports to use the `type` keyword
- Added null checks and optional chaining
- Fixed potential undefined values
- Updated import statements

## Troubleshooting Build Issues

### Identifying Build Problems

The build was failing because of conflicts between JavaScript and TypeScript files.

### Resolving File Conflicts

- Removed duplicate JavaScript files (App.js, index.js, etc.)
- Updated vite.config.js to better handle TypeScript files
- Made sure index.html correctly pointed to the TypeScript entry point

### Successful Build

The application now builds successfully:
```
npm run build
```

Build output is in the dist directory, containing all necessary files for deployment.

### Previewing the Build

```
npm run preview
```

The preview server runs successfully at http://localhost:4173/.

## Summary

We've successfully migrated the project from React Scripts to Vite:
- Removed react-scripts dependency
- Set up Vite with proper configuration
- Updated build and development scripts
- Configured TypeScript to work with Vite
- Fixed all TypeScript errors
- Ensured tests run correctly
- Verified successful build and preview

The application now has a faster development experience with Vite and resolves the previous Jest/Vitest conflicts.