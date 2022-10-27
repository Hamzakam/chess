import pool from "../utils/dbConfig";
import { gameStatusValidator } from "../utils/validation";
import { createPlayer, getBoardPlayerCount, getBoardPlayers } from "./player";

export async function startGame(email_address: string) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `INSERT INTO chess DEFAULT VALUES returning game_id;`
  );
  client.release();
  const game_id = rows[0].game_id;
  await createPlayer(email_address, game_id, true);
}

export async function joinGame(email_address: string, game_id: number) {
  const players: number = await getBoardPlayerCount(game_id);
  if (players < 2) {
    await createPlayer(email_address, game_id, false);
  } else {
    throw { name: "error", message: "Too many users in one game" };
  }
}

export async function getChessDetails(game_id: number) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT * FROM chess WHERE game_id='${game_id}';`
  );
  client.release();
  if (!rows || rows.length === 0) {
    throw {
      name: "NotFoundError",
      message: "Invalid game id or game. Please check again.",
    };
  }
  return rows[0];
}

export async function getCurrentBoard(game_id: number) {
  const { current_board } = await getChessDetails(game_id);
  return current_board;
}

export async function getCurrentStatus(game_id: number) {
  const { game_status } = await getChessDetails(game_id);
  return game_status;
}

export async function setCurrentStatus(game_id: number, game_status: string) {
  const client = await pool.connect();
  if (!gameStatusValidator(game_status)) {
    throw { name: "error", message: "Invalid gamestatus" };
  }
  await client.query(
    `UPDATE chess SET game_status = '${game_status.toUpperCase()}' WHERE game_id='${game_id}';`
  );
  client.release();
}

export async function changeTurn(
  game_id: number,
  current_board: string,
  is_current_player_white: boolean
) {
  const client = await pool.connect();

  await client.query(
    `UPDATE chess SET current_board = '${current_board}', is_current_player_white = '${!is_current_player_white}' WHERE game_id='${game_id}';`
  );
  client.release();
}
