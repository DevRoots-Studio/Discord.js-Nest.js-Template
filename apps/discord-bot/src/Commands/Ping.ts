export default {
  data: {
    name: 'ping',
    description: 'Poing!',
  },
  run: async ({ interaction }: { interaction: { reply: (msg: string) => Promise<unknown> } }) => {
    await interaction.reply('Pong!');
  },
  options: {
    botPermissions: [],
    userPermissions: [],
    deleted: false,
    devOnly: false,
    guildOnly: false,
  },
};
