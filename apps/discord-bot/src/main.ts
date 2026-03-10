import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load .env from repo root (works when run from dist/bot or from apps/discord-bot/src)
[
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../../.env'),
  path.resolve(process.cwd(), '.env'),
].forEach((envPath) => dotenv.config({ path: envPath }));

import { App } from './app.js';

const app = new App({});
void app.Start();
