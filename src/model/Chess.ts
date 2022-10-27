import {
  getCurrentBoard,
  getCurrentStatus,
  joinGame,
  setCurrentStatus,
  startGame,
} from "../services/chess";
import Board from "./Board";
import Moves from "./Moves";
import Player from "./Player";
import Squares from "./Square";

export class Chess {
  board: Board;
  isCurrentPlayerWhite: boolean = true;
  gameStatus: string;
  constructor(
    gameStatus: string = "active",
    isCurrentPlayerWhite: boolean,
    boardState?: string
  ) {
    this.gameStatus = gameStatus;
    this.board = boardState ? new Board(true, boardState) : new Board();
    this.isCurrentPlayerWhite = isCurrentPlayerWhite;
    console.log(this.board.toString());
  }
  public async startGame(email_address: string): Promise<boolean> {
    await startGame(email_address);
    return true;
  }
  public async joinGame(
    email_address: string,
    game_id: number
  ): Promise<boolean> {
    await joinGame(email_address, game_id);
    return true;
  }
  public async playerMove(
    from: Squares,
    to: Squares,
    game_id: number
  ): Promise<boolean> {
    const move = new Moves(from, to, this.isCurrentPlayerWhite);
    const isValid = await move.makeMove(game_id, this.board);
    return true;
  }
  public async setStatus(
    gameStatus: string,
    game_id: number
  ): Promise<Boolean> {
    await setCurrentStatus(game_id, gameStatus);
    this.gameStatus = gameStatus;
    return true;
  }
  public async getStatus(game_id: number): Promise<string> {
    this.gameStatus = await getCurrentStatus(game_id);
    return this.gameStatus;
  }
  public getBoard() {
    const boardString = this.board;
    return boardString;
  }
  public getBoardFEN() {
    const fen = this.board?.returnFen();
    return fen;
  }
}
