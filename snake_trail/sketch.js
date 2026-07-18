const len = 10;
const balls_timeout = 1000;
const bullet_timeout = 100;

let trails = new Array(len).fill(0);
let bullets_trails = new Array(len).fill(0);

let ball_lastUpdate = 0;
let bullet_lastUpdate = 0;

/* Initial staring index */
let front = 0;

let off = 0;
let cir_off = 26;
let indx = 0;

function setup() {
  let canvas = createCanvas(115, 550);
  canvas.parent('canvas-container');

  lastTime = millis();
  trails[0] = floor(random(3)) + 1;
  console.log(trails[0])
}

function render() {

  background(220);
  for (let index = 0; index < len; index++) {
    noFill();
    rect(30, index * 55, 55, 55);

    if (bullets_trails[index] > 0) {
      switch (bullets_trails[index]) {
        case 1:
          fill(255, 0, 0);
          break;
        case 2:
          fill(0, 255, 0);
          break;
        case 3:
          fill(0, 0, 255);
          break;
      }
      circle(30 + 27, index * 55 + cir_off, 40);
    }

    if (trails[index] > 0) {
      switch (trails[index]) {
        case 1:
          fill(255, 0, 0);
          break;
        case 2:
          fill(0, 255, 0);
          break;
        case 3:
          fill(0, 0, 255);
          break;
      }
      circle(30 + 27, index * 55 + cir_off, 40);
    }
  }
}

function draw() {
  render()
  let current = millis();

  if (current - ball_lastUpdate >= balls_timeout) {

    if (front + 1 == len) {
      noLoop();
    }

    for (let index = front + 1; index > 0; index--) {
      trails[index] = trails[index - 1];
    }

    trails[0] = floor(random(3)) + 1;
    front++;

    ball_lastUpdate = millis();

  }

  if (current - bullet_lastUpdate >= bullet_timeout) {
    for (let index = 1; index < len; index++) {
      if (bullets_trails[index] > 0) {
        bullets_trails[index - 1] = bullets_trails[index];
        bullets_trails[index] = 0;
      }
    }

    bullet_lastUpdate = millis();
  }

  for (let index = 0; index < len; index++) {
    if (bullets_trails[index] > 0 && index <= front) {
      if (trails[front] === bullets_trails[index]) {
        bullets_trails[index] = 0;
        trails[front] = 0;
        front--;
      } else {
        bullets_trails[index] = 0;
      }
    }
  }

}

function keyPressed() {

  console.log("pressed");
  if (bullets_trails[len - 1] == 0) {
    if (key == 'r') {
      bullets_trails[len - 1] = 1;
    } else if (key == 'g') {
      bullets_trails[len - 1] = 2;
    } else if (key == 'b') {
      bullets_trails[len - 1] = 3;
    }
  }
  
}