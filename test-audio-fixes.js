// Simple test script to verify audio fixes
console.log('Testing audio system fixes...');

// Test 1: Check if sound files are accessible
const soundPaths = [
    '/sounds/player/walk.mp3',
    '/sounds/player/dig.mp3',
    '/sounds/boulder/Whoosh.mp3',
    '/sounds/arrow/twang.mp3',
    '/sounds/arrow/thud.mp3',
    '/sounds/environment/door-slam.mp3',
    '/sounds/diamond/collect.mp3'
];

async function testSoundPaths() {
    console.log('\n=== Testing Sound File Accessibility ===');

    for (const path of soundPaths) {
        try {
            const response = await fetch(`http://localhost:3000${path}`);
            if (response.ok) {
                console.log(`✅ ${path} - OK (${response.status})`);
            } else {
                console.log(`❌ ${path} - ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(`❌ ${path} - Network Error: ${error.message}`);
        }
    }
}

// Test 2: Check AudioContext creation
function testAudioContext() {
    console.log('\n=== Testing AudioContext Creation ===');

    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
            console.log('❌ Web Audio API not supported');
            return null;
        }

        const audioContext = new AudioContextClass();
        console.log(`✅ AudioContext created - State: ${audioContext.state}`);

        if (audioContext.state === 'suspended') {
            console.log('⚠️ AudioContext is suspended - user gesture required');
        }

        return audioContext;
    } catch (error) {
        console.log(`❌ AudioContext creation failed: ${error.message}`);
        return null;
    }
}

// Test 3: Test audio context resume
async function testAudioContextResume(audioContext) {
    if (!audioContext || audioContext.state !== 'suspended') {
        console.log('⏭️ AudioContext resume test skipped (not suspended)');
        return;
    }

    console.log('\n=== Testing AudioContext Resume ===');

    try {
        await audioContext.resume();
        console.log(`✅ AudioContext resumed - State: ${audioContext.state}`);
    } catch (error) {
        console.log(`❌ AudioContext resume failed: ${error.message}`);
    }
}

// Run tests
if (typeof window !== 'undefined') {
    // Browser environment
    document.addEventListener('DOMContentLoaded', async () => {
        await testSoundPaths();
        const audioContext = testAudioContext();

        // Add click handler for resume test
        if (audioContext && audioContext.state === 'suspended') {
            console.log('\n👆 Click anywhere to test AudioContext resume...');
            document.addEventListener('click', async () => {
                await testAudioContextResume(audioContext);
            }, { once: true });
        }
    });
} else {
    // Node.js environment
    testSoundPaths().then(() => {
        console.log('\n✅ Sound path tests completed');
    });
}