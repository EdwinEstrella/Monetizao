const fs = require('fs');
const path = require('path');

console.log('🔧 Copying Prisma Query Engine for deployment...');

// Paths
const sourceDir = path.join(__dirname, '../src/generated/prisma');
const targetDir = path.join(__dirname, '../.next/server/chunks');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`✅ Created directory: ${targetDir}`);
}

// Copy the Linux ARM64 Query Engine
const sourceEngine = path.join(sourceDir, 'libquery_engine-linux-arm64-openssl-3.0.x.so.node');
const targetEngine = path.join(targetDir, 'libquery_engine-linux-arm64-openssl-3.0.x.so.node');

if (fs.existsSync(sourceEngine)) {
  fs.copyFileSync(sourceEngine, targetEngine);
  console.log(`✅ Copied Prisma Query Engine to: ${targetEngine}`);
} else {
  console.warn(`⚠️  Warning: Source engine not found at ${sourceEngine}`);

  // Try to find any query engine files
  const files = fs.readdirSync(sourceDir).filter(file => file.startsWith('libquery_engine'));
  if (files.length > 0) {
    console.log(`📋 Available query engines: ${files.join(', ')}`);
  }
}

console.log('✅ Prisma Query Engine setup complete!');