(function (root) {
  var GameObjects = root.GameObjects = (root.GameObjects || {});

  var Particle = GameObjects.Particle = function (pos, vel) {
    GameObjects.MovingObject.call(this, pos, vel, null, null, null);
    var that = this;

    this.selfDestructTimer = setInterval(function () {
      that.destroy();
      clearInterval(that.selfDestructTimer);
    }, Math.floor(Math.random() * 750) + 1000);

    this.destroy = function () {
      var index = Game.particles.indexOf(that);
      Game.particles.splice(index,1);
      clearInterval(that.selfDestructTimer)
    };
  };

  Particle.inherits(GameObjects.MovingObject);

  Particle.prototype.draw = function (c) {
    c.fillStyle = 'rgb(255,255,255)';
    c.fillRect(this.pos.x, this.pos.y, 1, 1);
  };

  var randomVelocity = function() {
    var angle = Math.random() * Math.PI * 2;
    var radius = (Math.random() * 5);
    var vx = radius * Math.sin(angle);
    var vy = radius * Math.cos(angle);
    return {x: vx, y: vy};
  }

  Particle.Explosion = function (pos) {
    for (var i = 0; i < 200; i++) {
      Game.particles.push(new Particle(pos, randomVelocity()));
    }
  };




})(this);