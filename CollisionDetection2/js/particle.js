import { randomColor, getDistance, resolveCollision } from './helper.js';

export default class Particle {
  #colors = ['#37e6dd', '#0AA605', '#F2B705', '#F25C05', '#F21616'];

  ctx = canvas.getContext('2d');

  constructor(x, y, radius, color) {
    this.navHeight = document
      .querySelector('nav')
      .getBoundingClientRect().height;
    this.radius = radius || Math.random() * (12 - 8) + 8;
    this.x = x || Math.random() * window.innerWidth;
    this.y = y || Math.random() * (window.innerHeight - 100) + 40;
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5,
    };

    this.color = color || this.#colors[randomColor(this.#colors)];
    this.opacity = 0;
    this.mass = (1 * this.radius) / 10;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.restore();
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  }

  update(particles, mouse) {
    this.draw();

    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;
      if (
        getDistance(this.x, this.y, particles[i].x, particles[i].y) -
          (this.radius + particles[i].radius) <
        0
      ) {
        resolveCollision(this, particles[i]);
      }
    }

    // Boundary control
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.velocity.x = -this.velocity.x;
    if (
      this.y + this.radius + this.navHeight + 4 > innerHeight ||
      this.y - this.radius < 0
    )
      this.velocity.y = -this.velocity.y;

    // Mouse Collision detection
    if (
      mouse &&
      getDistance(mouse.x, mouse.y, this.x, this.y) < 120 &&
      this.opacity < 0.2
    ) {
      this.opacity += 0.02;
    } else if (this.opacity > 0) {
      this.opacity -= 0.02;
      this.opacity = Math.max(0, this.opacity);
    }
    // movement - adding velocity
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
