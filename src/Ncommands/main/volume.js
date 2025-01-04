const Discord = require("discord.js");
const name = require('../../utlis');
const make = new name


module.exports = {
    name: 'vol',
    aliases: ['volume'],
    async execute(client, message, args) {
        if (!args.length) {
            return message.reply('Please provide a song to play!');
        }
        message.delete()


        const volume = parseInt(args.join(' '))
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


        if (isNaN(volume)) {
            return message.channel.send({content:`<@${message.member.id}>`,
                embeds: [
                new Discord.EmbedBuilder()
                    .setDescription('❌ | Please provide a valid number.')
                    .setColor('Red')
                ]
            });
            }



        if (volume < 1) {
            return message.channel.send({content:`<@${message.member.id}>`,
                embeds: [
                new Discord.EmbedBuilder()
                    .setDescription('❌ | Volume cannot be less than 1.')
                    .setColor('Red')
                ]
            });
            }

            if (volume > 150) {
            return message.channel.send({content:`<@${message.member.id}>`,
                embeds: [
                new Discord.EmbedBuilder()
                    .setDescription('❌ | Volume cannot be greater than 150.')
                    .setColor('Red')
                ]
            });
            }






            client.distube.setVolume(message, volume);
            message.channel.send({content:`<@${message.member.id}>`,
                  embeds: [
                    new Discord.EmbedBuilder()
                      .setDescription(`✅ | Volume set to **${volume}**`)
                      .setColor('Green')
                  ]
                });





                make.edit_embed(queue, client)

    }
};