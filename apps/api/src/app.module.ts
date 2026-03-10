import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as path from "path";
import { PrismaModule } from "./prisma/prisma.module";
import { HealthModule } from "./health/health.module";
import { DiscordBridgeModule } from "./discord-bridge/discord-bridge.module";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.join(process.cwd(), ".env"),
        path.join(process.cwd(), "..", ".env"),
        path.join(process.cwd(), "..", "..", ".env"),
      ],
    }),
    PrismaModule,
    HealthModule,
    DiscordBridgeModule,
    EventsModule,
  ],
})
export class AppModule {}
