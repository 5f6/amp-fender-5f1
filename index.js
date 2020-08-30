// Amplifier Schematic
// 5F1 schematic from https://robrobinette.com/How_Amps_Work.htm

const amp = {
  path: {
    // color: 'rgba(255, 255, 255, 0.667)',
    // color: '#444',
    color: 'green',
    linecap: 'round',
    linejoin: 'round',
    width: 1.5
  },
  text: {
    family: 'Helvetica, sans-serif',
    style: 'italic',
    size: 15,
    fill: 'green'
  }
}

let draw = SVG().addTo('body').size('100%', '100%');

// <path xmlns="http://www.w3.org/2000/svg" d="M10 15 l15 0 l2.5 -5 l5 10 l5 -10 l5 10 l5 -10 l5 10 l2.5 -5 l15 0" stroke="black" stroke-width="1" stroke-linejoin="bevel" fill="none"/>
function addResistor(x, y, degrees, label, labelPosition) {
  let group = draw.group().attr({ class: 'resistor' });
  
  // symbol
  let a = 6;
  let w = 3;
  let str = `M${x} ${y} l20 0 l${w/2} -${w} l${w} ${a} l${w} -${a} l${w} ${a} l${w} -${a} l${w} ${a} l${w} -${a} l${w} ${a} l${w/2} -${w} l20 0`;
  group.path(str).fill('none').stroke(amp.path);
  
  // text label
  let textAttrs = labelPosition === 'bottom' && degrees === -90 ? { x: x+12, y: y+18 } : { x: x+15, y: y-10 };
  group.plain(label).font(amp.text).attr(textAttrs);
  group.transform({ rotate: degrees });
}

const ampSpecs = {
  resistors: [
    { x: 355, y: 255, rotate: 0, value: '68K', valuePosition: 'top' },
    { x: 355, y: 333, rotate: 0, value: '68K', valuePosition: 'top' },
    { x: 323, y: 356, rotate: -90, value: '1MEG', valuePosition: 'bottom' },
    { x: 462, y: 368, rotate: -90, value: '1500', valuePosition: 'bottom' },
    { x: 506, y: 348, rotate: -90, value: '100K', valuePosition: 'top' },
    { x: 580, y: 345, rotate: -90, value: '1MEG', valuePosition: 'top' },
    { x: 638, y: 375, rotate: -90, value: '1500', valuePosition: 'top' },
    { x: 765, y: 180, rotate: 0, value: '22K', valuePosition: 'top' },
    { x: 731, y: 340, rotate: -90, value: '100K', valuePosition: 'bottom' },
    { x: 768, y: 342, rotate: -90, value: '220K', valuePosition: 'top' },
    { x: 860, y: 350, rotate: -90, value: '470', valuePosition: 'bottom' },
    { x: 782, y: 454, rotate: 0, value: '22K', valuePosition: 'top' },
    { x: 940, y: 454, rotate: 0, value: '10K', valuePosition: 'top' }
  ],
  phoneJacks: [
    { x: 270, y: 255, rotate: 0, flip: false },
    { x: 270, y: 334, rotate: 0, flip: false },
    { x: 1065, y: 265, rotate: 0, flip: 'x' }
  ]
}

ampSpecs.resistors.forEach(res => {
  addResistor(res.x, res.y, res.rotate, res.value, res.valuePosition);
})
// addResistor(355, 255, 0, '68k', 'top');

// Phone Jack
function addPhoneJack(x, y, degrees, flip) {
  let group = draw.group().attr({ class: 'jack' });
  let str = `M${x} ${y} l14 14 l14 -14 l14 0`;
  group.path(str).fill('none').stroke(amp.path);
  group.transform({ rotate: degrees, flip: flip });
}

ampSpecs.phoneJacks.forEach(ph => {
  addPhoneJack(ph.x, ph.y, ph.rotate, ph.flip);
});
// jack(270, 255, 0);

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

document.addEventListener('click', function (event) {

  // toggle background
	if (event.target.matches('#toggleBackground')) {
    var element = document.querySelector('body'),
    style = window.getComputedStyle(element),
    bg = style.getPropertyValue('background-image');
    if (bg == 'none') {
      element.style.backgroundImage = 'url(./5F1_Annotated_Schematic.gif)';
    } else {
      element.style.backgroundImage = 'none';
    }
	}

}, false);