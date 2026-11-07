const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const appDir = path.resolve(repoRoot, 'artifacts/srikanth-goud');
const sourceDir = path.resolve(appDir, 'dist');

if (!fs.existsSync(sourceDir)) {
  console.error('[prepare-vercel-output] Error: Source build directory not found at', sourceDir);
  process.exit(1);
}

const destinations = [
  path.resolve(repoRoot, 'public'),
  path.resolve(repoRoot, 'dist'),
];

console.log(`[prepare-vercel-output] Copying built assets from ${sourceDir}...`);

for (const dest of destinations) {
  if (dest === sourceDir) continue;
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(sourceDir, dest, { recursive: true, force: true });
  console.log(`[prepare-vercel-output] -> Synced to: ${dest}`);
}

console.log('[prepare-vercel-output] Vercel output directories prepared successfully.');
