import { buttons } from "./modules/Buttons.js";
import { audioData } from "./modules/Audio.js";
import "./style.scss";
import Bg from "./images/bg.png";

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
ctx.font = "30px VT323";
ctx.fillStyle = "#fff";

// Resources
let bg = new Image();
bg.src = Bg;

let score = 0;

let frame = 0;
let item = 0;

function draw() {
  frame += 1;

  //Background
  ctx.drawImage(bg, 0, 0);

  //Buttons
  for (let i = 0; i < buttons.length; i++) {
    ctx.drawImage(buttons[i].base.img, buttons[i].base.X, buttons[i].base.Y);
    ctx.drawImage(buttons[i].cap.img, buttons[i].cap.X, buttons[i].cap.Y);
  }

  //Score
  ctx.fillText(`Score: ${score}`, 20, 40);

  // Play button
  if (audioData == null) {
    ctx.fillText("No audio", 20, 80);
  } else {
    ctx.fillText("Play >", 20, 80);
  }
  // if (audio.data() && frame % 30 == 0) {
  //   if (audio.data()[item] != 0) {
  //     ctx.fill();
  //   }
  //   item++;
  // }

  requestAnimationFrame(draw);
}

draw();
