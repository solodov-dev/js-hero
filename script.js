let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// Resources
let bg = new Image();
bg.src = "guitar.png";
let keys = ["KeyH", "KeyJ", "KeyK", "KeyL"];

// Coordinates
let btnX = 155;
let btnY = 420;
let offset = 2;

function createButton(index) {
  let image = new Image();
  image.src = "button.png";
  let x = btnX + index * (offset + image.width);
  let y = btnY;
  let isPressed = false;
  return {
    image,
    isPressed,
    x,
    y
  };
}

function createShadow(index) {
  let image = new Image();
  image.src = "shadow.png";
  let x = btnX + index * (offset + image.width);
  let y = btnY;
  return {
    image,
    x,
    y
  };
}

let buttons = [];
let shadows = [];

for (let i = 0; i < keys.length; i++) {
  buttons.push(createButton(i));
  shadows.push(createShadow(i));
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
    ctx.drawImage(shadows[i].image, shadows[i].x, shadows[i].y + 4);
    ctx.drawImage(buttons[i].image, buttons[i].x, buttons[i].y);
  }
  requestAnimationFrame(draw);
}

draw();
