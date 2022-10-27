import internal from "stream";
import { movePiece } from "../services/Moves";
import Board from "./Board";
import { Pieces } from "./Piece";
import Squares from "./Square";

export default class Moves {
  isWhitePlayer: boolean;
  from: Squares;
  to: Squares;
  piece?: Pieces;
  killed: boolean = false;
  constructor(from: Squares, to: Squares, isWhitePlayer: boolean) {
    this.isWhitePlayer = isWhitePlayer;
    this.to = to;
    this.from = from;
    this.piece = from.getPiece();
  }
  public async makeMove(game_id: number, board: Board) {
    if (this.piece === undefined) {
      throw { name: "InvalidMove", message: "No piece to move." };
    }
    if (this.piece.isPieceWhite() !== this.isWhitePlayer) {
      throw {
        name: "InvalidMove",
        message: `Please move ${this.isWhitePlayer ? "white" : "black"} piece`,
      };
    }
    if (this.to.getPiece() !== undefined) {
      if ((this.to.getPiece() as Pieces).toString().toLowerCase() === "k") {
        throw {
          name: "InvalidMove",
          message: "Can't kill King.",
        };
      }
      if (
        (this.to.getPiece() as Pieces).isPieceWhite() === this.isWhitePlayer
      ) {
        throw {
          name: "InvalidMove",
          message: "Can't kill Own.",
        };
      }
      this.killed = true;
    }
    if (!this.piece.isMoveValid(this.from, this.to, board)) {
      throw { name: "Invalid Move", message: "This move is not valid" };
    }
    await movePiece(game_id, this);
    return true;
  }
  public getIsPlayerWhite(): boolean {
    return this.isWhitePlayer;
  }
}
