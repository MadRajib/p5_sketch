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
const CELL_DIM = 50;

var chessBoard = new ChessBoard(squares, CELL_DIM);

function setup() {
  let canvas = createCanvas(CELL_DIM * COLS, CELL_DIM * ROWS);
  canvas.parent('game-canvas');
}

function draw() {
  background(220);
  chessBoard.drawBoard();
}

function mousePressed() {

  if (mouseX < 0 || mouseY < 0 || mouseY > CELL_DIM * ROWS || mouseX >  CELL_DIM * COLS)
    return;

  var row = floor(mouseY/CELL_DIM);
  var col = floor(mouseX/CELL_DIM);

  chessBoard.movePiece([row, col]);
}