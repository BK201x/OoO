const name = require('../../utlis');
const make = new name

module.exports = {
    customId: 'pause',
    async execute(interaction, client) {
       
    const queue = client.distube.getQueue(interaction);




      
      if (queue.paused) {
        queue.resume();
      } else {
        client.distube.pause(interaction);
      }






      await interaction.deferUpdate().catch(err => {});
      make.edit_embed(queue, client)
    }
};
