const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const canvasmath = require("canvas-sketch-util/math");
const settings = {
  dimensions: [window.innerWidth, window.innerHeight],
  animate: true,
};

const sketch = () => {
  let agents = [];

  for (let i = 0; i < 60; i++) {
    const x = random.range(0, settings.dimensions[0]);
    const y = random.range(0, settings.dimensions[1]);
    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      let agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        let other = agents[j];

        let dist = agent.point.getDistance(other.point);
        if (dist > 150) continue;
        context.lineWidth = canvasmath.mapRange(dist, 0, 150, 12, 1);
        context.strokeStyle =
          "rgba(100,100,255," +
          canvasmath.mapRange(dist, 0, 200, 0.7, 0.2) +
          ")";
        context.beginPath();

        context.moveTo(agent.point.x, agent.point.y);
        context.lineTo(other.point.x, other.point.y);
        context.stroke();
      }
    }

    agents.forEach((a) => {
      a.update(width, height);
      a.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    let dx = this.x - v.x;
    let dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.point = new Vector(x, y);
    this.velocity = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(10, 20);
    this.color = "rgba(100,100,255," + random.range(0.4, 0.9) + ")";
    this.highlightColor = "rgba(100,255,100," + random.range(0.4, 0.9) + ")";
  }

  draw(context) {
    context.fillStyle = this.color;
    context.strokeStyle = "rgb(0,0,0)";

    context.save();
    context.translate(this.point.x, this.point.y);
    context.lineWidth = 4;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();

    // context.stroke();
    context.restore();

    context.save();
    context.strokeStyle = "white";
    context.translate(this.point.x, this.point.y);
    context.lineWidth = 4;
    context.beginPath();
    context.arc(0, 0, this.radius / 2, 0, Math.PI / 4);
    context.stroke();
    context.restore();

    context.save();
    context.strokeStyle = "white";
    context.translate(this.point.x, this.point.y);
    context.lineWidth = 6;
    context.beginPath();
    context.arc(0, 0, (7 * this.radius) / 8, -Math.PI, (-7 * Math.PI) / 8);
    context.stroke();
    context.restore();
  }

  update(w, h) {
    this.point.x += this.velocity.x * 2;
    this.point.y += this.velocity.y * 2;
    this.bounce(w, h);
  }

  bounce(w, h) {
    if (this.point.x - this.radius <= 0 || this.point.x + this.radius >= w) {
      this.velocity.x *= -1;
    }
    if (this.point.y - this.radius <= 0 || this.point.y + this.radius >= h) {
      this.velocity.y *= -1;
    }
  }
}
