import express, { Router, Request, Response, NextFunction } from "express";
import { Chess } from "../model/Chess";
import pool from "../utils/dbConfig";
import { userExtractor } from "../utils/middleware";
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
      const gameId: Number = parseInt(req.params.gameId);
      const { rows } = await pool.query(
        `SELECT * FROM chess WHERE game_id=${gameId}`
      );
      const gameDetails = rows[0];
      const chess = new Chess(
        gameDetails.game_status,
        gameDetails.current_board
      );

      await client.release();

      res
        .status(200)
        .json({ unicode: chess.getBoard(), fen: gameDetails.current_board });
    } catch (error) {
      next(error);
    }
  }
);

export default gameRouter;
