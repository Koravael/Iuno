import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('testadmin')
    .setDescription('Test if you are an admin or the bot owner'),

  async execute(interaction) {
    const OWNER_ID = "1004818227211292743"; // your Discord ID

    const isAdmin = interaction.member?.permissions?.has('Administrator');
    const isOwner = interaction.user.id === OWNER_ID;

    if (!isAdmin && !isOwner) {
      return interaction.reply({
        content: "🚫 You are NOT allowed to run this command!",
        ephemeral: true
      });
    }

    return interaction.reply({
      content: `✅ You are allowed! ${isOwner ? "(Owner)" : "(Admin)"}`,
      ephemeral: true
    });
  }
};
