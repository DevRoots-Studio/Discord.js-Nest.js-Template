import express, { Request, Response } from "express";
import type { Client } from "discord.js";

type DiscordClient = InstanceType<typeof Client>;

const BRIDGE_PORT = parseInt(process.env.BRIDGE_PORT ?? "35733", 10);
const BRIDGE_SECRET = process.env.BRIDGE_SECRET ?? "";

export function startBridgeServer(client: DiscordClient): void {
  const app = express();
  app.use(express.json());

  const auth = (req: Request, res: Response, next: () => void) => {
    if (BRIDGE_SECRET && req.headers["x-bridge-secret"] !== BRIDGE_SECRET) {
      res.status(401).json({ success: false, error: "Unauthorized" });
      return;
    }
    next();
  };

  app.post(
    "/bridge/send-message",
    auth,
    async (req: Request, res: Response) => {
      try {
        const { channelId, content } = req.body as {
          channelId?: string;
          content?: string;
        };
        if (!channelId || typeof content !== "string") {
          res
            .status(400)
            .json({ success: false, error: "channelId and content required" });
          return;
        }
        const channel = await client.channels.fetch(channelId);
        if (!channel?.isTextBased() || !("send" in channel)) {
          res.status(400).json({
            success: false,
            error: "Channel not found or not text channel",
          });
          return;
        }
        const msg = await (channel as import("discord.js").TextChannel).send(
          content,
        );
        res.json({ success: true, messageId: msg.id });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ success: false, error: message });
      }
    },
  );

  app.listen(BRIDGE_PORT, () => {
    console.log(`Bridge server listening on port ${BRIDGE_PORT}`);
  });
}
