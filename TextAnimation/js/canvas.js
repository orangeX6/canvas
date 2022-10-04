import Particle from './particle';
import Mouse from './mouse';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const mouse = new Mouse(-100, -100, 250);
const numberOfParticles = 500;
const particles = [];

ctx.fillStyle = 'white';
ctx.font = '30px Bahnschrift';
ctx.fillText('A', 20, 50);
const data = ctx.getImageData(0, 0, 100, 100);

const init = () => {
  particles.splice(0);

  for (let i = 0; i < numberOfParticles; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    particles.push(new Particle(x, y));
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => particle.update(mouse));
};

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

init();
animate();
