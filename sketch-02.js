const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [2048, 2048],
};
let num = 24;
const sketch = () => {
  return ({ context, width, height }) => {
    let cx = width; //width * 0.5;
    let cy = 10; //height * 0.5;
    let w = width * 0.01;
    let h = height * 0.1;
    context.fillStyle = "black";

    let radius = width;

    for (let i = 0; i < num; i++) {
      let slice = math.degToRad(360 / num);
      let angle = slice * i;
      let x = radius * Math.sin(angle);
      let y = radius * Math.cos(angle);
      context.save();
      context.fillStyle =
        "rgba(" +
        Math.floor(random.range(0, 100)) +
        ", " +
        Math.floor(random.range(0, 255)) +
        ", " +
        Math.floor(random.range(0, 200)) +
        ",0.3)";
      context.translate(cx, cy);
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.5, 2), random.range(1, 3));
      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      // context.stroke();
      context.restore();

      context.save();

      context.translate(cx, cy);
      context.rotate(-angle);
      context.strokeStyle =
        "rgb(" +
        Math.floor(random.range(0, 255)) +
        ", " +
        Math.floor(random.range(0, 255)) +
        ", " +
        Math.floor(random.range(100, 255)) +
        ")";
      context.fillStyle =
        "rgba(" +
        Math.floor(random.range(0, 255)) +
        ", " +
        Math.floor(random.range(0, 255)) +
        ", " +
        Math.floor(random.range(0, 255)) +
        ",0.5)";
      context.lineWidth = random.range(5, 20);
      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * random.range(1, -8),
        slice * random.range(1, 5)
      );
      context.fill();
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
let reInitCanvas = () => {
  document.body.querySelector("canvas").remove();
  canvasSketch(sketch, settings);
};
setTimeout(() => {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        num--;
        reInitCanvas();
        break;
      case "ArrowRight":
        num++;
        reInitCanvas();
        break;
      default:
        break;
    }
  });
}, 2000);
