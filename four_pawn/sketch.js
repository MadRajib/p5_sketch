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

let selected = [-1,-1]; 

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
}

function mousePressed() {

  if (mouseX < 0 || mouseY < 0 || mouseY > CELL_HEIGHT * ROWS || mouseX >  CELL_HEIGHT * COLS)
    return;

  var row = floor(mouseY/CELL_HEIGHT);
  var col = floor(mouseX/CELL_HEIGHT);

  if (squares[row][col] == -1)
    return;

  if (selected[0] == row && selected[1] == col) {
    selected[0] = -1;
    selected[1] = -1;
    return;
  }

  if (selected[0] != -1 && squares[row][col] == ARMY.EMPTY) {
    console.log("check move", [row, col], selected);
    checkMove(selected, [row, col])
    selected[0] = -1;
    selected[1] = -1;
    return;
  } else if (selected[0] == -1 && squares[row][col] == ARMY.EMPTY) {
    return;
  }

  selected[0] = row;
  selected[1] = col;
}

function checkMove(cur, tar) {
  switch(squares[cur[0]][cur[1]]) {
    case ARMY.W_ROOK:
      if (!check_rook_move(cur, tar))
        return;

      // check if army inbetween;
      squares[cur[0]][cur[1]] = ARMY.EMPTY;
      squares[tar[0]][tar[1]] = ARMY.W_ROOK;
      break;
    case ARMY.W_PAWN:
      if (!check_pawn_move(cur, tar))
        return;

      squares[cur[0]][cur[1]] = ARMY.EMPTY;
      squares[tar[0]][tar[1]] = ARMY.W_PAWN;
    case ARMY.W_BISHOP:
      if (!check_bishop_move(cur, tar))
        return;

      squares[cur[0]][cur[1]] = ARMY.W_BISHOP;
      squares[tar[0]][tar[1]] = ARMY.W_BISHOP;
    default:
      break;
  }
}

function check_rook_move(cur, tar) {
  if (tar[0] != cur[0] && tar[1] != cur[1])
        return false;

      if (cur[0] == tar[0]) {

        if (tar[1] > cur[1]) {

          for (i = cur[1] + 1; i < tar[1]; i++) {
            if (squares[cur[0]][i] != ARMY.EMPTY)
              return false;
          }

        } else {
          for (i = cur[1] - 1; i > tar[1]; i--) {
            if (squares[cur[0]][i] != ARMY.EMPTY)
              return false;
          }
        }
      } else {
        if (tar[0] > cur[0]) {

          for (i = cur[0] + 1; i < tar[0]; i++) {
            if (squares[i][cur[1]] != ARMY.EMPTY)
              return false;
          }

        } else {
          for (i = cur[1] - 1; i > tar[1]; i--) {
            if (squares[i][cur[1]] != ARMY.EMPTY)
              return false;
          }
        }
      }

  return true;
}

function check_pawn_move(cur, tar) {

  if (tar[0] == cur[0] - 1)
    return true;

  return false;
}

function check_bishop_move(cur, tar) {

  if (cur[0] == tar[0] || cur[1] == tar[1])
    return false;

  return false;
}