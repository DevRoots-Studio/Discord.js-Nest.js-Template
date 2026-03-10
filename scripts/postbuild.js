/**
 * Post-build: copy package.json and README into dist/api and dist/bot
 * so each app folder is self-describing (dependencies + how to start).
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const distApi = path.join(root, 'dist', 'api');
const distBot = path.join(root, 'dist', 'bot');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyAndPatchPackageJson(srcPath, destDir, startScript) {
  const pkg = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
  const out = {
    name: pkg.name,
    version: pkg.version || '1.0.0',
    private: true,
    main: 'main.js',
    scripts: { start: startScript },
    dependencies: pkg.dependencies || {},
    ...(pkg.type && { type: pkg.type }),
  };
  ensureDir(destDir);
  fs.writeFileSync(
    path.join(destDir, 'package.json'),
    JSON.stringify(out, null, 2),
    'utf8'
  );
}

// API: copy apps/api/package.json → dist/api/package.json (production start: node main.js)
copyAndPatchPackageJson(
  path.join(root, 'apps', 'api', 'package.json'),
  distApi,
  'node main.js'
);

// Bot: copy apps/discord-bot/package.json → dist/bot/package.json (production start: node main.js)
copyAndPatchPackageJson(
  path.join(root, 'apps', 'discord-bot', 'package.json'),
  distBot,
  'node main.js'
);

// READMEs
const readmeApi = `# API (NestJS)

- **Dependencies:** see \`package.json\`.
- **Start from repo root:** \`node dist/api/main.js\`
- **Start from this folder** (after \`npm install\` from monorepo root): \`npm start\`
`;

const readmeBot = `# Discord Bot

- **Dependencies:** see \`package.json\`.
- **Start from repo root:** \`node dist/bot/main.js\` (or \`npm run start:bot\`)
- **Start from this folder** (after \`npm install\` from monorepo root): \`npm start\`
`;

fs.writeFileSync(path.join(distApi, 'README.md'), readmeApi, 'utf8');
fs.writeFileSync(path.join(distBot, 'README.md'), readmeBot, 'utf8');

console.log('Post-build: copied package.json + README to dist/api and dist/bot');
