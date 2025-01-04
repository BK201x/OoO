const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const name = require('../utlis');
const make = new name



module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("🎵 | Set the music volume!")
    .addStringOption(option => option.setName("number").setDescription("1-150").setRequired(true)),
  run: async (client, interaction) => {
    await interaction.deferReply().catch(err => {});
    const queue = client.distube.getQueue(interaction);
    const volume = parseInt(interaction.options.getString("number"));

    if (!queue) {
      return interaction.followUp({
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('❌ | There is no song on the list yet.')
            .setColor('Red')
        ]
      });
    }

    if (isNaN(volume)) {
      return interaction.followUp({
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('❌ | Please provide a valid number.')
            .setColor('Red')
        ]
      });
    }

    if (volume < 1) {
      return interaction.followUp({
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('❌ | Volume cannot be less than 1.')
            .setColor('Red')
        ]
      });
    }

    if (volume > 150) {
      return interaction.followUp({
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('❌ | Volume cannot be greater than 150.')
            .setColor('Red')
        ]
      });
    }

    client.distube.setVolume(interaction, volume);
    interaction.followUp({
      embeds: [
        new Discord.EmbedBuilder()
          .setDescription(`✅ | Volume set to **${volume}**`)
          .setColor('Green')
      ]
    });





    make.edit_embed(queue, client)




  }
};