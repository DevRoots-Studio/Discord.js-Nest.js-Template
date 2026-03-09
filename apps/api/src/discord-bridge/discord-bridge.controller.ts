import { Body, Controller, Post } from '@nestjs/common';
import { DiscordBridgeService, SendMessagePayload } from './discord-bridge.service';

@Controller('api/discord')
export class DiscordBridgeController {
  constructor(private readonly discordBridge: DiscordBridgeService) {}

  @Post('send-message')
  async sendMessage(@Body() body: SendMessagePayload) {
    const { channelId, content } = body;
    if (!channelId || typeof content !== 'string') {
      return { success: false, error: 'channelId and content are required' };
    }
    return this.discordBridge.sendMessage({ channelId, content });
  }
}
