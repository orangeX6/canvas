import { randomIntFromRange, randomColor } from './helper.js';

export default class Particle {
  #opacity = 0.5;
  #radians;
  #color = ['#00bdff', '#4d39ce', '#088eff'];
  #xPos;
  #yPos;
  #distance;
  #velocity = 0.05;

  ctx = canvas.getContext('2d');

  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.#xPos = x;
    this.#yPos = y;
    // this.#distance = {
    //   x: randomIntFromRange(50, 120),
    //   y: randomIntFromRange(50, 120),
    // };
    this.#distance = randomIntFromRange(50, 120);
    this.#radians = Math.random() * Math.PI * 2;
    this.radius = radius || randomIntFromRange(1, 3);
    this.color = color || randomColor(this.#color);
  }

  draw(lastCoords) {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.radius;
    // this.ctx.lineWidth = this.ctx.lineCap = 'round';
    this.ctx.moveTo(lastCoords.x, lastCoords.y);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
    this.ctx.closePath();

    // #trial
    // this.ctx.beginPath();
    // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // this.ctx.save();
    // this.ctx.globalAlpha = this.#opacity;
    // this.ctx.fillStyle = this.color;
    // this.ctx.fill();
    // this.ctx.restore();
    // this.ctx.strokeStyle = this.color;
    // this.ctx.stroke();
  }

  update() {
    const lastCoords = {
      x: this.x,
      y: this.y,
    };

    // Move points over  time
    this.#radians += this.#velocity;

    // Creating Circular Motion
    this.x = this.#xPos + Math.cos(this.#radians) * this.#distance;
    this.y = this.#yPos + Math.sin(this.#radians) * this.#distance;
    // console.log(Math.cos(this.#radians));

    this.draw(lastCoords);
  }
}
