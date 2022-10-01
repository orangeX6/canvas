import { randomColor, randomIntFromRange } from './helper.js';

export default class Eye {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  #mouseCoords = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
  #distanceFromCenter;
  #angle = 0;
  #theta;

  constructor(x, y, radius, color, distance) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.radius = radius || Math.random() * 100 + 5;
    this.color = color || 'red';
    this.#distanceFromCenter = distance;
  }

  draw() {
    // draw eyes
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();

    // distance between mouse and x co-ord of an eye
    let dx = this.#mouseCoords.x - this.x;
    let dy = this.#mouseCoords.y - this.y;
    this.#theta = Math.atan2(dy, dx);
    // draw iris
    let iris_x = this.x + (Math.cos(this.#theta) * this.radius) / 10;
    let iris_y = this.y + (Math.sin(this.#theta) * this.radius) / 10;
    let irisRadius = this.radius / 1.2;
    this.ctx.beginPath();
    this.ctx.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();

    // draw pupil
    let pupil_x = this.x + (Math.cos(this.#theta) * this.radius) / 2.5;
    let pupil_y = this.y + (Math.sin(this.#theta) * this.radius) / 2.5;
    let pupilRadius = this.radius / 1.9;
    this.ctx.beginPath();
    this.ctx.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.closePath();

    let pupilReflectionRadius = this.radius / 10;
    this.ctx.beginPath();
    this.ctx.arc(
      pupil_x - pupilRadius / 3,
      pupil_y - pupilRadius / 3,
      pupilReflectionRadius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = '#444';
    this.ctx.save();
    this.ctx.shadowColor = '#444';
    this.ctx.shadowBlur = 8;
    this.ctx.fill();
    this.ctx.restore();

    this.ctx.closePath();
  }

  update(mouse) {
    this.#mouseCoords.x = mouse.x;
    this.#mouseCoords.y = mouse.y;

    //draw mouse
    this.ctx.beginPath();
    this.ctx.arc(
      this.#mouseCoords.x,
      this.#mouseCoords.y,
      15,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = '#51ff00';
    this.ctx.save();
    this.ctx.shadowColor = '#51ff00';
    this.ctx.shadowBlur = 8;
    this.ctx.fill();
    this.ctx.restore();
    this.ctx.closePath();

    this.draw();
  }
}
