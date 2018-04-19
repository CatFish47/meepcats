class fShip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 1.5 * Math.PI;
    this.speed = 0;
    this.size = 50;
    this.image = new Image();
    this.image.src = "images/friendlyShip.png";
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

  static obstacleCollide(obstacle) {

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
var gameOver = false;
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
document.addEventListener("mousedown", function(e) { down = true; });
document.addEventListener("mouseup", function(e) {
  for (var i = 0; i < count; i++) {
    if (f[i].selected == true) {
      f[i].speed = dist({x: f[i].x, y: f[i].y}, {x: mouseX, y: mouseY}) / 20;
    }
    down = false;
    f[i].selected = false;
  }

  shootShip = -1;
});
document.addEventListener("mousemove", function(e) {
  var rect = $canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
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
    for (var i = 0; i < count; i++) {
      if (Math.pow(mouseX - f[i].x, 2) + Math.pow(mouseY - f[i].y, 2)
      < Math.pow(f[i].size / 2, 2)) {
        f[i].image.src = "images/selectedShip.png";

        if (down && !f[i].moving && !f[i].dead) {
          f[i].selected = true;
        }
      } else {
        f[i].image.src = "images/friendlyShip.png"
      }
    }
  } else {
    if (Math.pow(mouseX - f[shootShip].x, 2) + Math.pow(mouseY - f[shootShip].y, 2)
    < Math.pow(f[shootShip].size / 2, 2)) {
      f[shootShip].image.src = "images/selectedShip.png";

      if (down && !f[shootShip].moving && !f[shootShip].dead) {
        f[shootShip].selected = true;
      }
    } else {
      f[shootShip].image.src = "images/friendlyShip.png"
    }
  }
});

function init() {
  drawObstacles();
  window.requestAnimationFrame(animate);
}

function update() {
  for (var i = 0; i < count; i++) {
    for (var j = 0; j < count; j++) {
      if (f[i].speed > e[i].speed) {
        f[i].shipCollide(e[j]);
        e[i].shipCollide(f[j]);
      }
    }

    for (var j = 0; j < o.length; j++) {
      f[i].obstacleCollide(o[j]);
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
      if (f[i].selected == true) {
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
      f[i].image.src = "images/explosion.png";
    }
    f[i].x += -f[i].speed * Math.cos(f[i].angle - Math.PI / 2);
    f[i].y += -f[i].speed * Math.sin(f[i].angle - Math.PI / 2);

    if (f[i].speed > 0) {
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
      e[i].image.src = "images/explosion.png";
    }

    if (e[i].speed > 0) {
      e[i].moving = true;
    } else {
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
    context.restore();
    context.closePath();
  }
}

function drawObstacles() {
  for (var i = 0; i < o.length; i++) {
    context.beginPath();
    context.drawImage(o[i].image, o[i].x - o[i].size / 2,
      o[i].y - o[i].size / 2, o[i].size, o[i].size);
    // Hitbox equation: (x^2 - nX) + (y^2 - nY) = (nSize / 2)^2
    context.closePath();
  }
}

function gameOverScreen() {}

function drawShooting(num) {
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

init();

/* TODO List:

- Implement circle-edge collisions in planet collisions
- Add AI
  1. Implement the turn based system
  2. Create function(s) for AI that activate turing turn % 2 == 1
  3. Make it so that if the first ship is not dead, set the angle towards the
  closest enemy and launch at specified speeds, otherwise move onto the next
  ship
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

*/
