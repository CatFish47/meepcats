/* The express module is used to look at the address of the request and send it to the correct function */
var express = require('express');

var bodyParser = require('body-parser');

/* The http module is used to listen for requests from a web browser */
var http = require('http');

/* The path module is used to transform relative paths to absolute paths */
var path = require('path');

var mongoose = require('mongoose');

var Io = require('socket.io');

var passport = require('passport');

var dbAddress = process.env.MONGODB_URI || 'mongodb://127.0.0.1/spacecrash';

/* Creates an express application */
var app = express();

/* Creates the web server */
var server = http.createServer(app);

var io = Io(server);

/* Defines what port to use to listen to web requests */
var port =  process.env.PORT
						? parseInt(process.env.PORT):
						1592;

function addSockets() {

	var players = {}; // Players in the game based on Id
	var o = []; // Common obstacles for everyone!!!! So exciting
	var numOfObstacles = 15;
	var mapWidth = 2000; // These should change accordingly with the actual game
	var mapHeight = 1500; // Should I need to change these values
	var obsSize = 250;
	var minSize = 50;

	// Create code over here so that whenever the game initializes at first,
	// It is going to generate obstacles that are going to used for the next like 50 games woohoo
	for (var i = 0; i < numOfObstacles; i++) {
		var obs = {x: 0, y: 0, size: 0};
		obs.x = Math.random() * mapWidth;
		obs.y = Math.random() * mapHeight;
		obs.size = Math.random() * (obsSize - minSize) + minSize;

		o.push(obs);
	}

	io.on('connection', (socket) => {

		var id;

		io.emit('playerConnect', players);
		io.emit('obstacles', o);

		socket.on('returnId', (data) => {
			id = data.id;
			players[id] = true;
			console.log(players);

			io.emit('updatePlayers', data);
		})

		socket.on('dataUpdate', (data) => {
			io.emit('gameData', data);
		});

		socket.on('disconnect', (data) => {

			players[id] = false;
			io.emit('removePlayer', id);

		});

	});

}

function startServer() {

	addSockets();

	app.use(bodyParser.json({ limit: '16mb' }));
	app.use(express.static(path.join(__dirname, 'public')));

	app.get('/', (req, res, next) => {
		var filePath = path.join(__dirname, './index.html');

		res.sendFile(filePath);
	})

	app.post('/', (req, res, next) => {
		console.log(req.body);
		res.send('OK');
	})

	app.get('/login', (req, res, next) => {
		var filePath = path.join(__dirname, './login.html');

		res.sendFile(filePath);
	})

	// NOTE: Spacecrash Stuff Here

  app.get('/spacecrash', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash/spacecrash.html');

		res.sendFile(filePath);
	})

  app.get('/spacecrash/init.js', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash/init.js')
		res.sendFile(filePath);
	});

	app.get('/spacecrash/sockets.js', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash/sockets.js')
		res.sendFile(filePath);
	});

	app.get('/spacecrash/classes.js', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash/classes.js')
		res.sendFile(filePath);
	});

	app.get('/spacecrash/game.js', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash/game.js')
		res.sendFile(filePath);
	});

	app.get('/spacecrash/eventlisteners.js', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash/eventlisteners.js')
		res.sendFile(filePath);
	});

	app.get('/spacecrash/explosion.js', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash/explosion.js')
		res.sendFile(filePath);
	});

	app.get('/spacecrash/spacecrash.css', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash/spacecrash.css')
		res.sendFile(filePath);
	})

	// NOTE: Catan stuff here

	app.get('/catan', (req, res, next) => {
		var filePath = path.join(__dirname, './catan/catan.html')
		res.sendFile(filePath);
	})

	app.get('/catan/catan.css', (req, res, next) => {
		var filePath = path.join(__dirname, './catan/catan.css')
		res.sendFile(filePath);
	})

	app.get('/catan/game.js', (req, res, next) => {
		var filePath = path.join(__dirname, './catan/game.js')
		res.sendFile(filePath);
	})

	app.get('/catan/classes.js', (req, res, next) => {
		var filePath = path.join(__dirname, './catan/classes.js')
		res.sendFile(filePath);
	})

	app.get('/catan/init.js', (req, res, next) => {
		var filePath = path.join(__dirname, './catan/init.js')
		res.sendFile(filePath);
	})

	app.get('/catan/eventlisteners.js', (req, res, next) => {
		var filePath = path.join(__dirname, './catan/eventlisteners.js')
		res.sendFile(filePath);
	})

	app.get('/catan/sockets.js', (req, res, next) => {
		var filePath = path.join(__dirname, './catan/sockets.js')
		res.sendFile(filePath);
	})

	app.get('/auth/facebook',
	  passport.authenticate('facebook'));

	app.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { failureRedirect: '/login' }),
	  function(req, res) {

		// Successful authentication, redirect home.
    res.redirect('/');
  });

	/* Defines what function to all when the server recieves any request from http://localhost:8080 */
	server.on('listening', () => {

		/* Determining what the server is listening for */
		var addr = server.address()
			, bind = typeof addr === 'string'
				? 'pipe ' + addr
				: 'port ' + addr.port
		;

		/* Outputs to the console that the webserver is ready to start listenting to requests */
		console.log('Listening on ' + bind);
	});

	/* Tells the server to start listening to requests from defined port */
	server.listen(port);

}

mongoose.connect(dbAddress, startServer);
