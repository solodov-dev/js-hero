import { buttons } from "./modules/Buttons.js";
import { audioState, updateTimeline, isPlaying } from "./modules/Audio.js";
import "./style.scss";
import Bg from "./images/bg.png";

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

ctx.font = "30px VT323";
ctx.fillStyle = "#fff";

let bg = new Image();
bg.src = Bg;

let score = 0;
let frame = 0;
let gap = 30;

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
  ctx.fillText(audioState(), 20, 80);

  // Move field one frame down if the music is playing
  if (isPlaying) {
    frame++;

    let timeline = updateTimeline(frame, gap);
    for (let i = 0; i < timeline.length; i++) {
      if (timeline[i].data != 0) {
        ctx.fillRect(155, timeline[i].Y, 20, 20);
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();
