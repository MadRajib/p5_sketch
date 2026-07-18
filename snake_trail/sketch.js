const LEN = 10;
const TRAIL_TIMEOUT = 1000;
const BULLET_TIMEOUT = 100;

let trails = new Array(LEN).fill(0);
let bullets = new Array(LEN).fill(0);

let trail_lastUpdate = 0;
let bullet_lastUpdate = 0;

/* Initial staring index */
let front = 0;

let off = 0;
let cir_off = 26;
let indx = 0;

const sleep = ms => new Promise(res => setTimeout(res, ms));

function setup() {
  let canvas = createCanvas(115, 550);
  canvas.parent('canvas-container');

  lastTime = millis();
  trails[0] = floor(random(3)) + 1;

}

function render() {

  background(220);
  for (let index = 0; index < LEN; index++) {
    noFill();
    rect(30, index * 55, 55, 55);

    if (bullets[index] > 0) {
      switch (bullets[index]) {
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

async function reset() {
  noLoop();
  trails.fill(0);
  bullets.fill(0);
  
  front = 0;
  
  trails[0] = floor(random(3)) + 1;
  await sleep(1000);
  
  trail_lastUpdate = millis();
  bullet_lastUpdate = millis();
  
  loop();
}

function insert_bullet(c) {
  if (bullets[LEN - 1] > 0)
    return;

  bullets[LEN - 1] = c;
}

function draw() {
  render()
  let current = millis();

  if (current - trail_lastUpdate >= TRAIL_TIMEOUT) {

    if (front + 1 == LEN) {
      reset();
      return;
    }

    for (let index = front + 1; index > 0; index--) {
      trails[index] = trails[index - 1];
    }

    trails[0] = floor(random(3)) + 1;
    front++;

    trail_lastUpdate = millis();

  }

  if (current - bullet_lastUpdate >= BULLET_TIMEOUT) {
    for (let index = 1; index < LEN; index++) {
      if (bullets[index] > 0) {
        bullets[index - 1] = bullets[index];
        bullets[index] = 0;
      }
    }

    bullet_lastUpdate = millis();
  }

  for (let index = 0; index < LEN; index++) {
    if (bullets[index] > 0 && index <= front) {
      if (trails[front] === bullets[index]) {
        bullets[index] = 0;
        trails[front] = 0;
        front--;
      } else {
        bullets[index] = 0;
      }
    }
  }

}

function keyPressed() {
  console.log("pressed");

  if (key == 'r') {
    insert_bullet(1);
  } else if (key == 'g') {
    insert_bullet(2);
    bullets[LEN - 1] = 2;
  } else if (key == 'b') {
    insert_bullet(3);
  }
}