const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const name = require('../utlis');
const make = new name


module.exports = {
    data: new SlashCommandBuilder()
        .setName("seek")
        .setDescription("🎵 | Seek Music!")
        .addStringOption(option => option.setName("number").setDescription("How far do you want to go?").setRequired(true)),
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

        let number = interaction.options.getString("number");

        try {
            if (number.includes(":")) {
                number = make.convertTimeToSeconds(number);
                if (isNaN(number)) {
                    return interaction.followUp({
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
                    return interaction.followUp({
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
                    return interaction.followUp({
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

            return interaction.followUp({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription('✅ | Successfully seeked to the specified position.')
                        .setColor('Green')
                ]
            });
        } catch (error) {
            return interaction.followUp({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription('❌ | An error occurred while seeking.')
                        .setColor('Red')
                ]
            });
        }
    }
};

