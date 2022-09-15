const canvas = document.getElementById("canvas");
const navHeight = document.querySelector("nav").getBoundingClientRect().height;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - navHeight;

const mouse = {
  x: 200,
  y: 300,
};

const ctx = canvas.getContext("2d");
