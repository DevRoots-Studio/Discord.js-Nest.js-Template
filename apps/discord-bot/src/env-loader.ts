/**
 * Load .env before any other app code. Must be imported first in main.ts
 * so process.env is populated before App, bridge, etc. are loaded.
 */
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const candidates = [
  path.resolve(__dirname, "../../.env"), // repo root when run from dist/bot
  path.resolve(__dirname, "../../../.env"), // repo root when run from apps/discord-bot/src
  path.resolve(process.cwd(), ".env"),
];
for (const envPath of candidates) {
  const result = dotenv.config({ path: envPath });
  if (result.parsed && Object.keys(result.parsed).length > 0) break;
}
