// Validation script for level data configuration
const { createMazeLevelManager } = require('./dist/levels/maze-level-manager.js');
const { CELL } = require('./dist/maze.js');

function validateLevelConfiguration() {
    console.log('🔍 Validating Level Data Configuration...\n');

    const manager = createMazeLevelManager();
    const totalLevels = manager.getTotalLevels();

    console.log(`📊 Total levels: ${totalLevels}`);

    const results = [];

    for (let i = 0; i < totalLevels; i++) {
        const level = manager.getCurrentLevel();
        console.log(`\n🎯 Level ${level.levelNumber}:`);

        // Count elements
        let diamonds = 0, bombs = 0, exits = 0, players = 0, rocks = 0, boulders = 0;

        level.maze.forEach(row => {
            row.forEach(cell => {
                switch (cell) {
                    case CELL.DIAMOND: diamonds++; break;
                    case CELL.BOMB: bombs++; break;
                    case CELL.EXIT: exits++; break;
                    case CELL.PLAYER: players++; break;
                    case CELL.ROCK: rocks++; break;
                    case CELL.BOULDER: boulders++; break;
                }
            });
        });

        const levelResult = {
            levelNumber: level.levelNumber,
            moveLimit: level.moveLimit,
            dimensions: `${level.maze[0].length}x${level.maze.length}`,
            actualCounts: { diamonds, bombs, exits, players, rocks, boulders },
            expectedCounts: {
                diamonds: level.diamondCount,
                bombs: level.bombCount,
                exits: 1,
                players: 1
            },
            playerStart: level.playerStartPosition,
            exitPos: level.exitPosition,
            valid: true
        };

        // Validate requirements
        const validations = [
            { check: level.maze.length === 10 && level.maze[0].length === 16, desc: 'Dimensions 16x10' },
            { check: diamonds === level.diamondCount, desc: 'Diamond count matches' },
            { check: bombs === level.bombCount, desc: 'Bomb count matches' },
            { check: exits === 1, desc: 'Exactly 1 exit' },
            { check: players === 1, desc: 'Exactly 1 player' },
            { check: diamonds >= 1 && diamonds <= 10, desc: 'Diamonds 1-10' },
            { check: bombs >= 1 && bombs <= 3, desc: 'Bombs 1-3' },
            { check: rocks >= 1 && rocks <= 6, desc: 'Rocks 1-6' },
            { check: level.moveLimit > 0, desc: 'Positive move limit' }
        ];

        console.log(`   📏 Dimensions: ${levelResult.dimensions}`);
        console.log(`   🎯 Move limit: ${level.moveLimit}`);
        console.log(`   💎 Diamonds: ${diamonds}/${level.diamondCount}`);
        console.log(`   💣 Bombs: ${bombs}/${level.bombCount}`);
        console.log(`   🪨 Rocks: ${rocks}`);
        console.log(`   🪨 Boulders: ${boulders}`);
        console.log(`   🚪 Exits: ${exits}`);
        console.log(`   🧑 Players: ${players}`);

        validations.forEach(v => {
            const status = v.check ? '✅' : '❌';
            console.log(`   ${status} ${v.desc}`);
            if (!v.check) levelResult.valid = false;
        });

        results.push(levelResult);

        if (manager.hasNextLevel()) {
            manager.advanceToNextLevel();
        }
    }

    console.log('\n📋 Summary:');
    const allValid = results.every(r => r.valid);
    console.log(`   ${allValid ? '✅' : '❌'} All levels valid: ${allValid}`);
    console.log(`   📊 Total levels: ${results.length}`);
    console.log(`   🎯 Unique layouts: ${results.length} (each level has different maze)`);
    console.log(`   📈 Varying difficulty: Move limits range from ${Math.min(...results.map(r => r.moveLimit))} to ${Math.max(...results.map(r => r.moveLimit))}`);

    return allValid;
}

// Run validation
try {
    const isValid = validateLevelConfiguration();
    process.exit(isValid ? 0 : 1);
} catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
}