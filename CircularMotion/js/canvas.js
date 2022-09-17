import Mouse from './mouse.js';
import Particle from './particles.js';

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 2.1;

const ctx = canvas.getContext('2d');
let mouse;

const particles = [];
const init = () => {
  particles.splice(0);
  for (let i = 0; i < 1; i++) {
    particles.push(
      new Particle(canvas.width / 2, canvas.height / 2, 5, 'blue')
    );
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => particle.update());
  // console.log(particles[0]);
};

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 2.1;
  init();
});

window.addEventListener('mousemove', (e) => {
  mouse = new Mouse(e.x, e.y);
});

init();
animate();
