import { randomIntFromRange } from './utils.js';
import Ball from './ball.js';
// import MouseHover from "./mouse";

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');
const maxRadius = 24;
const minBounceHeight = 400;

// Implementation
const balls = [];
function init() {
  balls.splice(0);
  for (let i = 0; i < 666; i++) {
    let x = randomIntFromRange(maxRadius, canvas.width - maxRadius);
    let y = randomIntFromRange(0, minBounceHeight);
    let velX = randomIntFromRange(-2, 2);
    balls.push(new Ball(x, y, velX));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(ball => ball.update());
}

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

addEventListener('click', () => {
  init();
});

init();
animate();
