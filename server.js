// set up ======================================================================
const Express = require('express');
const Morgan = require('morgan');
const BodyParser = require('body-parser');
const MethodOverride = require('method-override');
const Cors = require('cors');

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