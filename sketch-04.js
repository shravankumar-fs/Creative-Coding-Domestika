const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const tweakpane = require("tweakpane");
const params = {
  columns: 10,
  rows: 10,
  scaleMin: 5,
  scaleMax: 30,
  frequency: 0.001,
  amplitude: 0.2,
  animate: true,
  frame: 0,
  lineCap: "butt",
};
const settings = {
  dimensions: [2048, 2048],
  animate: params.animate,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const col = params.columns;
    const row = params.rows;

    const numCells = col * row;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const marginx = (width - gridw) / 2;
    const marginy = (height - gridh) / 2;

    const cellw = gridw / col;
    const cellh = gridh / row;

    for (let i = 0; i < numCells; i++) {
      let x = (i % col) * cellw;
      let y = Math.floor(i / col) * cellh;

      let w = cellw * 0.8;
      let h = cellh * 0.8;

      context.save();
      let f = params.animate ? frame : params.frame;
      // let n = random.noise2D(x + frame * 10, y, params.frequency);
      let n = random.noise3D(x, y, f * 10, params.frequency);
      let angle = Math.PI * n * params.amplitude;
      // const scale = ((n + 1) / 2) * 30;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.translate(x, y);
      context.translate(marginx, marginy);
      context.translate(cellw / 2, cellh / 2);

      context.rotate(angle);
      context.lineWidth = scale;
      context.lineCap = params.lineCap;
      context.beginPath();
      context.moveTo(-w / 2, 0);
      context.lineTo(w / 2, 0);

      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new tweakpane.Pane();

  let folder = pane.addFolder({
    title: "Grid",
  });

  folder.addInput(params, "columns", {
    min: 5,
    max: 50,
    step: 1,
  });
  folder.addInput(params, "rows", {
    min: 5,
    max: 50,
    step: 1,
  });
  folder.addInput(params, "scaleMin", {
    min: 1,
    max: 100,
  });
  folder.addInput(params, "scaleMax", {
    min: 1,
    max: 100,
  });
  folder.addInput(params, "lineCap", {
    options: {
      butt: "butt",
      round: "round",
      square: "square",
    },
  });
  let folder2 = pane.addFolder({
    title: "Noise",
  });

  folder2.addInput(params, "frequency", {
    min: -0.01,
    max: 0.01,
  });
  folder2.addInput(params, "amplitude", {
    min: 0,
    max: 1,
  });
  folder2.addInput(params, "animate");
  folder2.addInput(params, "frame", {
    min: 1,
    max: 999,
  });
};
createPane();

canvasSketch(sketch, settings);
