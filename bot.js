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

  if (message.content.startsWith(prefix + "personaje")) {
    var args = message.content.split(" ");
   
    sql.query('SELECT * FROM nicks', (err, res) => {
      if (err) {
        sql.query("CREATE TABLE IF NOT EXISTS nicks (userId varchar(64), character varchar(64))");
          sql.query("INSERT INTO nicks (userId, character) VALUES (?, ?)", [message.author.id, args[1]]);
        message.channel.send("Agregado!");  
      } else {
        message.channel.send("Personajes");
      }
    })

    return;
  }
});

client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "deleteAll")) {
   
    sql.query('DROP TABLE IF EXISTS nicks', (err, res) => {
      if (err) {
        message.channel.send("error!");  
      } else {
        message.channel.send("Borrada!");
      }
    })

    return;
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
