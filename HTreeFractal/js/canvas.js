const generateTree = document.getElementById('generate-tree');
const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');
let s = 0;

const drawTree = (startX, startY, len, angle, branchWidth, color1, color2) => {
  ctx.beginPath();

  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY); // move  canvas to startX, startY coords
  ctx.rotate((angle * Math.PI) / 180); // converts degrees to radians
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();
  ctx.fill();

  if (len < 10) {
    ctx.restore();
    return;
  }

  drawTree(0, -len, len * 0.75, angle + 18, branchWidth);
  drawTree(0, -len, len * 0.75, angle - 5, branchWidth);

  ctx.restore();
};

drawTree(canvas.width / 2, canvas.height - 80, 150, -16, 2, 'brown', 'blue');
