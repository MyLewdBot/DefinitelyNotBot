const Discord = require('discord.js');
const client = new Discord.Client();

// Set the prefix
const prefix = "!";

client.on('ready', () => {
    console.log('I am ready!');
});

client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "nick")) {
    var args = message.content.substring(PREFIX.length).split(" ");
    message.channel.send(args[1]);
  }
    
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
