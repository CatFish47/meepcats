function init() {
  clearInterval(interval);

  drawShips();
  drawObstacles();

  console.log("Game start");
  window.requestAnimationFrame(animate);
}

function wallCollide(ship) {
  var fVertices = [
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
    // console.log('m')

    if (fVertices[i].x > $canvas.width || fVertices[i].x < 0
      || fVertices[i].y < 0 || fVertices[i].y > $canvas.height) {
        ship.dead = true;
        ship.speed = 0;
    }
  }
}

function shipCollide(ship1, ship2) {
  var fVertices = [
    {x: (- (ship1.size / 2) * Math.sin(ship1.angle)) + ship1.x,
      y: ((ship1.size / 2) * Math.cos(ship1.angle)) + ship1.y},
    {x: ((ship1.size / Math.sqrt(3)) * Math.cos(ship1.angle)
      - (- ship1.size / 2) * Math.sin(ship1.angle)) + ship1.x,
      y: ((- ship1.size / 2) * Math.cos(ship1.angle)
      + (ship1.size / Math.sqrt(3)) * (Math.sin(ship1.angle))) + ship1.y},
    {x: ((- ship1.size / Math.sqrt(3)) * Math.cos(ship1.angle)
      - (- ship1.size / 2) * Math.sin(ship1.angle)) + ship1.x,
      y: ((- ship1.size / 2) * Math.cos(ship1.angle)
      + (- ship1.size / Math.sqrt(3)) * (Math.sin(ship1.angle))) + ship1.y}];

  var eVertices = [
    {x: (- (ship2.size / 2) * Math.sin(ship2.angle)) + ship2.x,
      y: ((ship2.size / 2) * Math.cos(ship2.angle)) + ship2.y},
    {x: ((ship2.size / Math.sqrt(3)) * Math.cos(ship2.angle)
      - (- ship2.size / 2) * Math.sin(ship2.angle)) + ship2.x,
      y: ((- ship2.size / 2) * Math.cos(ship2.angle)
      + (ship2.size / Math.sqrt(3)) * (Math.sin(ship2.angle))) + ship2.y},
    {x: ((- ship2.size / Math.sqrt(3)) * Math.cos(ship2.angle)
      - (- ship2.size / 2) * Math.sin(ship2.angle)) + ship2.x,
      y: ((- ship2.size / 2) * Math.cos(ship2.angle)
      + (- ship2.size / Math.sqrt(3)) * (Math.sin(ship2.angle))) + ship2.y}];

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
        ship2.dead = true;
      }
    }
  }
}

function obstacleCollide(ship, obstacle) {
  var fVertices = [
    {x: (- (ship1.size / 2) * Math.sin(ship.angle)) + ship.x,
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

    if (Math.pow(fVertices[i].x - obstacle.x, 2) +
    Math.pow(fVertices[i].y - obstacle.y, 2) <
    Math.pow(obstacle.size / 2, 2)) {
      ship.dead = true;
      ship.speed = 0;
    } else {
      // Implement Circle-Edge collsions later with the following link:
      // http://www.phatcode.net/articles.php?id=459
    }
  }
}

function update() {
  sendData();

  for (var i in players) {
    if (players[i]) {
      if (players[i].id != players[id].id) { // Check for collisions with only these ships
        if (players[id].speed > players[i].speed) {
          shipCollide(players[id], players[i]);
        } else if (players[i].speed > players[id].speed) {
          shipCollide(players[i], players[id]);
        }
      }
    }
  }

  for (var i in o) {
    obstacleCollide(players[id], o[i]);
    // You might have to check collisions for enemy ships too...
  }

  wallCollide(players[id]);

  animateShips();
}

function draw() {
  context.clearRect(0, 0, $canvas.width, $canvas.height);
  drawObstacles();
  drawShips();

  if (players[id].selected) {
    drawShooting();
  }

  return 0;
}

function animateShips() {
  for (var i in players) {
    if (players[i]) {
      if (players[i].dead) {
        players[i].imageSrc = "images/explosion.png"; // Why the fuck did I do it this way...?
        players[i].image.src = players[i].imageSrc;

        if (players[i].size > 0) {
          players[i].size -= 0.5;
        } else {
          players[i].size = 0;
        }
        players[i].speed = 0;
      }

      players[i].x += -players[i].speed * Math.cos(players[i].angle - Math.PI / 2);
      players[i].y += -players[i].speed * Math.sin(players[i].angle - Math.PI / 2);

      if (players[i].speed - 0.2 > 0) {
        players[i].moving = true;
        players[i].speed -= 0.2;
      } else {
        players[i].moving = false;
        gone = true;
        players[i].speed = 0;
      }
    }
  }
}

function drawShips() {
  for (var i in players) {
    if (players[i]) {
      context.beginPath();
      context.save();
      context.translate(players[i].x, players[i].y);
      context.rotate(players[i].angle);

      players[i].image = new Image();

      if (players[i].dead) {
        players[i].image.src = "images/explosion.png";
      } else if (players[i] == players[id]) {
        players[i].image.src = players[i].imageSrc;
      } else {
        players[i].image.src = "images/enemyShip.png";
      }

      context.drawImage(players[i].image, -players[i].size / 2, -players[i].size / 2,
        players[i].size, players[i].size);
      if (players[i].moving) {
        context.drawImage(fire, -players[i].size / 2, -players[i].size / 2 - players[i].size / 6,
          players[i].size, players[i].size + players[i].size / 8 * 3)
      }
      context.restore();
      context.closePath();
    }
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

function sendData() {
  socket.emit('dataUpdate', {id: id, ship: players[id]});
}

function drawShooting() {
  if (!players[id].dead) {
    context.beginPath();
    context.strokeStyle = "#fff";
    context.moveTo(players[id].x, players[id].y);
    context.lineTo(mouseX, mouseY);
    context.stroke();
    context.closePath();

    var points = [
      {x: players[id].x, y: players[id].y},
      {x: players[id].x, y: players[id].y + 100},
      {x: mouseX, y: mouseY}];

      a = dist(points[0], points[1]);
      b = dist(points[0], points[2]);
      c = dist(points[1], points[2]);

      if (mouseX < players[id].x) {
        players[id].angle = Math.acos((a*a + b*b - c*c) / (2*a*b)) - Math.PI;
      } else {
        players[id].angle = -(Math.acos((a*a + b*b - c*c) / (2*a*b)) - Math.PI);
      }

      if (players[id].angle < 0) {
        players[id].angle = 2 * Math.PI + players[id].angle;
      }

      if (isNaN(players[id].angle)) {
        players[id].angle = 0;
      }
    }
}

function dist(p1, p2) {
  return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
}

function animate() {
  update();

  if (draw() == 0) {
    window.requestAnimationFrame(animate);
  }
}

var interval = setInterval(function() {
  if (id != -1) {
    init();
  }
}, 1000);
