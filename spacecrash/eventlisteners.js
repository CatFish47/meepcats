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
