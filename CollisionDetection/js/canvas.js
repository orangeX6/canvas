import Ball from "./ball.js";
import MouseXY from "./mouse.js";
import { getDistance } from "./helper.js";

const canvas = document.getElementById("canvas");
const navHeight = document.querySelector("nav").getBoundingClientRect().height;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - navHeight - 4;

const ctx = canvas.getContext("2d");
const mouse = new MouseXY();

let ball;
let ball2;
let color;
const init = () => {
  ball = new Ball(0, 0, 100);
  ball2 = new Ball(undefined, undefined, 24, "#03fccf");
  color = ball.color;
};

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.fillText("Sakshi", mouse.x, mouse.y);
  ball.update();
  ball2.x = mouse.x;
  ball2.y = mouse.y;
  ball2.update();

  getDistance(ball.x, ball.y, ball2.x, ball2.y) < ball.radius + ball2.radius
    ? (ball.color = ball2.color)
    : (ball.color = color);
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - navHeight - 4;

  init();
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY - 40;
});

init();
animate();
