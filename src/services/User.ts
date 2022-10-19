import pool from "../utils/dbConfig";

export async function getUserFromEmail(email_address: string) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT * FROM users WHERE email_address='${email_address}'`
  );
  return rows[0];
}
