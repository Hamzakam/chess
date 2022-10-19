import { Pieces } from "./Piece";

export default class Squares {
  piece?: Pieces;
  row: Number;
  col: Number;

  constructor(piece: Pieces | undefined, row: Number, col: Number) {
    this.piece = piece;
    this.row = row;
    this.col = col;
  }
  getPiece(): Pieces | undefined {
    return this.piece;
  }
  getPos(): Array<Number> {
    return [this.col, this.row];
  }
  public setPiece(piece: Pieces | undefined): Boolean {
    this.piece = piece;
    return true;
  }
  public toString(): string {
    return this.piece === undefined
      ? "_"
      : `${
          this.piece.isWhite ? this.piece : this.piece.toString().toLowerCase()
        }`;
  }
}
