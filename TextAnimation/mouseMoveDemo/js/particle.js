export default class Particle {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  #mouse = {};

  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius || 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = 'pink';
    this.ctx.fill();
    // this.ctx.strokeStyle = this.color;
    // this.ctx.stroke();
    this.ctx.closePath();
  }

  update(mouse) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;

    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;

    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.baseX !== this.x) {
        let dx = this.x - this.baseX;
        this.x -= dx / 20;
      }
      if (this.baseY !== this.y) {
        let dy = this.y - this.baseY;
        this.y -= dy / 20;
      }
    }

    this.draw();
  }
}
