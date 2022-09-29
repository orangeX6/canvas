const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const randomizeButton = document.getElementById('randomizeButton');
const details = document.getElementById('details');

// settings variables
let size =
  canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
let branches = 1;
let maxLevel = 12;
let sides = 10;
let spread = -0.2;
let scale = 0.85;
let lineWidth = 15;
let displayCircles = 1;
let circleRadius = 40;

let hue = 200;
let saturation = 100;
let lightness = 50;
let color = `hsl(200, 100%, 50%)`;

let shadowColor = `hsla(0, 0%, 0%, 0.7)`;
let backgroundColor = `hsl(0, 0%, 0%)`;
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 5;

// bezier - curve init
let pointX = 0;
let pointY = size;
let ctrl1X = 0;
let ctrl1Y = size * spread * -3;
let ctrl2X = size * 5;
let ctrl2Y = size * 10 * spread;
let endX = 300;
let endY = -80;

// canvas values
ctx.lineCap = 'round';
ctx.fillStyle = backgroundColor;
const drawBranch = (level) => {
  if (level > maxLevel) return;
  ctx.beginPath();
  ctx.moveTo(pointX, pointY);
  ctx.bezierCurveTo(ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, endX, endY);

  ctx.lineTo(size, 0);
  ctx.stroke();

  for (let i = 0; i < branches; i++) {
    ctx.save();
    ctx.translate(pointX, pointY);
    ctx.scale(scale, scale);
    ctx.rotate(spread);
    drawBranch(level + 1);
    ctx.restore();

    if (displayCircles === 1) {
      ctx.beginPath();
      ctx.arc(-size / 2, 20, circleRadius, 0, Math.PI * 2, false);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
};

// Drawing fractals combining multiple branches
const drawFractal = () => {
  ctx.save();
  color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  ctx.strokeStyle = color;
  ctx.shadowColor = `hsla(0, 0%, 0%, 0.7)`;

  ctx.lineWidth = lineWidth;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);

  for (var i = 0; i < sides; i++) {
    ctx.scale(0.95, 0.95);
    ctx.rotate((Math.PI * 6) / sides);
    drawBranch(0);
  }

  ctx.restore();
};
drawFractal();

// controls
const randomizeFractals = () => {
  hue = Math.random() * 360;
  saturation = 100;
  lightness = 50;
  sides = Math.floor(Math.random() * (9 - 2) + 3);
  scale = Math.random() * 0.5 + 0.3;
  spread = Math.random() * 3.1 + 0.1;
  lineWidth = Math.floor(Math.random() * 15 + 5);
  shadowColor = `hsla(0, 0%, 0%, 0.7)`;
  displayCircles = Math.floor(Math.random() * 2);
  randomizeButton.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%,0.8)`;
};

// details
const getDetails = () => {
  details.innerHTML = `
  hue: ${hue}  
  sides: ${sides}
  scale: ${scale}
  spread: ${spread}
  lineWidth: ${lineWidth}
  maxLevel: ${maxLevel}
  `;
};

// Event Listeners
// Resize Canvas on change in screen
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  size =
    canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
  ctx.shadowColor = `hsla(0, 0%, 0%, 0.7)`;
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  drawFractal();
});

//Controls
// Randomize (AUTO)
randomizeButton.addEventListener('click', () => {
  randomizeFractals();
  drawFractal();
  getDetails();
  updateSliders();
});

// Manual Control
const sliderHue = document.getElementById('hue');
const labelHue = document.querySelector('[for = "hue"]');
const sliderSaturation = document.getElementById('saturation');
const labelSaturation = document.querySelector('[for = "saturation"]');
const sliderLightness = document.getElementById('lightness');
const labelLightness = document.querySelector('[for = "lightness"]');

const sliderSpread = document.getElementById('spread');
const labelSpread = document.querySelector('[for = "spread"]');

const sliderSides = document.getElementById('sides');
const labelSides = document.querySelector('[for = "sides"]');

const sliderScale = document.getElementById('scale');
const labelScale = document.querySelector('[for = "scale"]');

const sliderLineWidth = document.getElementById('line-width');
const labelLineWidth = document.querySelector('[for = "line-width"]');

const sliderCircle = document.getElementById('circles');
const labelCircle = document.querySelector('[for = "circles"]');

const sliderRadius = document.getElementById('radius');
const labelRadius = document.querySelector('[for = "radius"]');

const sliderMaxLevel = document.getElementById('max-level');
const labelMaxLevel = document.querySelector('[for = "max-level"]');

// Update Sliders
const updateSliders = () => {
  sliderSpread.value = spread;
  labelSpread.innerText = 'Spread: ' + spread.toFixed(2);

  sliderHue.value = hue;
  labelHue.innerText = 'Hue: ' + hue.toFixed(0);
  sliderSaturation.value = saturation;
  labelSaturation.innerText = 'Saturation: ' + saturation.toFixed(0);
  sliderLightness.value = lightness;
  labelLightness.innerText = 'Lightness: ' + lightness.toFixed(0);

  sliderSides.value = sides;
  labelSides.innerText = 'Sides: ' + sides;

  sliderScale.value = scale;
  labelScale.innerText = 'Scale: ' + scale.toFixed(2);

  sliderRadius.value = circleRadius;
  labelRadius.innerText = 'Circle Radius: ' + circleRadius;

  sliderLineWidth.value = lineWidth;
  labelLineWidth.innerText = 'lineWidth: ' + lineWidth;

  sliderMaxLevel.value = maxLevel;
  labelMaxLevel.innerText = 'Max Level: ' + maxLevel;

  randomizeButton.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%,0.8)`;
  randomizeButton.style.color = lightness > 75 ? '#000' : '#fff';
};

