import Particle from './particle';
import Mouse from './mouse';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const mouse = new Mouse(-100, -100, 150);
const numberOfParticles = 500;
const particles = [];
const hoverColor = `hsla(${Math.random() * 360}, ${Math.random() * 33 + 67}%, ${
  Math.random() * 50 + 50
}%, 0.5)`;
// let adjustX = -20;
// let adjustY = -25;

let sizeX = 15;
let sizeY = 15;
let adjustX = -sizeX * 0.3;
let adjustY = sizeY * 0.5;
ctx.fillStyle = 'white';
ctx.font = '28px Arial Rounded MT';
ctx.fillText('ARCANE', 10, 25);
ctx.font = '20px Segoe Script';
ctx.fillText('COMET', 30, 50);
// ctx.fillText('ARCANE', 10, 50);
const textCoordinates = ctx.getImageData(0, 0, 150, 150);
console.log(textCoordinates);

const init = () => {
  particles.splice(0);

  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      // --------
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        let posX = x + adjustX;
        let posY = y + adjustY;
        console.log(sizeX * sizeX);
        particles.push(new Particle(posX * sizeX, posY * sizeY, hoverColor));
      }
    }
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => particle.update(mouse));
  connect();
};

const connect = () => {
  let opacity = 1;
  particles.forEach((particle, index) => {
    // for (let index = 0; index < array.length; index++) {
    for (let i = index; i < particles.length; i++) {
      let particleB = particles[i];
      let dx = particle.x - particleB.x;
      let dy = particle.y - particleB.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 30) {
        opacity = 1 - distance / 30;
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particleB.x, particleB.y);
        if (particle.distance < mouse.radius) {
          ctx.strokeStyle = hoverColor;
          // ctx.strokeStyle = `hsla(${Math.random() * 50 + 200}, 100%, 75%, 0.5)`;
        }
        ctx.stroke();
        ctx.closePath();
      }
    }
    // }
  });
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
