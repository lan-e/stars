let stars = [];
let speedSlider, speedSliderLabel, dirSlider, dirSliderLabel;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  speedSlider = createSlider(1, 9, 5);
  speedSlider.position(10, 120);
  speedSlider.class("speed");
  speedSliderLabel = createDiv("Speed");
  speedSliderLabel.position(180, 120);

  dirSlider = createSlider(-15, 15, 0);
  dirSlider.position(10, 160);
  dirSlider.class("direction");
  dirSliderLabel = createDiv("Direction");
  dirSliderLabel.position(180, 160);

  for (let i = 0; i < 800; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  // Move the stars
  for (let star of stars) {
    star.update();
    star.show();
  }
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
  }

  update() {
    this.z = this.z - speedSlider.value();

    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }

    this.y += dirSlider.value();
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
