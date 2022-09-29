const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const randomizeButton = document.getElementById('randomizeButton');
const details = document.getElementById('details');

// settings variables
let size =
  canvas.width < canvas.height ? canvas.width * 0.25 : canvas.height * 0.25;
let branches = 2;
let maxLevel = 4;
let sides = 5;
let spread = 0.5;
let scale = 0.5;
let hue = 200;
let saturation = 100;
let lightness = 50;
let color = `hsl(200, 100%, 50%)`;
let lineWidth = Math.floor(Math.random() * 10 + 10);
let branchDir = 0;
let displayCircles = 1;

// let shadowColor = `hsla(200, 100%, 50%, 0.7)`;
let shadowColor = `hsla(0, 0%, 0%, 0.7)`;
let backgroundColor = `hsl(0, 0%, 0%)`;
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 5;

// canvas values
ctx.lineCap = 'round';
ctx.fillStyle = backgroundColor;

// Drawing individual branch
const drawBranch = (level) => {
  if (level > maxLevel) return;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();

  for (let i = 0; i < branches; i++) {
    if (branchDir === 0 || branchDir === 1) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.scale(scale, scale);
      ctx.rotate(spread);
      drawBranch(level + 1);
      ctx.restore();
    }

    if (branchDir === 0 || branchDir === -1) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.rotate(-spread);
      ctx.scale(scale, scale);
      drawBranch(level + 1);
      ctx.restore();
    }

    if (displayCircles === 1) {
      ctx.beginPath();
      ctx.arc(0, size, size * 0.1, 0, Math.PI * 2, false);
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
    ctx.rotate((Math.PI * 2) / sides);
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
  branches: ${branches}
  `;
};

// Event Listeners
// Resize Canvas on change in screen
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  size =
    canvas.width < canvas.height ? canvas.width * 0.25 : canvas.height * 0.25;
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

const sliderBranchDir = document.getElementById('branch-direction');
const labelBranchDir = document.querySelector('[for = "branch-direction"]');

const sliderMaxLevel = document.getElementById('max-level');
const labelMaxLevel = document.querySelector('[for = "max-level"]');

const sliderBranches = document.getElementById('branches');
const labelBranches = document.querySelector('[for = "branches"]');

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
  displayCircles = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

sliderBranchDir.addEventListener('change', (e) => {
  branchDir = e.target.valueAsNumber;
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

sliderBranches.addEventListener('change', (e) => {
  branches = e.target.valueAsNumber;
  drawFractal();
  getDetails();
  updateSliders();
});

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

  sliderLineWidth.value = lineWidth;
  labelLineWidth.innerText = 'lineWidth: ' + lineWidth;

  sliderBranchDir.value = branchDir;
  labelBranchDir.innerText = 'Br. Direction: ' + branchDir;

  sliderMaxLevel.value = maxLevel;
  labelMaxLevel.innerText = 'Max Level: ' + maxLevel;

  sliderBranches.value = branches;
  labelBranches.innerText = 'Branches: ' + branches;

  randomizeButton.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%,0.8)`;
  randomizeButton.style.color = lightness > 75 ? '#000' : '#fff';
};
