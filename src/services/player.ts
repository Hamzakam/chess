import Player from "../model/Player";
import pool from "../utils/dbConfig";

export async function createPlayer(
  email_address: string,
  game_id: number,
  isWhite: boolean
) {
  const client = await pool.connect();
  await client.query(
    `INSERT INTO players (email_address,game_id,is_white) VALUES('${email_address}',${game_id},'${isWhite}');`
  );
  client.release();
}

export async function getBoardPlayers(game_id: number) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT * FROM players WHERE game_id='${game_id}';`
  );
  client.release();
  if (!rows || rows.length === 0) {
    throw {
      name: "NotFoundError",
      message: "Sorry. Can't find players in this game.",
    };
  }
  return rows;
}

export async function getBoardPlayerCount(game_id: number) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT COUNT(*)::int FROM players WHERE game_id='${game_id}';`
  );
  client.release();
  return parseInt(rows[0].count);
}

export async function checkIfPlayerInGame(player: Player): Promise<boolean> {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT * FROM players WHERE game_id='${player.game_id}' AND email_address='${player.user.emailAddress}';`
  );
  client.release();
  if (!rows || rows.length === 0) {
    throw {
      name: "NotFoundError",
      message: "Sorry. Can't find player in this game.",
    };
  }
  return true;
}
