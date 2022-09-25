const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth * 0.8;
canvas.height = innerHeight * 0.8;

let size = 400;
let sides = 5;
let maxLevel = 25;

ctx.fillStyle = 'hotpink';
ctx.strokeStyle = 'yellow';
ctx.lineWidth = 15;
ctx.lineCap = 'round';

ctx.save();
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(1, 1);
ctx.rotate(0);
// ctx.fillRect(0, 0, canvas.width, canvas.height);
// ctx.restore();

const drawBranch = (level) => {
  if (level > maxLevel) return;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();

  ctx.translate(50, 0);
  ctx.rotate(0.5);
  ctx.scale(0.9, 0.9);

  drawBranch(level + 1);
};

drawBranch(0);

addEventListener('resize', () => {
  canvas.width = innerWidth * 0.8;
  canvas.height = innerHeight * 0.8;
});
