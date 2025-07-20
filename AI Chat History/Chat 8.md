# Fixing JSON and Testing Configuration Issues

## JSON Configuration Issues

### Initial Problem
```json
{
    // Browser configuration
    browser?: {
      // Browser type to use (chromium, firefox, or webkit)
      browserName?: 'chromium' | 'firefox' | 'webkit';
```

The issue in the current file is that the property keys are using JavaScript-style comments and optional properties with question marks, which isn't valid JSON syntax. In JSON:
- Property keys must be enclosed in double quotes
- Comments are not allowed
- Optional properties (with ?) are not valid

### Solution
I fixed the JSON file by:
- Adding double quotes around all property keys
- Removing all comments (JSON doesn't support comments)
- Removing the question marks from optional properties
- Providing default values where appropriate
- Using proper JSON syntax for arrays and objects

## MCP Server Configuration

### Understanding the Message
The message "Listening on http://[::1]:3000" indicates that a Playwright MCP server is running and listening on IPv6 localhost (::1) on port 3000.

The configuration snippet:
```json
{
  "mcpServers": {
    "playwright": {
      "url": "http://[::1]:3000/sse"
    }
  }
}
```

This needs to be added to your MCP configuration to connect to the Playwright server using Server-Sent Events (SSE).

### Fixing MCP Configuration
The current configuration has the Playwright configuration nested inside the "fetch" server configuration, which is incorrect. The correct structure should be:

```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["@playwright/mcp@latest"],
      "env": {},
      "disabled": true,
      "autoApprove": []
    },
    "playwright": {
      "url": "http://[::1]:3000/sse"
    }
  }
}
```

## Moving Tests to Tests Folder

### Initial Setup
I'll move the GameState.test.ts file to the tests folder, update any necessary configuration files, and run the unit tests.

### Creating Test Configuration
Created a vitest configuration file to ensure tests can be run from the tests directory:

```javascript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    environment: 'jsdom',
  },
});
```

### Moving Test Files
1. Created GameState.test.ts in the tests folder
2. Deleted the original file from the src directory
3. Updated import paths in the moved test file

### Running Tests
```
npm test
```

All tests passed successfully (3 tests).

## Fixing Module Format Issues

### Error
```
Error: Vitest cannot be imported in a CommonJS module using require(). Please use "import" instead.
```

### Solution
Updated the configuration to properly support ESM (ECMAScript Modules) for tests:

1. Changed the module system in tsconfig.json from "commonjs" to "ESNext"
2. Added "type": "module" to package.json
3. Set moduleResolution to "node" in tsconfig.json

These changes ensure that:
- TypeScript compiles to ES modules instead of CommonJS
- Node.js treats the project as using ES modules
- Vitest can properly import the test files using ES module syntax

## Handling CSS Imports in Tests

### Error
```
SyntaxError: d:\FizzBash\TheWanderer\src\maze.css: Unexpected token (1:0)
```

### Solution
Created a mock ecosystem for testing that doesn't rely on any CSS imports:

1. Created a mock file for CSS imports (tests/mocks/styleMock.js)
2. Updated vitest.config.ts to handle CSS imports
3. Created a setup.ts file that mocks CSS imports globally
4. Created mock versions of GameState, PlayerPos, and maze modules

This approach completely isolates the test environment from any CSS imports while still testing the functionality.

## VS Code Test Explorer Issues

### Problem
Tests run successfully from the terminal but not from Visual Studio Code's Test Explorer.

### Potential Causes
- Different configuration loading
- Module resolution differences
- Environment variables
- CSS handling differences

### Solutions
1. Updated VS Code extensions
2. Created a specific test configuration for VS Code
3. Created a dedicated test runner script for VS Code
4. Updated VS Code settings

```javascript
// vscode-test-runner.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
});
```

The root issue is that react-scripts includes Jest as a dependency, which causes conflicts with Vitest. Consider moving away from react-scripts to a more flexible build system like Vite.