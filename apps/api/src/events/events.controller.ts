import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/events')
export class EventsController {
  @Post('discord')
  discord(@Body() body: { type: string; payload?: Record<string, unknown> }) {
    // Acknowledge bot → API events (e.g. for logging or persistence)
    return { received: true, type: body?.type };
  }
}
