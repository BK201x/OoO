const { QuickDB } = require("quick.db");
const config = require("../../../config.json")
const Discord = require("discord.js");

module.exports = {
    name: 'stop',
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
    
        queue.stop();
        const Chat_Channel = client.channels.cache.get(config.Chat_Channel);
        const db = new QuickDB({ filePath: `DataBase.sqlite` });
        
        const MESSAGE_ID = await db.get("msg")
        try{
        const message = await Chat_Channel.messages.fetch(MESSAGE_ID).catch((e)=>{})
        message.delete().catch((e)=>{})
        }catch{}
    
        return message.channel.send({content:`<@${message.member.id}>`,
          embeds: [
            new Discord.EmbedBuilder()
              .setDescription('✅ | Successfully stopped the music and cleared the queue.')
              .setColor('Green')
          ]
        });

    }
};