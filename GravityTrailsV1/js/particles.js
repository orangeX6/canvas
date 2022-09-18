import { randomIntFromRange, randomColor } from './helper.js';

export default class Particle {
  #opacity = 0.5;
  #radians;
  // #color = ['#f0e9ca', '#43a9e7', '#3c86d4', '#3447bb', '#abbcef', '#DBF227'];
  #color = ['#fe5464', '#fe8cb3', '#D9D9D9', '#A6A6A6', '#8C8C8C', '#F2F2F2'];
  #xPos;
  #yPos;
  #distance;
  #velocity = 0.001;

  ctx = canvas.getContext('2d');

  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.#xPos = x;
    this.#yPos = y;

    // this.#distance = randomIntFromRange(20, window.innerWidth / 2);
    this.#distance = randomIntFromRange(20, 1080);
    this.#radians = Math.random() * Math.PI * 2;
    this.radius = radius || Math.random() * 4;
    this.color = color || randomColor(this.#color);
  }

  draw(lastCoords) {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.radius;

    this.ctx.lineCap = 'round';
    this.ctx.moveTo(lastCoords.x, lastCoords.y);
    this.ctx.lineTo(this.x, this.y);
    // this.ctx.shadowColor = this.color;
    // this.ctx.shadowBlur = 5;
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update(mouseDown = false) {
    // this.#velocity = velocity;

    const lastCoords = {
      x: this.x,
      y: this.y,
    };

    // Move points over  time
    if (mouseDown && this.#velocity < 0.012) {
      this.#velocity += 0.0002;
    } else if (!mouseDown && this.#velocity > 0.002) {
      this.#velocity -= 0.0006;
    }

    this.#radians += this.#velocity;

    // Creating Circular Motion
    this.x = this.#xPos + Math.cos(this.#radians) * this.#distance;
    this.y = this.#yPos + Math.sin(this.#radians) * this.#distance;
    // console.log(Math.cos(this.#radians));

    this.draw(lastCoords);
  }
}
