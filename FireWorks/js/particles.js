import { randomColor, randomIntFromRange } from './helper.js';

export default class Particle {
  #gravity = 0.005;
  #friction = 0.99;

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius || Math.random() * 2.5;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.shadowColor = this.color;
    this.ctx.shadowBlur = 10;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= this.#friction;
    this.velocity.y *= this.#friction;
    this.velocity.y += this.#gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.008;
  }
}
