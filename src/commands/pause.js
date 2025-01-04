const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

const name = require('../utlis');
const make = new name

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("🎵 | Pause/Resume Music!"),
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
      
      if (queue.paused) {
        queue.resume();
        interaction.followUp({
          embeds: [
            new Discord.EmbedBuilder()
              .setDescription('✅ | Successfully resumed your song.')
              .setColor('Green')
          ]
        });
      } else {
        client.distube.pause(interaction);
        interaction.followUp({
          embeds: [
            new Discord.EmbedBuilder()
              .setDescription('✅ | Successfully paused your song.')
              .setColor('Green')
          ]
        });
      }







      make.edit_embed(queue, client)






    
  }
}