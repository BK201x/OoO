const Discord = require("discord.js");

const name = require('../../utlis');
const make = new name

module.exports = {
    name: 'pause',
    aliases: ['resume'],
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




        if (queue.paused) {
                queue.resume();
                message.channel.send({content:`<@${message.member.id}>`,
                  embeds: [
                    new Discord.EmbedBuilder()
                      .setDescription('✅ | Successfully resumed your song.')
                      .setColor('Green')
                  ]
                });
              } else {
                client.distube.pause(message);
                message.channel.send({content:`<@${message.member.id}>`,
                  embeds: [
                    new Discord.EmbedBuilder()
                      .setDescription('✅ | Successfully paused your song.')
                      .setColor('Green')
                  ]
                });
              }
        
        
        
        
        
        
        
              make.edit_embed(queue, client)






    }
};