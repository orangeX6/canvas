import * as dat from 'dat.gui';

const canvas = document.querySelector('canvas');
const gui = new dat.GUI();
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
  offset: canvas.height / 2,
  length: 0.01,
  amplitude: 150,
  frequency: 0.01,
};

const strokeColor = {
  h: 0,
  s: 50,
  l: 50,
};

const backgroundColor = {
  r: 255,
  g: 150,
  b: 100,
  a: 1,
};

const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'offset', 0, canvas.height);
waveFolder.add(wave, 'length', -0.01, 0.01);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', -0.01, 1);

const strokeFolder = gui.addFolder('stroke');
strokeFolder.add(strokeColor, 'h', 0, 255);
strokeFolder.add(strokeColor, 's', 0, 100);
strokeFolder.add(strokeColor, 'l', 0, 100);

const backgroundFolder = gui.addFolder('background');
backgroundFolder.add(backgroundColor, 'r', 0, 255);
backgroundFolder.add(backgroundColor, 'g', 0, 255);

backgroundFolder.add(backgroundColor, 'b', 0, 255);
backgroundFolder.add(backgroundColor, 'a', 0, 1);

let increment = 0;
function drawSineWave() {
  ctx.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  for (let i = 0; i < canvas.width; i++) {
    ctx.lineTo(
      i,
      wave.offset +
        Math.sin(increment / 50) *
          wave.amplitude *
          Math.sin(i * wave.length + wave.frequency)
    );
  }
  ctx.strokeStyle = `hsl(${strokeColor.h},${strokeColor.s}%,${strokeColor.l}%)`;
  ctx.stroke(); // draw stroke along wave top only

  ctx.lineTo(canvas.width, canvas.height); // bottom right
  ctx.lineTo(0, canvas.height); // bottom left
  ctx.fill();

  increment++;
}

function animate() {
  requestAnimationFrame(animate);
  drawSineWave();
}

animate();
