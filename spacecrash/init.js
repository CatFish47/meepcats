// Game variables
var mouseX = 0;
var mouseY = 0;
var down = false;
var gone = false;
var fire = new Image();
const mapWidth = 2000;
const mapHeight = 1500;
var id = -1;
var offsetX = 0;
var offsetY = 0;

fire.src = "fire.png";

// Canvas Variables
var $canvas = document.getElementById('space-crash');
var context = $canvas.getContext("2d");
$canvas.width = 1200;
$canvas.height = 700;

var screenWidth = window.innerWidth / 2 - $canvas.width / 2;

$canvas.style.left = screenWidth + "px";

// Socket Variables
var socket = io();

// Players list
var players = {};

// Create obstacles in the map
var o = []; // TODO: Add stuff into this list

const deaths = [
  'death1.ogg', 'death2.ogg', 'death3.ogg'
]

const music = new Audio('background.ogg');
music.loop = true;
music.load();
const pshh = new Audio('psssh.ogg');

var score = 0;

var you;
