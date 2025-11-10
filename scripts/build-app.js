const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get app name from command line argument
const appName = process.argv[2];

if (!appName) {
  console.error('❌ App name is required!');
  console.error('Usage: node scripts/build-app.js <app-name>');
  process.exit(1);
}

const rootDir = path.join(__dirname, '..');
const appPath = path.join(rootDir, appName);
const packageJsonPath = path.join(appPath, 'package.json');
const nodeModulesPath = path.join(appPath, 'node_modules');

// Validate app directory exists
if (!fs.existsSync(appPath)) {
  console.error(`❌ Directory ${appName} does not exist!`);
  process.exit(1);
}

if (!fs.existsSync(packageJsonPath)) {
  console.error(`❌ package.json not found in ${appName}!`);
  process.exit(1);
}

// Verify node_modules exists before building
if (!fs.existsSync(nodeModulesPath)) {
  console.error(`❌ node_modules not found in ${appName}!`);
  console.error(`   Please run 'npm run install:all' first.`);
  process.exit(1);
}

// Special check for author app - verify framer-motion
if (appName === 'author') {
  const framerMotionPath = path.join(nodeModulesPath, 'framer-motion');
  if (!fs.existsSync(framerMotionPath)) {
    console.error(`❌ framer-motion not found in ${appName}/node_modules!`);
    console.error(`   Please run 'npm run install:all' first.`);
    process.exit(1);
  }
}

console.log(`\n🔨 Building ${appName}...`);
console.log(`   Path: ${appPath}`);
console.log(`   Node modules: ${nodeModulesPath}\n`);

try {
  // Change to app directory and build
  process.chdir(appPath);
  
  // Verify we're in the right directory
  const currentDir = process.cwd();
  if (currentDir !== appPath) {
    console.error(`❌ Failed to change to ${appName} directory!`);
    process.exit(1);
  }
  
  // Run build command
  execSync('npm run build', {
    cwd: appPath,
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  
  // Verify dist folder was created
  const distPath = path.join(appPath, 'dist');
  if (!fs.existsSync(distPath)) {
    console.error(`❌ Build output (dist) not found for ${appName}!`);
    process.exit(1);
  }
  
  console.log(`\n✅ ${appName} built successfully!`);
  console.log(`   Output: ${distPath}\n`);
  
} catch (error) {
  console.error(`\n❌ Failed to build ${appName}:`, error.message);
  process.exit(1);
}

