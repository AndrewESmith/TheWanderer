// Script to run tests without deprecation warnings
import { exec } from 'child_process';

// Run the test command with the NODE_NO_WARNINGS=1 environment variable
const testProcess = exec('NODE_NO_WARNINGS=1 npm test', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  
  console.log(stdout);
  
  if (stderr) {
    console.error(stderr);
  }
});

testProcess.stdout.pipe(process.stdout);
testProcess.stderr.pipe(process.stderr);