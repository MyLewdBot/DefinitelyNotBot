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
   
  const query = sql.query('SELECT * FROM nicks');
  // Stream results back one row at a time
  query.on('row', (row) => {
    results.push(row);
  });
        /* 
   sql.query(`SELECT * FROM nicks WHERE userId ="${message.author.id}"`)
    .then(user => {
        console.log(user.name); // print user name;
    })
    .catch(error => {
        console.log(error); // print the error;
    });   
      
   
   sql.query(`SELECT * FROM nicks WHERE userId ="${message.author.id}"`).then(() => {
      sql.query("INSERT INTO nicks (userId, charName) VALUES (?, ?)", [message.author.id, args[1]]);
   }).catch(() => {
    console.error;
    sql.query("CREATE TABLE IF NOT EXISTS nicks (userId VARCHAR(40), charName VARCHAR(40))").then(() => {
      sql.query("INSERT INTO nicks (userId, charName) VALUES (?, ?)", [message.author.id, args[1]]);
    });
  });

    */
    return;
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
