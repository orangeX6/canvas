const brushWidth = document.getElementById('dtool');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;

let x = 2;
for (let i = 0; i < 5; i++) {
  const opt = document.createElement('option');
  opt.value = Math.pow(x, i);
  opt.innerHTML = Math.pow(x, i);
  brushWidth.appendChild(opt);
}

const canvas = document.getElementById('canvas');
window.addEventListener('load', () => {
  const ctx = canvas.getContext('2d');

  //resizing canvas
  canvas.height = window.innerHeight - 50 - navHeight;
  canvas.width = window.innerWidth - 10;

  //Fill
  // ctx.fillRect(10, 50, 100, 100);
  // ctx.strokeStyle = 'red';
  // ctx.lineWidth = 5;
  // ctx.strokeRect(10, 50, 100, 100);
  // ctx.strokeStyle = 'violet';
  // ctx.lineWidth = 2;
  // ctx.strokeRect(20, 80, 100, 100);

  // Drawing lines
  // ctx.beginPath();
  // ctx.moveTo(100, 100);
  // ctx.lineTo(200, 100);
  // ctx.lineTo(200, 150);
  // ctx.closePath();
  // ctx.stroke();

  brushWidth.addEventListener('change', function () {
    ctx.lineWidth = this.value;
  });

  // Painting
  let painting = false;

  function startPosition() {
    // console.log('clicked');
    painting = true;
  }

  const finishedPainting = () => {
    painting = false;
    ctx.beginPath();
  };

  const draw = (e) => {
    // console.log(e);
    if (!painting) return;
    ctx.lineWidth = ctx.lineCap = 'round';
    ctx.lineTo(e.clientX, e.clientY - 40 - navHeight);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY - 40 - navHeight);
  };

  //  Event Listeners
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPainting);
  canvas.addEventListener('mousemove', draw);
});

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight - 10;
  canvas.width = window.innerWidth - 10;
});
