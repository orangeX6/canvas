import Paddle from './paddle';
import Ball from './ball';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;

const paddle1 = new Paddle({
  position: {
    x: 10,
    y: 100,
  },
});
const paddle2 = new Paddle({
  position: {
    x: canvas.width - 20,
    y: 100,
  },
});
const ball = new Ball({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
  radius: 5,
});

paddle1.draw();
paddle2.draw();
ball.draw();

const animate = () => {
  ctx.fillStyle = `rgba(0,0,0,0.15)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  ctx.fillStyle = `rgb(255,255,255)`;
  ctx.fillText('Score', canvas.width / 2 - 5, 10);
  ctx.fillText(paddle1.score, canvas.width / 2 - 100, 30);
  ctx.fillText(paddle2.score, canvas.width / 2 + 100, 30);
  paddle1.update();
  paddle2.update();
  ball.update(paddle1, paddle2);
};

animate();

addEventListener('keydown', (e) => {
  const speed = 3;
  switch (e.key) {
    case 'w':
      //go up
      paddle1.velocity.y = -speed;
      break;
    case 's':
      //go down
      paddle1.velocity.y = speed;
      break;
    case 'ArrowUp':
      //go up
      paddle2.velocity.y = -speed;
      break;
    case 'ArrowDown':
      paddle2.velocity.y = speed;
      break;
    default:
      break;
  }
});

addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
