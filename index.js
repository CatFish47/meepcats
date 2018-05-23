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
						1182;

function addSockets() {

	var players = {};

	io.on('connection', (socket) => {

		io.emit('playerConnect', (null))

		socket.on('fDataUpdate', (data) => {
			io.emit('fGameData', data);
		});

		socket.on('eDataUpdate', (data) => {
			io.emit('eGameData', data);
		});

		socket.on('disconnect', () => {
			io.emit('playerDisconnect', (null))
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

  app.get('/spacecrash', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash.html');

		res.sendFile(filePath);
	})

	app.post('/spacecrash', (req, res, next) => {
		console.log(req.body);
		res.send('OK');
	})

	app.get('/login', (req, res, next) => {
		var filePath = path.join(__dirname, './login.html');

		res.sendFile(filePath);
	})

	app.post('/login', (req, res, next) => {
		passport.use(new FacebookStrategy({
	    clientID: FACEBOOK_APP_ID,
	    clientSecret: FACEBOOK_APP_SECRET,
	    callbackURL: "http://localhost:3000/auth/facebook/callback"
	  },
	  function(accessToken, refreshToken, profile, cb) {
	    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
	      return cb(err, user);
	    });
		 }
		));
	})

  app.get('/spacecrash.js', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash.js')
		res.sendFile(filePath);
	});

	app.get('/spacecrash.css', (req, res, next) => {
		var filePath = path.join(__dirname, './spacecrash.css')
		res.sendFile(filePath);
	})

  app.get('/images/space.jpg', (req, res, next) => {
    var filePath = path.join(__dirname, './images/space.jpg')
    res.sendFile(filePath);
  })

  app.get('/images/ship.png', (req, res, next) => {
    var filePath = path.join(__dirname, './images/ship.png')
    res.sendFile(filePath);
  })

  app.get('/images/meteor.png', (req, res, next) => {
    var filePath = path.join(__dirname, './images/meteor.png')
    res.sendFile(filePath);
  })

  app.get('/images/explosion.png', (req, res, next) => {
    var filePath = path.join(__dirname, './images/explosion.png')
    res.sendFile(filePath);
  })

  app.get('/images/fire.png', (req, res, next) => {
    var filePath = path.join(__dirname, './images/fire.png')
    res.sendFile(filePath);
  })

  app.get('/images/friendlyShip.png', (req, res, next) => {
    var filePath = path.join(__dirname, './images/friendlyShip.png')
    res.sendFile(filePath);
  })

  app.get('/images/enemyShip.png', (req, res, next) => {
    var filePath = path.join(__dirname, './images/enemyShip.png')
    res.sendFile(filePath);
  })

  app.get('/images/selectedShip.png', (req, res, next) => {
    var filePath = path.join(__dirname, './images/selectedShip.png')
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
