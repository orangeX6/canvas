const generateTree = document.getElementById('generate-tree');
const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');
let curve = 10;
let curve2 = 10;
let curve3 = 0;

const drawTree = (
  startX,
  startY,
  len,
  angle,
  branchWidth,
  strokeColor,
  fillColor
) => {
  ctx.beginPath();

  ctx.save();
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.shadowBlur = 15;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY); // move  canvas to startX, startY coords
  ctx.rotate((angle * Math.PI) / 180); // converts degrees to radians
  ctx.moveTo(0, 0);
  // ctx.lineTo(0, -len);

  angle > 0
    ? ctx.bezierCurveTo(curve3, -len / 2, curve3, -len / 2, 0, -len)
    : ctx.bezierCurveTo(curve3, -len / 2, -curve3, -len / 2, 0, -len);
  ctx.stroke();

  if (len < 8) {
    // leafs
    ctx.beginPath();
    ctx.arc(0, -len, 10, 0, Math.PI / 2, false);
    // ctx.shadowColor = fillColor;
    // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    // ctx.shadowBlur = 15;
    ctx.fill();
    ctx.restore();
    return;
  }

  drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.6);
  drawTree(0, -len, len * 0.75, angle - curve2, branchWidth * 0.6);

  ctx.restore();
};

drawTree(
  canvas.width / 2,
  canvas.height - 80,
  150,
  0,
  30,
  'saddlebrown',
  'green'
);

// creating a leaf
// ctx.beginPath();
// // ctx.moveTo(50, 50);
// // ctx.lineTo(100, 100);
// ctx.arc(50, 50, 50, 0, Math.PI / 2, false);
// ctx.arc(100, 100, 50, Math.PI, Math.PI * 1.5, false);
// ctx.strokeStyle = 'pink';
// ctx.stroke();
// ctx.fillStyle = 'salmon';
// ctx.fill();
// ctx.closePath();

const generateRandomTree = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //startX, startY, len, angle, branchWidth, strokeColor, fillColor

  let centerPointX = canvas.width / 2;
  let startY = canvas.height - 80;
  let len = Math.floor(Math.random() * 20 + 200);
  let angle = 0;
  let branchWidth = Math.random() * 180 + 1;
  let strokeColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
  let fillColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;

  curve = Math.random() * 20 + 10;
  curve2 = Math.random() * 20 + 10;
  curve3 = Math.random() * 50;

  drawTree(
    centerPointX,
    startY,
    len,
    angle,
    branchWidth,
    strokeColor,
    fillColor
  );

  generateTree.style.setProperty('background', strokeColor);
};

generateTree.addEventListener('click', generateRandomTree);
