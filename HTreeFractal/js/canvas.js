const root = document.documentElement;
const generateTree = document.getElementById('generate-tree');
const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');

// Variables

let startX = canvas.width / 2;
let startY = canvas.height - 80;
let len = 150;
let angle = 0;
let branchWidth = 30;
let strokeColor = 'hsl(25, 76%, 31%)';
let fillColor = 'hsl(120, 100%, 25%)';

let curve = 10;
let curve2 = 10;
let curve3 = 0;

//colors
let strokeRed = 139;
let strokeGreen = 69;
let strokeBlue = 19;
let fillRed = 1;
let fillGreen = 128;
let fillBlue = 1;
let backgroundHue = 0;
let backgroundSaturation = 50;
let backgroundLightness = 100;

// Draw Function
const drawTree = (
  startX,
  startY,
  len,
  angle,
  branchWidth,
  strokeColor,
  fillColor
) => {
  ctx.beginPath();

  ctx.save();
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.shadowBlur = 15;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY); // move  canvas to startX, startY coords
  ctx.rotate((angle * Math.PI) / 180); // converts degrees to radians
  ctx.moveTo(0, 0);
  // ctx.lineTo(0, -len);

  angle > 0
    ? ctx.bezierCurveTo(curve3, -len / 2, curve3, -len / 2, 0, -len)
    : ctx.bezierCurveTo(curve3, -len / 2, -curve3, -len / 2, 0, -len);
  ctx.stroke();

  if (len < 8) {
    // leafs
    ctx.beginPath();
    ctx.arc(0, -len, 10, 0, Math.PI / 2, false);
    // ctx.shadowColor = fillColor;
    // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    // ctx.shadowBlur = 15;
    ctx.fill();
    ctx.restore();
    return;
  }

  drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.6);
  drawTree(0, -len, len * 0.75, angle - curve2, branchWidth * 0.6);

  ctx.restore();
};

// Calling Draw
drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);

// creating a leaf
// ctx.beginPath();
// // ctx.moveTo(50, 50);
// // ctx.lineTo(100, 100);
// ctx.arc(50, 50, 50, 0, Math.PI / 2, false);
// ctx.arc(100, 100, 50, Math.PI, Math.PI * 1.5, false);
// ctx.strokeStyle = 'pink';
// ctx.stroke();
// ctx.fillStyle = 'salmon';
// ctx.fill();
// ctx.closePath();

const generateRandomTree = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //startX, startY, len, angle, branchWidth, strokeColor, fillColor
  startX = canvas.width / 2;
  startY = canvas.height - 80;
  len = Math.floor(Math.random() * 20 + 200);
  angle = 0;
  branchWidth = Math.random() * 180 + 1;

  //colors
  strokeRed = Math.random() * 255;
  strokeGreen = Math.random() * 255;
  strokeBlue = Math.random() * 255;
  strokeColor = `rgb(${strokeRed}, ${strokeGreen}, ${strokeBlue})`;
  fillRed = Math.random() * 255;
  fillGreen = Math.random() * 255;
  fillBlue = Math.random() * 255;
  fillColor = `rgb(${fillRed}, ${fillGreen}, ${fillBlue})`;
  updateColorSliders();

  curve = Math.random() * 20 + 10;
  curve2 = Math.random() * 20 + 10;
  curve3 = Math.random() * 50;

  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
  generateTree.style.setProperty('background', strokeColor);
};

generateTree.addEventListener('click', () => {
  generateRandomTree();
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  drawTree(
    canvas.width / 2,
    canvas.height - 80,
    150,
    0,
    30,
    'saddlebrown',
    'green'
  );
  generateTree.style.setProperty('background', 'saddlebrown');
});

