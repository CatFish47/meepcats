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
