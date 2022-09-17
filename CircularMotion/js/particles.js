import { randomIntFromRange, randomColor } from './helper.js';

export default class Particle {
  #opacity = 0.5;
  #radians = 0;
  #color = ['#025159', '#3F858C', '#7AB8BF', '#C4EEF2', '#A67458'];
  #xPos;
  #yPos;
  #velocity = 0.05;

  ctx = canvas.getContext('2d');

  constructor(x, y, radius, color) {
    this.x = x || Math.random() * window.innerWidth;
    this.y = y || Math.random() * window.innerHeight - 4;
    this.#xPos = x;
    this.#yPos = y;
    this.radius = radius || randomIntFromRange(3, 6);
    this.color = color || randomColor(this.#color);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // this.ctx.save();
    // this.ctx.globalAlpha = this.#opacity;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    // this.ctx.restore();
    // this.ctx.strokeStyle = this.color;
    // this.ctx.stroke();
  }

  update() {
    this.draw();

    this.#radians += this.#velocity;
    // console.log(this.x, Math.sin(this.#radians));
    this.x = this.#xPos + Math.cos(this.#radians) * 100;
    this.y = this.#xPos + Math.sin(this.#radians) * 100;
    // console.log(Math.cos(this.#radians));
  }
}
