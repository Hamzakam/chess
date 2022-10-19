/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pool from "./utils/dbConfig";
import helmet from "helmet";
import morgan from "morgan";
import { Chess } from "./model/Chess";
import gameRouter from "./controllers/gameRouter";
import { errorHandler } from "./utils/middleware";
import userRouter from "./controllers/userRouter";
dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Just a Ping
app.get("/", (req, res) => {
  res.status(200).json({ message: "app working!" });
});

app.use("/game", gameRouter);
app.use("/auth", userRouter);
//Error handler
app.use(errorHandler);

/**
 * Server Activation
 */

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  await pool.connect();
  const chess = new Chess();
});
