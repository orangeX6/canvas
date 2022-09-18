import Particle from './particles.js';
import Mouse from './mouse.js';
import { randomIntFromRange, getDistance } from './helper.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 3.6;

const ctx = canvas.getContext('2d');
const particles = [];
let radians = 0;
let alpha = 1;
let mouseDown = false;
const colorPalettes = [
  ['#f0e9ca', '#43a9e7', '#3c86d4', '#3447bb', '#abbcef', '#DBF227'],
  ['#fe5464', '#fe8cb3', '#D9D9D9', '#A6A6A6', '#8C8C8C', '#F2F2F2'],
  ['#37e6dd', '#0AA605', '#F2B705', '#F25C05', '#F21616'],
];
const color = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

// Init function
const init = () => {
  particles.splice(0);

  for (let i = 0; i < 1080; i++) {
    const canvasWidth = canvas.width + 300;
    const canvasHeight = canvas.height + 400;
    const x = Math.random() * canvasWidth - canvasWidth / 2;
    const y = Math.random() * canvasHeight - canvasHeight / 2;
    particles.push(new Particle(x, y, color));
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(radians);
  particles.forEach((particle) => particle.update());
  ctx.restore();
  radians += 0.008;

  if (mouseDown && alpha > 0.03) alpha -= 0.01;
  if (!mouseDown && alpha < 1) alpha += 0.01;
};

window.addEventListener('mousedown', () => {
  mouseDown = true;
});
window.addEventListener('mouseup', () => {
  mouseDown = false;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 3.6;
  init();
});

init();
animate();
