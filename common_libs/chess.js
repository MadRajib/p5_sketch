// Works with only P5JS library


const ARMY = Object.freeze({
  EMPTY: 0,
  B_PAWN: 1,
  W_PAWN: 2,
  W_BISHOP: 3,
  B_KNIGHT: 4,
  W_KNIGHT: 5,
  W_ROOK: 6,
});

const knight_moves = [
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
    [[1,0],[0,-1],[0,-1]],
    // bottom right long
    [[1,0],[0,1],[0,1]],

    [[0,-1],[-1,0],[-1,0]],
    [[0,1],[-1,0],[-1,0]],

    [[0,-1],[1,0],[1,0]],
    [[0,1],[1,0],[1,0]],
];

class ChessBoard {
    Squares = [];
    CELL_DIM = 0;
    BOARD_DIM = [0, 0];
    black = 20;
    white = 220;
    selected = [-1,-1];

    constructor(squares, cell_dim = 50) {
        this.squares = squares;
        this.CELL_DIM = cell_dim;
        this.BOARD_DIM = [squares.length, squares[0].length];
    }

    drawBoard() {
        for (let x = 0; x < this.BOARD_DIM[1]; ++x) {
            for (let y = 0; y < this.BOARD_DIM[0]; ++y) {

                if (this.squares[y][x] == -1)
                    continue;

                if (x % 2 == 0) {
                    if (y % 2 == 0) {
                        fill(this.white);
                    } else {
                        fill(this.black);
                    }
                } else {
                    if (y % 2 == 0) {
                        fill(this.black);
                    } else {
                        fill(this.white);
                    }
                }
                let x_pos = x * this.CELL_DIM;
                let y_pos = y * this.CELL_DIM; 
                
                rect(x_pos, y_pos, this.CELL_DIM, this.CELL_DIM);

                switch (squares[y][x]) {
                    case ARMY.B_PAWN:
                        this.drawPawn(x, y, 220, 0);
                        break;
                    case ARMY.W_PAWN:
                        this.drawPawn(x, y, 0, 255);
                        break;
                    case ARMY.W_BISHOP:
                        this.drawBishop(x, y, 0, 255);
                        break;
                    case ARMY.W_ROOK:
                        this.drawRook(x, y, 0, 255);
                        break;
                    case ARMY.B_KNIGHT:
                        this.drawKnight(x, y, 255, 0);
                        break;
                    case ARMY.W_KNIGHT:
                        this.drawKnight(x, y, 0, 255);
                        break;
                    case ARMY.W_ROOK:
                        this.drawRook(x, y, 0, 255);
                        break;
                    case ARMY.W_KNIGHT:
                        this.drawKnight(x, y, 0, 255);
                        break;
                    default:
                        break;
                    }
            }
        }
    }

    drawPawn(x, y, strokeColor, fillColor) {
        let x_pos = x * this.CELL_DIM;
        let y_pos = y * this.CELL_DIM; 
        push();
        stroke(strokeColor);
        fill(fillColor);
            circle(x_pos + this.CELL_DIM/2, y_pos + this.CELL_DIM/2, 30);
        pop();
    }

    drawRook(x, y, strokeColor, fillColor) {
        let x_pos = x * this.CELL_DIM;
        let y_pos = y * this.CELL_DIM; 
        push();
        stroke(strokeColor);
        fill(fillColor);
            rect(x_pos + 15, y_pos + 10, 20, 30);
        pop();
    }

    drawKnight(x, y, strokeColor, fillColor) {
        let x_pos = x * this.CELL_DIM;
        let y_pos = y * this.CELL_DIM; 
        push();
        stroke(strokeColor);
        fill(fillColor);
            circle(x_pos + this.CELL_DIM/2, y_pos + this.CELL_DIM/2, 30);
            rect(x_pos + 15, y_pos + 10, 20, 30);
        pop();
    }

    drawBishop(x, y, strokeColor, fillColor) {
        let x_pos = x * this.CELL_DIM;
        let y_pos = y * this.CELL_DIM; 
        push();
        stroke(strokeColor);
        fill(fillColor);
            triangle(
                x_pos + this.CELL_DIM / 2, y_pos + 10,              
                x_pos + this.CELL_DIM - 10,     y_pos + this.CELL_DIM -10,
                x_pos + 10,                  y_pos + this.CELL_DIM -10
            );
        pop();
    }

