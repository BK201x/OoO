const { QuickDB } = require("quick.db");
const config = require("../../../config.json")
module.exports = {
    customId: 'stop',
    async execute(interaction, client) {
       
        

        



        const queue = client.distube.getQueue(interaction);
    

    
        queue.stop();
        const Chat_Channel = client.channels.cache.get(config.Chat_Channel);
        const db = new QuickDB({ filePath: `DataBase.sqlite` });
        
        const MESSAGE_ID = await db.get("msg")
        try{
        const message = await Chat_Channel.messages.fetch(MESSAGE_ID).catch((e)=>{})
        message.delete().catch((e)=>{})
        }catch{}
    





    }
};
