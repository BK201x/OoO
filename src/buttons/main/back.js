const Discord = require("discord.js");
module.exports = {
    customId: 'pre',
    async execute(interaction, client) {
       
        

        
            try {
              await client.distube.previous(interaction);

            } catch (error) {
              if (error.errorCode === 'NO_PREVIOUS') {
                return interaction.reply({
                  embeds: [
                    new Discord.EmbedBuilder()
                      .setDescription('❌ | There is no previous song in the queue.')
                      .setColor('Red')
                  ],
                  ephemeral: true
                });
              }
              throw error;
            }


            await interaction.deferUpdate().catch(err => {});





    }
};
