import * as dat from 'dat.gui';
import gsap from 'gsap';
import Particle from './particles.js';
import Mouse from './mouse.js';

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const gui = new dat.GUI();
gui.width = canvas.width / 2;

//# GLOBAL
const ctx = canvas.getContext('2d');
const particles = [];
const mouse = new Mouse(canvas.width / 2, canvas.height / 2);
let angle = 0;
let hue = 0;
let timer = 0;

// #DAT gui
const settings = {
  baseRadius: 3,
  particleCount: 300,
  effect: 1,
  baseType: 1,
};
let prevControl = {
  baseRadius: 3,
  particleCount: 300,
  effect: 1,
  baseType: 1,
};
const particleFolder = gui.addFolder('settings');
particleFolder.add(settings, 'baseRadius', 0, 50);
particleFolder.add(settings, 'particleCount', 100, 999);
particleFolder.add(settings, 'effect', 1, 8, 1);
particleFolder.add(settings, 'baseType', 1, 3, 1);

particleFolder.open();

//# INITIALIZE
// # play around with baseRadius, particleCount for cool effects
const init = () => {
  particles.splice(0);
  const particleCount = settings.particleCount;
  let hueIncrement = 360 / particleCount;

  const baseRadius = settings.baseRadius;
  const baseType = settings.baseType;
  let radiusIncrement = baseRadius / particleCount;

  for (let i = 0; i < particleCount; i++) {
    const x = canvas.width / 2 + i * Math.cos(1);
    const y = canvas.height / 2 + i * Math.sin(-1);
    // particles.push(
    //   new Particle(x, y, radiusIncrement * i, `hsl(${hue},75%,60%)`, i)
    // );
    particles.push(
      new Particle(
        x,
        y,
        baseType === 1
          ? baseRadius - radiusIncrement * i
          : baseType === 2
          ? baseRadius + radiusIncrement * i
          : baseRadius,
        `hsl(${hue},75%,60%)`,
        i
      )
    );

    // particles.push(new Particle(x, y, 4, `hsl(${hue},75%,60%)`, i));
    hue += hueIncrement;
  }
};

// # ANIMATION FUNCTION

const animate = () => {
  requestAnimationFrame(animate);
  if (
    settings.baseRadius !== prevControl.baseRadius ||
    settings.particleCount !== prevControl.particleCount ||
    settings.effect !== prevControl.effect ||
    settings.baseType !== prevControl.baseType
  ) {
    prevControl = Object.assign(prevControl, settings);

    setTimeout(init, 1000);
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => particle.update(angle, timer, settings));

  timer += 0.001;
};

init();
animate();

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

addEventListener('mousemove', (e) => {
  gsap.to(mouse, {
    x: e.x - canvas.width / 2,
    y: e.y - canvas.height / 2,
    duration: 1,
  });
  // mouse.x = e.x - canvas.width / 2;
  // mouse.y = e.y - canvas.height / 2;
  angle = Math.atan2(mouse.y, mouse.x);
});
