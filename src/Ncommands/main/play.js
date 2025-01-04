const config = require("../../../config.json")
const Discord = require("discord.js");



module.exports = {
    name: 'play',
    aliases: ['p', 'ح'],
    async execute(client, message, args) {
        if (!args.length) {
            return message.reply('Please provide a song to play!');
        }

        const embed = new Discord.EmbedBuilder()
            .setDescription('ϟ Searching...')
            .setColor('#2C2F33');
        const newmsg = await message.reply({ embeds: [embed] })
        await message.delete()


        let string = args.join(' ');

        if (string.includes("&list")){
          string = string.split("&list")[0]
        }
        const voiceChannel = client.channels.cache.get(config.VC);


      let userId = message.member.id;
      await client.distube.play(voiceChannel, string, {
        member: message.member,
        textChannel: message.channel,
        metadata: {
          userId: userId
        }
      });
      newmsg.delete()
      const queue = client.distube.getQueue(message);
      const song = queue.songs[queue.songs.length - 1];
        


      if (song.playlist) {
        await message.channel.send({
          content: `<@${userId}>`,
          embeds: [
            new Discord.EmbedBuilder()
              .setDescription(`✅ | Loaded \`${song.playlist.songs.length}\` tracks from **${song.playlist.name}**.`)
              .setColor('Green')
          ]
        });
      } else {
        await message.channel.send({
          content:`<@${userId}>`, 
          embeds: [
            new Discord.EmbedBuilder()
              .setDescription(`✅ | **${song.name}** added to the queue.`)
              .setColor('Green')
          ]
        });
      }
    }
};