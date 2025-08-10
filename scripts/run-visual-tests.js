#!/usr/bin/env node

/**
 * Script to run visual regression tests with better output formatting
 * and error handling. Supports running specific test collections.
 */

import { execSync } from 'child_process';
import path from 'path';

// Define test collection shortcuts
const TEST_COLLECTIONS = {
    'core': 'Core Interface',
    'responsive': 'Responsive Design',
    'cross-browser': 'Cross-Browser Consistency',
    'image-loading': 'Image Loading Scenarios',
    'game-state': 'Game State Changes',
    'accessibility': 'Accessibility and Edge Cases'
};

// Parse command line arguments
const args = process.argv.slice(2);
const updateSnapshots = args.includes('--update-snapshots') || args.includes('-u');
const browser = args.find(arg => arg.startsWith('--browser='))?.split('=')[1] || 'chromium';
const collection = args.find(arg => arg.startsWith('--collection='))?.split('=')[1];
let grep = args.find(arg => arg.startsWith('--grep='))?.split('=')[1];

// Convert collection shortcut to grep pattern
if (collection && TEST_COLLECTIONS[collection]) {
    grep = TEST_COLLECTIONS[collection];
}

// Show help if requested
if (args.includes('--help') || args.includes('-h')) {
    console.log('🎯 Visual Regression Test Runner');
    console.log('');
    console.log('Usage: node scripts/run-visual-tests.js [options]');
    console.log('');
    console.log('Options:');
    console.log('  --update-snapshots, -u    Update baseline screenshots');
    console.log('  --browser=<name>          Browser to use (chromium, firefox, webkit)');
    console.log('  --grep=<pattern>          Filter tests by pattern');
    console.log('  --collection=<name>       Run specific test collection');
    console.log('  --help, -h                Show this help');
    console.log('');
    console.log('Available collections:');
    Object.entries(TEST_COLLECTIONS).forEach(([key, value]) => {
        console.log(`  ${key.padEnd(15)} ${value}`);
    });
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/run-visual-tests.js --collection=responsive');
    console.log('  node scripts/run-visual-tests.js --grep="Core Interface" --update-snapshots');
    console.log('  node scripts/run-visual-tests.js --browser=firefox --collection=cross-browser');
    process.exit(0);
}

console.log('🎯 Running Visual Regression Tests');
console.log(`📱 Browser: ${browser}`);
if (collection) console.log(`📂 Collection: ${collection} (${TEST_COLLECTIONS[collection]})`);
if (grep) console.log(`🔍 Filter: ${grep}`);
if (updateSnapshots) console.log('📸 Mode: Update snapshots');
console.log('');

try {
    let command = `npx playwright test src/playwrighttests/visual-regression.spec.ts --project=${browser}`;

    if (grep) {
        command += ` --grep="${grep}"`;
    }

    if (updateSnapshots) {
        command += ' --update-snapshots';
    }

    // Add reporter for better output
    command += ' --reporter=list';

    console.log(`Running: ${command}\n`);

    execSync(command, {
        stdio: 'inherit',
        cwd: process.cwd()
    });

    console.log('\n✅ Visual regression tests completed successfully!');

    if (!updateSnapshots) {
        console.log('\n💡 If tests failed due to expected UI changes, run with --update-snapshots to update baselines');
    }

} catch (error) {
    console.error('\n❌ Visual regression tests failed');
    console.error('Check the output above for details');

    if (!updateSnapshots) {
        console.log('\n💡 If failures are due to expected UI changes, run with --update-snapshots');
    }

    console.log('\n💡 To view detailed results:');
    console.log('   npx playwright show-report');

    process.exit(1);
}