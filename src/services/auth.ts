import pool from "../utils/dbConfig";
import * as dotenv from "dotenv";
import { emailValidator, passwordValidator } from "../utils/validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserFromEmail } from "./User";

dotenv.config();

export async function registerUser(
  email_address: string,
  username: string,
  password: string
) {
  if (!emailValidator(email_address)) {
    throw { name: "CredentialError", message: "Invalid Email" };
  }
  if (!username || username.length < 5 || username.length > 20) {
    throw { name: "CredentialError", message: "Invalid username" };
  }
  if (!password || !passwordValidator(password)) {
    throw { name: "CredentialError", message: "Invalid Password" };
  }
  const saltRounds = 10;
  const passwordHash: string = await bcrypt.hash(password, saltRounds);
  const client = await pool.connect();
  await client.query(
    `INSERT INTO users (email_address,username,hash) VALUES('${email_address}','${username}','${passwordHash}');`
  );
  client.release();
}

export async function loginUser(
  email_address: string,
  password: string
): Promise<string> {
  const { rows } = await getUserFromEmail(email_address);
  if (!rows || rows.length === 0) {
    throw { name: "NotFoundError", message: "No user found" };
  }
  const isPassCorrect = !rows[0].email_address
    ? null
    : await bcrypt.compare(password, rows[0].hash);
  if (!isPassCorrect) {
    throw { name: "credentialError" };
  }
  const token = jwt.sign(
    {
      username: rows[0].email_address,
    },
    process.env.SECRET || "",
    { expiresIn: 21600 }
  );
  return token;
}
