import * as dat from 'dat.gui';

const gui = new dat.GUI();

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 150,
  frequency: 0.05,
};

const strokeColor = {
  h: 200,
  s: 50,
  l: 50,
};

const backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01,
};

const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'length', -0.02, 0.02);
waveFolder.add(wave, 'amplitude', -450, 450);
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

waveFolder.open();
// strokeFolder.open();
// backgroundFolder.open();

let incrementFreq = wave.frequency;
const animate = () => {
  requestAnimationFrame(animate);

  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(${backgroundColor.r}, 
                        ${backgroundColor.g},
                        ${backgroundColor.b},
                        ${backgroundColor.a})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    ctx.lineTo(
      i,
      wave.y +
        Math.sin(i * wave.length + incrementFreq) *
          wave.amplitude *
          Math.sin(incrementFreq)
    );
    // ctx.lineTo(
    //   i,
    //   wave.y +
    //     ((Math.sin(i * wave.length + incrementFreq) * wave.amplitude) / i) * 100
    // );
    //   console.log(Math.sin(i), Math.sin(i * 0.02));
  }

  ctx.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(incrementFreq))}, 
                  ${Math.abs(strokeColor.s)}%, 
                  ${Math.abs(strokeColor.l)}%`;
  // console.log(Math.abs(strokeColor.s * Math.sin(incrementFreq)));

  ctx.stroke();
  ctx.closePath();
  incrementFreq += wave.frequency;
};

animate();

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
