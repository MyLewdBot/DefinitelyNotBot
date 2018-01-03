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
client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
        if (message.content.startsWith(prefix + "personaje")) {
            var args = message.content.split(" ");
      
            sql.query(`SELECT * FROM nicks WHERE userId ="${message.author.id}"`).then(row => {
            if (!row) {
              sql.query("INSERT INTO nicks (userId, character) VALUES (?, ?)", [message.author.id, args[1]]);
            } 
          }).catch(() => {
            console.error;
            sql.query("CREATE TABLE IF NOT EXISTS nicks (userId varchar(64), character varchar(64))").then(() => {
              sql.query("INSERT INTO nicks (userId, character) VALUES (?, ?)", [message.author.id, args[1]]);
            });
        });
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

client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "chars")) {
   
    sql.get(`SELECT * FROM scores WHERE userId ="${args[1]}"`).then(row => {
        if (!row) {
          message.channel.send("no tiene personajes!");  
        } else {
          message.channel.send("Personajes:"+row);
        }
      }).catch(() => {
        console.error;
            
      });

    return;
  }
});



// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
