#!/usr/bin/env node

/**
 * Script to generate all visual regression test baseline screenshots
 * Run this when setting up visual regression tests for the first time
 * or when you want to update all baselines due to intentional UI changes
 * 
 * Usage:
 *   node scripts/generate-visual-baselines.js                    # Update all projects
 *   node scripts/generate-visual-baselines.js --skip-chromium    # Skip chromium (if already working)
 *   node scripts/generate-visual-baselines.js --only firefox     # Update only firefox
 */

import { execSync } from 'child_process';

// All projects from playwright.config.ts
const allProjects = [
    'chromium',
    'firefox',
    'webkit',
    'Mobile Chrome',
    'Mobile Safari'
];

const testSuites = [
    'Visual Regression Tests - Core Interface',
    'Visual Regression Tests - Responsive Design',
    'Visual Regression Tests - Cross-Browser Consistency',
    'Visual Regression Tests - Image Loading Scenarios',
    'Visual Regression Tests - Game State Changes',
    'Visual Regression Tests - Accessibility and Edge Cases'
];

// Parse command line arguments
const args = process.argv.slice(2);
const skipChromium = args.includes('--skip-chromium');
const onlyProject = args.find(arg => arg.startsWith('--only'))?.split(' ')[1];

let projectsToUpdate = allProjects;

if (skipChromium) {
    projectsToUpdate = allProjects.filter(p => p !== 'chromium');
    console.log('⚠️  Skipping chromium (baselines assumed to be current)\n');
}

if (onlyProject) {
    const matchedProject = allProjects.find(p => p.toLowerCase().includes(onlyProject.toLowerCase()));
    if (matchedProject) {
        projectsToUpdate = [matchedProject];
        console.log(`🎯 Updating only ${matchedProject} baselines\n`);
    } else {
        console.error(`❌ Project "${onlyProject}" not found. Available projects: ${allProjects.join(', ')}`);
        process.exit(1);
    }
}

console.log('🎯 Generating visual regression test baselines...\n');
console.log(`📋 Projects to update: ${projectsToUpdate.join(', ')}\n`);

let totalSuccess = 0;
let totalFailed = 0;

for (const project of projectsToUpdate) {
    console.log(`📱 Generating baselines for ${project}...`);

    let projectSuccess = 0;
    let projectFailed = 0;

    for (const suite of testSuites) {
        try {
            console.log(`  ├─ ${suite}`);

            // Use project name with quotes to handle spaces in "Mobile Chrome" and "Mobile Safari"
            // Add timeout and worker settings for better stability
            const command = `npx playwright test src/playwrighttests/visual-regression.spec.ts --project="${project}" --grep="${suite}" --update-snapshots --timeout=60000 --workers=1`;

            execSync(command, {
                stdio: 'pipe',
                cwd: process.cwd(),
                timeout: 120000 // 2 minutes per suite
            });

            console.log(`  ✅ ${suite} - ${project}`);
            projectSuccess++;
            totalSuccess++;
        } catch (error) {
            const errorMsg = error.message.split('\n')[0];
            console.log(`  ❌ ${suite} - ${project}: ${errorMsg}`);

            // For Firefox, try a simpler approach
            if (project === 'firefox' && errorMsg.includes('timeout')) {
                console.log(`  🔄 Retrying ${suite} for Firefox with extended timeout...`);
                try {
                    const retryCommand = `npx playwright test src/playwrighttests/visual-regression.spec.ts --project=firefox --grep="${suite}" --update-snapshots --timeout=120000 --workers=1`;
                    execSync(retryCommand, {
                        stdio: 'pipe',
                        cwd: process.cwd(),
                        timeout: 180000 // 3 minutes for retry
                    });
                    console.log(`  ✅ ${suite} - ${project} (retry successful)`);
                    projectSuccess++;
                    totalSuccess++;
                } catch (retryError) {
                    console.log(`  ❌ ${suite} - ${project}: Retry also failed`);
                    projectFailed++;
                    totalFailed++;
                }
            } else {
                projectFailed++;
                totalFailed++;
            }
        }
    }

    const projectTotal = projectSuccess + projectFailed;
    console.log(`${projectSuccess === projectTotal ? '✅' : '⚠️'} ${project} baselines: ${projectSuccess}/${projectTotal} successful\n`);
}

console.log('🎉 Visual regression baseline generation complete!');
console.log(`📊 Results: ${totalSuccess} successful, ${totalFailed} failed\n`);

if (totalFailed > 0) {
    console.log('⚠️  Some baselines failed to generate. Common issues:');
    console.log('   • Web server not running (npm run dev)');
    console.log('   • Network timeouts');
    console.log('   • Browser-specific rendering differences');
    console.log('   • Mobile viewport issues\n');
}

console.log('💡 To run visual regression tests:');
console.log('   npx playwright test src/playwrighttests/visual-regression.spec.ts');
console.log('\n💡 To update specific baselines:');
console.log('   npx playwright test src/playwrighttests/visual-regression.spec.ts --update-snapshots --project="firefox"');
console.log('\n💡 To run this script with options:');
console.log('   node scripts/generate-visual-baselines.js --skip-chromium');
console.log('   node scripts/generate-visual-baselines.js --only firefox');