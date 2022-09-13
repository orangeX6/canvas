export default class Circle {
  #velocityUnits = 2;
  #velocityRange = 1;
  #maxRadius = 39;
  #minRadius;
  #colorArr = [
    '#ECF0F1',
    // '#eab077',
    '#f28552',
    '#121414',
    '#2C3E50',
    '#3498DB',
    '#E74C3C',
  ];

  ctx = canvas.getContext('2d');

  constructor(radius, minRadius, color, x, y, velocityX, velocityY) {
    this.radius = radius || Math.random() * 6 + 1;
    this.#minRadius = this.radius;
    this.x =
      x || Math.random() * (window.innerWidth - this.radius * 2) + this.radius;
    this.y =
      y || Math.random() * (window.innerHeight - this.radius * 2) + this.radius;
    this.velocityX =
      velocityX || Math.random() * this.#velocityUnits - this.#velocityRange;
    this.velocityY =
      velocityY || Math.random() * this.#velocityUnits - this.#velocityRange;
    this.color =
      color ||
      this.#colorArr[Math.floor(Math.random() * this.#colorArr.length)];
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update(mouse) {
    this.draw();
    this.x + this.radius > window.innerWidth || this.x - this.radius < 0
      ? (this.velocityX = -this.velocityX)
      : this.velocityX;
    this.y + this.radius > window.innerHeight || this.y - this.radius < 0
      ? (this.velocityY = -this.velocityY)
      : this.velocityY;

    this.x += this.velocityX;
    this.y += this.velocityY;

    // interactivity with mouse
    // if 200 - 220 = -20 < 50 && 200-220  = -20 > -50
    // if 200 - 180 = 20 < 50 && 200-180   =  20 > -50
    // if 200 - 280 = -80 < 50 && 200-280   =  -80 > -50
    // if 200 - 120 = 80 < 50 && 200-120   =  80 > -50
    if (
      mouse &&
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.#maxRadius > this.radius) this.radius += 1;
    } else if (this.radius > this.#minRadius) {
      this.radius -= 1;
    }
  }
}
