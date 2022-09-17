export const randomIntFromRange = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomColor = (colors) =>
  colors[Math.floor(Math.random() * colors.length)];

export const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};
