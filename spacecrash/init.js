// Game variables
var mouseX = 0;
var mouseY = 0;
var down = false;
var gone = false;
var fire = new Image();
var mapWidth = 2000;
var mapHeight = 1500;
var id = -1;
var offsetX = 0;
var offsetY = 0;
fire.src = "fire.png";

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

var deaths = [
  new Audio('death1.ogg'),
  new Audio('death2.ogg'),
  new Audio('death3.ogg')
];

var music = new Audio('background.ogg');
music.loop = true;
var pshh = new Audio('psssh.ogg');

var score = 0;

var you;
