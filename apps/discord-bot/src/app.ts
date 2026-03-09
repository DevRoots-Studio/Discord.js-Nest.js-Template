import { Client, GatewayIntentBits } from "discord.js";
import { CommandKit } from "commandkit";
import path from "path";
import { fileURLToPath } from "url";
import { prisma } from "@repo/database";
import { startBridgeServer } from "./bridge/server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class App {
  private client!: InstanceType<typeof Client>;
  private token!: string;

  constructor(options: {
    client?: InstanceType<typeof Client>;
    token?: string;
  }) {
    if (options.client) this.client = options.client;
    if (options.token) this.token = options.token;
  }

  async init(): Promise<void> {
    if (!this.client) {
      this.client = new Client({
        intents: Object.values(GatewayIntentBits) as never,
      }) as InstanceType<typeof Client>;
    }
    if (!this.token) {
      this.token = process.env.BOT_TOKEN ?? "";
      if (!this.token) throw new Error("BOT_TOKEN is required");
    }
    this.client.token = this.token;

    const isProd = process.env.NODE_ENV === "production";
    const baseDir = path.join(__dirname, "..");
    const commandsPath = path.resolve(
      baseDir,
      isProd ? "Commands" : "src/Commands",
    );
    const eventsPath = path.resolve(baseDir, isProd ? "Events" : "src/Events");
    const validationsPath = path.resolve(
      baseDir,
      isProd ? "Validations" : "src/Validations",
    );

    new CommandKit({
      client: this.client as never,
      commandsPath,
      eventsPath,
      validationsPath,
    });
  }

  async Start(): Promise<void> {
    await this.initDatabase();
    await this.init();
    void this.client.login(this.token);

    this.client.once("ready", () => {
      startBridgeServer(this.client);
    });
  }

  async initDatabase(): Promise<void> {
    await prisma.$connect();
  }
}
