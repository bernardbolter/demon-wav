import * as p5 from "p5";
import { type Sketch } from "@p5-wrapper/react"

(window as any).p5 = p5;

await import("p5/lib/addons/p5.sound");

export const sketch: Sketch = p5 => {
  let song: p5.SoundFile;
  let button: p5.Element;

  p5.setup = () => {
    p5.createCanvas(600, 400, p5.WEBGL);
    p5.background(255, 0, 0);
    button = p5.createButton("Toggle audio");

    button.mousePressed(() => {
      if (!song) {
        const songPath = "/piano.mp3";
        song = p5.loadSound(
          songPath,
          () => {
            song.play();
          },
          () => {
            console.error(
              `Could not load the requested sound file ${songPath}`
            );
          }
        );
        return;
      }

      if (!song.isPlaying()) {
        song.play();
        return;
      }

      song.pause();
    });
  };

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};