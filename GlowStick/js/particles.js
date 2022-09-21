import { randomColor, randomIntFromRange } from './helper.js';

export default class Particle {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  #center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
  #distanceFromCenter;
  #angle = 0;

  constructor(x, y, radius, color, distance) {
    this.x = x;
    this.y = y;
    this.radius = radius || Math.random() * 2.5;
    this.color = color;
    this.#distanceFromCenter = distance;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update(angle) {
    this.#angle = angle;
    this.x = this.#center.x + this.#distanceFromCenter * Math.cos(this.#angle);
    this.y = this.#center.y + this.#distanceFromCenter * Math.sin(this.#angle);
    this.draw();
  }
}