// COLOR EVENTS
// Update Colors
const updateColorSliders = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  strokeSliderRed.value = strokeRed;
  strokeLabelRed.innerText = 'Red: ' + strokeRed.toFixed(0);
  strokeSliderGreen.value = strokeGreen;
  strokeLabelGreen.innerText = 'Green: ' + strokeGreen.toFixed(0);
  strokeSliderBlue.value = strokeBlue;
  strokeLabelBlue.innerText = 'Blue: ' + strokeBlue.toFixed(0);

  fillSliderRed.value = fillRed;
  fillLabelRed.innerText = 'Red: ' + fillRed.toFixed(0);
  fillSliderGreen.value = fillGreen;
  fillLabelGreen.innerText = 'Green: ' + fillGreen.toFixed(0);
  fillSliderBlue.value = fillBlue;
  fillLabelBlue.innerText = 'Blue: ' + fillBlue.toFixed(0);

  backgroundSliderHue.value = backgroundHue;
  backgroundLabelHue.innerText = 'Hue: ' + backgroundHue.toFixed(0);
  backgroundSliderSaturation.value = backgroundSaturation;
  backgroundLabelSaturation.innerText =
    'Saturation: ' + backgroundSaturation.toFixed(0);
  backgroundSliderLightness.value = backgroundLightness;
  backgroundLabelLightness.innerText =
    'Lightness: ' + backgroundLightness.toFixed(0);

  strokeColor = `rgb(${strokeRed}, ${strokeGreen},${strokeBlue})`;
  fillColor = `rgb(${fillRed}, ${fillGreen},${fillBlue})`;
  backgroundColor = `hsl(${backgroundHue}, ${backgroundSaturation}%,${backgroundLightness}%)`;
  generateTree.style.setProperty('background', strokeColor);
  root.style.setProperty('--background-color', backgroundColor);
};

const strokeSliderRed = document.getElementById('redS');
const strokeLabelRed = document.querySelector('[for = "redS"]');
const strokeSliderGreen = document.getElementById('greenS');
const strokeLabelGreen = document.querySelector('[for = "greenS"]');
const strokeSliderBlue = document.getElementById('blueS');
const strokeLabelBlue = document.querySelector('[for = "blueS"]');

const fillSliderRed = document.getElementById('redF');
const fillLabelRed = document.querySelector('[for = "redF"]');
const fillSliderGreen = document.getElementById('greenF');
const fillLabelGreen = document.querySelector('[for = "greenF"]');
const fillSliderBlue = document.getElementById('blueF');
const fillLabelBlue = document.querySelector('[for = "blueF"]');

const backgroundSliderHue = document.getElementById('hueBg');
const backgroundLabelHue = document.querySelector('[for = "hueBg"]');
const backgroundSliderSaturation = document.getElementById('saturationBg');
const backgroundLabelSaturation = document.querySelector(
  '[for = "saturationBg"]'
);
const backgroundSliderLightness = document.getElementById('lightnessBg');
const backgroundLabelLightness = document.querySelector(
  '[for = "lightnessBg"]'
);

//Event Listeners
strokeSliderRed.addEventListener('change', (e) => {
  strokeRed = e.target.valueAsNumber;
  updateColorSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});
strokeSliderGreen.addEventListener('change', (e) => {
  strokeGreen = e.target.valueAsNumber;
  updateColorSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});
strokeSliderBlue.addEventListener('change', (e) => {
  strokeBlue = e.target.valueAsNumber;
  updateColorSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

fillSliderRed.addEventListener('change', (e) => {
  fillRed = e.target.valueAsNumber;
  updateColorSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});
fillSliderGreen.addEventListener('change', (e) => {
  fillGreen = e.target.valueAsNumber;
  updateColorSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});
fillSliderBlue.addEventListener('change', (e) => {
  fillBlue = e.target.valueAsNumber;
  updateColorSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

backgroundSliderHue.addEventListener('change', (e) => {
  backgroundHue = e.target.valueAsNumber;
  updateColorSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});
backgroundSliderSaturation.addEventListener('change', (e) => {
  backgroundSaturation = e.target.valueAsNumber;
  updateColorSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});
backgroundSliderLightness.addEventListener('change', (e) => {
  backgroundLightness = e.target.valueAsNumber;
  updateColorSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});
