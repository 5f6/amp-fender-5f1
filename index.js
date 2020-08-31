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

// Ground
function addGround(x, y, wire, rotate) {
  let group = draw.group().attr({ class: 'ground' });
  let str = `M${x} ${y} l23 0 M${x+4} ${y+6} l15 0 M${x+8} ${y+12} l7 0 M${x+11} ${y+18} l1 0 M${x+11.5} ${y} l0 -${wire}`;
  group.path(str).fill('none').stroke(amp.path).transform({ rotate: rotate });
}

// Capacitor
function addCapacitor(x, y, wire1, wire2, label, labelPosition) {
  // symbol
  let group = draw.group().attr({ class: 'capacitor' });
  let str1 = `M${x} ${y} l7 0 l0 -${wire1} l0 ${wire1} l7 0`;
  let str2 = `M${x} ${y + 6} l7 0 l0 ${wire2} l0 -${wire2} l7 0`;
  group.path(str1).fill('none').stroke(amp.path);
  group.path(str2).fill('none').stroke(amp.path);
  
  // text label
  group.plain(label).font(amp.text).attr({ x: x-32, y: y+6 }).transform({ rotate: -90 });
}

// Resistor
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

// Phone Jack
function addPhoneJack(x, y, wire, degrees, flip) {
  let group = draw.group().attr({ class: 'jack' });
  let str = `M${x} ${y} l14 14 l14 -14 l${wire} 0`;
  group.path(str).fill('none').stroke(amp.path);
  group.transform({ rotate: degrees, flip: flip });
}

const ampSpecs = {
  capacitors: [
    { x: 449, y: 377, wire1: 35, wire2: 38, label: '25 - 25' },
    { x: 857, y: 358, wire1: 30, wire2: 30, label: '25 - 25' },
    { x: 748.5, y: 480, wire1: 25, wire2: 22, label: '8 - 450' },
    { x: 926.5, y: 479, wire1: 25, wire2: 22, label: '8 - 450' },
    { x: 1005, y: 478, wire1: 25, wire2: 22, label: '16 - 450' },
  ],
  grounds: [
    { x: 302, y: 425, wire: 91, rotate: 0 },
    { x: 473.3, y: 430, wire: 20, rotate: 0 },
    { x: 610, y: 379, wire: 11, rotate: 0 },
    { x: 668, y: 398, wire: 0, rotate: 0 },
    { x: 744, y: 508, wire: 0, rotate: 0 },
    { x: 798, y: 372, wire: 8, rotate: 0 },
    { x: 871.3, y: 414, wire: 22, rotate: 0 },
    { x: 922, y: 507, wire: 0, rotate: 0 },
    { x: 1000, y: 507, wire: 0, rotate: 0 },
    { x: 1035, y: 319, wire: 10, rotate: 0 },
    { x: 627.3, y: 683, wire: 10, rotate: 0 },
    { x: 750, y: 624, wire: 25, rotate: -90 },
    { x: 756, y: 677, wire: 36, rotate: -90 }
  ],
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
    { x: 270, y: 255, wire: 56, rotate: 0, flip: false },
    { x: 270, y: 333, wire: 56, rotate: 0, flip: false },
    { x: 1065, y: 265, wire: 20, rotate: 0, flip: 'x' }
  ]
}

// Build the Amp
function buildAmplifier() {
  ampSpecs.capacitors.forEach(c => {
    addCapacitor(c.x, c.y, c.wire1, c.wire2, c.label);
  })

  ampSpecs.grounds.forEach(g => {
    addGround(g.x, g.y, g.wire, g.rotate);
  })

  ampSpecs.resistors.forEach(res => {
    addResistor(res.x, res.y, res.rotate, res.value, res.valuePosition);
  })
  
  ampSpecs.phoneJacks.forEach(ph => {
    addPhoneJack(ph.x, ph.y, ph.wire, ph.rotate, ph.flip);
  });
}

SVG.on(document, 'DOMContentLoaded', function() {
  buildAmplifier();
  
  function sine(x1, y1, amplitude, frequency, endPoint) {

    // start control point, end control point, final point
    // helpful article on curveto
    // https://www.sitepoint.com/html5-svg-cubic-curves/
    // https://blogs.sitepointstatic.com/examples/tech/svg-curves/cubic-curve.html

    let a = amplitude;
    let f = frequency;
    let end = endPoint;
    let x = x1;
    let y = y1;
    let duration = 1500;
    
    let group = draw.group().attr({ class: 'signal' });

    let cycles = end / f;
    for (let i = 0; i < cycles; i++) {
      if (i > 0) {
        x = i*f;
      }
      let str = `M${x} ${y} c ${f/4*.8} 0, ${f/4*1.2} 0, ${f/2} 0`;
      // let plot = i % 2 ? `M${x+f/2} ${y} c ${f/4*.8} -${a/2}, ${f/4*1.2} -${a/2}, ${f/2} 0` : `M${x+f/2} ${y} c ${f/4*.8} ${a/2}, ${f/4*1.2} ${a/2}, ${f/2} 0`;
      
      group.path(str)
        .fill('none')
        .stroke(amp.path)
        // .animate(duration)
        // .plot(plot)
        // .loop(true, true);
    }

    // negative
    // group.path(`M${x} ${y} c ${f/4*.8} 0, ${f/4*1.2} 0, ${f/2} 0`)
    //   .fill('none')
    //   .stroke(amp.path)
    //   .animate(duration)
    //   .plot(`M${x} ${y} c ${f/4*.8} ${a/2}, ${f/4*1.2} ${a/2}, ${f/2} 0`)
    //   .loop(true, true);
    
    // positive
    // group.path(`M${x+f/2} ${y} c ${f/4*.8} 0, ${f/4*1.2} 0, ${f/2} 0`)
    //   .fill('none')
    //   .stroke(amp.path)
    //   .animate(duration)
    //   .plot(`M${x+f/2} ${y} c ${f/4*.8} -${a/2}, ${f/4*1.2} -${a/2}, ${f/2} 0`)
    //   .loop(true, true);

  }
  sine(10, 250, 10, 20, 1000);


});

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