import canvasSketch from "canvas-sketch";
const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.lineWidth = width * 0.01;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let w = width * 0.1;
        let h = height * 0.1;
        let gap = (width * 0.1) / 3;
        let xOff = (w * 2) / 15,
          yOff = (h * 2) / 15;

        let x = (w + gap) * i + width / 6;
        let y = (h + gap) * j + height / 6;

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        context.beginPath();
        context.rect(x + xOff, y + yOff, w - xOff * 2, h - yOff * 2);
        context.stroke();
      }
    }
  };
};

canvasSketch(sketch, settings);
