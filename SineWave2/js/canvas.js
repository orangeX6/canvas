import * as dat from 'dat.gui';

// initial values
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gui = new dat.GUI();
gui.close();

const wave = {
  yoffset: canvas.height / 2,
  xoffset: canvas.width / 2,
  length: 0.01,
  amplitude: 200,
  frequency: 0.01,
};

const strokeColor = {
  h: 200,
  s: 50,
  l: 50,
};

const backgroundColor = {
  r: 200,
  g: 50,
  b: 0,
  a: 1,
};

const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'yoffset', 0, canvas.height);
waveFolder.add(wave, 'xoffset', 0, canvas.width);

waveFolder.add(wave, 'length', -0.09, 0.09);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', -0.05, 0.2);

const backgroundFolder = gui.addFolder('background');
backgroundFolder.add(backgroundColor, 'r', 0, 255);
backgroundFolder.add(backgroundColor, 'g', 0, 255);
backgroundFolder.add(backgroundColor, 'b', 0, 255);
backgroundFolder.add(backgroundColor, 'a', 0, 1);

const strokeFolder = gui.addFolder('stroke');
strokeFolder.add(strokeColor, 'h', 0, 255);
strokeFolder.add(strokeColor, 's', 0, 100);
strokeFolder.add(strokeColor, 'l', 0, 100);

let increment = wave.frequency;
const animate = () => {
  requestAnimationFrame(animate);

  ctx.fillStyle = `rgba(${backgroundColor.r}, 
                        ${backgroundColor.g}, 
                        ${backgroundColor.b}, 
                        ${backgroundColor.a})`;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  ctx.moveTo(-100, canvas.height);
  for (let i = 0; i < canvas.width; i++) {
    ctx.lineTo(
      i,
      wave.yoffset +
        Math.sin(i * wave.length + increment) *
          wave.amplitude *
          Math.sin(increment)
    );
  }
  ctx.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, 
                  ${Math.abs(strokeColor.s)}%, 
                  ${Math.abs(strokeColor.l)}%`;
  ctx.lineWidth = 50;
  ctx.stroke();
  ctx.lineTo(canvas.width, canvas.height); // bottom right
  ctx.lineTo(0, canvas.height); // bottom left
  ctx.fill();

  increment += wave.frequency;
};

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
