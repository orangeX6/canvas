import { randomColor, randomIntFromRange } from './helper.js';

export default class Particle {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  #color = ['#f0e9ca', '#43a9e7', '#3c86d4', '#3447bb', '#abbcef', '#DBF227'];

  constructor(x, y, color, radius) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.radius = radius || Math.random() * 3;

    this.color = randomColor(color) || randomColor(this.#color);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.shadowColor = this.color;
    this.ctx.shadowBlur = 12;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    this.draw();
  }
}
