import Particle from './particles.js';
import Mouse from './mouse.js';
import { colorPalettes, randomColor } from './helper.js';

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');
const particles = [];
const mouse = new Mouse(canvas.width / 2, canvas.height / 2);

const animate = () => {
  // particles.length > 4800 ? particles.splice(0, 1600) : '';
  requestAnimationFrame(animate);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.alpha < 0) particles.splice(index, 1);
    particle.update();
  });
};

animate();

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

addEventListener('click', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  const particleCount = 500;
  const angleIncrement = (Math.PI * 2) / particleCount;
  const firePower = 16;
  const radius = 2;
  const randomColorPalette =
    colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
  const colorPalettePick = Math.random() > 0.5 ? true : false;

  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(
        mouse.x,
        mouse.y,
        radius,
        colorPalettePick
          ? randomColor(randomColorPalette)
          : `hsl(${Math.random() * 360},50%,50%)`,
        {
          x: Math.cos(angleIncrement * i) * Math.random() * firePower,
          y: Math.sin(angleIncrement * i) * Math.random() * firePower,
        }
      )
    );
  }
});
