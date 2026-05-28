#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create directories
const dirs = [
  'src/services',
  'src/lib'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
  }
});

console.log('Setup complete!');
