import Moves from "../model/Moves";
import pool from "../utils/dbConfig";

export async function movePiece(game_id: number, move: Moves) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `INSERT INTO moves (game_id,is_white,to_row,to_col,from_row,from_col,piece,killed) VALUES('${game_id}',${move.getIsPlayerWhite()},'${
      move.to.getPos().row
    }','${move.to.getPos().col}','${move.from.getPos().row}','${
      move.from.getPos().col
    }','${move.piece?.toString()}','${move.killed}');`
  );
  client.release();
}

export async function getMoves(game_id: number) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT * FROM chess WHERE game_id='${game_id}';`
  );
  client.release();
  return rows;
}
