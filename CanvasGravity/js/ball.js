import { randomColor } from './utils.js';
export default class Ball {
  #colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
  #gravity = 0.4;
  #friction = 0.89;
  #maxRadius = 24;
  #minRadius = 4;
  #minBounceHeight = 400;

  ctx = canvas.getContext('2d');

  constructor(x, y, velocityX, velocityY, radius, color) {
    this.x = x || Math.floor(Math.random() * innerWidth);
    this.y = y || Math.floor(Math.random() * this.#minBounceHeight);
    this.radius =
      radius ||
      Math.random() * (this.#maxRadius - this.#minRadius) + this.#minRadius;
    this.color =
      randomColor(color) ||
      this.#colors[Math.floor(Math.random() * this.#colors.length)];
    this.velocityX = velocityX || Math.random() * 4 - 2;
    this.velocityY = velocityY || Math.random();
  }

  get maxRadius() {
    return this.#maxRadius;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update() {
    this.draw();
    this.x + this.radius > window.innerWidth || this.x - this.radius < 0
      ? (this.velocityX = -this.velocityX)
      : this.velocityX;

    this.y + this.radius + this.velocityY > window.innerHeight
      ? (this.velocityY = -this.velocityY * this.#friction)
      : (this.velocityY += this.#gravity);

    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}
