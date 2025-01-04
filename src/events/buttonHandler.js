const { readdirSync } = require("fs");
const { Collection } = require("discord.js");

module.exports = (client) => {
    client.buttons = new Collection();
    
    const buttonFolders = readdirSync('./src/buttons');
    
    for (const folder of buttonFolders) {
        const buttonFiles = readdirSync(`./src/buttons/${folder}`).filter(file => file.endsWith('.js'));
        
        for (const file of buttonFiles) {
            const button = require(`../buttons/${folder}/${file}`);
            client.buttons.set(button.customId, button);
        }
    }

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isButton()) return;
        
        const button = client.buttons.get(interaction.customId);
        if (!button) return;
        
        try {
            await button.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this button!',
                ephemeral: true
            }).catch(err => {});
        }
    });
};
