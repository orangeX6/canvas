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
  for (let i = 0; i < 1080; i++) {
    particles.push(new Particle(canvas.width / 2, canvas.height / 2));
  }
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 300);
};

let reqId;
const animate = () => {
  if (reqId) cancelAnimationFrame(reqId);
  reqId = requestAnimationFrame(animate);

  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(18,18,18,0.69)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => particle.update(false));
  // console.log(particles[0]);
};

const rotate = () => {
  if (reqId) cancelAnimationFrame(reqId);
  reqId = requestAnimationFrame(rotate);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(10,10,10,0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => particle.update(true));
  // console.log(particles[0]);
};

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 2.1;
  init();
});

window.addEventListener('mouseup', animate);
window.addEventListener('mousedown', rotate);

init();
animate();
