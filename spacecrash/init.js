// Game variables
var mouseX = 0;
var mouseY = 0;
var down = false;
var gone = false;
var fire = new Image();
var mapWidth = 1200; //2000
var mapHeight = 700; //1500
var id = -1;
fire.src = "images/fire.png";

// Canvas Variables
var $canvas = document.querySelector('canvas');
var context = $canvas.getContext("2d");
$canvas.width = 1200;
$canvas.height = 700;

// Socket Variables
var socket = io();

// Players list
var players = {};

// Create obstacles in the map
var o = []; // TODO: Add stuff into this list

var you;
