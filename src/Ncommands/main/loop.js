const Discord = require("discord.js");
const name = require('../../utlis');
const make = new name

module.exports = {
    name: 'loop',
    aliases: ['repeat'],
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



        if (queue.repeatMode == 0){
            client.distube.setRepeatMode(message, 1);
            message.channel.send({content:`<@${message.member.id}>`,
                  embeds: [
                    new Discord.EmbedBuilder()
                      .setDescription(`✅ **| Loop enabled**`)
                      .setColor('Green')
                  ]
                });
        }
        else{
            client.distube.setRepeatMode(message, 0);
            message.channel.send({content:`<@${message.member.id}>`,
                embeds: [
                  new Discord.EmbedBuilder()
                    .setDescription(`❌ **| Loop disabled**`)
                    .setColor('Red')
                ]
              });
        }
        make.edit_embed(queue, client)
    }
};