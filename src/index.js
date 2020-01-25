import { buttons } from "./modules/Buttons.js";
import { audioData, isPlaying } from "./modules/Audio.js";
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

function draw() {
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
  } else if (isPlaying == false) {
    ctx.fillText("Play >", 20, 80);
  } else {
    ctx.fillText("Stop ◼", 20, 80);
  }

  // Move field one frame down if the music is playing
  if (audioData != null) {
    frame++;
  }

  requestAnimationFrame(draw);
}

draw();
