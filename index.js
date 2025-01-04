const { Client, Collection } = require("discord.js")
const Discord = require("discord.js")
const config = require("./config.json")
const client = new Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent
  ]
})
require('dotenv').config();

const { QuickDB } = require("quick.db");
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { Player } = require("discord-player")
const name = require('./src/utlis');
const make = new name

const player = new Player(client);
client.player = player;
client.distube = new DisTube(client, {
  emitNewSongOnly: false,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({

      api: {
        clientId: config.spotify_id,
        clientSecret: config.spotify_secret,
      }
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin({ update: false })
  ]
})

process.env.YTSR_NO_UPDATE = 'true';
process.env.YTDL_NO_UPDATE = 'true';


client.aliases = new Collection();
client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const commands = [];
readdirSync('./src/commands').forEach(async file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})


















readdirSync('./src/Ncommands').forEach(dir => {
  const commands = readdirSync(`./src/Ncommands/${dir}`).filter(file => file.endsWith('.js'));
  for (const file of commands) {
      const command = require(`./src/Ncommands/${dir}/${file}`);
      if (command.name) {
          client.commands.set(command.name, command);
          if (command.aliases && Array.isArray(command.aliases)) {
              command.aliases.forEach(alias => client.aliases.set(alias, command.name));
          }
      }
  }
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const urlPatterns = [
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/,
    /^(https?:\/\/)?(www\.)?(youtube\.com\/playlist\?list=)/, // Fixed playlist support
    /^https?:\/\/(open\.spotify\.com\/track\/)/,
    /^https?:\/\/(soundcloud\.com\/)/
];



  const isDirectUrl = urlPatterns.some(pattern => pattern.test(message.content.trim()));

  if (isDirectUrl) {
      // Treat URL as play command
      const command = client.commands.get('play');
      const args = [message.content.trim()]; // URL as the only argument
      
      try {
          await command.execute(client, message, args);
      } catch (error) {
          console.error(error);
          message.reply('There was an error playing that URL!');
      }
      return;
  }

  // Normal command handling
  const args = message.content.trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  
  if (command) {
      try {
          command.execute(client, message, args);
      } catch (error) {
          console.error(error);
          message.reply('There was an error executing that command!');
      }
  }
});


// client.on("messageCreate",(msg)=>{
//   msg.embeds.
// })



// client.distube.on("finish", queue => {
//   client.guilds.cache.filter(guild => {
// const data = db.fetch(`music_${guild.id}`)
// if (!data) return;
// const mesaj = data.mesaj
// const channels = data.kanal
// const channel = guild.channels.cache.get(channels)
// const messagef = channel.messages.fetch(mesaj).then(async messagef => {
// messagef.edit({content: "🎵 | Music ended.", embeds: [], components: []}).catch(err => {})
// })
// })
// })


client.distube
// .on("", (queue) => {
//   console.log("sad")
// })
  .on('playSong', async (queue, song) => {
    const intervalId = setInterval(async () => {
      if (queue.paused) {
        return
      }
      // const db = new QuickDB({ filePath: `DataBase.sqlite` });
      // const Chat_Channel = client.channels.cache.get(config.Chat_Channel);
      // const MESSAGE_ID = await db.get("msg")
      //   try{
      //   const message = await Chat_Channel.messages.fetch(MESSAGE_ID).catch((e)=>{})
      //   if (!message){clearInterval(intervalId);}
      //   if (!message.embeds[0]?.fields[4].value.includes(make.line(Math.floor(queue.currentTime/(song.duration / 30))))){
      //     make.edit_embed(queue, client)
      //   }
      //   }catch{}


      const db = new QuickDB({ filePath: `DataBase.sqlite` });
      const Chat_Channel = client.channels.cache.get(config.Chat_Channel);
      const MESSAGE_ID = await db.get("msg")
        try{
        const message = await Chat_Channel.messages.fetch(MESSAGE_ID).catch((e)=>{})
        if (!message){clearInterval(intervalId);}
          make.edit_embed(queue, client)
        }catch{}
    }, 1000);
    


    const db = new QuickDB({ filePath: `DataBase.sqlite` });


    // console.log(song)
    const Chat_Channel = client.channels.cache.get(config.Chat_Channel);
    

    const { embed: musicEmbed, row, row2, menu } = make.embed(queue, song);

    const msg = await Chat_Channel.send({content:`<@${song.metadata.userId}>`, embeds:[musicEmbed], components: [menu, row, row2]})
    await db.set("msg", msg.id)
  })
  
  .on('finishSong',async (queue) => {

    const Chat_Channel = client.channels.cache.get(config.Chat_Channel);
    const db = new QuickDB({ filePath: `DataBase.sqlite` });
    
    const MESSAGE_ID = await db.get("msg")
    try{
    const message = await Chat_Channel.messages.fetch(MESSAGE_ID).catch((e)=>{})
    message.delete().catch((e)=>{})

    }catch{}
  })











































