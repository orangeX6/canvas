import Particle from './particle';
import Mouse from './mouse';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const mouse = new Mouse(canvas.width / 2, canvas.height / 2);
const particles = [];
let hue = 0;
let hueRadians = 0;

// Animate Loop
const animate = () => {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.ttl < 0) {
      particles.splice(index, 1);
    }
    particle.update();
  });
};

// Rings generation
const generateRing = () => {
  const time = 200; // rate at which particles are generated
  setTimeout(generateRing, 200);

  const particleCount = 50; // Particles per cycle
  hue = Math.abs(Math.sin(hueRadians) * 360); // Hue (always positive)
  const radius = 3; // Particle size
  const velocityX = 2; // Speed of effect (spread X)
  const velocityY = 2; // Speed of effect (spread Y)
  const radian = (Math.PI * 2) / particleCount; // Angle of spawn
  for (let i = 0; i < particleCount; i++) {
    const x = mouse.x;
    const y = mouse.y;
    particles.push(
      new Particle(x, y, radius, `hsl(${hue}, 100% ,50%)`, {
        x: Math.cos(radian * i) * velocityX,
        y: Math.sin(radian * i) * velocityY,
      })
    );
  }

  hueRadians += 0.01;
  //   hue = (hue + 2) % 360;
};

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

animate();
generateRing();
