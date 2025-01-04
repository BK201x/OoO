const Discord = require("discord.js");
const name = require('../../utlis');
const make = new name
module.exports = {
    name: 'seek',
    async execute(client, message, args) {
        


        const queue = client.distube.getQueue(message);
        let number = args.join(' ')
    
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
            if (number.includes(":")) {
                number = make.convertTimeToSeconds(number);
                if (isNaN(number)) {
                    return message.channel.send({content:`<@${message.member.id}>`,
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription('❌ | Please provide a valid time format!')
                                .setColor('Red')
                        ]
                    });
                }
                const type = parseInt(number);
                if (queue.paused) {
                    queue.resume();
                  }
                queue.seek(type);
            } else if (!number.includes("+") && !number.includes("-")) {
                if (isNaN(number)) {
                    return message.channel.send({content:`<@${message.member.id}>`,
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription('❌ | Please provide a valid number!')
                                .setColor('Red')
                        ]
                    });
                }
                const type = parseInt(number);
                if (queue.paused) {
                    queue.resume();
                  }
                queue.seek(type);
            } else {
                if (isNaN(number)) {
                    return message.channel.send({content:`<@${message.member.id}>`,
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription('❌ | Please provide a valid number!')
                                .setColor('Red')
                        ]
                    });
                }
                const type = parseInt(number);
                if (queue.paused) {
                    queue.resume();
                  }
                queue.seek(queue.currentTime + type);
            }

            return message.channel.send({content:`<@${message.member.id}>`,
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription('✅ | Successfully seeked to the specified position.')
                        .setColor('Green')
                ]
            });
        } catch (error) {
            console.log(error)
            return message.channel.send({content:`<@${message.member.id}>`,
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription('❌ | An error occurred while seeking.')
                        .setColor('Red')
                ]
            });
        }












    }
};