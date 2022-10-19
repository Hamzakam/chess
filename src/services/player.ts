import pool from "../utils/dbConfig";

export async function createPlayer(
  email_address: string,
  game_id: number,
  isWhite: boolean
) {
  const client = await pool.connect();
  await client.query(
    `INSERT INTO (email_address,game_id,isWhite) VALUES('${email_address}',${game_id},'${isWhite}');`
  );
  client.release();
}

export async function getBoardPlayers(game_id: number) {
  const client = await pool.connect();
  const rows = await client.query(
    `SELECT * FROM players WHERE game_id=${game_id};`
  );
  client.release();
  return rows;
}

export async function getBoardPlayerCount(game_id: number) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT COUNT(*)::int FROM players WHERE game_id=${game_id};`
  );
  client.release();
  return parseInt(rows[0].count);
}
