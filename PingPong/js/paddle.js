export default class Paddle {
  #width = 10;
  #height = 100;
  #score = 0;

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  constructor({ position }, velocity) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  get height() {
    return this.#height;
  }
  get width() {
    return this.#width;
  }

  get score() {
    return this.#score;
  }
  set score(value) {
    this.#score = value;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.#width,
      this.#height
    );
    this.ctx.closePath();
  }

  update() {
    this.draw();
    this.position.y + this.velocity.y > 0 &&
      this.position.y + this.#height + this.velocity.y < canvas.height &&
      (this.position.y += this.velocity.y);
  }
}
