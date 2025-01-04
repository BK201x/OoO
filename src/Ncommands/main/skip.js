;
const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const config = require("../../../config.json");


module.exports = {
    name: 'skip',
    aliases: ['s'],
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
            if (queue.songs.length === 1) {
                queue.stop();
                const Chat_Channel = client.channels.cache.get(config.Chat_Channel);
                const db = new QuickDB({ filePath: `DataBase.sqlite` });
                
                const MESSAGE_ID = await db.get("msg");
                try {
                    const message = await Chat_Channel.messages.fetch(MESSAGE_ID).catch((e) => {});
                    message.delete().catch((e) => {});
                } catch {}
            } else {
                client.distube.skip(message);
            }

            return message.channel.send({content:`<@${message.member.id}>`,
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription('✅ | Successfully skipped the song.')
                        .setColor('Green')
                ]
            });
        } catch (error) {
            return message.channel.send({content:`<@${message.member.id}>`,
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription('❌ | An error occurred while skipping.')
                        .setColor('Red')
                ]
            });
                }






    }
};