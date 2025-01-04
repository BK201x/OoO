    
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const config = require("../config.json")



class name {



    line(num) {
        const totalSteps = 30;
        const progressChar = "🎶";
        const baseChar = "─";
        
        if (num < 0 || num > totalSteps) {
            return null;
        }
        
        const prefix = "🔴 | ";
        const bar = Array(totalSteps).fill(baseChar);
        
        if (num < totalSteps) {
            bar[num] = progressChar;
        }
        
        return prefix + bar.join("");
    }
    
    // Example usage:
    // for (let i = 0; i < 31; i++) {
    //     console.log(line(i));
    // }

    /**
 * Converts time strings in various formats (HH:MM:SS, HH:MM, MM:SS) to seconds
 * @param {string} timeString - Time string in format "HH:MM:SS", "HH:MM", or "MM:SS"
 * @returns {number|null} Total seconds or null if invalid input
 */
convertTimeToSeconds(timeString) {
    // Return null for invalid inputs
    if (!timeString || typeof timeString !== 'string') {
        return null;
    }

    // Remove leading/trailing whitespace
    timeString = timeString.trim();

    // Match different time formats
    const patterns = {
        // HH:MM:SS format (e.g., "23:50:20")
        hhmmss: /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,
        // MM:SS format (e.g., "05:01" or "5:01")
        mmss: /^([0-5]?[0-9]):([0-5][0-9])$/
    };

    let matches;

    // Try HH:MM:SS format first
    if ((matches = patterns.hhmmss.exec(timeString)) !== null) {
        const [, hours, minutes, seconds] = matches;
        return (parseInt(hours, 10) * 3600) +
               (parseInt(minutes, 10) * 60) +
               parseInt(seconds, 10);
    }

    // Try MM:SS format
    if ((matches = patterns.mmss.exec(timeString)) !== null) {
        const [, minutes, seconds] = matches;
        const mins = parseInt(minutes, 10);
        
        // If minutes > 59, treat as HH:MM
        if (mins > 59) {
            return (mins * 3600) + (parseInt(seconds, 10) * 60);
        }
        // Otherwise treat as MM:SS
        return (mins * 60) + parseInt(seconds, 10);
    }

    // Return null if no valid format is matched
    return null;
}













formatTime(seconds, format) {
    if (typeof seconds !== 'number' || seconds < 0 || !format) {
        throw new Error('Invalid input');
    }

    // Parse format to determine output style
    const parts = format.split(':');
    const formatLength = parts.length;
    
    if (formatLength < 2 || formatLength > 4) {
        throw new Error('Invalid format');
    }

    // Convert seconds to time units
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    // Format with leading zeros
    const pad = num => String(Math.floor(num)).padStart(2, '0');

    // Build output based on format length
    const timeUnits = [d, h, m, s].slice(-formatLength);
    return timeUnits.map(pad).join(':');
}










