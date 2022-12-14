import Mouse from './mouse.js';
import Particle from './particles.js';

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 2.1;

const ctx = canvas.getContext('2d');
// const mouse = {
//   x: 0,
//   y: 0,
// };

let mouse = new Mouse(canvas.width / 2, canvas.height / 2);

const particles = [];
const init = () => {
  particles.splice(0);
  for (let i = 0; i < 69; i++) {
    particles.push(new Particle(canvas.width / 2, canvas.height / 2));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(255,255,255,0.06';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => particle.update(mouse));
};

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 2.1;
  init();
});

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

init();
animate();
