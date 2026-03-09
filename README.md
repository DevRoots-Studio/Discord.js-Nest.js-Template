# Discord Bot + NestJS Backend (Monorepo)

Monorepo with a **Discord bot** and **NestJS API** sharing a **Prisma** database and connected via an **HTTP bridge**. Full TypeScript, single-command build, and Docker support.

## Structure

- **`apps/discord-bot`** – Discord.js bot (CommandKit, Prisma, bridge server for API → bot, optional API client for bot → API)
- **`apps/api`** – NestJS backend (Prisma, health, Discord bridge client, events endpoint)
- **`packages/database`** – Shared Prisma schema and client (PostgreSQL)

## Setup

1. **Install and generate Prisma client**

   ```bash
   npm install
   npm run build:db
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set:
   - `DATABASE_URL` – PostgreSQL connection string
   - `BOT_TOKEN` – Discord bot token
   - `BRIDGE_SECRET` – Shared secret for API ↔ bot bridge (optional but recommended)
   - `PORT` – API port (default 3000)
   - `BOT_BRIDGE_URL` – In Docker: `http://discord-bot:3100`; locally: `http://localhost:3100`
   - `API_URL` – In Docker: `http://api:3000`; locally: `http://localhost:3000`

3. **Database**

   ```bash
   npm run db:migrate:dev
   ```

## Build and run

All build output goes to a single **`dist/`** folder at the repo root:

- **`dist/api/`** – NestJS API
- **`dist/bot/`** – Discord bot

- **Build everything:** `npm run build`
- **Run API:** `npm run start:api` (after `npm run build`)
- **Run bot:** `npm run start:bot` (after `npm run build`)
- **Dev (both):** `npm run dev`
- **Dev (single app):** `npm run dev:api` or `npm run dev:bot`

## Bot–backend connection

- **API → Discord:** `POST /api/discord/send-message` with `{ channelId, content }` – API calls the bot’s bridge; the bot sends the message.
- **Bot → API:** Bot can call `POST /api/events/discord` (e.g. via `reportDiscordEvent()` in `apps/discord-bot/src/api-client`).

## Docker

```bash
cp .env.example .env
# Set BOT_TOKEN and optionally BRIDGE_SECRET in .env
docker compose up --build
```

- **postgres** – PostgreSQL 16 on port 5432
- **api** – NestJS on port 3000 (runs migrations on start)
- **discord-bot** – Bot + bridge on internal port 3100

## Scripts (root)

| Script           | Description                    |
| ---------------- | ------------------------------ |
| `build`          | Build db, api, bot (in order)  |
| `build:db`       | Prisma generate                |
| `build:api`      | NestJS build                   |
| `build:bot`      | TypeScript build for bot       |
| `start:api`      | Run built API                  |
| `start:bot`      | Run built bot                  |
| `dev`            | Run API and bot in watch mode  |
| `db:migrate`     | Run Prisma migrations (deploy) |
| `db:migrate:dev` | Create/apply migrations (dev)  |

## License

ISC.
