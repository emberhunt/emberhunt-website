// set up ======================================================================
const Express = require('express');
const Morgan = require('morgan');
const BodyParser = require('body-parser');
const MethodOverride = require('method-override');
const Cors = require('cors');
const Discord = require('discord.js');
const Secret = require("./secret.js");
const ServerComm = require("./server-communication.js");
const BotUtility = require("./bot-utility.js");
const GeneralUtility = require("./general-utility.js");

const app = Express(); 						// create our app w/ express
const webport = process.env.PORT || 8080; 				// set the port

// configuration ===============================================================

app.use(Cors());
app.use(Express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(Morgan('dev')); // log every request to the console
app.use(BodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(BodyParser.json()); // parse application/json
app.use(BodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(MethodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(webport);
console.log("App listening on port " + webport);

// Discord stuff ===============================================================
const client = new Discord.Client();

//client.on("debug", (m) => console.log("[debug]", m));
client.on("warn", (m) => console.log("[warn]", m));
client.on("error", (m) => console.log("[error]", m));

client.on('ready', () => {
	// Initialization on ready
});

client.on('message', msg => {
	var textChannel = msg.channel;
    var user = msg.author;
    var server = msg.guild;
    if (!user.bot) {
        if (!msg.content.startsWith("#!")) return;
        if (textChannel instanceof Discord.TextChannel) {
	        if (textChannel.name == "server-commands") {
	        	// Game Commands
		        var fullCommand = msg.content.toLowerCase().split(" ");
		        ServerComm.processCommand(msg, user, fullCommand);
		    } else if (textChannel.name == "bot") {
		    	// Other Bot Commands
		    	BotUtility.receiveMessage(msg, server);
		    } else {
		    	GeneralUtility.receiveMessage(msg, server);
		    }
		}
    }
});

client.on('guildMemberAdd', member => {

});

client.login(Secret.auth).catch(console.error);