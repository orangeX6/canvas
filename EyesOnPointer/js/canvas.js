import Eye from './eye.js';
import Mouse from './mouse.js';
import { getDistance, randomIntFromRange } from './helper.js';

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const randomizeButton = document.getElementById('randomize');

const ctx = canvas.getContext('2d');
const eyes = [];
const mouse = new Mouse(canvas.width / 2, canvas.height / 2);
let minRadius = 10;
let maxRadius = 75;
let numberOfEyes = 200;

// let angle = 0;
// let hue = 0;

const init = () => {
  eyes.splice(0);
  let overlapping = false;
  const protection = 10000;
  let counter = 0;
  while (eyes.length < numberOfEyes && counter < protection) {
    const eye = {
      // radius: Math.floor(Math.random() * 100) + 10,
      radius: randomIntFromRange(minRadius, maxRadius),
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    };

    overlapping = false;
    for (let i = 0; i < eyes.length; i++) {
      let prevEye = eyes[i];
      let distance = getDistance(eye.x, eye.y, prevEye.x, prevEye.y);

      if (distance < eye.radius + prevEye.radius) {
        overlapping = true;
        break;
      }
    }
    !overlapping && eyes.push(new Eye(eye.x, eye.y, eye.radius));
    counter++;
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  eyes.forEach((eye) => eye.update(mouse));
};

init();
animate();

// Listeners
let timer;
function resizeWindow() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
}
addEventListener('resize', () => {
  clearTimeout(timer);
  timer = setTimeout(resizeWindow, 500);
});

addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

randomizeButton.addEventListener('click', () => {
  minRadius = Math.random() * 50;
  maxRadius = Math.random() * 150;

  minRadius > maxRadius
    ? ([minRadius, maxRadius] = [minRadius, maxRadius])
    : '';

  console.log(minRadius, maxRadius);
  init();
});

const sliderCount = document.getElementById('count');
const labelCount = document.querySelector('[for = "count"]');

sliderCount.addEventListener('change', (e) => {
  numberOfEyes = e.target.valueAsNumber;
  init();

  sliderCount.value = numberOfEyes;
  labelCount.innerText = 'Eyes: ' + numberOfEyes;
});
