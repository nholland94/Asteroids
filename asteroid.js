(function(root) {
  var GameObjects = root.GameObjects = (root.GameObjects || {});

  var Asteroid = GameObjects.Asteroid = function(pos, vel, radius, color) {
    this.generateVertices = function() {
      // 10 <=> 20
      var slices = Math.floor(Math.random() * 13) + 9;
      var radialInc = (Math.PI * 2) / slices;
      var radialMod = Math.PI / 8;
      var hardRadius = radius;

      var calcRadius = function() {
        return hardRadius + Math.floor(Math.random() * hardRadius) + 1;
      }

      var vertices = [];

      var x = calcRadius();
      var y = 0;

      vertices.push({x: x, y: y});

      for(rad = radialInc; rad < Math.PI * 2; rad += radialInc) {
        var softRadius = calcRadius()
        x = softRadius * Math.cos(rad);
        y = softRadius * Math.sin(rad);

        vertices.push({x: x, y: y});
      }

      return vertices;
    }

    var vertices = this.generateVertices();
    GameObjects.MovingObject.call(this, pos, vel, radius, color, vertices);

    this.rotationVel = ((Math.random() / 4) - 0.175) * ( 7 / radius);
  };

  Asteroid.inherits(GameObjects.MovingObject);

  var randomVelocity = function() {
    var vx = Math.random() * 10 - 5;
    var vy = Math.random() * 10 - 5;
    return {x: vx, y: vy};
  }

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var x = Math.floor(Math.random() * dimX);
    var y = Math.floor(Math.random() * dimY);
    var pos = {x: x, y: y};
    var vel = randomVelocity();

    return new Asteroid(pos, vel, 40, null);
  };


  Asteroid.prototype.destroy = function () {
    if (this.radius > 10) {
      Game.asteroids.push(new Asteroid(this.pos, randomVelocity(), this.radius / 2, null));
      Game.asteroids.push(new Asteroid(this.pos, randomVelocity(), this.radius / 2, null));
    }

    GameObjects.Particle.Explosion(this.pos);
    var index = Game.asteroids.indexOf(this);
    Game.asteroids.splice(index,1);
  };


})(this);