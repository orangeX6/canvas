export default class Mouse {
  #x;
  #y;
  #radius;
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  set x(value) {
    this.#x = value;
  }

  set y(value) {
    this.#y = value;
  }

  set radius(value) {
    this.#radius = value;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get radius() {
    return this.#radius;
  }
}
