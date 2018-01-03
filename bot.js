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
    
    if (message.content.startsWith(prefix + "pj")) {
        var args = message.content.split(" ");
      
        sql.query("CREATE TABLE IF NOT EXISTS nicks(userId varchar(40) primary key, pj varchar(40) NOT NULL)");
        //sql.query("INSERT INTO nicks(userId, pj) values(?, ?)", [message.author.id, args[1]]);
        sql.query('INSERT INTO users(username, password) VALUES($1, $2)', [message.author.id, args[1]], (err, res) => {
          done();
          if(err) {
            return console.error('error running query', err);
          }
            console.log(res);
        });
        
        message.channel.send("done!");  
        
        return;
    }
});


client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
    
    if (message.content.startsWith(prefix + "pjAll")) {
      /*
        sql.query('SELECT * FROM nicks', (err, result) => {
            if ( err ) {
                message.channel.send(err);
            } else if ( result.rows.length > 0 ) {
                message.channel.send(result.rows.length);
                message.channel.send(result.rows);
            } 
        });
        */
        sql.query(`SELECT * FROM nicks`).then(row => {
          if (!row) return;
          message.reply(`Your current level is ${row.pj}`);
        });
        
        return;
    }
});


client.on("message", (message) => {
    if (!message.content.startsWith(prefix)) return;
    
    if (message.content.startsWith(prefix + "delAll")) {
        
        sql.query('DROP TABLE IF EXISTS nicks', (err, res) => {
            if (err) {
                message.channel.send(err);  
            }else{
                message.channel.send("borrados!");  
            }
        });
        
        
        
        return;
    }
});


/*
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
         
        message.channel.send("done!");  
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
    });

    return;
  }
});

client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "chars")) {
    var args = message.content.split(" ");
      
    sql.query(`SELECT * FROM nicks WHERE userId ="${args[1]}"`).then(row => {
        if (!row) {
          message.channel.send("no tiene personajes!");  
        } else {
          message.channel.send("Personajes: "+row.character);
        }
      });

    return;
  }
});

client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "charsAll")) {
      
    sql.query(`SELECT * FROM nicks`).then(row => {
        if (!row) {
          message.channel.send("no hay personajes!");  
        } else {
          message.reply(`asd ${row.character}`);
        }
      });

    return;
  }
});

*/

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
