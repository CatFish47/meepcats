// Mouse Event Listeners
document.addEventListener("mousedown", function(evt) {
  down = true;

  console.log(players);
});
document.addEventListener("mouseup", function(evt) {
  if (players[id].selected == true) {
    players[id].speed = dist({x: players[id].x - offsetX, y: players[id].y - offsetY}, {x: mouseX, y: mouseY}) / 20;
    pshh.play();
  }
  down = false;
  players[id].selected = false;
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

  if (!players[id].selected) {
    if (Math.pow(mouseX - $canvas.width / 2, 2) + Math.pow(mouseY - $canvas.height / 2, 2)
    < Math.pow(players[id].size / 2, 2)) {
      players[id].imageSrc = "selectedShip.png";
      players[id].image.src = players[id].imageSrc;

      if (down && !players[id].moving && !players[id].dead) {
        players[id].selected = true;
      }
    } else {
      players[id].imageSrc = "friendlyShip.png";
      players[id].image.src = players[id].imageSrc;
    }
  } else {
    if (Math.pow(mouseX - $canvas.width / 2, 2) + Math.pow(mouseY - $canvas.height / 2, 2)
    < Math.pow(players[id].size / 2, 2)) {
      players[id].imageSrc = "selectedShip.png";
      players[id].image.src = players[id].imageSrc;

      if (down && !players[id].moving && !players[id].dead) {
        players[id].selected = true;
      }
    } else {
      players[id].imageSrc = "friendlyShip.png";
      players[id].image.src = players[id].imageSrc;
    }
  }
});
