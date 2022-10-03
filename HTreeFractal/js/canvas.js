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
let backgroundColor = 'hsl(0, 100%, 100%)';

let rightCurve = 10;
let leftCurve = 10;
let bezierCurve = 0;
let leafDensity = 8;
let leaves = 1;
let leafSize = 10;
let leftBranchScaling = 0.75;
let rightBranchScaling = 0.75;
let branchWidthScale = 0.6;

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
    ? ctx.bezierCurveTo(bezierCurve, -len / 2, bezierCurve, -len / 2, 0, -len)
    : ctx.bezierCurveTo(bezierCurve, -len / 2, -bezierCurve, -len / 2, 0, -len);
  ctx.stroke();

  if (len < leafDensity) {
    // leafs
    if (leaves === 1) {
      ctx.beginPath();
      ctx.arc(0, -len, leafSize, 0, Math.PI / 2, false);
      ctx.shadowColor = 'fillColor';
      ctx.shadowBlur = 15;
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  drawTree(
    0,
    -len,
    len * rightBranchScaling,
    angle + rightCurve,
    branchWidth * branchWidthScale
  );
  drawTree(
    0,
    -len,
    len * leftBranchScaling,
    angle - leftCurve,
    branchWidth * branchWidthScale
  );

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
  branchWidth = Math.random() * 120 + 1;

  //colors
  strokeRed = Math.random() * 255;
  strokeGreen = Math.random() * 255;
  strokeBlue = Math.random() * 255;
  strokeColor = `rgb(${strokeRed}, ${strokeGreen}, ${strokeBlue})`;
  fillRed = Math.random() * 255;
  fillGreen = Math.random() * 255;
  fillBlue = Math.random() * 255;
  fillColor = `rgb(${fillRed}, ${fillGreen}, ${fillBlue})`;
  backgroundHue = Math.random() * 360;
  backgroundSaturation = Math.random() * 50 + 50;
  backgroundLightness = Math.random() * 25 + 75;
  backgroundColor = `rgb(${backgroundHue}, ${backgroundSaturation}%, ${backgroundLightness}%)`;
  updateColorSliders();

  rightCurve = Math.random() * 30;
  leftCurve = Math.random() * 30;
  bezierCurve = Math.random() * 20;
  leafSize = Math.random() * 8 + 6;
  branchWidthScale = Math.random() * 0.4 + 0.4;
  leafDensity = 8;

  updateControlSliders();

  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
  generateTree.style.setProperty('background', strokeColor);
};

generateTree.addEventListener('click', () => {
  generateRandomTree();
});

// MANUAL CONTROLS
const updateControlSliders = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sliderHeight.value = len;
  labelHeight.innerText = 'Height: ' + len.toFixed(0);

  sliderWidth.value = branchWidth;
  labelWidth.innerText = 'Width: ' + branchWidth.toFixed(0);

  sliderAngle.value = angle;
  labelAngle.innerText = 'Angle: ' + angle.toFixed(0);

  sliderLeftCurve.value = leftCurve;
  labelLeftCurve.innerText = 'Left Curve: ' + leftCurve.toFixed(0);

  sliderRightCurve.value = rightCurve;
  labelRightCurve.innerText = 'Right Curve: ' + rightCurve.toFixed(0);

  sliderBezierCurve.value = bezierCurve;
  labelBezierCurve.innerText = 'Bezier Curve: ' + bezierCurve.toFixed(0);

  sliderLeaves.value = leaves;
  labelLeaves.innerText = 'Leaves: ' + leaves.toFixed(0);

  sliderLeafDensity.value = leafDensity;
  labelLeafDensity.innerText = 'Leaf Density: ' + leafDensity.toFixed(0);

  sliderLeafSize.value = leafSize;
  labelLeafSize.innerText = 'Leaf Size: ' + leafSize.toFixed(0);

  sliderLeftBranchScaling.value = leftBranchScaling;
  labelLeftBranchScaling.innerText =
    'L. Br. Scaling: ' + leftBranchScaling.toFixed(2);

  sliderRightBranchScaling.value = rightBranchScaling;
  labelRightBranchScaling.innerText =
    'R. Br. Scaling: ' + rightBranchScaling.toFixed(2);

  sliderBranchWidthScale.value = branchWidthScale;
  labelBranchWidthScale.innerText =
    'Br. width Scale: ' + branchWidthScale.toFixed(2);
};

// get inputs
const sliderHeight = document.getElementById('height');
const labelHeight = document.querySelector('[for = "height"]');
const sliderWidth = document.getElementById('width');
const labelWidth = document.querySelector('[for = "width"]');
const sliderAngle = document.getElementById('angle');
const labelAngle = document.querySelector('[for = "angle"]');
const sliderLeftCurve = document.getElementById('left-curve');
const labelLeftCurve = document.querySelector('[for = "left-curve"]');
const sliderRightCurve = document.getElementById('right-curve');
const labelRightCurve = document.querySelector('[for = "right-curve"]');
const sliderBezierCurve = document.getElementById('bezier-curve');
const labelBezierCurve = document.querySelector('[for = "bezier-curve"]');
const sliderLeaves = document.getElementById('leaves');
const labelLeaves = document.querySelector('[for = "leaves"]');
const sliderLeafDensity = document.getElementById('leaf-density');
const labelLeafDensity = document.querySelector('[for = "leaf-density"]');
const sliderLeafSize = document.getElementById('leaf-size');
const labelLeafSize = document.querySelector('[for = "leaf-size"]');
const sliderLeftBranchScaling = document.getElementById('left-branch-scaling');
const labelLeftBranchScaling = document.querySelector(
  '[for = "left-branch-scaling"]'
);
const sliderRightBranchScaling = document.getElementById(
  'right-branch-scaling'
);
const labelRightBranchScaling = document.querySelector(
  '[for = "right-branch-scaling"]'
);
const sliderBranchWidthScale = document.getElementById('br-wd-scale');
const labelBranchWidthScale = document.querySelector('[for = "br-wd-scale"]');

//Event Listeners
sliderHeight.addEventListener('change', (e) => {
  len = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderWidth.addEventListener('change', (e) => {
  branchWidth = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderAngle.addEventListener('change', (e) => {
  angle = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderLeftCurve.addEventListener('change', (e) => {
  leftCurve = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderRightCurve.addEventListener('change', (e) => {
  rightCurve = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderBezierCurve.addEventListener('change', (e) => {
  bezierCurve = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderLeaves.addEventListener('change', (e) => {
  leaves = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderLeafDensity.addEventListener('change', (e) => {
  leafDensity = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderLeafSize.addEventListener('change', (e) => {
  leafSize = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderLeftBranchScaling.addEventListener('change', (e) => {
  leftBranchScaling = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderRightBranchScaling.addEventListener('change', (e) => {
  rightBranchScaling = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
});

sliderBranchWidthScale.addEventListener('change', (e) => {
  branchWidthScale = e.target.valueAsNumber;
  updateControlSliders();
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
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
