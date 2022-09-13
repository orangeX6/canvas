import Circle from './circle.js';
import MouseHover from './mouseHover.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
let mouse;
const circleArray = [];
for (let i = 0; i < 969; i++) {
  circleArray.push(new Circle());
}

// const init = () => {
//   circleArray.splice(0);
//   for (let i = 0; i < 669; i++) {
//     circleArray.push(new Circle());
//   }
// };

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  circleArray.forEach(circle => circle.update(mouse));
};

// setInterval(animate, 10);
const onMouseMove = e => {
  mouse = new MouseHover(e.x, e.y);
  // console.log(mouse);
};

window.addEventListener('mousemove', onMouseMove);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // init();
});

// init();
animate();
