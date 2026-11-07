const fs = require('fs');
const path = require('path');

const appDir = __dirname;
const sourceDir = fs.existsSync(path.resolve(appDir, 'dist/public/index.html'))
  ? path.resolve(appDir, 'dist/public')
  : path.resolve(appDir, 'dist');

if (!fs.existsSync(sourceDir)) {
  console.error('[copy-dist] Source not found at', sourceDir);
  process.exit(0);
}

// Ensure dist has index.html
const distDir = path.resolve(appDir, 'dist');
if (sourceDir !== distDir) {
  fs.mkdirSync(distDir, { recursive: true });
  fs.cpSync(sourceDir, distDir, { recursive: true, force: true });
}

// Ensure public has index.html
const publicDir = path.resolve(appDir, 'public');
fs.mkdirSync(publicDir, { recursive: true });
fs.cpSync(sourceDir, publicDir, { recursive: true, force: true });

console.log('[copy-dist] Output synced to both dist/ and public/');

