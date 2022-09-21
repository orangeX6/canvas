import { randomColor, randomIntFromRange } from './helper.js';

export default class Particle {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  #center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
  #distFromCenter;
  #angle = 0;
  #timer;

  constructor(x, y, radius, color, distance) {
    this.x = x;
    this.y = y;
    this.radius = radius || Math.random() * 2.5;
    this.color = color;
    this.#distFromCenter = distance;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update(angle, timer, settings) {
    this.#angle = angle;
    this.#timer = timer;
    this.draw();

    const effect = settings.effect;
    const { cos, sin } = Math;
    // # play around with sin functions for cool effects
    this.x =
      this.#center.x +
      this.#distFromCenter *
        (effect == 1 ? cos(this.#angle) : cos(-this.#angle)) *
        (effect >= 2 ? sin(timer + this.#distFromCenter) : 1) *
        (effect >= 3 ? cos(timer + this.#distFromCenter) : 1) *
        (effect >= 5 ? cos(timer + this.#distFromCenter / 8) : 1);
    this.y =
      this.#center.y +
      this.#distFromCenter *
        (effect == 1 ? sin(this.#angle) : sin(-this.#angle)) *
        (effect >= 2 ? cos(timer + this.#distFromCenter) : 1) *
        (effect == 4 ? sin(timer + this.#distFromCenter) : 1) *
        (effect >= 6 ? cos(timer + this.#distFromCenter) : 1) *
        (effect >= 7 ? sin(timer + this.#distFromCenter / 8) : 1) *
        (effect >= 8 ? sin(timer + this.#distFromCenter) : 1);
  }
}
