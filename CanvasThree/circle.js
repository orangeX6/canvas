export default class Circle {
  #colorArr = [
    '#e8eaea',
    '#8089ff',
    '#73e67a',
    '#1290dd',
    '#7cf0d6',
    '#427aff',
  ];

  ctx = canvas.getContext('2d');

  constructor(radius, color, x, y, velocityX, velocityY) {
    this.radius = radius || 20;
    this.x =
      x || Math.random() * (window.innerWidth - this.radius * 2) + this.radius;
    this.y =
      y || Math.random() * (window.innerHeight - this.radius * 2) + this.radius;
    this.velocityX = velocityX || Math.random() * 8 - 4;
    this.velocityY = velocityY || Math.random() * 8 - 4;
    this.color =
      color ||
      this.#colorArr[Math.floor(Math.random() * this.#colorArr.length)];
  }

  draw() {
    // const ctx = canvas.getContext('2d');
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    // this.ctx.clearRect(0, 0, innerWidth, innerHeight);

    this.draw();
    this.x + this.radius > window.innerWidth || this.x - this.radius < 0
      ? (this.velocityX = -this.velocityX)
      : this.velocityX;
    this.y + this.radius > window.innerHeight || this.y - this.radius < 0
      ? (this.velocityY = -this.velocityY)
      : this.velocityY;

    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}
