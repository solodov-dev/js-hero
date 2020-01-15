import Base from "../images/base.png";
import Cap from "../images/cap.png";

const btnX = 155;
const btnY = 420;
const offset = 4;
const gap = 2;

export default function createButton(index) {
  let Y = btnY;
  let isPressed = false;
  console.log("Hello");
  let base = { img: new Image() };
  base.img.src = Base;
  base.X = btnX + index * (gap + base.img.width);

  let cap = { img: new Image() };
  cap.img.src = Cap;
  cap.X = base.X - offset;

  function down() {
    if (!isPressed) {
      cap.X += offset;
      isPressed = true;
    }
  }

  function up() {
    cap.X -= offset;
    isPressed = false;
  }
  return { Y, isPressed, base, cap, down, up };
}
