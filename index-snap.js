// Command 	Name 	Parameters
// M 	moveto 	(x y)+
// Z 	closepath 	(none)
// L 	lineto 	(x y)+
// H 	horizontal lineto 	x+
// V 	vertical lineto 	y+
// C 	curveto 	(x1 y1 x2 y2 x y)+
// S 	smooth curveto 	(x2 y2 x y)+
// Q 	quadratic Bézier curveto 	(x1 y1 x y)+
// T 	smooth quadratic Bézier curveto 	(x y)+
// A 	elliptical arc 	(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
// R 	Catmull-Rom curveto* 	x1 y1 (x y)+

let a = Snap(1000,800);

// <path xmlns="http://www.w3.org/2000/svg" d="M10 15 l15 0 l2.5 -5 l5 10 l5 -10 l5 10 l5 -10 l5 10 l2.5 -5 l15 0" stroke="black" stroke-width="1" stroke-linejoin="bevel" fill="none"/>
function res(x, y) {
  let str = `M${x} ${y} l15 0 l2.5 -5 l5 10 l5 -10 l5 10 l5 -10 l5 10 l2.5 -5 l15 0`;
  a.path(str).attr({
    fill: 'none',
    stroke: 'white',
    strokeWidth: 0,
    strokeLinejoin: 'bevel'
  }).animate({
    strokeWidth: 2
  }, 1000, mina.bounce);
}
res(400, 20);
res(400, 40);
res(400, 200);

function resistor(x, y, band1, band2, band3, tolerance) {
  const res = {
    bodyColor: '#d9d0ad',
    bodyHeight: 120,
    bodyWidth: 30,
    bandHeight: 10,
    bandWidth: 30,
  }

  let tol = 'silver';
  if (tolerance === 2) {
    tol = 'gold';
  }

  let body = a.rect(x, y, res.bodyWidth, res.bodyHeight, 2).attr({ fill: res.bodyColor });
  let b1 = a.rect(x, y + 30 - res.bandHeight/2, res.bandWidth, res.bandHeight, 0).attr({ fill: band1 });
  let b2 = a.rect(x, y + 50 - res.bandHeight/2, res.bandWidth, res.bandHeight, 0).attr({ fill: band2 });
  let b3 = a.rect(x, y + 70 - res.bandHeight/2, res.bandWidth, res.bandHeight, 0).attr({ fill: band3 });
  let b4 = a.rect(x, y + 90 - res.bandHeight/2, res.bandWidth, res.bandHeight, 0).attr({ fill: tol });
  
  a.group(body, b1, b2, b3, b4).attr({ class: 'resistor' });
}

resistor(40, 30, 'black', 'red', 'blue', 2);
resistor(90, 30, 'yellow', 'violet', 'green', 2);

a.path('M 250 250 l 700 0').attr({
  fill: 'none',
  stroke: 'pink',
  strokeDasharray: 200,
  strokeDashoffset: 1025,
  strokeLinejoin: 'round',
  strokeWidth: 4,
}).animate({
  strokeDashoffset: 200
}, 5000, mina.bounce)

// runAnimation();

// function runAnimation() {
//   a.path('M75.5,183.5 L505.5,73.5').attr({
//     fill: 'none',
//     stroke: 'pink',
//     strokeDasharray: 200,
//     strokeDashoffset: 1025,
//     strokeLinejoin: 'round',
//     strokeWidth: 4,
//   }).stop().animate({
//     strokeDashoffset: 200
//   }, 5000, mina.linear,
//   function() {
//     runAnimation();
//   }
// )};