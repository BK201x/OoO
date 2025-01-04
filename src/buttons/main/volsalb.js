const name = require('../../utlis');
const make = new name
module.exports = {
    customId: 'volsalb',
    async execute(interaction, client) {
       
        

        

               const queue = client.distube.getQueue(interaction);


           
                const new_volume = queue.volume-10
                if (new_volume < 1) {
                    client.distube.setVolume(interaction, 0);
                    }
                
                else{
                    client.distube.setVolume(interaction, new_volume);
                }
                    
               

           
           
           
           
                await interaction.deferUpdate().catch(err => {});
               //make.edit_embed(queue, client)





    }
};
