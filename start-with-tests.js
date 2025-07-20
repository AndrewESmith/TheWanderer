// Script to run tests before starting the development server
import { execSync } from 'child_process';
import { spawn } from 'child_process';

console.log('Running tests before starting development server...');

try {
    // Run tests with NODE_NO_WARNINGS=1 to suppress deprecation warnings
    console.log('Test output:');
    execSync('cross-env NODE_NO_WARNINGS=1 vitest run -c vitest.config.ts', {
        stdio: 'inherit',
        env: { ...process.env, NODE_NO_WARNINGS: '1' }
    });

    console.log('\nTests completed successfully! Starting development server...\n');

    // Start the development server
    const devServer = spawn('vite', ['--mode', 'development'], {
        stdio: 'inherit',
        shell: true,
        env: { ...process.env, NODE_NO_WARNINGS: '1' }
    });

    // Handle server process events
    devServer.on('error', (error) => {
        console.error(`Failed to start development server: ${error.message}`);
        process.exit(1);
    });

    devServer.on('close', (code) => {
        console.log(`Development server exited with code ${code}`);
        process.exit(code);
    });

} catch (error) {
    console.error('\nTests failed! Fix the issues before starting the development server.');
    console.error(`Error: ${error.message}`);
    process.exit(1);
}