const name = require('../../utlis');
const make = new name
module.exports = {
    customId: 'loop',
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction);
        

        
        if (queue.repeatMode == 0){
            client.distube.setRepeatMode(interaction, 1);
        }
        else{
            client.distube.setRepeatMode(interaction, 0);
        }



    



        await interaction.deferUpdate().catch(err => {});
        make.edit_embed(queue, client)
    }
};
