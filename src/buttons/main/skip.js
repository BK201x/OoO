const { QuickDB } = require("quick.db");
const config = require("../../../config.json")
module.exports = {
    customId: 'skip',
    async execute(interaction, client) {
       
        

        



        


















        const queue = client.distube.getQueue(interaction);


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


            await interaction.deferUpdate().catch(err => {});
        } catch (error) {
            await interaction.deferUpdate().catch(err => {});
        }
    





    }
};
