const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('📦 Installing dependencies for all apps...\n');

const apps = ['client', 'author', 'admin'];
const rootDir = path.join(__dirname, '..');

apps.forEach((app) => {
  const appPath = path.join(rootDir, app);
  const packageJsonPath = path.join(appPath, 'package.json');
  
  if (!fs.existsSync(appPath)) {
    console.error(`❌ Directory ${app} does not exist!`);
    process.exit(1);
  }

  if (!fs.existsSync(packageJsonPath)) {
    console.error(`❌ package.json not found in ${app}!`);
    process.exit(1);
  }

  console.log(`📦 Installing dependencies for ${app}...`);
  console.log(`   Path: ${appPath}`);
  
  try {
    // Use absolute path and ensure we're in the right directory
    // First, clean any existing node_modules to avoid conflicts
    const nodeModulesPath = path.join(appPath, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
      console.log(`   🧹 Cleaning existing node_modules for ${app}...`);
      fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    }
    
    execSync('npm install --legacy-peer-deps --no-audit --no-fund --prefer-offline=false', {
      cwd: appPath,
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        npm_config_legacy_peer_deps: 'true'
      }
    });
    
    // Verify node_modules exists
    if (!fs.existsSync(nodeModulesPath)) {
      console.error(`❌ node_modules not created for ${app}!`);
      process.exit(1);
    }
    
    // Verify framer-motion is installed (for author app)
    if (app === 'author') {
      const framerMotionPath = path.join(nodeModulesPath, 'framer-motion');
      if (!fs.existsSync(framerMotionPath)) {
        console.error(`❌ framer-motion not found in ${app}/node_modules!`);
        process.exit(1);
      }
      console.log(`   ✅ Verified framer-motion is installed`);
    }
    
    console.log(`✅ ${app} dependencies installed successfully\n`);
  } catch (error) {
    console.error(`❌ Failed to install dependencies for ${app}:`, error.message);
    process.exit(1);
  }
});

console.log('✅ All dependencies installed successfully!');

