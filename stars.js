let stars = [];
let speed, speedSlider, speedSliderLabel, dirSlider, dirSliderLabel;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  speed = createVector(0, 0, 1);

  speedSlider = createSlider(1, 9, 5);
  speedSlider.position(10, 120);
  speedSlider.input(updateSpeed);
  speedSlider.class("speed");
  speedSliderLabel = createDiv("Speed");
  speedSliderLabel.position(180, 120);

  dirSlider = createSlider(0, 1);
  dirSlider.position(120, 160);
  dirSlider.class("direction");
  dirSlider.input(updateDirection);
  dirSliderLabel = createDiv("Direction");
  dirSliderLabel.position(180, 160);

  for (let i = 0; i < 1000; i++) {
    stars.push(new Star());
  }
}

function updateDirection() {
  if (dirSlider.value() === 1) {
    speed.z = abs(speed.z);
  } else if (dirSlider.value() === 0) {
    speed.z = -abs(speed.z);
  }
}

function updateSpeed() {
  let currentDirection = speed.z >= 0 ? 1 : -1;

  speed.z = speedSlider.value() * currentDirection;
}

function draw() {
  background(0);
  translate(0, 0, -1000);

  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(0, width);
    this.pz = this.z;
  }

  update() {
    this.z -= speed.z;

    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  }

  show() {
    fill(255);
    noStroke();

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    let r = map(this.z, 0, width, 16, 0);

    ellipse(sx, sy, r, r);

    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(255);
    line(px, py, sx, sy);
  }
}