//Event Listeners
sliderHue.addEventListener('change', (e) => {
  hue = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

sliderSaturation.addEventListener('change', (e) => {
  saturation = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});
sliderLightness.addEventListener('change', (e) => {
  lightness = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

sliderSides.addEventListener('change', (e) => {
  sides = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

sliderScale.addEventListener('change', (e) => {
  scale = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

sliderSpread.addEventListener('change', (e) => {
  spread = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

sliderLineWidth.addEventListener('change', (e) => {
  lineWidth = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

sliderCircle.addEventListener('change', (e) => {
  circleRadius = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

sliderRadius.addEventListener('change', (e) => {
  circleRadius = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

sliderMaxLevel.addEventListener('change', (e) => {
  maxLevel = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

// #################################
// #################################

// BEZIER CONTROLS
const sliderCtrlPt1X = document.getElementById('ctrl1X');
const labelCtrlPt1X = document.querySelector('[for = "ctrl1X"]');
const sliderCtrlPt1Y = document.getElementById('ctrl1Y');
const labelCtrlPt1Y = document.querySelector('[for = "ctrl1Y"]');

const sliderCtrlPt2X = document.getElementById('ctrl2X');
const labelCtrlPt2X = document.querySelector('[for = "ctrl2X"]');
const sliderCtrlPt2Y = document.getElementById('ctrl2Y');
const labelCtrlPt2Y = document.querySelector('[for = "ctrl2Y"]');

const sliderEndPtX = document.getElementById('endX');
const labelEndPtX = document.querySelector('[for = "endX"]');
const sliderEndPtY = document.getElementById('endY');
const labelEndPtY = document.querySelector('[for = "endY"]');

// const sliderCircle = document.getElementById('circles');
// const labelCircle = document.querySelector('[for = "circles"]');

// const sliderRadius = document.getElementById('radius');
// const labelRadius = document.querySelector('[for = "radius"]');

// const sliderMaxLevel = document.getElementById('max-level');
// const labelMaxLevel = document.querySelector('[for = "max-level"]');

const updateBezier = () => {
  sliderCtrlPt1X.value = ctrl1X;
  labelCtrlPt1X.innerText = 'Ctrl Pt 1 X: ' + ctrl1X.toFixed(2);
  sliderCtrlPt1Y.value = ctrl1Y;
  labelCtrlPt1Y.innerText = 'Ctrl Pt 1 Y: ' + ctrl1Y.toFixed(2);

  sliderCtrlPt2X.value = ctrl2X;
  labelCtrlPt2X.innerText = 'Ctrl Pt 2 X: ' + ctrl2X.toFixed(2);
  sliderCtrlPt2Y.value = ctrl2Y;
  labelCtrlPt2Y.innerText = 'Ctrl Pt 2 Y: ' + ctrl2Y.toFixed(2);

  sliderEndPtX.value = endX;
  labelEndPtX.innerText = 'End Pt X: ' + endX.toFixed(2);
  sliderEndPtY.value = endY;
  labelEndPtY.innerText = 'End Pt Y: ' + endY.toFixed(2);
};

//event listeners
sliderCtrlPt1X.addEventListener('change', (e) => {
  ctrl1X = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateBezier();
});
sliderCtrlPt1Y.addEventListener('change', (e) => {
  ctrl1Y = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateBezier();
});
sliderCtrlPt2X.addEventListener('change', (e) => {
  ctrl2X = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateBezier();
});
sliderCtrlPt2Y.addEventListener('change', (e) => {
  ctrl2Y = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateBezier();
});

sliderEndPtX.addEventListener('change', (e) => {
  endX = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateBezier();
});
sliderEndPtY.addEventListener('change', (e) => {
  endY = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateBezier();
});
