#!/usr/bin/env node

/**
 * Script to generate all visual regression test baseline screenshots
 * Run this when setting up visual regression tests for the first time
 * or when you want to update all baselines due to intentional UI changes
 */

import { execSync } from 'child_process';

const testSuites = [
    'Visual Regression Tests - Core Interface',
    'Visual Regression Tests - Responsive Design',
    'Visual Regression Tests - Cross-Browser Consistency',
    'Visual Regression Tests - Image Loading Scenarios',
    'Visual Regression Tests - Game State Changes',
    'Visual Regression Tests - Accessibility and Edge Cases'
];

const browsers = ['chromium', 'firefox', 'webkit'];

console.log('🎯 Generating visual regression test baselines...\n');

for (const browser of browsers) {
    console.log(`📱 Generating baselines for ${browser}...`);

    for (const suite of testSuites) {
        try {
            console.log(`  ├─ ${suite}`);

            const command = `npx playwright test src/playwrighttests/visual-regression.spec.ts --project=${browser} --grep="${suite}" --update-snapshots`;

            execSync(command, {
                stdio: 'pipe',
                cwd: process.cwd()
            });

            console.log(`  ✅ ${suite} - ${browser}`);
        } catch (error) {
            console.log(`  ❌ ${suite} - ${browser}: ${error.message}`);
        }
    }

    console.log(`✅ ${browser} baselines complete\n`);
}

console.log('🎉 All visual regression baselines generated!');
console.log('\n💡 To run visual regression tests:');
console.log('   npx playwright test src/playwrighttests/visual-regression.spec.ts');
console.log('\n💡 To update specific baselines:');
console.log('   npx playwright test src/playwrighttests/visual-regression.spec.ts --update-snapshots');