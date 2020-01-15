import createButton from "./modules/Button.js";
import "./style.scss";

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// Resources
let bg = new Image();
bg.src = "guitar.png";
let keys = ["KeyH", "KeyJ", "KeyK", "KeyL"];

let buttons = [];

for (let i = 0; i < keys.length; i++) {
  buttons.push(createButton(i));
}

document.addEventListener("keydown", function(event) {
  let position = keys.indexOf(event.code);
  if (position !== -1) {
    buttons[position].y += 4;
  }
});

document.addEventListener("keyup", function(event) {
  let position = keys.indexOf(event.code);
  if (position !== -1) {
    buttons[position].y -= 4;
  }
});

function draw() {
  ctx.drawImage(bg, 0, 0);
  for (let i = 0; i < buttons.length; i++) {
    ctx.drawImage(buttons[i].image, buttons[i].x, buttons[i].y);
  }
  requestAnimationFrame(draw);
}

draw();
