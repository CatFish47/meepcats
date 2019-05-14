socket.on('gameData', (data) => {
  // Add code to update gameData for all spaceships
  if (data.id != id) {
    players[data.id] = data.ship;
  }
});
socket.on('playerConnect', (playerIds) => {
  if (id == -1) {
    var uniqueId = false;

    while (uniqueId == false) {
      id = Math.floor(Math.random() * 100); // Id is a rand num between 0-99
      if (!players[id]) { // If there is no Id in the game alrdy
        players[id] = true; // Set it as true
        uniqueId = true; // Get outta the loop

        you = new Ship(Math.floor(Math.random() * mapWidth), Math.floor(Math.random() * mapHeight), id);
      }
    }

    var data = {id: id, ship: you};

    players[id] = you;
    socket.emit('returnId', data);
  }
})
socket.on('updatePlayers', (data) => {
  players[data.id] = data.ship;
  console.log(players);
})
socket.on('removePlayer', (id) => {
  players[id] = false;
})
