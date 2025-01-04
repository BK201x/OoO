const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const config = require("../../config.json")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("🎵 | Stop the current song and clear queue"),
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

    queue.stop();
    const Chat_Channel = client.channels.cache.get(config.Chat_Channel);
    const db = new QuickDB({ filePath: `DataBase.sqlite` });
    
    const MESSAGE_ID = await db.get("msg")
    try{
    const message = await Chat_Channel.messages.fetch(MESSAGE_ID).catch((e)=>{})
    message.delete().catch((e)=>{})
    }catch{}

    return interaction.followUp({
      embeds: [
        new Discord.EmbedBuilder()
          .setDescription('✅ | Successfully stopped the music and cleared the queue.')
          .setColor('Green')
      ]
    });
  }
};