(function (root) {
  var GameObjects = root.GameObjects = (root.GameObjects || {});

  var Bullet = GameObjects.Bullet = function(pos, rotation) {
    var angle = rotation + (Math.PI / 2);
    var distance = 7;
    var x = distance * Math.sin(angle);
    var y = distance * Math.cos(angle);
    var vel = {x: x, y: y};

    GameObjects.MovingObject.call(this, pos, vel, 2, null, null);

    var that = this;

    this.destroy = function () {
      var index = Game.bullets.indexOf(that);
      Game.bullets.splice(index,1);
      clearInterval(that.selfDestructTimer);
    };

    this.selfDestructTimer = setInterval(function() {
      that.destroy();
      clearInterval(that.selfDestructTimer);
    }, 2000);
  }

  Bullet.inherits(GameObjects.MovingObject)

  Bullet.prototype.draw = function(c) {
    c.fillStyle = 'rgb(255,255,255)';
    c.fillRect(this.pos.x - 2, this.pos.y - 2, 4, 4);
  }
})(this);