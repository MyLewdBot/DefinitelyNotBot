const Discord = require('discord.js');
const client = new Discord.Client();
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

client.on('ready', () => {
    console.log('I am ready!');
});


const sql = new pg.Client(connectionString);
sql.connect();

// Set the prefix
const prefix = "!";
client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "nick")) {
    var args = message.content.split(" ");
      
   sql.query('CREATE TABLE IF NOT EXISTS nicks (userId VARCHAR(40), charName VARCHAR(40))', (err, res) => {
        if (err) {
          
        }
        console.log(res);
    });  
    
    return;
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
