// ------ ACTUAL PROJECT ------\\
import Circle from './circle.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const circleArray = [];
for (let i = 0; i < 300; i++) {
  circleArray.push(new Circle());
}

// const trailBlaze = [];
// for (let i = 0; i < 25; i++) {
//   trailBlaze.push(
//     new Circle(12, `rgba(255,0,0,${i / 25})`, 500 + i * 2, 500 + i * 2, 3, 3)
//   );
// }

function animate() {
  // requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  circleArray.forEach(circle => circle.update());
  // trailBlaze.forEach((circle, index) => circle.update());
}

setInterval(animate, 10);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
