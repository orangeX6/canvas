const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// var canvas = document.createElement('canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// document.getElementsByTagName('body')[0].appendChild(canvas);

// Rectangle
const ctx = canvas.getContext('2d'); // Drawing context

// ctx.fillStyle = 'rgba(255,0,0,0.5)';
// ctx.fillRect(100, 100, 50, 50);
// ctx.fillStyle = 'rgba(0,255,0,0.5)';
// ctx.fillRect(400, 100, 50, 50);
// ctx.fillStyle = 'rgba(255,0,255,0.5)';
// ctx.fillRect(250, 300, 50, 50);

//Lines
// ctx.beginPath();
// ctx.moveTo(100, 270);
// ctx.lineTo(400, 200);
// ctx.lineTo(200, 400);
// ctx.strokeStyle = 'red';
// ctx.stroke();

//  Arc / Circle
// ctx.beginPath();
// ctx.strokeStyle = 'black';
// ctx.arc(600, 300, 36, 0, Math.PI * 2, false);
// ctx.stroke();

// const color = ['red', 'green', 'blue', 'magenta', 'orange'];

// for (let i = 0; i < 666; i++) {
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   ctx.beginPath();
//   ctx.strokeStyle = color[Math.floor(Math.random() * 5)];
//   ctx.arc(x, y, 20, 0, Math.PI * 2, false);
//   ctx.stroke();
// }

// console.log(canvas);

// let x = 200,
//   dx = 1;
// (y = 200), (dy = 1);
// const animate = () => {
//   requestAnimationFrame(animate);
//   ctx.clearRect(0, 0, innerWidth, innerHeight);
//   ctx.beginPath();
//   ctx.strokeStyle = 'black';

//   if (x + 28 > innerWidth) dx = 0;
//   if (y + 28 > innerHeight) dy = 0;
//   if (x - 28 < 0) dx = 1;
//   if (y - 28 < 0) dy = 1;

//   if (dx === 1 && dy === 1) {
//     ctx.arc(x++, y++, 36, 0, Math.PI * 2, false);
//   }
//   if (dx === 1 && dy === 0) {
//     ctx.arc(x++, y--, 36, 0, Math.PI * 2, false);
//   }
//   if (dx === 0 && dy === 1) {
//     ctx.arc(x--, y++, 36, 0, Math.PI * 2, false);
//   }
//   if (dx === 0 && dy === 0) {
//     ctx.arc(x--, y--, 36, 0, Math.PI * 2, false);
//   }
//   ctx.stroke();
// };

// animate();
let x = 200,
  y = 200,
  dx2 = 4,
  dx = Math.random() * 10,
  dy = Math.random() * 10,
  radius = 24;
console.log(dx);
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.beginPath();
  ctx.strokeStyle = 'antiquewhite';
  // ctx.fillStyle = 'rgba(255,0,0,0.5)';
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = 'rgba(255,0,255,0.5)';
  ctx.fill();

  if (x + radius > innerWidth || x - radius < 0) dx = -dx;
  if (y + radius > innerHeight || y - radius < 0) dy = -dy;

  x += dx;
  y += dy;
  ctx.stroke();
};

animate();
