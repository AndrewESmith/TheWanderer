#!/usr/bin/env node

/**
 * Generate Linux snapshots for Playwright visual regression tests
 * This script should be run in a Linux environment (like GitHub Actions)
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🐧 Generating Linux snapshots for visual regression tests...\n');

// Check if we're running on Linux
const isLinux = process.platform === 'linux';
if (!isLinux) {
    console.warn('⚠️  This script is designed to run on Linux. Current platform:', process.platform);
    console.warn('   The generated snapshots may not match CI environment.');
}

// Projects to generate snapshots for
const projects = ['chromium', 'firefox', 'webkit'];

// Test suites to generate
const testSuites = [
    'Visual Regression Tests - Core Interface',
    'Visual Regression Tests - Responsive Design',
    'Visual Regression Tests - Cross-Browser Consistency',
    'Visual Regression Tests - Image Loading Scenarios',
    'Visual Regression Tests - Game State Changes'
];

console.log('📋 Configuration:');
console.log(`   Platform: ${process.platform}`);
console.log(`   Projects: ${projects.join(', ')}`);
console.log(`   Test suites: ${testSuites.length} suites`);
console.log('');

let totalGenerated = 0;
let totalFailed = 0;

for (const project of projects) {
    console.log(`🔄 Generating snapshots for ${project}...`);

    try {
        // Generate snapshots for this project
        const command = `npx playwright test src/playwrighttests/visual-regression.spec.ts --project="${project}" --update-snapshots --timeout=120000 --workers=1`;

        console.log(`   Running: ${command}`);

        execSync(command, {
            stdio: 'pipe',
            timeout: 600000 // 10 minutes timeout
        });

        console.log(`   ✅ ${project} snapshots generated successfully`);
        totalGenerated++;

    } catch (error) {
        console.error(`   ❌ Failed to generate ${project} snapshots:`, error.message);
        totalFailed++;

        // Continue with other projects instead of failing completely
        continue;
    }
}

console.log('\n📊 Summary:');
console.log(`   ✅ Successfully generated: ${totalGenerated}/${projects.length} projects`);
console.log(`   ❌ Failed: ${totalFailed}/${projects.length} projects`);

if (totalGenerated > 0) {
    console.log('\n📁 Snapshot files generated in:');
    console.log('   src/playwrighttests/visual-regression.spec.ts-snapshots/');

    // List some of the generated files
    const snapshotDir = path.join(__dirname, '..', 'src', 'playwrighttests', 'visual-regression.spec.ts-snapshots');
    if (fs.existsSync(snapshotDir)) {
        const files = fs.readdirSync(snapshotDir)
            .filter(file => file.includes('-linux.png'))
            .slice(0, 5); // Show first 5 Linux snapshots

        if (files.length > 0) {
            console.log('\n📸 Sample Linux snapshots generated:');
            files.forEach(file => console.log(`   - ${file}`));
            if (fs.readdirSync(snapshotDir).filter(f => f.includes('-linux.png')).length > 5) {
                console.log('   ... and more');
            }
        }
    }
}

console.log('\n💡 Next steps:');
console.log('1. Commit the generated Linux snapshots to your repository');
console.log('2. Push the changes to trigger CI tests');
console.log('3. The tests should now pass on GitHub Actions');

if (totalFailed > 0) {
    console.log('\n⚠️  Some projects failed. Check the errors above and retry if needed.');
    process.exit(1);
} else {
    console.log('\n🎉 All snapshots generated successfully!');
}