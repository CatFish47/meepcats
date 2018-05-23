class fShip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 1.5 * Math.PI;
    this.speed = 0;
    this.size = 50;
    this.imageSrc = "images/friendlyShip.png";
    this.image = new Image();
    this.image.src = this.imageSrc;
    this.selected = false;
    this.dead = false;
    this.moving = false;
  }
  shipCollide(ship) {
    var fVertices = [
      {x: (- (this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((this.size / 2) * Math.cos(this.angle)) + this.y},
      {x: ((this.size / Math.sqrt(3)) * Math.cos(this.angle)
        - (- this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((- this.size / 2) * Math.cos(this.angle)
        + (this.size / Math.sqrt(3)) * (Math.sin(this.angle))) + this.y},
      {x: ((- this.size / Math.sqrt(3)) * Math.cos(this.angle)
        - (- this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((- this.size / 2) * Math.cos(this.angle)
        + (- this.size / Math.sqrt(3)) * (Math.sin(this.angle))) + this.y}];

    var eVertices = [
      {x: (- (ship.size / 2) * Math.sin(ship.angle)) + ship.x,
        y: ((ship.size / 2) * Math.cos(ship.angle)) + ship.y},
      {x: ((ship.size / Math.sqrt(3)) * Math.cos(ship.angle)
        - (- ship.size / 2) * Math.sin(ship.angle)) + ship.x,
        y: ((- ship.size / 2) * Math.cos(ship.angle)
        + (ship.size / Math.sqrt(3)) * (Math.sin(ship.angle))) + ship.y},
      {x: ((- ship.size / Math.sqrt(3)) * Math.cos(ship.angle)
        - (- ship.size / 2) * Math.sin(ship.angle)) + ship.x,
        y: ((- ship.size / 2) * Math.cos(ship.angle)
        + (- ship.size / Math.sqrt(3)) * (Math.sin(ship.angle))) + ship.y}];

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var f = [i, i + 1];
        if (f[1] == 3) {
          f[1] = 0;
        }

        var e = [j, j + 1];
        if (e[1] == 3) {
          e[1] = 0;
        }

        var fLine =
          {a: fVertices[f[1]].y - fVertices[f[0]].y,
            b: fVertices[f[0]].x - fVertices[f[1]].x,
            c: (fVertices[f[1]].y - fVertices[f[0]].y) * fVertices[f[0]].x
            + (fVertices[f[0]].x - fVertices[f[1]].x) * fVertices[f[0]].y};

        var eLine =
          {a: eVertices[e[1]].y - eVertices[e[0]].y,
            b: eVertices[e[0]].x - eVertices[e[1]].x,
            c: (eVertices[e[1]].y - eVertices[e[0]].y) * eVertices[e[0]].x
            + (eVertices[e[0]].x - eVertices[e[1]].x) * eVertices[e[0]].y};

        var det = fLine.a * eLine.b - fLine.b * eLine.a;

        if (det != 0) {
          var iX = (eLine.b*fLine.c - fLine.b*eLine.c)/det;
          var iY = (fLine.a*eLine.c - eLine.a*fLine.c)/det;
        } else {
          var iX = null;
          var iY = null;
        }

        if (Math.min(fVertices[f[0]].x, fVertices[f[1]].x) < iX
        && iX < Math.max(fVertices[f[0]].x, fVertices[f[1]].x)
        && Math.min(eVertices[e[0]].x, eVertices[e[1]].x) < iX
        && iX < Math.max(eVertices[e[0]].x, eVertices[e[1]].x)) {
          ship.dead = true;
        }
      }
    }
  }

  obstacleCollide(obstacle) {
    var fVertices = [
      {x: (- (this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((this.size / 2) * Math.cos(this.angle)) + this.y},
      {x: ((this.size / Math.sqrt(3)) * Math.cos(this.angle)
        - (- this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((- this.size / 2) * Math.cos(this.angle)
        + (this.size / Math.sqrt(3)) * (Math.sin(this.angle))) + this.y},
      {x: ((- this.size / Math.sqrt(3)) * Math.cos(this.angle)
        - (- this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((- this.size / 2) * Math.cos(this.angle)
        + (- this.size / Math.sqrt(3)) * (Math.sin(this.angle))) + this.y}];

        for (var i = 0; i < 3; i++) {

          if (Math.pow(fVertices[i].x - obstacle.x, 2) +
          Math.pow(fVertices[i].y - obstacle.y, 2) <
          Math.pow(obstacle.size / 2, 2)) {
            this.dead = true;
            this.speed = 0;
          } else {
            // Implement Circle-Edge collsions later with the following link:
            // http://www.phatcode.net/articles.php?id=459
          }
        }

    for (var i = 0; i < 3; i++) {
        if (fVertices[i].x > $canvas.width || fVertices[i].x < 0
          || fVertices[i].y < 0 || fVertices[i].y > $canvas.height) {
            this.dead = true;
            this.speed = 0;
        }

    }
  }
}

class eShip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0.5 * Math.PI;
    this.speed = 0;
    this.size = 50;
    this.image = new Image();
    this.image.src = "images/enemyShip.png";
    this.selected = false;
    this.dead = false;
    this.moving = false;
  }

  shipCollide(ship) {
    var fVertices = [
      {x: (- (this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((this.size / 2) * Math.cos(this.angle)) + this.y},
      {x: ((this.size / Math.sqrt(3)) * Math.cos(this.angle)
        - (- this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((- this.size / 2) * Math.cos(this.angle)
        + (this.size / Math.sqrt(3)) * (Math.sin(this.angle))) + this.y},
      {x: ((- this.size / Math.sqrt(3)) * Math.cos(this.angle)
        - (- this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((- this.size / 2) * Math.cos(this.angle)
        + (- this.size / Math.sqrt(3)) * (Math.sin(this.angle))) + this.y}];

    var eVertices = [
      {x: (- (ship.size / 2) * Math.sin(ship.angle)) + ship.x,
        y: ((ship.size / 2) * Math.cos(ship.angle)) + ship.y},
      {x: ((ship.size / Math.sqrt(3)) * Math.cos(ship.angle)
        - (- ship.size / 2) * Math.sin(ship.angle)) + ship.x,
        y: ((- ship.size / 2) * Math.cos(ship.angle)
        + (ship.size / Math.sqrt(3)) * (Math.sin(ship.angle))) + ship.y},
      {x: ((- ship.size / Math.sqrt(3)) * Math.cos(ship.angle)
        - (- ship.size / 2) * Math.sin(ship.angle)) + ship.x,
        y: ((- ship.size / 2) * Math.cos(ship.angle)
        + (- ship.size / Math.sqrt(3)) * (Math.sin(ship.angle))) + ship.y}];

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var f = [i, i + 1];
        if (f[1] == 3) {
          f[1] = 0;
        }

        var e = [j, j + 1];
        if (e[1] == 3) {
          e[1] = 0;
        }

        var fLine =
          {a: fVertices[f[1]].y - fVertices[f[0]].y,
            b: fVertices[f[0]].x - fVertices[f[1]].x,
            c: (fVertices[f[1]].y - fVertices[f[0]].y) * fVertices[f[0]].x
            + (fVertices[f[0]].x - fVertices[f[1]].x) * fVertices[f[0]].y};

        var eLine =
          {a: eVertices[e[1]].y - eVertices[e[0]].y,
            b: eVertices[e[0]].x - eVertices[e[1]].x,
            c: (eVertices[e[1]].y - eVertices[e[0]].y) * eVertices[e[0]].x
            + (eVertices[e[0]].x - eVertices[e[1]].x) * eVertices[e[0]].y};

        var det = fLine.a * eLine.b - fLine.b * eLine.a;

        var iX;
        var iY;

        if (det != 0) {
          iX = (eLine.b*fLine.c - fLine.b*eLine.c)/det;
          iY = (fLine.a*eLine.c - eLine.a*fLine.c)/det;
        } else {
          iX = null;
          iY = null;
        }

        if (Math.min(fVertices[f[0]].x, fVertices[f[1]].x) < iX
        && iX < Math.max(fVertices[f[0]].x, fVertices[f[1]].x)
        && Math.min(eVertices[e[0]].x, eVertices[e[1]].x) < iX
        && iX < Math.max(eVertices[e[0]].x, eVertices[e[1]].x)) {
          ship.dead = true;
        }
      }
    }
  }

  obstacleCollide(obstacle) {
    var eVertices = [
      {x: (- (this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((this.size / 2) * Math.cos(this.angle)) + this.y},
      {x: ((this.size / Math.sqrt(3)) * Math.cos(this.angle)
        - (- this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((- this.size / 2) * Math.cos(this.angle)
        + (this.size / Math.sqrt(3)) * (Math.sin(this.angle))) + this.y},
      {x: ((- this.size / Math.sqrt(3)) * Math.cos(this.angle)
        - (- this.size / 2) * Math.sin(this.angle)) + this.x,
        y: ((- this.size / 2) * Math.cos(this.angle)
        + (- this.size / Math.sqrt(3)) * (Math.sin(this.angle))) + this.y}];

        for (var i = 0; i < 3; i++) {

          if (Math.pow(eVertices[i].x - obstacle.x, 2) +
          Math.pow(eVertices[i].y - obstacle.y, 2) <
          Math.pow(obstacle.size / 2, 2)) {
            this.dead = true;
            this.speed = 0;
          } else {
            // Implement Circle-Edge collsions later with the following link:
            // http://www.phatcode.net/articles.php?id=459
          }
        }

    for (var i = 0; i < 3; i++) {
        if (eVertices[i].x > $canvas.width || eVertices[i].x < 0
          || eVertices[i].y < 0 || eVertices[i].y > $canvas.height) {
            this.dead = true;
            this.speed = 0;
        }

    }
  }
}

class obstacle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = new Image();
    this.image.src = "images/meteor.png";
  }
}

// Game variables
var gameStart = false;
var side = "S"; // If you joined the lobby second, you will be E.
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
var testString = "images/fire.png";
fire.src = testString;

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

// Mouse Event Listeners
document.addEventListener("mousedown", function(evt) { down = true; });
document.addEventListener("mouseup", function(evt) {
  if (side == "F") {
    for (var i = 0; i < count; i++) {
      if (f[i].selected == true) {
        f[i].speed = dist({x: f[i].x, y: f[i].y}, {x: mouseX, y: mouseY}) / 20;
      }
      down = false;
      f[i].selected = false;
    }
  } else if (side == "E") {
    for (var i = 0; i < count; i++) {
      if (e[i].selected == true) {
        e[i].speed = dist({x: e[i].x, y: e[i].y}, {x: mouseX, y: mouseY}) / 20;
      }
      down = false;
      e[i].selected = false;
    }
  }

  shootShip = -1;
});
document.addEventListener("mousemove", function(evt) {
  var rect = $canvas.getBoundingClientRect();
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;

  if (mouseX < 0) {
    mouseX = 0;
  }
  if (mouseY < 0) {
    mouseY = 0;
  }
  if (mouseX > $canvas.width) {
    mouseX = $canvas.width;
  }
  if (mouseY > $canvas.height) {
    mouseY = $canvas.height;
  }

  if (shootShip < 0) {
    if (side == "F") {
      for (var i = 0; i < count; i++) {
        if (Math.pow(mouseX - f[i].x, 2) + Math.pow(mouseY - f[i].y, 2)
        < Math.pow(f[i].size / 2, 2)) {
          f[i].imageSrc = "images/selectedShip.png";
          f[i].image.src = f[i].imageSrc;

          if (down && !f[i].moving && !f[i].dead) {
            f[i].selected = true;
          }
        } else {
          f[i].imageSrc = "images/friendlyShip.png"
          f[i].image.src = f[i].imageSrc;
        }
      }
    } else if (side == "E") {
      for (var i = 0; i < count; i++) {
        if (Math.pow(mouseX - e[i].x, 2) + Math.pow(mouseY - e[i].y, 2)
        < Math.pow(e[i].size / 2, 2)) {
          e[i].imageSrc = "images/selectedShip.png";
          e[i].image.src = e[i].imageSrc;

          if (down && !e[i].moving && !e[i].dead) {
            e[i].selected = true;
          }
        } else {
          e[i].imageSrc = "images/enemyShip.png";
          e[i].image.src = e[i].imageSrc;
        }
      }
    }
  } else {
    if (side == "F") {
      if (Math.pow(mouseX - f[shootShip].x, 2) + Math.pow(mouseY - f[shootShip].y, 2)
      < Math.pow(f[shootShip].size / 2, 2)) {
        f[shootShip].imageSrc = "images/selectedShip.png";
        f[shootShip].image.src = f[shootShip].imageSrc;

        if (down && !f[shootShip].moving && !f[shootShip].dead) {
          f[shootShip].selected = true;
        }
      } else {
        f[shootShip].imageSrc = "images/friendlyShip.png";
        f[shootShip].image.src = f[shootShip].imageSrc;
      }
    } else if (side == "E") {
      if (Math.pow(mouseX - e[shootShip].x, 2) + Math.pow(mouseY - e[shootShip].y, 2)
      < Math.pow(e[shootShip].size / 2, 2)) {
        e[shootShip].imageSrc = "images/selectedShip.png";
        e[shootShip].image.src = e[shootShip].imageSrc;

        if (down && !e[shootShip].moving && !e[shootShip].dead) {
          e[shootShip].selected = true;
        }
      } else {
        e[shootShip].imageSrc = "images/enemyShip.png";
        e[shootShip].image.src = e[shootShip].imageSrc;
      }
    }
  }
});

socket.on('fGameData', (ships) => {
  if (side != "F") {
    for (var i = 0; i < 3; i++) {
      f[i].x = ships[i].x;
      f[i].y = ships[i].y;
      f[i].angle = ships[i].angle;
      f[i].speed = ships[i].speed;
      f[i].size = ships[i].size;
      f[i].imageSrc = ships[i].imageSrc;
      f[i].image.src = f[i].imageSrc;
      f[i].dead = ships[i].dead;
      f[i].moving = ships[i].moving;
    }
  }
});
socket.on('eGameData', (ships) => {
  if (side != "E") {
    for (var i = 0; i < 3; i++) {
      e[i].x = ships[i].x;
      e[i].y = ships[i].y;
      e[i].angle = ships[i].angle;
      e[i].speed = ships[i].speed;
      e[i].size = ships[i].size;
      e[i].imageSrc = ships[i].imageSrc;
      e[i].image.src = e[i].imageSrc;
      e[i].dead = ships[i].dead;
      e[i].moving = ships[i].moving;
    }
  }
})
socket.on('updatePlayers', (playersList) => {
  players = playersList;

  if (!gameStart && players.indexOf("ePlayer") != -1 && players.indexOf("fPlayer") != -1) {
    gameStart = true;
    init();
  }
})
socket.on('playerConnect', (playerType) => {
  if (side == "S" && playerType == "fPlayer") {
    side = "F";
    console.log("Player F has joined!");
  } else if (side == "S" && playerType == "ePlayer") {
    side = "E";
    console.log("Player E has joined!");
  } else {
    console.log("A spectator has joined!");
  }

  players.push(playerType);

  socket.emit('playersList', players);
})

function init() {
  drawObstacles();
  window.requestAnimationFrame(animate);
}

function update() {
  sendData();

  for (var i = 0; i < count; i++) {
    for (var j = 0; j < count; j++) {
      if (f[i].speed > e[j].speed) {
        f[i].shipCollide(e[j]);
      } else if (e[j].speed > f[i].speed) {
        e[j].shipCollide(f[i]);
      }
    }

    for (var j = 0; j < o.length; j++) {
      f[i].obstacleCollide(o[j]);
      e[i].obstacleCollide(o[j]);
    }

    if (checkGameOver() == 0) {
      fWin = true;
      gameOver = true;
    } else if (checkGameOver() == 1) {
      eWin = true;
      gameOver = true;
    }
  }

  animateFriendlyShips();
  animateEnemyShips();
}

function draw() {
  context.clearRect(0, 0, $canvas.width, $canvas.height);
  drawObstacles();
  drawEnemyShips();
  drawFriendlyShips();

  if (shootShip < 0) {
    for (var i = 0; i < count; i++) {
      if (f[i].selected == true && side == "F") {
        shootShip = i;
      } else if (e[i].selected == true && side == "E") {
        shootShip = i;
      }
    }
  } else {
    drawShooting(shootShip);
  }
}

function animateFriendlyShips() {
  for (var i = 0; i < count; i++) {
    if (f[i].dead) {
      f[i].imageSrc = "images/explosion.png";
      f[i].image.src = f[i].imageSrc;

      if (f[i].size > 0) {
        f[i].size -= 0.5;
      } else {
        f[i].size = 0;
      }
      f[i].speed = 0;
    }
    f[i].x += -f[i].speed * Math.cos(f[i].angle - Math.PI / 2);
    f[i].y += -f[i].speed * Math.sin(f[i].angle - Math.PI / 2);

    if (f[i].speed - 0.2 > 0) {
      f[i].moving = true;
      f[i].speed -= 0.2;
    } else {
      f[i].moving = false;
      gone = true;
      f[i].speed = 0;
    }
  }
}

function drawFriendlyShips() {
  for (var i = 0; i < count; i++) {
    context.beginPath();
    context.save();
    context.translate(f[i].x, f[i].y);
    context.rotate(f[i].angle);
    context.drawImage(f[i].image, -f[i].size / 2, -f[i].size / 2,
      f[i].size, f[i].size);
    if (f[i].moving) {
      context.drawImage(fire, -f[i].size / 2, -f[i].size / 2 - f[i].size / 6,
        f[i].size, f[i].size + f[i].size / 8 * 3)
    }
    context.restore();
    context.closePath();
  }
}

function animateEnemyShips() {
  for (var i = 0; i < count; i++) {
    if (e[i].dead) {
      e[i].imageSrc = "images/explosion.png";
      e[i].image.src = e[i].imageSrc;

      if (e[i].size > 0) {
        e[i].size -= 0.5;
      } else {
        e[i].size = 0;
      }
      e[i].speed = 0;
    }
    e[i].x += -e[i].speed * Math.cos(e[i].angle - Math.PI / 2);
    e[i].y += -e[i].speed * Math.sin(e[i].angle - Math.PI / 2);

    if (e[i].speed - 0.2 > 0) {
      e[i].moving = true;
      e[i].speed -= 0.2;
    } else {
      e[i].moving = false;
      gone = true;
      e[i].speed = 0;
    }
  }
}

function drawEnemyShips() {
  for (var i = 0; i < count; i++) {
    context.beginPath();
    context.save();
    context.translate(e[i].x, e[i].y);
    context.rotate(e[i].angle);
    context.drawImage(e[i].image, -e[i].size / 2, -e[i].size / 2,
      e[i].size, e[i].size);
    if (e[i].moving) {
      context.drawImage(fire, -e[i].size / 2, -e[i].size / 2 - e[i].size / 6,
        e[i].size, e[i].size + e[i].size / 8 * 3)
    }
    context.restore();
    context.closePath();
  }
}

function drawObstacles() {
  for (var i = 0; i < o.length; i++) {
    context.beginPath();
    context.drawImage(o[i].image, o[i].x - o[i].size / 2,
      o[i].y - o[i].size / 2, o[i].size, o[i].size);
    context.closePath();
  }
}

function checkGameOver() {
  fCounter = 0;
  eCounter = 0;

  for (var i = 0; i < count; i++) {
    if (e[i].dead) {
      fCounter += 1;
    }

    if (f[i].dead) {
      eCounter += 1;
    }
  }

  if (fCounter == count) {
    return 0;
  }

  if (eCounter == count) {
    return 1;
  }

  return 2;
}

function gameOverScreen() {
  if (fWin) {
    console.alert("Team F has won!");
  } else {
    console.alert("Team E has won!");
  }
}

function sendData() {
  if (side == "F") {
    socket.emit('fDataUpdate', f);
  } else if (side == "E") {
    socket.emit('eDataUpdate', e);
  }
}

function drawShooting(num) {
  if (side == "F") {
    if (!f[num].dead) {
      context.beginPath();
      context.strokeStyle = "#fff";
      context.moveTo(f[num].x, f[num].y);
      context.lineTo(mouseX, mouseY);
      context.stroke();
      context.closePath();

      var points = [
        {x: f[num].x, y: f[num].y},
        {x: f[num].x, y: f[num].y + 100},
        {x: mouseX, y: mouseY}];

        a = dist(points[0], points[1]);
        b = dist(points[0], points[2]);
        c = dist(points[1], points[2]);

        if (mouseX < f[num].x) {
          f[num].angle = Math.acos((a*a + b*b - c*c) / (2*a*b)) - Math.PI;
        } else {
          f[num].angle = -(Math.acos((a*a + b*b - c*c) / (2*a*b)) - Math.PI);
        }

        if (f[num].angle < 0) {
          f[num].angle = 2 * Math.PI + f[num].angle;
        }

        if (isNaN(f[num].angle)) {
          f[num].angle = 0;
        }
      }
  } else if (side == "E") {
    if (!e[num].dead) {
      context.beginPath();
      context.strokeStyle = "#fff";
      context.moveTo(e[num].x, e[num].y);
      context.lineTo(mouseX, mouseY);
      context.stroke();
      context.closePath();

      var points = [
        {x: e[num].x, y: e[num].y},
        {x: e[num].x, y: e[num].y + 100},
        {x: mouseX, y: mouseY}];

        a = dist(points[0], points[1]);
        b = dist(points[0], points[2]);
        c = dist(points[1], points[2]);

        if (mouseX < e[num].x) {
          e[num].angle = Math.acos((a*a + b*b - c*c) / (2*a*b)) - Math.PI;
        } else {
          e[num].angle = -(Math.acos((a*a + b*b - c*c) / (2*a*b)) - Math.PI);
        }

        if (e[num].angle < 0) {
          e[num].angle = 2 * Math.PI + e[num].angle;
        }

        if (isNaN(e[num].angle)) {
          e[num].angle = 0;
        }
      }
  }
}

function dist(p1, p2) {
  return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
}

function animate() {
  update();
  draw();

  var gameOver = false;

  if (!gameOver) {
    window.requestAnimationFrame(animate);
  } else {
    gameOverScreen();
  }
}

/* TODO List:

- Implement circle-edge collisions in planet collisions
- Implement a win condition
- Create a game over screen
- Make it so that the explosions fade over time after the collisions
- Use GIMP2 to create a spacey background
- Add aesthetics to the drag and shoot mechanism
- Create a separate png for the fire of the ship when it is moving
- Implement that png for the ship only when the speed is above 0
- Create a starting screen
- Create options
- Multiplayer
- More features
  - Weather
  - Moving Objects
  - Campaign



- Start Screen
  - Have div that has a start screen
    - Position it with position: fixed
    - Have a button that would start the game
- Lobbying
  - Whenever io.on('connection') is triggered
  - Have an array of length 2, whenever the socket is triggered, add a stuff to
    the array

- You need two channels, one for each side

*/
