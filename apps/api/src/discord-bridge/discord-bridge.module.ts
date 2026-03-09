import { Module } from '@nestjs/common';
import { DiscordBridgeController } from './discord-bridge.controller';
import { DiscordBridgeService } from './discord-bridge.service';

@Module({
  controllers: [DiscordBridgeController],
  providers: [DiscordBridgeService],
  exports: [DiscordBridgeService],
})
export class DiscordBridgeModule {}
