import Particle from './particles.js';

import Mouse from './mouse.js';
import { colorPalettes, getDistance } from './helper.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const particles = [];
let radians = 0;
let alpha = 1;
let mouseDown = false;

const color = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
// console.log(color);
// Init function
const init = () => {
  particles.splice(0);

  for (let i = 0; i < 1080; i++) {
    const largerSide =
      canvas.width > canvas.height ? canvas.width : canvas.height;

    const x = Math.random() * largerSide - largerSide / 2;
    const y = Math.random() * largerSide - largerSide / 2;
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
  radians += 0.002;

  if (mouseDown) radians += 0.005;
  if (mouseDown && alpha > 0.03) alpha -= 0.009;
  if (!mouseDown && alpha < 1) {
    alpha += 0.002;
  }
};

window.addEventListener('mousedown', () => {
  mouseDown = true;
});
window.addEventListener('mouseup', () => {
  mouseDown = false;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
