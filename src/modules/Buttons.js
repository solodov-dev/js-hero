import Base from "../images/base.png";
import Cap from "../images/cap.png";

const btnX = 155;
const btnY = 420;
const offset = 4;
const gap = 2;
let buttons = [];
const keys = ["KeyH", "KeyJ", "KeyK", "KeyL"];
let score = 0;

function createButton(index) {
  let isPressed = false;

  let base = { img: new Image() };
  let cap = { img: new Image() };

  base.img.src = Base;
  cap.img.src = Cap;

  base.img.onload = () => {
    base.X = btnX + index * (gap + base.img.width);
    cap.X = base.X;
  };

  base.Y = btnY;
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

  function isHit() {
    let context = document.getElementById("canvas").getContext("2d");
    // Get the color of a pixel in the middle of the button.
    // In the format of RGB array.
    // If it's the same as a 'note' color return true
    let pixel = context.getImageData(
      base.X + base.img.width / 2,
      base.Y + base.img.height / 2,
      1,
      1
    ).data;
    // Check if color is 'note' color
    // In our case - white (255, 255, 255)
    return pixel.every(x => x === 255);
  }
  return { isPressed, base, cap, down, up, isHit };
}

for (let i = 0; i < keys.length; i++) {
  buttons.push(createButton(i));
}

// Event listeners for user pressing keys
// Check if the key is defined
// If the key is one of the defined keys press it down and if it hits the note increment the score
document.addEventListener("keydown", function(event) {
  let index = keys.indexOf(event.code);
  if (index !== -1) {
    buttons[index].down();
    if (buttons[index].isHit()) {
      score++;
    }
  }
});

document.addEventListener("keyup", function(event) {
  let index = keys.indexOf(event.code);
  if (index !== -1) {
    buttons[index].up();
  }
});

export { buttons, score };
