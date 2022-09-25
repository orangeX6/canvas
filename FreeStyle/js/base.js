addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth * 0.8;
  canvas.height = innerHeight * 0.8;

  ctx.lineWidth = 15;
  ctx.lineCap = 'round';
  ctx.fillStyle = '#fa8d34';
  ctx.strokeStyle = 'yellow';

  let size = 150;
  let sides = 25;
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, 1);
  ctx.rotate(0);
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  for (let i = 0; i < sides; i++) {
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
    ctx.rotate((Math.PI * 2) / sides);
    ctx.scale(0.9, 0.9);
    ctx.translate(30, 20);
  }
});