    checkMove(cur, tar) {

        switch(this.squares[cur[0]][cur[1]]) {
            case ARMY.W_ROOK:
                if (!this.check_rook_move(cur, tar))
                    return;

                // check if army inbetween;
                this.squares[cur[0]][cur[1]] = ARMY.EMPTY;
                this.squares[tar[0]][tar[1]] = ARMY.W_ROOK;
                break;
            case ARMY.W_PAWN:
                if (!this.check_pawn_move(cur, tar))
                    return;

                this.squares[cur[0]][cur[1]] = ARMY.EMPTY;
                this.squares[tar[0]][tar[1]] = ARMY.W_PAWN;
                break;
            case ARMY.W_BISHOP:
                if (!this.check_bishop_move(cur, tar)) {
                    // console.log("Invalid Move");
                    return;
                }

                this.squares[cur[0]][cur[1]] = ARMY.EMPTY;
                this.squares[tar[0]][tar[1]] = ARMY.W_BISHOP;
                break;
            case ARMY.W_KNIGHT:
            case ARMY.B_KNIGHT:
                if (!this.check_knigth_move(cur, tar)) {
                    // console.log("Invalid Move");
                    return;
                }

                if (this.squares[cur[0]][cur[1]] == ARMY.W_KNIGHT)
                    this.squares[tar[0]][tar[1]] = ARMY.W_KNIGHT;
                else
                    this.squares[tar[0]][tar[1]] = ARMY.B_KNIGHT;
                
                this.squares[cur[0]][cur[1]] = ARMY.EMPTY;
                break;
            default:
                break;
        }
    }


    check_knigth_move(cur, tar) {
        for (var i = 0; i < knight_moves.length; i++) {
            var x = cur[0];
            var y = cur[1];

            // console.log("knight move", i, knight_moves[i], x, y, tar);
            for (var j = 0; j < knight_moves[i].length; j++) {
                x += knight_moves[i][j][0];
                y += knight_moves[i][j][1];
            }

            if (x == tar[0] && y == tar[1])
                return true;
        }

        return false;
    }

    check_bishop_move(cur, tar) {
        if (abs(cur[0] - tar[0]) != abs(cur[1] - tar[1]))
            return false;

        if (tar[0] < cur[0]) { // Upper half

            if (tar[1] < cur[1]) { // left
                for (let i = cur[0] - 1, j=cur[1] - 1; i > tar[0] && j > tar[1]; i--, j--) {
                    if (this.squares[i][j] != ARMY.EMPTY)
                        return false;
                }
            } else {  // right
                for (let i = cur[0] - 1, j=cur[1] + 1; i > tar[0] && j < tar[1]; i--, j++) {
                    if (this.squares[i][j] != ARMY.EMPTY)
                        return false;
                }
            }

        } else {  // Bottom Half
            if (tar[1] < cur[1]) { // left
                for (let i = cur[0] + 1, j=cur[1] - 1; i < tar[0] && j > tar[1]; i++, j--) {
                    if (this.squares[i][j] != ARMY.EMPTY)
                        return false;
                }
            } else {  // right
                // console.log("right")
                for (let i = cur[0] + 1, j=cur[1] + 1; i < tar[0] && j < tar[1]; i++, j++) {
                    // console.log(i,j, this.squares[i][j]);
                    if (this.squares[i][j] != ARMY.EMPTY)
                        return false;
                }
            }
        }
        
        return true;
    }

    check_rook_move(cur, tar) {

        if (tar[0] != cur[0] && tar[1] != cur[1])
            return false;

        if (cur[0] == tar[0]) {
            if (tar[1] > cur[1]) {
                for (let i = cur[1] + 1; i < tar[1]; i++) {
                    if (this.squares[cur[0]][i] != ARMY.EMPTY)
                    return false;
                }
            } else {
                for (let i = cur[1] - 1; i > tar[1]; i--) {
                    if (this.squares[cur[0]][i] != ARMY.EMPTY)
                    return false;
                }
            }
        } else {
            if (tar[0] > cur[0]) {
                for (let i = cur[0] + 1; i < tar[0]; i++) {
                    if (this.squares[i][cur[1]] != ARMY.EMPTY)
                    return false;
                }

            } else {
                for (let i = cur[0] - 1; i > tar[0]; i--) {
                    if (this.squares[i][cur[1]] != ARMY.EMPTY)
                    return false;
                }
            }
        }

        return true;
    }

    check_pawn_move(cur, tar) {

        if (tar[0] == cur[0] - 1)
            return true;

        return false;
    }

    movePiece(cur){
        if (this.squares[cur[0]][cur[1]] == -1)
            return;   

        if (this.selected[0] == cur[0] && this.selected[1] == cur[1]) {
            this.selected[0] = -1;
            this.selected[1] = -1;
            return;
        }

        if (this.selected[0] != -1 && (this.squares[cur[0]][cur[1]] == ARMY.EMPTY || this.squares[cur[0]][cur[1]] == ARMY.B_PAWN)) {
            // console.log("check move", [row, col], selected);
            this.checkMove(this.selected, [cur[0], cur[1]])
            this.selected[0] = -1;
            this.selected[1] = -1;
            return;
        } else if (this.selected[0] == -1 && this.squares[cur[0]][cur[1]] == ARMY.EMPTY) {
            return;
        }

        this.selected[0] = cur[0];
        this.selected[1] = cur[1];
    }
}

