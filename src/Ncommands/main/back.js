const Discord = require("discord.js");

module.exports = {
    name: 'back',
    aliases: ['pre'],
    async execute(client, message, args) {
        



const queue = client.distube.getQueue(message);

    if (!queue) {
      return message.channel.send({content:`<@${message.member.id}>`,
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('❌ | There is no song on the list yet.')
            .setColor('Red')
        ]
      });
    }
        
try {
      await client.distube.previous(message);
      return message.channel.send({content:`<@${message.member.id}>`,
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('✅ | Successfully went back to previous song.')
            .setColor('Green')
        ]
      });
    } catch (error) {
      if (error.errorCode === 'NO_PREVIOUS') {
        return message.channel.send({content:`<@${message.member.id}>`,
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