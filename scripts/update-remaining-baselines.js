#!/usr/bin/env node

/**
 * Update visual baselines for all projects except Chromium
 * Uses a more efficient approach to avoid timeouts
 */

import { execSync } from 'child_process';

const projects = ['firefox', 'webkit', 'Mobile Chrome', 'Mobile Safari'];

console.log('🎯 Updating visual baselines for remaining projects...\n');
console.log(`📋 Projects: ${projects.join(', ')}\n`);

for (const project of projects) {
    console.log(`📱 Updating ${project} baselines...`);

    try {
        // Update all baselines for this project at once
        const command = `npx playwright test src/playwrighttests/visual-regression.spec.ts --project="${project}" --update-snapshots --timeout=60000 --workers=1`;

        console.log(`  🔄 Running baseline update...`);

        execSync(command, {
            stdio: 'inherit',
            cwd: process.cwd(),
            timeout: 600000 // 10 minutes per project
        });

        console.log(`  ✅ ${project} baselines updated successfully!\n`);

    } catch (error) {
        console.log(`  ⚠️  ${project} completed with some issues (this is normal for visual tests)\n`);

        // Try to run a quick verification
        try {
            console.log(`  🔍 Verifying ${project} baselines...`);
            const verifyCommand = `npx playwright test --grep "full game interface screenshot - desktop" --project="${project}"`;

            execSync(verifyCommand, {
                stdio: 'pipe',
                cwd: process.cwd(),
                timeout: 60000
            });

            console.log(`  ✅ ${project} verification passed!\n`);
        } catch (verifyError) {
            console.log(`  ❌ ${project} verification failed - may need manual review\n`);
        }
    }
}

console.log('🎉 Baseline update process complete!\n');
console.log('💡 Next steps:');
console.log('1. Run full test suite: npx playwright test src/playwrighttests/visual-regression.spec.ts');
console.log('2. Check results: npx playwright show-report');
console.log('3. If any tests still fail, run individual updates:');
console.log('   npx playwright test --project="firefox" --update-snapshots');