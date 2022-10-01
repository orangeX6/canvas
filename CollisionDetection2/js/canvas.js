import MouseXY from './mouse.js';
import Particle from './particle.js';
import { randomIntFromRange, getDistance } from './helper.js';

// Global
const canvas = document.querySelector('canvas');
let navHeight = document.querySelector('nav').getBoundingClientRect().height;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - navHeight - 4;
const ctx = canvas.getContext('2d');
let mouse;

// Init function
const particles = [];
const init = () => {
  particles.splice(0);

  for (let i = 0; i < 269; i++) {
    const radius = Math.random() * (16 - 12) + 12;

    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (
          getDistance(x, y, particles[j].x, particles[j].y) -
            (radius + particles[j].radius) <
          0
        ) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);
          j = -1;
        }
      }
    }
    particles.push(new Particle(x, y, radius));
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, innerWidth, innerHeight);
  //   mouse && ctx.fillText("SAKSHI", mouse.x, mouse.y - 40);
  particles.forEach((particle) => particle.update(particles, mouse));
};

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - navHeight - 4;
  init();
});

const onMouseMove = (e) => {
  mouse = new MouseXY(e.x, e.y);
};

window.addEventListener('mousemove', onMouseMove);

init();
animate();
