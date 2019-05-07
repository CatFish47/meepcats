function init() {
  drawEnemyShips();
  drawFriendlyShips();
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

  return 0;
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
    alert("Team F has won!");
  } else {
    alert("Team E has won!");
  }

  socket.emit('endGame', true);
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

  if (draw() == 0) {
    if (!gameOver) {
      window.requestAnimationFrame(animate);
    } else {
      gameOverScreen();
    }
  }
}
