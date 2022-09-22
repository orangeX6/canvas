export default class Ball {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  constructor({ position }, radius) {
    this.position = position;
    this.radius = radius || 5;
    const speed = 3;
    this.direction = {
      x: Math.random() - 0.5 >= 0 ? -speed : speed,
      y: Math.random() - 0.5 >= 0 ? -speed : speed,
    };
    this.velocity = {
      x: this.direction.x,
      y: this.direction.y,
    };
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = 'white';

    this.ctx.fill();
    this.ctx.closePath();
  }

  update(paddle1, paddle2) {
    this.draw();

    // handle top and bottom
    if (
      this.position.y + this.radius + this.velocity.y >= canvas.height ||
      this.position.y - this.radius + this.velocity.y <= 0
    )
      this.velocity.y = -this.velocity.y;

    //handle paddle 1
    if (
      this.position.x + this.velocity.x + this.radius <=
        paddle1.position.x + paddle1.width &&
      this.position.y + this.radius <= paddle1.position.y + paddle1.height &&
      this.position.y + this.radius >= paddle1.position.y &&
      this.position.x > 0
    ) {
      this.velocity.x = -this.velocity.x;
    }

    //handle paddle 2
    if (
      this.position.x + this.radius + this.velocity.x >= paddle2.position.x &&
      this.position.y + this.radius <= paddle2.position.y + paddle2.height &&
      this.position.y + this.radius >= paddle2.position.y &&
      this.position.x < canvas.width
    ) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.position.x < 0) {
      this.position.x = canvas.width / 2;
      this.position.y = canvas.height / 2;
      paddle2.score += 1;
    }

    if (this.position.x > canvas.width) {
      this.position.x = canvas.width / 2;
      this.position.y = canvas.height / 2;
      paddle1.score += 1;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
