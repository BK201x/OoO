
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")


const config = require("../../config.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("🎵| Play Music!")
    .addStringOption(option => option.setName("name").setDescription("Song Name?").setRequired(true)),
    run: async (client, interaction, track) => {

      


      await interaction.deferReply({ephemeral: true}).catch(err => {})

      const string = interaction.options.getString("name")

      const voiceChannel = client.channels.cache.get(config.VC);


      let userId = interaction.user.id;
      await client.distube.play(voiceChannel, string, {
        member: interaction.member,
        textChannel: interaction.channel,
        metadata: {
          userId: userId
        }
      });





const queue = client.distube.getQueue(interaction);
const song = queue.songs[queue.songs.length - 1];

await interaction.deleteReply()


if (song.playlist) {
  await interaction.channel.send({
    content: `<@${userId}>`,
    embeds: [
      new Discord.EmbedBuilder()
        .setDescription(`✅ | Loaded \`${song.playlist.songs.length}\` tracks from **${song.playlist.name}**.`)
        .setColor('Green')
    ]
  });
} else {
  await interaction.channel.send({
    content:`<@${userId}>`, 
    embeds: [
      new Discord.EmbedBuilder()
        .setDescription(`✅ | **${song.name}** added to the queue.`)
        .setColor('Green')
    ]
  });
}








}
}

