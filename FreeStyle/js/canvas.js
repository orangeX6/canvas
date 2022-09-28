const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// variables
let branches = 2;
let maxLevel = 4;
let sides = 5;
let size = 200;
let spread = 0.5;
let scale = 0.5;
let color = `hsl(51, 100%, 50%)`;
let shadowColor = `hsla(51, 100%, 50%, 0.7)`;
let backgroundColor = `hsl(0, 0%, 0%)`;
ctx.lineWidth = 15;
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 5;

// canvas values
ctx.lineCap = 'round';
ctx.fillStyle = backgroundColor;

const drawBranch = (level) => {
  if (level > maxLevel) return;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();

  for (let i = 0; i < branches; i++) {
    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.rotate(spread);
    ctx.scale(scale, scale);
    drawBranch(level + 1);
    ctx.restore();

    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.rotate(-spread);
    ctx.scale(scale, scale);
    drawBranch(level + 1);
    ctx.restore();
  }
};

const drawFractal = () => {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.shadowColor = shadowColor;

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);

  for (var i = 0; i < sides; i++) {
    ctx.rotate((Math.PI * 2) / sides);
    drawBranch(0);
  }
  ctx.restore();
};
drawFractal();

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
