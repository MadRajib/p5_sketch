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

var knight_moves = [
// top left
[[-1,0],[-1,0],[0,-1]],
// top right
[[-1,0],[-1,0],[0,1]],

// bottom left
[[1,0],[1,0],[0,-1]],
// bottom right
[[1,0],[1,0],[0,1]],

// top left long
[[-1,0],[0,-1],[0,-1]],
// top right long
[[-1,0],[0,1],[0,1]],

// bottom left long
[[1,0],[0,-1],[0,-1],]
// bottom right long
[[1,0],[0,1],[0,1]],

[[0,-1],[-1,0],[-1,0]],
[[0,1],[-1,0],[-1,0]],

[[0,-1],[1,0],[1,0]],
[[0,1],[1,0],[1,0]],
]

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
  canvas.parent('game-canvas');

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

  if (selected[0] != -1 && (squares[row][col] == ARMY.EMPTY || squares[row][col] == ARMY.B_PAWN)) {
    // console.log("check move", [row, col], selected);
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
      break;
    case ARMY.W_BISHOP:
      if (!check_bishop_move(cur, tar)) {
        // console.log("Invalid Move");
        return;
      }

      squares[cur[0]][cur[1]] = ARMY.EMPTY;
      squares[tar[0]][tar[1]] = ARMY.W_BISHOP;
      break;
    case ARMY.W_KNIGHT:
      if (!check_knigth_move(cur, tar)) {
        // console.log("Invalid Move");
        return;
      }

      squares[cur[0]][cur[1]] = ARMY.EMPTY;
      squares[tar[0]][tar[1]] = ARMY.W_KNIGHT;
      break;
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
          
          for (i = cur[0] - 1; i > tar[0]; i--) {
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

  if (abs(cur[0] - tar[0]) != abs(cur[1] - tar[1])) {
    // console.log("not diaglo")
    return false;
  }

  // logic to check if inbetween pawn are prent or not
  // x-- y--     x-- y++

  // x++ y--     x++ y++

  if (tar[0] < cur[0]) { // Upper half

    if (tar[1] < cur[1]) { // left
      for (i=cur[0] - 1, j=cur[1] - 1; i > tar[0] && j > tar[1]; i--, j--) {
        if (squares[i][j] != ARMY.EMPTY)
              return false;
      }
    } else {  // right
      for (i=cur[0] - 1, j=cur[1] + 1; i > tar[0] && j < tar[1]; i--, j++) {
        if (squares[i][j] != ARMY.EMPTY)
              return false;
      }
    }

  } else {  // Bottom Half
    if (tar[1] < cur[1]) { // left
      for (i=cur[0] + 1, j=cur[1] - 1; i < tar[0] && j > tar[1]; i++, j--) {
        if (squares[i][j] != ARMY.EMPTY)
              return false;
      }
    } else {  // right
      // console.log("right")
      for (i=cur[0] + 1, j=cur[1] + 1; i < tar[0] && j < tar[1]; i++, j++) {
        // console.log(i,j, squares[i][j]);
        if (squares[i][j] != ARMY.EMPTY)
              return false;
      }
    }
  }
  return true;
}

function check_knigth_move(cur, tar) {

  for (var i = 0; i < knight_moves.length; i++) {
    var x = cur[0];
    var y = cur[1];

    for (var j = 0; j < knight_moves[i].length; j++) {
      x += knight_moves[i][j][0];
      y += knight_moves[i][j][1];
    }

    if (x == tar[0] && y == tar[1]) {
      return true;
    }
  }

  return false;
}