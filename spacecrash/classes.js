class Ship {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
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
}

class Obstacle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = new Image();
    this.image.src = "images/meteor.png";
  }
}
