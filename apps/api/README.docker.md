# API (NestJS) – Docker image

- **Dependencies:** See `package.json` and `apps/api/package.json` in this image.
- **Start:** `node dist/api/main.js` (default CMD runs migrations then this).
- **Required env:** `DATABASE_URL`, `PORT` (default 3000), `BOT_BRIDGE_URL`, `BRIDGE_SECRET`.
