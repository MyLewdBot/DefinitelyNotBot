const Discord = require('discord.js');
const client = new Discord.Client();

const { Client } = require('pg');
const client2 = new Client();

await client2.connect();

client.on('ready', () => {
    console.log('I am ready!');
});

const res = await client.query('SELECT $1::text as message', ['Hello world!']);
console.log(res.rows[0].message); // Hello world!
await client.end();

// Set the prefix
const prefix = "!";
client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "nick")) {
    var args = message.content.split(" ");
      
/*
  client.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      client.run("INSERT INTO nicks (userId, charName) VALUES (?, ?)", [message.author.id, args[1] ]);
        
      message.channel.send("hecho");
    } 
  }).catch(() => {
    console.error;
    client.run("CREATE TABLE IF NOT EXISTS nicks (userId TEXT, charName TEXT)").then(() => {
      client.run("INSERT INTO nicks (userId, charName) VALUES (?, ?)", [message.author.id, args[1] ]);
        message.channel.send("hecho");
    });
  });*/
    
    return;
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
