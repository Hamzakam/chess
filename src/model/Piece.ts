import Board from "./Board";
import Squares from "./Square";

export abstract class Pieces {
  isKilled: boolean = false;
  isWhite: boolean = false;
  constructor(isWhite: boolean) {
    this.isWhite = isWhite;
  }
  isPieceKilled(): boolean {
    return this.isKilled;
  }
  isPieceWhite(): boolean {
    return this.isWhite;
  }
  setPieceKilled() {
    this.isKilled = true;
  }
  abstract isMoveValid(from: Squares, to: Squares, board: Board): boolean;
}

export class King extends Pieces {
  constructor(isWhite: boolean) {
    super(isWhite);
  }
  isMoveValid(from: Squares, to: Squares, board: Board): boolean {
    return true;
  }
  public toString(): string {
    return "K";
  }
}

export class Queen extends Pieces {
  constructor(isWhite: boolean) {
    super(isWhite);
  }
  isMoveValid(from: Squares, to: Squares, board: Board): boolean {
    return true;
  }
  public toString(): string {
    return "Q";
  }
}

export class Rook extends Pieces {
  constructor(isWhite: boolean) {
    super(isWhite);
  }
  isMoveValid(from: Squares, to: Squares, board: Board): boolean {
    return true;
  }
  public toString(): string {
    return "R";
  }
}

export class Bishop extends Pieces {
  constructor(isWhite: boolean) {
    super(isWhite);
  }
  isMoveValid(from: Squares, to: Squares, board: Board): boolean {
    return true;
  }
  public toString(): string {
    return "B";
  }
}
export class Pawn extends Pieces {
  constructor(isWhite: boolean) {
    super(isWhite);
  }
  isMoveValid(from: Squares, to: Squares, board: Board): boolean {
    return true;
  }
  public toString(): string {
    return "P";
  }
}

export class Knight extends Pieces {
  constructor(isWhite: boolean) {
    super(isWhite);
  }
  isMoveValid(from: Squares, to: Squares, board: Board): boolean {
    return true;
  }
  public toString(): string {
    return "N";
  }
}
