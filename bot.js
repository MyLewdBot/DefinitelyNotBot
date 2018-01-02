const Discord = require('discord.js');
const client = new Discord.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.on('ready', () => {
    console.log('I am ready!');
});

// Set the prefix
const prefix = "!";
client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "nick")) {
    var args = message.content.split(" ");
      
    /*  
  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO nicks (userId, charName) VALUES (?, ?)", [message.author.id, args[1] ]);
        
      message.channel.send("hecho");
    } 
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS nicks (userId TEXT, charName TEXT)").then(() => {
      sql.run("INSERT INTO nicks (userId, charName) VALUES (?, ?)", [message.author.id, args[1] ]);
        message.channel.send("hecho");
    });
  });
      */
    return;
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
