# Discord Bot – Docker image

- **Dependencies:** See `package.json` and `apps/discord-bot/package.json` in this image.
- **Start:** `node dist/bot/main.js`
- **Required env:** `DATABASE_URL`, `BOT_TOKEN`, `BRIDGE_PORT` (default 3100), `BRIDGE_SECRET`, `API_URL`.
