#!/usr/bin/env node

/**
 * Script to run visual regression tests with better output formatting
 * and error handling
 */

import { execSync } from 'child_process';
import path from 'path';

// Parse command line arguments
const args = process.argv.slice(2);
const updateSnapshots = args.includes('--update-snapshots') || args.includes('-u');
const browser = args.find(arg => arg.startsWith('--browser='))?.split('=')[1] || 'chromium';
const grep = args.find(arg => arg.startsWith('--grep='))?.split('=')[1];

console.log('🎯 Running Visual Regression Tests');
console.log(`📱 Browser: ${browser}`);
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