    embed(queue, song) {
        try{
        const first = (song.duration / 30)
        const line = this.line(Math.floor(queue.currentTime/first))

        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Starting Playing...`, iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif' })
        .setImage(`${song.thumbnail || "https://cdn.discordapp.com/attachments/997487955860009038/1009062859889705062/Baslksz-1.png"}`)
        .setColor("Green")
        .setDescription(`**[${song.name}](${song.url})**`)
        .addFields({name: `Uploader:`, value: `**[${song.uploader.name}](${song.uploader.url})**`, inline: true})
        .addFields({name: `Requester:`, value: `<@${song.metadata.userId}>`, inline: true})
        .addFields({name: "Current Volume:", value: `${queue.volume}%`, inline: true})

        if (queue.filters.names.length==0){
            embed.addFields({name: '\u200b', value: '\u200b', inline: true})
        }else{
            const getLabel = (x) => {
                const effects = {
                    vaporwave: 'Slowed & Reverb',
                    nightcore: 'Nightcore',
                    bassboost: 'Bass boost',
                    echo: 'Echo'
                };
                return effects[x] || 'Unknown effect';
            }
            
            embed.addFields({name: `Filter: 🔹**${getLabel(queue.filters.names[0])}**🔹`, value: '\u200b', inline: false})
        }
        
        embed.addFields({name: `Current Duration: \`[${this.formatTime(Math.floor(queue.currentTime), song.formattedDuration)}/${song.formattedDuration}]\``, value: `\`\`\`${line}\`\`\``, inline: false})
    
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('main_menu')
                .setPlaceholder('Choose an filter')
                .addOptions([
                    {
                        label: 'Reset',
                        description: '♻️ Clear all filters',
                        value: 'reset',
                    },
                    {
                        label: 'Slowed & Reverb',
                        description: '🔹Make Music Slow and Reverbed',
                        value: 'vaporwave',
                    },
                    {
                        label: 'Nightcore',
                        description: '🔹Make Music Speed',
                        value: 'nightcore',
                    },
                    {
                        label: 'Bass boost',
                        description: '🔹Make Bass boosted',
                        value: 'bassboost',
                    },
                    {
                        label: 'Echo',
                        description: '🔹Make Music with small Echo',
                        value: 'echo',
                    },
                ]);
    
            const menu = new ActionRowBuilder().addComponents(selectMenu);



        let pause
        if (queue.paused) {
    
        pause = new ButtonBuilder()
            .setStyle(ButtonStyle.Danger) // Green button
            .setEmoji('⏯️')
            .setCustomId('pause');
        }
        else{
            pause = new ButtonBuilder()
            .setStyle(ButtonStyle.Success) // Green button
            .setEmoji('⏯️')
            .setCustomId('pause');
        }
    
        const stop = new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary) // Gray button
            .setEmoji('✖')
            .setCustomId('stop');
    
        const volsalb = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary) // Blurple button
            .setEmoji('🔉')
            .setCustomId('volsalb');
    
        const volplus = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary) // Blurple button
            .setEmoji('🔊')
            .setCustomId('volplus');

        let loop
        if (queue.repeatMode == 0){
         loop = new ButtonBuilder()
            .setStyle(ButtonStyle.Danger) // Red button
            .setEmoji('🔄')
            .setCustomId('loop');
        }else{
             loop = new ButtonBuilder()
            .setStyle(ButtonStyle.Success) // Red button
            .setEmoji('🔄')
            .setCustomId('loop');
        }
        const skip = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary) // Blurple button
            .setEmoji('➡')
            .setCustomId('skip');
    
        const pre = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary) // Blurple button
            .setEmoji('⬅️')
            .setCustomId('pre');
    
    
        const empty = new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary) // Gray button
        // .setEmoji('🪄')
        .setLabel("\u200b")
        .setDisabled()
        .setCustomId('empty');


        const volume_control = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary) // Gray button
        .setEmoji('📢')
        .setCustomId('volume_control');

        const seek = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary) // Gray button
        .setEmoji('🕐')
        .setCustomId('seek');
    
        const row = new ActionRowBuilder()
            .addComponents(pre, volsalb, stop, volplus, skip);
    
        const row2 = new ActionRowBuilder()
            .addComponents(pause, loop, empty, volume_control, seek); 
    
        return {embed , row, row2, menu}
    }catch{return}
    }





    async edit_embed(queue, client) {
        try{
        const db = new QuickDB({ filePath: `DataBase.sqlite` });
    
    
        const Chat_Channel = client.channels.cache.get(config.Chat_Channel);
        
        
        const { embed: musicEmbed, row, row2, menu } = this.embed(queue, queue.songs[0]);
    
        
    
        const MESSAGE_ID = await db.get("msg")
        try{
        const message = await Chat_Channel.messages.fetch(MESSAGE_ID).catch((e)=>{})
        await message.edit({embeds:[musicEmbed], components: [menu, row, row2]})
        }catch{}
    }catch{}
    }
    
}



module.exports = name

