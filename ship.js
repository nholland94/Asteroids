(function (root) {

  var GameObjects = root.GameObjects = (root.GameObjects || {});

  var Ship = GameObjects.Ship = function (dimX, dimY) {
    var pos = {x: dimX / 2, y: dimY / 2};
    var vertices =
      [
        {x: 0, y:0},
        {x: -15, y:25},
        {x: 0, y:-25},
        {x: 15, y:25}
      ];

    GameObjects.MovingObject.call(this, pos, {x: 0, y: 0}, 35, null, vertices);

    this.bulletReady = true;
  };

  Ship.inherits(GameObjects.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel = {x: this.vel.x + impulse.x, y: this.vel.y + impulse.y};
  };

  Ship.prototype.getInput = function() {
    if (key.isPressed("up")) {
      this.power({x: Math.cos(this.rotation) / 3, y: -Math.sin(this.rotation) / 3});
    }
    if (key.isPressed("left") && !key.isPressed("right")) {
      this.rotation += Math.PI / 32;
      if (this.rotation > Math.PI * 2) {
        this.rotation -= Math.PI * 2;
      }
    }
    if (key.isPressed("right") && !key.isPressed("left")) {
      this.rotation -= Math.PI / 32;
      if (this.rotation < 0) {
        this.rotation += Math.PI * 2;
      }
    }
    if (key.isPressed("space")) {
      if (this.bulletReady) {
        this.bulletReady = false;
        Game.bullets.push(new GameObjects.Bullet(this.pos, this.rotation));
        var that = this;
        var timerId = setInterval(function() {
          that.bulletReady = true;
          clearInterval(timerId);
        }, 400);
      }
    }
  };


})(this);