import { Bishop, King, Knight, Pawn, Pieces, Queen, Rook } from "./Piece";
import Squares from "./Square";

export default class Board {
  private squares: Squares[][] = Array.from(Array(8), () => new Array(8));

  /**
   * Creates the initial board.
   * can be done using FEN as well. :'(
   * */
  private initBoardDefault() {
    this.squares[0][0] = new Squares(new Rook(true), 0, 0);
    this.squares[0][1] = new Squares(new Knight(true), 0, 1);
    this.squares[0][2] = new Squares(new Bishop(true), 0, 2);
    this.squares[0][3] = new Squares(new King(true), 0, 3);
    this.squares[0][4] = new Squares(new Queen(true), 0, 4);
    this.squares[0][5] = new Squares(new Bishop(true), 0, 5);
    this.squares[0][6] = new Squares(new Knight(true), 0, 6);
    this.squares[0][7] = new Squares(new Rook(true), 0, 7);
    this.squares[7][0] = new Squares(new Rook(false), 7, 0);
    this.squares[7][1] = new Squares(new Knight(false), 7, 1);
    this.squares[7][2] = new Squares(new Bishop(false), 7, 2);
    this.squares[7][3] = new Squares(new King(false), 7, 3);
    this.squares[7][4] = new Squares(new Queen(false), 7, 4);
    this.squares[7][5] = new Squares(new Bishop(false), 7, 5);
    this.squares[7][6] = new Squares(new Knight(false), 7, 6);
    this.squares[7][7] = new Squares(new Rook(false), 7, 7);
    for (let i = 0; i <= 7; i++) {
      this.squares[6][i] = new Squares(new Pawn(false), 6, i);
      this.squares[1][i] = new Squares(new Pawn(true), 0, i);
    }
    for (let i = 0; i <= 7; i++) {
      this.squares[2][i] = new Squares(undefined, 2, i);
      this.squares[3][i] = new Squares(undefined, 2, i);
      this.squares[4][i] = new Squares(undefined, 2, i);
      this.squares[5][i] = new Squares(undefined, 2, i);
    }
  }

  // Builds the board from FEN string.
  // No Validation
  private buildFromFEN(fen: string) {
    fen.split("/").forEach((rank, i) => {
      let colCount = 0;

      rank.split("").forEach((pos, j) => {
        if (pos.toLowerCase() === "k") {
          this.squares[7 - i][colCount] = new Squares(
            new King(pos === "K"),
            7 - i,
            colCount
          );
        } else if (pos.toLowerCase() === "q") {
          this.squares[7 - i][colCount] = new Squares(
            new Queen(pos === "Q"),
            7 - i,
            colCount
          );
        } else if (pos.toLowerCase() === "n") {
          this.squares[7 - i][colCount] = new Squares(
            new Knight(pos === "N"),
            7 - i,
            colCount
          );
        } else if (pos.toLowerCase() === "b") {
          this.squares[7 - i][colCount] = new Squares(
            new Bishop(pos === "B"),
            7 - i,
            colCount
          );
        } else if (pos.toLowerCase() === "r") {
          this.squares[7 - i][colCount] = new Squares(
            new Rook(pos === "R"),
            7 - i,
            colCount
          );
        } else if (pos.toLowerCase() === "p") {
          this.squares[7 - i][colCount] = new Squares(
            new Pawn(pos === "P"),
            7 - i,
            colCount
          );
        } else if (parseInt(pos) <= 8) {
          for (let fill = 0; fill < parseInt(pos); fill++) {
            this.squares[7 - i][colCount + fill] = new Squares(
              undefined,
              7 - i,
              colCount + fill
            );
          }
          colCount += parseInt(pos);
        }
        colCount += 1;
      });
    });
  }

  constructor(fromFen: Boolean = false, fen?: string) {
    if (fen) {
      this.buildFromFEN(fen);
    } else {
      this.initBoardDefault();
    }
  }

  // Removes a piece from a specific position
  public remove(col: number, row: number) {
    this.squares[row][col].setPiece(undefined);
  }

  // Adds a specific piece to some position
  public addPiece(col: number, row: number, piece: Pieces) {
    this.squares[row][col].setPiece(piece);
  }

  public toString(): string {
    let boardString = this.squares.reduce<string>((prev, curr, i) => {
      let currString = curr.reduce<string>(
        (str, square, j) => (j == 0 ? `${square}` : `${str} ${square}`),
        ""
      );
      return i == 0 ? `${currString}\n` : `${currString}\n${prev}`;
    }, "");

    return boardString;
  }
}
