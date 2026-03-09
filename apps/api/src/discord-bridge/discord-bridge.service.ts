import { Injectable } from '@nestjs/common';

const BRIDGE_URL = process.env.BOT_BRIDGE_URL ?? 'http://localhost:3100';
const BRIDGE_SECRET = process.env.BRIDGE_SECRET ?? '';

export interface SendMessagePayload {
  channelId: string;
  content: string;
}

export interface SendMessageResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

@Injectable()
export class DiscordBridgeService {
  private readonly baseUrl: string;
  private readonly secret: string;

  constructor() {
    this.baseUrl = BRIDGE_URL.replace(/\/$/, '');
    this.secret = BRIDGE_SECRET;
  }

  private async request<T>(
    path: string,
    options: { method: string; body?: object } = { method: 'GET' },
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.secret ? { 'x-bridge-secret': this.secret } : {}),
    };
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Bridge request failed: ${res.status} ${text}`);
    }
    return res.json() as Promise<T>;
  }

  async sendMessage(payload: SendMessagePayload): Promise<SendMessageResult> {
    return this.request<SendMessageResult>('/bridge/send-message', {
      method: 'POST',
      body: payload,
    });
  }
}
