#!/usr/bin/env node

/**
 * Simple script to update Firefox visual regression baselines
 * Handles Firefox-specific issues with timeouts and worker teardown
 */

import { execSync } from 'child_process';

console.log('🦊 Updating Firefox visual regression baselines...\n');

try {
    console.log('🔄 Running Firefox baseline update...');

    const command = `npx playwright test src/playwrighttests/visual-regression.spec.ts --project=firefox --update-snapshots --timeout=60000 --workers=1`;

    execSync(command, {
        stdio: 'inherit',
        cwd: process.cwd(),
        timeout: 300000 // 5 minutes timeout
    });

    console.log('\n✅ Firefox baselines updated successfully!');

} catch (error) {
    console.log('\n⚠️  Firefox baseline update completed with some issues.');
    console.log('This is common with Firefox due to rendering differences.');
    console.log('\n💡 Try running the tests now to see if they pass:');
    console.log('   npx playwright test src/playwrighttests/visual-regression.spec.ts --project=firefox');
}

console.log('\n🎯 Next steps:');
console.log('1. Run: npx playwright test --project=firefox');
console.log('2. If tests still fail, check the HTML report: npx playwright show-report');
console.log('3. For other browsers, run: node scripts/generate-visual-baselines.js --only webkit');