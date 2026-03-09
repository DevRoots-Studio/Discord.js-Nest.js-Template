import type { Message, Client } from 'discord.js';

export default async (message: Message, client: Client) => {
  if (message.content !== 'hi' || message.author.bot) return;
  await message.reply('hey');
};
