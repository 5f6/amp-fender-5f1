// Amplifier Schematic

const nightMode = true;

const amp = {
  path: {
    color: '#777777',
    linecap: 'round',
    linejoin: 'round',
    width: 1.5
  },
  pathSignal: {
    color: '#30d730',
    linecap: 'round',
    linejoin: 'round',
    width: nightMode ? .5 : 2
  },
  text: {
    family: 'Helvetica, sans-serif',
    style: 'italic',
    size: 15,
    fill: nightMode ? 'rgba(255, 255, 255, 0.222)' : '#bbbbbb',
  }
}

let draw = SVG().addTo('body').size('100%', '100%');

// A/C Input
const addAC = () => {
  let g = draw.group().attr({ class: 'plug' });
  
  // housing
  g.path('M 368 634 l 0 -34 c 24 0, 24 34, 0 34').fill('none').stroke(amp.path);
  
  // prongs
  g.path('M 353 610 l 14 0').fill('none').stroke(amp.path);
  g.path('M 353 623 l 14 0').fill('none').stroke(amp.path);
  
  // wires
  g.path('M 385 610 l 72 0, 74 -45, 78 0').fill('none').stroke(amp.path);
  g.path('M 385 623 l 223 0').fill('none').stroke(amp.path);

  // points
  g.circle(6).fill(amp.path.color).move(604, 562);
  g.circle(6).fill(amp.path.color).move(604, 620);
  g.circle(6).fill(amp.path.color).move(636, 562);
  g.circle(6).fill(amp.path.color).move(636, 620);

  // switch
  g.path('M 608 565 l 26 -13, -6 -1, 6 1, -3 6').fill('none').stroke(amp.path)
    // .animate({
    //   duration: 2000,
    //   swing: true,
    //   ease: 'beziere(cubic-bezier(0.05, 0.95, 0.66, 0.79))',
    //   times: Infinity,
    //   wait: 600
    // })
    // .plot('M 608 565 l 32 0, -4 -4, 4 4, -4 4');

  // fuse
  g.path('M 608 623 c 15 -15, 15 15, 30 0').fill('none').stroke(amp.path);
}

// Ground
function addGround(x, y, wire, rotate) {
  let group = draw.group().attr({ class: 'ground' });
  let str = `M${x} ${y} l23 0 M${x+4} ${y+6} l15 0 M${x+8} ${y+12} l7 0 M${x+11} ${y+18} l1 0 M${x+11.5} ${y} l0 -${wire}`;
  group.path(str).fill('none').stroke(amp.path).transform({ rotate: rotate });
}

// Capacitor
function addCapacitor(x, y, wire1, wire2, label, designation) {
  // symbol
  let group = draw.group().attr({ class: 'capacitor', title: designation });
  let str1 = `M${x} ${y} l7 0 l0 -${wire1} l0 ${wire1} l7 0`;
  let str2 = `M${x} ${y + 6} l7 0 l0 ${wire2} l0 -${wire2} l7 0`;
  group.path(str1).fill('none').stroke(amp.path);
  group.path(str2).fill('none').stroke(amp.path);
  
  // text label
  group.plain(label).font(amp.text).attr({ x: x-32, y: y+6 }).transform({ rotate: -90 });
}

