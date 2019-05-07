// Game variables
var gameStart = false;
var side = ""; // If you joined the lobby second, you will be E.
var gameOver = false;
var fWin = false;
var eWin = false;
var mouseX = 0;
var mouseY = 0;
var down = false;
var gone = false;
var count = 3;
var shootShip = -1;
var fire = new Image();
fire.src = "images/fire.png";

// Canvas Variables
var $canvas = document.querySelector('canvas');
var context = $canvas.getContext("2d");
$canvas.width = 1200;
$canvas.height = 700;

// Socket Variables
var socket = io();

// Players list
var players = [];

// Create class variables
var f = [];
var e = [];
var o = [new obstacle($canvas.width / 2, $canvas.height / 2 + 100, 200),
new obstacle($canvas.width / 2 - 100, $canvas.height - 70, 50),
new obstacle($canvas.width / 2 + 100, $canvas.height / 4, 150)];

var tempY = 2;
for (var i = 0; i < count; i++) {
  f[i] = new fShip($canvas.width / 10, $canvas.height / 6 * tempY);
  tempY += 1;
}
tempY = 2;
for (var i = 0; i < count; i++) {
  e[i] = new eShip($canvas.width / 10 * 9, $canvas.height / 6 * tempY);
  tempY += 1;
}
