import { randomIntFromRange, randomColor } from './helper.js';

export default class Particle {
  #opacity = 0.5;
  #radians;
  #color = ['#00bdff', '#4d39ce', '#088eff'];
  #xPos;
  #yPos;
  #distance;
  #velocity = 0.05;
  #lastMouseCoords = {};

  ctx = canvas.getContext('2d');

  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.#xPos = x;
    this.#yPos = y;
    this.#lastMouseCoords = {
      x: x,
      y: y,
    };
    this.#distance = randomIntFromRange(60, 130);
    this.#radians = Math.random() * Math.PI * 2;
    this.radius = radius || randomIntFromRange(1, 3);
    this.color = color || randomColor(this.#color);
  }

  draw(lastCoords) {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.radius;
    this.ctx.moveTo(lastCoords.x, lastCoords.y);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update(mouse) {
    const lastCoords = {
      x: this.x,
      y: this.y,
    };

    //# Move points over  time
    this.#radians += this.#velocity;

    //# Drag Effect
    this.#lastMouseCoords.x += (mouse.x - this.#lastMouseCoords.x) * 0.1;
    this.#lastMouseCoords.y += (mouse.y - this.#lastMouseCoords.y) * 0.1;

    //# Creating Circular Motion
    this.x = this.#lastMouseCoords.x + Math.cos(this.#radians) * this.#distance;
    this.y = this.#lastMouseCoords.y + Math.sin(this.#radians) * this.#distance;

    // console.log(mouse);

    this.draw(lastCoords);
  }
}
