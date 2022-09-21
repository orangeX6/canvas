export default class Particle {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  #ttl = 1000;

  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  get ttl() {
    return this.#ttl;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    // this.ctx.strokeStyle = this.color;
    // this.ctx.stroke();
    this.ctx.closePath();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.#ttl--;
  }
}
