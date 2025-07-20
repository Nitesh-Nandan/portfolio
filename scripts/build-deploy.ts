#!/usr/bin/env tsx
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

async function main() {
  const root = process.cwd();
  const clientDir = path.join(root, 'client');
  const clientBuildDir = path.join(root, 'dist/public');
  const serverDataDir = path.join(root, 'server/data');
  const deployDir = path.join(root, 'deploy');
  const deployDataDir = path.join(deployDir, 'data');

  // 1. Build the client
  console.log('Building client...');
  execSync('npm run build', { cwd: root, stdio: 'inherit' });

  // 2. Clean and create deploy directory
  await fs.remove(deployDir);
  await fs.ensureDir(deployDir);

  // 3. Copy client build output to deploy
  console.log('Copying client build output...');
  await fs.copy(clientBuildDir, deployDir, { overwrite: true });

  // 4. Copy server data to deploy/data
  console.log('Copying server data...');
  await fs.ensureDir(deployDataDir);
  await fs.copy(serverDataDir, deployDataDir, { overwrite: true });

  // 5. Done
  console.log('Deploy folder is ready at:', deployDir);
  console.log('You can now deploy the deploy/ folder as a static site.');
}

main().catch((err) => {
  console.error('Error during build:deploy:', err);
  process.exit(1);
}); 