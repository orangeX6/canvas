import { randomIntFromRange } from "./helper.js";
export default class Ball {
  #colors = ["#D97E9F", "#67618C", "#F2AB27", "#F29472", "#73544D"];

  ctx = canvas.getContext("2d");

  constructor(x, y, radius, color) {
    this.x = x || randomIntFromRange(24, innerWidth - 24);
    this.y = y || randomIntFromRange(24, innerHeight - 24);
    // this.velocityX = velocityX || randomIntFromRange(0, 1);
    // this.velocityY = velocityY || randomIntFromRange(0, 1);
    this.radius = radius || randomIntFromRange(4, 24);
    this.color =
      color || this.#colors[randomIntFromRange(0, this.#colors.length - 1)];
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update(coords) {
    this.draw();
  }
}
