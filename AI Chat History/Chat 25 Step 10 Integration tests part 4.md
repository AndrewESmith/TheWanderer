Execute Task: 10. In...

npm test -- src/test...

npm test -- src/test...

How do I fix the fol...

npm test -- src/test...






vitest-setup.ts 4 - 10


import '@testing-library/jest-dom/vitest';

// Ensure we're using Vitest's globals
global.expect = expect;
global.vi = vi;
global.beforeEach = beforeEach;
How do I fix the following problem in the above code?: Property 'expect' does not exist on type 'typeof globalThis'.

Kiro
Including Steering Documents

typescript-standards.md
The issue is that TypeScript doesn't recognize the global properties you're trying to assign. You need to declare these globals in the type system. Here's the fix:

Accepted edits to

vitest-setup.ts


The fix adds a declare global block that tells TypeScript about the global properties you're adding. This way TypeScript knows these properties exist on the global object and what their types are.

Alternatively, if you're using Vitest's globals configuration, you might not need to manually assign these to global at all - you can just configure Vitest to provide them automatically by setting globals: true in your vitest config.

please set globals: true in vitest config

Kiro
I'll help you set globals: true in your Vitest config. First, let me find your Vitest configuration file.

Searched workspace
Looking for Vitest configuration file
Read file(s)

vitest.config.ts
Great! I can see that globals: true is already set in your Vitest config. Since globals are enabled, you can simplify your setup file by removing the manual global assignments and type declarations. Here's the updated setup:

Read file(s)

vitest-setup.ts
Perfect! Since globals: true is already set in your Vitest config, you don't need to manually import or assign these globals. Let me clean up your setup file:

Accepted edits to

vitest-setup.ts


Now your setup file is much cleaner! Since globals: true is set in your Vitest config, all the Vitest globals (expect, 
vitest-setup.ts
, beforeEach, afterEach, etc.) are automatically available without needing to import or declare them. The setup file now only needs to:

Import the jest-dom matchers for additional assertions
Set up CSS mocking and test cleanup
The globals are handled automatically by Vitest's configuration.







Claude Sonnet 4.0
