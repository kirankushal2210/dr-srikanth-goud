const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const appDir = path.resolve(repoRoot, 'artifacts/srikanth-goud');

// The directory where Vite placed built files
const sourceDir = fs.existsSync(path.resolve(appDir, 'dist/public/index.html'))
  ? path.resolve(appDir, 'dist/public')
  : path.resolve(appDir, 'dist');

if (!fs.existsSync(sourceDir)) {
  console.error('[prepare-vercel-output] Error: Source build directory not found at', sourceDir);
  process.exit(1);
}

// Destinations that Vercel might look for depending on whether root or subfolder is deployed,
// and whether framework is Vite (dist) or Other/Static (public)
const destinations = [
  path.resolve(repoRoot, 'public'),
  path.resolve(repoRoot, 'dist'),
  path.resolve(appDir, 'dist'),
  path.resolve(appDir, 'dist/public'),
];

console.log(`[prepare-vercel-output] Copying built assets from ${sourceDir}...`);

for (const dest of destinations) {
  if (dest === sourceDir) continue;
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(sourceDir, dest, { recursive: true, force: true });
  console.log(`[prepare-vercel-output] -> Synced to: ${dest}`);
}

// Also ensure index.html exists in artifacts/srikanth-goud/public
const srikanthGoudPublic = path.resolve(appDir, 'public');
if (fs.existsSync(srikanthGoudPublic)) {
  fs.cpSync(sourceDir, srikanthGoudPublic, { recursive: true, force: true });
  console.log(`[prepare-vercel-output] -> Synced to: ${srikanthGoudPublic}`);
}

console.log('[prepare-vercel-output] Vercel output directories prepared successfully.');
