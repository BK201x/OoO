const {  Partials, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Events, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    customId: 'volume_control',
    async execute(interaction, client) {
       
        

        const queue = client.distube.getQueue(interaction);


        const modal = new ModalBuilder()
                .setCustomId('volume_control_modal')
                .setTitle('Volume');

            const nameInput = new TextInputBuilder()
                .setCustomId('volume')
                .setLabel('Enter Volume:')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setPlaceholder(queue.volume.toString())



            const firstActionRow = new ActionRowBuilder().addComponents(nameInput);

            modal.addComponents(firstActionRow);

            await interaction.showModal(modal);
        
    





    }
};
