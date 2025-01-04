const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const name = require('../utlis');
const make = new name
module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("🎵 | Set loop mode for music!")
    .addStringOption(option => 
      option.setName("mode")
        .setDescription("Choose loop mode")
        .setRequired(true)
        .addChoices(
          { name: "Off", value: "0" },
          { name: "Song", value: "1" },
          { name: "Queue", value: "2" }
        )
    ),
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

    const mode = parseInt(interaction.options.getString("mode"));
    const modes = ["Off", "Song", "Queue"];
    client.distube.setRepeatMode(interaction, mode);

    interaction.followUp({
      embeds: [
        new Discord.EmbedBuilder()
          .setDescription(`✅ | Loop mode set to: **${modes[mode]}**`)
          .setColor('Green')
      ]
    });


    make.edit_embed(queue, client)
  }
};