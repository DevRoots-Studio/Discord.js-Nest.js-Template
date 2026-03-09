const API_URL = (process.env.API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export interface DiscordEventPayload {
  type: string;
  payload: Record<string, unknown>;
}

export async function reportDiscordEvent(event: DiscordEventPayload): Promise<void> {
  try {
    await fetch(`${API_URL}/api/events/discord`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  } catch {
    // Best-effort; avoid breaking the bot
  }
}