client.on("ready", async () => {
  const db = new QuickDB({ filePath: `DataBase.sqlite` });
  await db.set("queue", [])
  require("./src/events/buttonHandler.js")(client);
  const voiceChannel = client.channels.cache.get(config.VC);

  client.distube.voices.join(voiceChannel)


  const Chat_Channel = client.channels.cache.get(config.Chat_Channel);
  const MESSAGE_ID = await db.get("msg")
  try{
  const message = await Chat_Channel.messages.fetch(MESSAGE_ID).catch((e)=>{})
  message.delete().catch((e)=>{})
  }catch{}



})











client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    console.log(`Bot logged in as ${client.user.tag}!`);
})
readdirSync('./src/events').forEach(async file => {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})



// client.on("interactionCreate", interaction => {
//   interaction.deferUpdate()
// })














client.on("interactionCreate",async interaction => {

    if (interaction.customId === 'main_menu') {
      const queue = client.distube.getQueue(interaction);
        const selected = interaction.values[0];
        if (queue.paused) {
          queue.resume();
        }

        queue.filters.clear();
        if (selected!=="reset"){
        queue.filters.add(selected)
      }
      await interaction.deferUpdate().catch(err => {});
    }



if (interaction.isModalSubmit()) {
  if (interaction.customId === 'Seek_modal') {

      let number = interaction.fields.getTextInputValue('time');
      const queue = client.distube.getQueue(interaction);


      try {
                  if (number.includes(":")) {
                      number = make.convertTimeToSeconds(number);
                      if (isNaN(number)) {
                          return interaction.reply({
                              embeds: [
                                  new Discord.EmbedBuilder()
                                      .setDescription('❌ | Please provide a valid time format!')
                                      .setColor('Red')
                              ],
                              ephemeral: true
                          });
                      }
                      const type = parseInt(number);
                      if (queue.paused) {
                        queue.resume();
                      }
                      queue.seek(type);
                      await interaction.deferUpdate().catch(err => {});







                  } else if (!number.includes("+") && !number.includes("-")) {
                      if (isNaN(number)) {
                          return interaction.reply({
                              embeds: [
                                  new Discord.EmbedBuilder()
                                      .setDescription('❌ | Please provide a valid number!')
                                      .setColor('Red')
                              ],
                              ephemeral: true
                          });
                      }
                      const type = parseInt(number);
                      if (queue.paused) {
                        queue.resume();
                      }
                      queue.seek(type);
                      await interaction.deferUpdate().catch(err => {});








                  } else {
                      if (isNaN(number)) {
                          return interaction.reply({
                              embeds: [
                                  new Discord.EmbedBuilder()
                                      .setDescription('❌ | Please provide a valid number!')
                                      .setColor('Red')
                              ],
                              ephemeral: true
                          });
                      }
                      const type = parseInt(number);
                      if (queue.paused) {
                        queue.resume();
                      }
                      queue.seek(queue.currentTime + type);
                      await interaction.deferUpdate().catch(err => {});
                  }
      
                  return
              } catch (error) {
                  return interaction.reply({
                      embeds: [
                          new Discord.EmbedBuilder()
                              .setDescription('❌ | An error occurred while seeking.')
                              .setColor('Red')
                      ],
                      ephemeral: true
                  });
              }



              


  }
























  if (interaction.customId === 'volume_control_modal') {
    const queue = client.distube.getQueue(interaction);
    const volume = parseInt(interaction.fields.getTextInputValue('volume'))



    if (isNaN(volume)) {
      return interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('❌ | Please provide a valid number.')
            .setColor('Red')
        ]
      });
    }




    if (volume < 1) {
      return interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('❌ | Volume cannot be less than 1.')
            .setColor('Red')
        ]
      });
    }

    if (volume > 150) {
      return interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setDescription('❌ | Volume cannot be greater than 150.')
            .setColor('Red')
        ]
      });
    }








    client.distube.setVolume(interaction, volume);
    await interaction.deferUpdate().catch(err => {});





    make.edit_embed(queue, client)
  }
}
})



client.login(process.env.TOKEN);