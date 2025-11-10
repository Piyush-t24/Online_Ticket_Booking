const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('📦 Installing dependencies for all apps...\n');

const apps = ['client', 'author', 'admin'];

apps.forEach((app) => {
  const appPath = path.join(__dirname, '..', app);
  
  if (!fs.existsSync(appPath)) {
    console.error(`❌ Directory ${app} does not exist!`);
    process.exit(1);
  }

  console.log(`📦 Installing dependencies for ${app}...`);
  
  try {
    execSync('npm install --legacy-peer-deps', {
      cwd: appPath,
      stdio: 'inherit',
      shell: true
    });
    console.log(`✅ ${app} dependencies installed successfully\n`);
  } catch (error) {
    console.error(`❌ Failed to install dependencies for ${app}`);
    process.exit(1);
  }
});

console.log('✅ All dependencies installed successfully!');

