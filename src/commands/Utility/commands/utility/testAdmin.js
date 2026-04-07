import { SlashCommandBuilder, PermissionsBitField, MessageFlags } from 'discord.js';
import { createError } from '../../utils/errorHandler.js';

export default {
  data: new SlashCommandBuilder()
    .setName('testadmin')
    .setDescription('Test if you are an admin or the bot owner'),

  async execute(interaction, guildConfig, client) {
    // Make sure it's used in a server
    if (!interaction.guild) {
      throw createError(
        "This command can only be used in a server.",
        "CONFIGURATION",
        "You must use this command in a server."
      );
    }

    const OWNER_ID = "1004818227211292743"; // your Discord ID
    const isAdmin = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);
    const isOwner = interaction.user.id === OWNER_ID;

    if (!isAdmin && !isOwner) {
      return interaction.reply({
        content: "🚫 You are NOT allowed to run this command!",
        flags: MessageFlags.Ephemeral
      });
    }

    return interaction.reply({
      content: `✅ You are allowed! ${isOwner ? "(Owner)" : "(Admin)"}`,
      flags: MessageFlags.Ephemeral
    });
  }
};
