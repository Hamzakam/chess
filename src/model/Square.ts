import { Pos } from "../utils/types";
import { Pieces } from "./Piece";

export default class Squares {
  piece?: Pieces;
  row: number;
  col: number;

  constructor(piece: Pieces | undefined, row: number, col: number) {
    this.piece = piece;
    this.row = row;
    this.col = col;
  }
  getPiece(): Pieces | undefined {
    return this.piece;
  }
  getPos(): Pos {
    return { col: this.col, row: this.row };
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
