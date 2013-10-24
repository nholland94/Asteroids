(function(root) {
  var Game = root.Game = (root.Game || {});

  var start = Game.start = function (dimX, dimY) {
    Game.DIM_X = dimX;
    Game.DIM_Y = dimY;
    var canvas = document.getElementById('game');

    if (canvas.getContext) {
      Game.ctx = canvas.getContext('2d');
      Game.asteroids = [];
      Game.bullets = [];
      Game.particles = []; //for explosions

      Game.addAsteroids(8);
      Game.ship = new GameObjects.Ship(Game.DIM_X, Game.DIM_Y);

      Game.controlsOn = true;

      Game.timerId = setInterval(function() {
        Game.move();
      }, 30);
    }
  }

  var addAsteroids = Game.addAsteroids = function (numAsteroids) {
    while (Game.asteroids.length < numAsteroids) {
      asteroid = new GameObjects.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y);
      var dummyObj = new GameObjects.MovingObject(
        {x: Game.DIM_X / 2, y: Game.DIM_Y / 2}, null, 150, null, null);

      if (!asteroid.isCollidedWith(dummyObj)) {
        Game.asteroids.push(asteroid);
      }

    }
  };

  var draw = Game.draw = function () {
    Game.ctx.fillStyle = 'rgb(0, 0, 0)';
    Game.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // asteroid.draw(ctx);
    // draw Game.asteroids
    Game.asteroids.forEach(function(asteroid) {
      asteroid.draw(Game.ctx);
    });
    Game.bullets.forEach(function(bullet) {
      bullet.draw(Game.ctx);
    });

    Game.particles.forEach(function(particle) {
      particle.draw(Game.ctx);
    })

    Game.ship.draw(Game.ctx);

    Game.checkCollisions();
  };

  var move = Game.move = function() {
    Game.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
    Game.bullets.forEach(function(bullet) {
      bullet.move();
    });
    Game.particles.forEach(function(particle) {
      particle.move();
    })

    if (Game.controlsOn) Game.ship.getInput();

    Game.ship.move();
    Game.draw();
  };

  var checkCollisions = Game.checkCollisions = function () {
    Game.asteroids.forEach(function(asteroid) {
      if (asteroid.isCollidedWith(Game.ship) && Game.controlsOn) {
        Game.stop();
        return;
      }
      Game.bullets.forEach(function(bullet) {
        if (asteroid.isCollidedWith(bullet)) {
          asteroid.destroy();
          bullet.destroy();
        }
      })
    })
  };

  var stop = Game.stop = function() {
    //clearInterval(Game.timerId); //GAME OVER
    //alert("CRASH AND BURN, BABY!");
    Game.ship.vel = {x: 0, y: 0};
    Game.controlsOn = false;
    GameObjects.Particle.Explosion(Game.ship.pos);

    var explosionsTimer = setInterval(function() {
      var x = Game.ship.pos.x + (Math.floor(Math.random() * 20) - 10);
      var y = Game.ship.pos.y + (Math.floor(Math.random() * 20) - 10);
      GameObjects.Particle.Explosion({x: x, y: y});
    }, 600);

    // var explosionsTimerTimer = setInterval(function() {
    //   clearInterval(explosionsTimer);
    //   clearInterval(explosionsTimerTimer);
    //   clearInterval(Game.timerId);
    //   alert("You lost!");
    // }, 3000);
  };


})(this);

