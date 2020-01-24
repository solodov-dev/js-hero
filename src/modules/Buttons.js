import Base from "../images/base.png";
import Cap from "../images/cap.png";

const btnX = 155;
const btnY = 420;
const offset = 4;
const gap = 2;
let buttons = [];
const keys = ["KeyH", "KeyJ", "KeyK", "KeyL"];

function createButton(index) {
  let isPressed = false;

  let base = { img: new Image() };
  base.img.src = Base;
  base.X = btnX + index * (gap + base.img.width);
  base.Y = btnY;

  let cap = { img: new Image() };
  cap.img.src = Cap;
  cap.X = base.X;
  cap.Y = base.Y - offset;

  function down() {
    if (!isPressed) {
      cap.Y += offset;
      isPressed = true;
    }
  }

  function up() {
    cap.Y -= offset;
    isPressed = false;
  }
  return { isPressed, base, cap, down, up };
}

for (let i = 0; i < keys.length; i++) {
  buttons.push(createButton(i));
}

// Event listeners for user pressing keys
// Check if the key is defined
document.addEventListener("keydown", function(event) {
  let index = keys.indexOf(event.code);
  if (index !== -1) {
    buttons[index].down();
  }
});

document.addEventListener("keyup", function(event) {
  let index = keys.indexOf(event.code);
  if (index !== -1) {
    buttons[index].up();
  }
});

export { buttons };
