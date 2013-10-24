Function.prototype.inherits = function (parentClass) {
  var Surrogate = function () {};
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
};

(function(root) {
  var GameObjects = root.GameObjects = (root.GameObjects || {});

  var MovingObject = GameObjects.MovingObject = function (pos, vel, radius, color, vertices) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.vertices = vertices;
    this.rotation = Math.PI / 2;
    this.rotationVel = 0;
    console.log(vertices);
  };

  MovingObject.prototype.move = function() {
    var x = this.pos.x + this.vel.x;
    var y = this.pos.y + this.vel.y;

    if (x > Game.DIM_X) {
      x -= Game.DIM_X;
    }
    if (x < 0) {
      x += Game.DIM_X;
    }

    if (y > Game.DIM_Y) {
      y -= Game.DIM_Y;
    }
    if (y < 0) {
      y += Game.DIM_X;
    }

    this.pos = {x: x, y: y};
    this.rotation = this.rotation + this.rotationVel;
  };

  MovingObject.prototype.draw = function(c) {
    c.strokeStyle = 'rgb(255,255,255)';
    c.beginPath()

    for (var i = 0; i < this.vertices.length; i++) {
      var vertex = this.vertices[i];
      var baseAngle = Math.atan2(vertex.x, -vertex.y);
      var distance = Math.sqrt(Math.pow(vertex.x, 2) + Math.pow(vertex.y, 2));
      var newAngle = this.rotation + baseAngle + (Math.PI / 2);
      var x = distance * Math.sin(newAngle);
      var y = distance * Math.cos(newAngle);

      if (i === 0) {
        c.moveTo(x + this.pos.x, y + this.pos.y);
      } else {
        c.lineTo(x + this.pos.x, y + this.pos.y);
      }
    }

    c.closePath();
    c.stroke();
  };

  MovingObject.prototype.isCollidedWith = function(otherObj) {
    var otherCenter = otherObj.pos;
    var dy = Math.pow(this.pos.y - otherCenter.y, 2)
    var dx = Math.pow(this.pos.x - otherCenter.x, 2)
    var distance = Math.sqrt(dy + dx);

    return distance < this.radius + otherObj.radius;
  };




})(this);