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

  document.querySelector("#side").innerHTML = `You are side ${side}. Players: ${players}`;

  if (!gameStart && players.indexOf("ePlayer") != -1 && players.indexOf("fPlayer") != -1) {
    gameStart = true;
    setTimeout(init, 3000);
  }

  if (side == "S") {
    init();
  }
})
socket.on('playerConnect', (playerType) => {
  if (side == "" && playerType == "fPlayer") {
    side = "F";
    console.log("Player F has joined!");
  } else if (side == "" && playerType == "ePlayer") {
    side = "E";
    console.log("Player E has joined!");
  } else if (side == "" && playerType == "spectator"){
    side = "S";
    console.log("A spectator has joined!");
  }

  players.push(playerType);

  socket.emit('playersList', players);
})
