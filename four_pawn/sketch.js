const ARMY = Object.freeze({
  EMPTY: 0,
  B_PAWN: 1,
  W_PAWN: 2,
  W_BISHOP: 3,
  W_KNIGHT: 4,
  W_ROOK: 5,
});

var squares = [
  [ARMY.B_PAWN, ARMY.B_PAWN, ARMY.B_PAWN, ARMY.B_PAWN],
  [-1,-1,-1,-1],
  [ARMY.W_BISHOP,ARMY.W_BISHOP, ARMY.W_BISHOP, ARMY.W_BISHOP],
  [ARMY.W_ROOK, ARMY.W_ROOK, ARMY.W_ROOK, ARMY.W_ROOK],
  [ARMY.W_PAWN, ARMY.W_PAWN, ARMY.W_PAWN, ARMY.EMPTY],
  [-1,-1,-1, ARMY.W_KNIGHT]
];

const COLS = squares[0].length;
const ROWS = squares.length;
const CELL_HEIGHT = 50;
const CELL_WIDTH  = 50;

function drawBoard() {
  black = 20;
  white = 220;
  for (x = 0; x < COLS; ++x) {
    for (y = 0; y < ROWS; ++y) {

      if (squares[y][x] == -1) {
        continue;
      }

      if (x % 2 == 0) {
        if (y % 2 == 0) {
          fill(white);
        } else {
          fill(black);
        }
      } else {
        if (y % 2 == 0) {
          fill(black);
        } else {
          fill(white);
        }
      }
      x_pos = x * CELL_WIDTH;
      y_pos = y * CELL_HEIGHT; 
      rect(x_pos, y_pos, CELL_WIDTH, CELL_HEIGHT);
      if (squares[y][x] != ARMY.EMPTY) {
        switch (squares[y][x]) {
          case ARMY.B_PAWN:
            push();
            stroke(220);
            strokeWeight(2);
            fill(0);
              circle(x_pos + CELL_HEIGHT/2, y_pos + CELL_HEIGHT/2, 30);
            pop();
            break;
          case ARMY.W_BISHOP:
            push();
            stroke(0);
            fill(255);
            triangle(
              x_pos + CELL_WIDTH / 2, y_pos + 10,              
              x_pos + CELL_WIDTH - 10,     y_pos + CELL_HEIGHT -10,
              x_pos + 10,                  y_pos + CELL_HEIGHT -10
            );
            pop();
            break;
          case ARMY.W_PAWN:
            push();
            stroke(0);
            fill(255);
              circle(x_pos + CELL_HEIGHT/2, y_pos + CELL_HEIGHT/2, 30);
            pop();
            break;
          case ARMY.W_ROOK:
            push();
            stroke(0);
            fill(255);
              rect(x_pos + 15, y_pos + 10, 20, 30);
            pop();
            break;
          case ARMY.W_KNIGHT:
            push();
            stroke(0);
            fill(255);
              circle(x_pos + CELL_HEIGHT/2, y_pos + CELL_HEIGHT/2, 30);
              rect(x_pos + 15, y_pos + 10, 20, 30);
            pop();
            break;
          default:
            break;
        }
      }
    }
  }
}

function setup() {
  let canvas = createCanvas(CELL_WIDTH * COLS, CELL_HEIGHT * ROWS);
  canvas.parent('canvas-container');

}

function draw() {
  background(220);
  drawBoard();
  noLoop();
}