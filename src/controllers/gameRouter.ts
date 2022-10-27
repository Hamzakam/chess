import express, { Router, Request, Response, NextFunction } from "express";
import { Chess } from "../model/Chess";
import Moves from "../model/Moves";
import Player from "../model/Player";
import Squares from "../model/Square";
import User from "../model/User";
import { getChessDetails } from "../services/chess";
import pool from "../utils/dbConfig";
import { CustomRequest, userExtractor } from "../utils/middleware";
import { Pos } from "../utils/types";
const gameRouter: Router = express.Router();

gameRouter.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const client = await pool.connect();
      const { rows } = await client.query(`SELECT * FROM chess`);
      if (!rows || rows.length === 0) {
        throw { name: "NotFoundError", message: "No game found" };
      }
      res.status(200).json({ thing: `${rows}` });
    } catch (error) {
      next(error);
    }
  }
);

gameRouter.post(
  "/startGame",
  userExtractor,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
);

gameRouter.get(
  "/boardState/:gameId",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const client = await pool.connect();
      const gameId: number = parseInt(req.params.gameId);
      const gameDetails = await getChessDetails(gameId);
      const chess = new Chess(
        gameDetails.game_status,
        gameDetails.current_board
      );

      await client.release();

      res.status(200).json({
        unicode: chess.getBoard(),
        fen: gameDetails.current_board,
      });
    } catch (error) {
      next(error);
    }
  }
);

gameRouter.get(
  "/boardState/move",
  userExtractor,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const client = await pool.connect();
      const gameId: number = parseInt(req.body.gameId);
      const gameDetails = await getChessDetails(gameId);
      const chess = new Chess(
        gameDetails.game_status,
        gameDetails.current_board,
        gameDetails.is_current_player_white
      );
      const board = chess.getBoard();
      const user = new User((req as CustomRequest).email_address);
      const player = new Player(user, gameId, chess.isCurrentPlayerWhite);
      await player.isValidPlayer();
      const fromPos: Pos = { row: req.body.from_row, col: req.body.from_col };
      const toPos: Pos = { row: req.body.to_row, col: req.body.to_col };
      const move = new Moves(
        board.getSquare(fromPos),
        board.getSquare(toPos),
        player.isWhite
      );
      move.makeMove(gameId, board);
      await client.release();

      res.status(200).json({
        unicode: chess.board.toString(),
        fen: board.returnFen(),
      });
    } catch (error) {
      next(error);
    }
  }
);

export default gameRouter;
