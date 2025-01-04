const {  Partials, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Events, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    customId: 'seek',
    async execute(interaction, client) {
       
        

        


        const modal = new ModalBuilder()
                .setCustomId('Seek_modal')
                .setTitle('Seek');

            // Add text input components
            const nameInput = new TextInputBuilder()
                .setCustomId('time')
                .setLabel('seek to:')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setPlaceholder("+50  -50  5:10  30")



            const firstActionRow = new ActionRowBuilder().addComponents(nameInput);

            modal.addComponents(firstActionRow);

            await interaction.showModal(modal);
        
    





    }
};
