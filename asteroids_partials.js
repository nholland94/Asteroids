function draw() {
  var explosionCanvas = document.getElementById('explosion');

  if (explosionCanvas.getContext) {
    var ctx = explosionCanvas.getContext('2d');

    setInterval(function() {
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(0,0,150,150);
      ctx.fillStyle = "rgb(255, 255, 255)";

      var points_to_draw =  [];
      var center = {x: 75, y: 75};
      var range = 50;

      for (i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {
        var px = randomPoint(range);
        var py = randomPoint(range);
        points_to_draw.push( {x: px + center.x, y: py + center.y} );
      }

      var firstPoint = points_to_draw.pop();
      ctx.beginPath();
      ctx.moveTo(firstPoint.x, firstPoint.y);

      while (points_to_draw.length !== 0) {
        var point = points_to_draw.pop();
        ctx.lineTo(point.x, point.y);
      }

      ctx.fill();
    }, 100);
  }

  // asteroidCanvas = document.getElementById('asteroid');
//
//   if (asteroidCanvas.getContext) {
//     var ctx = asteroidCanvas.getContext('2d');
//
//     setInterval( function() {
//       //ctx.fillStyle = "rgb(0, 0, 0)";
//       //ctx.fillRect(0,0,300,300);
//       ctx.fillStyle = "rgb(255, 255, 255)";
//       ctx.fillRect(0, 0, 300, 300);
//
//       // 10 <=> 20
//       var slices = Math.floor(Math.random() * 21) + 11;
//       var radialInc = (Math.PI * 2) / slices;
//       var radialMod = Math.PI / 8;
//       var center = {x: 150, y: 150};
//       var radius = 100;
//       var radiusMod = 25;
//
//       var calcRadius = function() {
//         return radius + Math.floor(Math.random() * radiusMod) + 1;
//       }
//
//       var calcCurve = function(x, y, lastMove) {
//         var cx = (x + lastMove.x) / 2;
//         var cy = (y + lastMove.y) / 2;
//         return {x: cx, y: cy};
//       }
//
//       var calcRadMod = function() {
//         return (Math.random() * radialMod) - (radialMod / 2);
//       }
//
//       var x = center.x + calcRadius();
//       var y = center.y;
//
//       ctx.beginPath();
//       ctx.moveTo(x, y);
//
//       var firstMove = {x: x, y: y};
//       var lastMove =  {x: x, y: y};
//
//       for(rad = radialInc; rad < Math.PI * 2; rad += radialInc) {
//         var r = calcRadius()
//         x = r * Math.cos(rad) + center.x;
//         y = r * Math.sin(rad) + center.y;
//         curve = calcCurve(x, y, lastMove);
//         //ctx.quadraticCurveTo(x, y, curve.x, curve.y);
//         //ctx.lineTo(x, y);
//
//         r = calcRadius();
//         x = r * Math.cos(rad + calcRadMod()) + center.x;
//         y = r * Math.sin(rad + calcRadMod()) + center.y;
//
//         ctx.lineTo(x, y);
//         lastMove = {x: x, y: y};
//       }
//
//       ctx.lineTo(firstMove.x, firstMove.y);
//       ctx.stroke();
//     }, 1000);
//   }
};

function randomPoint(range) {
  return Math.floor(Math.random() * (range + 1)) - ((range) / 2);
}