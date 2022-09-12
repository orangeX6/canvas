// const canvas = document.querySelector('canvas');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const ctx = canvas.getContext('2d');
// // console.log(ctx);

// ctx.fillStyle = 'rgb(240, 148, 72)';
// ctx.fillRect(100, 100, 100, 150);
// ctx.fillStyle = 'rgb(255, 129, 129)';
// ctx.fillRect(100, 300, 400, 150);
// ctx.fillStyle = 'rgb(128, 137, 255)';
// ctx.fillRect(300, 100, 200, 250);

// // line
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(100, 450);
// ctx.lineTo(20, 450);
// ctx.lineTo(50, 300);
// ctx.strokeStyle = '#4c9850';
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(600, 300, 60, 0, Math.PI * 2, false);
// ctx.stroke();

// const color = [
//   'hotpink',
//   '#8089ff',
//   '#73e67a',
//   '#ffdf00',
//   '#7cf0d6',
//   '#ea3425',
// ];

// for (let i = 0; i < 69; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   ctx.beginPath();
//   ctx.strokeStyle = color[Math.floor(Math.random() * color.length)];
//   ctx.fillStyle = ctx.strokeStyle;
//   ctx.arc(x, y, 69, 0, Math.PI * 2, false);
//   ctx.fill();
//   // ctx.stroke();
// }

// ------ ACTUAL PROJECT ------\\

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let x = 200,
  y = 200;
function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, innerWidth, innerHeight);

  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2, false);
  ctx.fillStyle = 'rgba(255,12,12,0.6)';
  ctx.fill();
  x++;
  y++;
}

animate();
