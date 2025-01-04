const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("🎵 | Skip the current song!"),
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
                client.distube.skip(interaction);
            }

            return interaction.followUp({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription('✅ | Successfully skipped the song.')
                        .setColor('Green')
                ]
            });
        } catch (error) {
            return interaction.followUp({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription('❌ | An error occurred while skipping.')
                        .setColor('Red')
                ]
            });
        }
    }
};