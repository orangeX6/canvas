import gsap from 'gsap';
import Particle from './particles.js';
import Mouse from './mouse.js';
import { colorPalettes, randomColor } from './helper.js';

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');
const particles = [];
const mouse = new Mouse(canvas.width / 2, canvas.height / 2);
let angle = 0;
let hue = 0;

const init = () => {
  particles.splice(0);
  const particleCount = 300;
  let hueIncrement = 360 / particleCount;

  const baseRadius = 130;
  let radiusIncrement = baseRadius / particleCount;

  for (let i = 0; i < particleCount; i++) {
    const x = canvas.width / 2 + i * Math.cos(1);
    const y = canvas.height / 2 + i * Math.sin(-1);

    particles.push(new Particle(x, y, 4, `hsl(${hue},75%,60%)`, i));
    hue += hueIncrement;
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => particle.update(angle));
};

init();
animate();

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

addEventListener('mousemove', (e) => {
  gsap.to(mouse, {
    x: e.x - canvas.width / 2,
    y: e.y - canvas.height / 2,
    duration: 1,
  });
  // mouse.x = e.x - canvas.width / 2;
  // mouse.y = e.y - canvas.height / 2;
  angle = Math.atan2(mouse.y, mouse.x);
});
