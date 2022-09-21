export default class MouseXY {
  #x;
  #y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set x(value) {
    this.#x = value;
  }

  set y(value) {
    this.#y = value;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }
}