// Phone Jack
function addPhoneJack(x, y, wire, degrees, flip) {
  let group = draw.group().attr({ class: 'phone-jack' });
  let str = `M${x} ${y} l14 14 l14 -14 l${wire} 0`;
  group.path(str).fill('none').stroke(amp.path);
  group.transform({ rotate: degrees, flip: flip });
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

// Signal
function signal(x, y, a, f, length, rotate) {
  // a = amplitude
  // f = frequency
  
  let group = draw.group().attr({ class: 'signal' });

  let cycles = length / f;

  let str = `M${x} ${y} `;
  let plot = `M${x} ${y} `;

  for (let i = 1; i < cycles + 1; i++) {
    let cycle = i * f;
    if (cycle < length) {
      str += `c ${f/4*.8} 0, ${f/4*1.2} 0, ${f/2} 0 `;
    }
    if (cycle < length) {
      str += `c ${f/4*.8} 0, ${f/4*1.2} 0, ${f/2} 0`;
    }
    if (cycle < length) {
      plot += `c ${f/4*.8} -${a/2}, ${f/4*1.2} -${a/2}, ${f/2} 0 `;
    }
    if (cycle < length) {
      plot += `c ${f/4*.8} ${a/2}, ${f/4*1.2} ${a/2}, ${f/2} 0`;
    }
  }
  group.path(str)
    .fill('none')
    .stroke(amp.pathSignal)
    .transform({ rotate: rotate })
    .animate({
      duration: 1000,
      swing: true,
      // ease: 'beziere(cubic-bezier(0.05, 0.95, 0.66, 0.79))',
      ease: 'step(5, "jump-end")',
      times: Infinity,
      wait: 400
    })
    .plot(plot)
    .stroke({ width: 1 })

  // group.path(str)
  //   .fill('none')
  //   .stroke(amp.pathSignal)
  //   .transform({ rotate: rotate })
  //   .animate(duration)
  //   .ease('>')
  //   .plot(plot)
  //   .loop(true, true);

}

const ampSpecs = {
  capacitors: [
    { x: 449, y: 377, wire1: 35, wire2: 38, label: '25 - 25', desig: 'C1' },
    { x: 857, y: 358, wire1: 30, wire2: 30, label: '25 - 25', desig: 'C2' },
    { x: 748.5, y: 480, wire1: 25, wire2: 22, label: '8 - 450', desig: 'C3' },
    { x: 926.5, y: 479, wire1: 25, wire2: 22, label: '8 - 450', desig: 'C4' },
    { x: 1005, y: 478, wire1: 25, wire2: 22, label: '16 - 450', desig: 'C5' },
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
    { x: 628, y: 683, wire: 60, rotate: 0 },
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
  ],
  signal: [
    { x: 270, y: 333, a: 6, f: 37, length: 151, rotate: 0 },
    { x: 401, y: 314, a: 5, f: 36, length: 50, rotate: 90 },
    { x: 420, y: 295, a: 5, f: 37, length: 100, rotate: 0 },
    { x: 511, y: 280, a: 40, f: 37, length: 112, rotate: 0 },
    { x: 707, y: 280, a: 40, f: 37, length: 190, rotate: 0 },
    { x: 910, y: 251, a: 150, f: 37, length: 121, rotate: 0 },
  ]
}

// Build the Amp
function buildAmplifier() {
  addAC();

  ampSpecs.capacitors.forEach(c => {
    addCapacitor(c.x, c.y, c.wire1, c.wire2, c.label, c.desig);
  })

  ampSpecs.grounds.forEach(g => {
    addGround(g.x, g.y, g.wire, g.rotate);
  })
  
  ampSpecs.phoneJacks.forEach(ph => {
    addPhoneJack(ph.x, ph.y, ph.wire, ph.rotate, ph.flip);
  });

  ampSpecs.resistors.forEach(res => {
    addResistor(res.x, res.y, res.rotate, res.value, res.valuePosition);
  })
}

function eventListener() {
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
    
    if (event.target.matches('#toggleSignal')) {
      const elements = document.querySelectorAll('.signal');
      
      if (!elements.length > 0) {
        ampSpecs.signal.forEach(s => {
          signal(s.x, s.y, s.a, s.f, s.length, s.rotate);
        });
      } else {
        Array.from(elements).forEach(s => {
          s.remove();
        })
      }
    }

    if (event.target.matches('.highlighter')) {
      event.target.classList.toggle('active');
      const component = event.target.getAttribute('data-component');
      const elements = document.querySelectorAll(`.${component}`);
      
      Array.from(elements).forEach(el => {
        el.classList.toggle('highlighted');
      })
    }
  
  }, false);
}

SVG.on(document, 'DOMContentLoaded', function() {
  buildAmplifier();
  eventListener();
  
  // development only
  if (nightMode) {
    document.querySelector('body').style.cssText = 'background-image: none; background: #111;';
  }
});
