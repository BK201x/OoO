
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("back")
    .setDescription("🎵 | Back Music!"),
  run: async (client, interaction) => {





    await interaction.deferReply().catch(err => {});
    const queue = client.distube.getQueue(interaction);

    if (!queue) {
      return interaction.followUp({
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('❌ | There is no song on the list yet.')
            .setColor('Red')
        ]
      });
    }

    try {
      await client.distube.previous(interaction);
      return interaction.followUp({
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('✅ | Successfully went back to previous song.')
            .setColor('Green')
        ]
      });
    } catch (error) {
      if (error.errorCode === 'NO_PREVIOUS') {
        return interaction.followUp({
          embeds: [
            new Discord.EmbedBuilder()
              .setDescription('❌ | There is no previous song in the queue.')
              .setColor('Red')
          ]
        });
      }
      throw error;
    }




  }
};