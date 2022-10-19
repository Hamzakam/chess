import express, { Router, Request, Response, NextFunction } from "express";
import pool from "../utils/dbConfig";
import * as dotenv from "dotenv";
import { emailValidator, passwordValidator } from "../utils/validation";
import bcrypt from "bcryptjs";
import { loginUser, registerUser } from "../services/auth";

dotenv.config();

const authRouter: Router = express.Router();

authRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email_address, password } = req.body;
      await registerUser(username, email_address, password);
      res.status(201).json({ message: "Successful Registration" });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email_address, password } = req.body;
      const token: string = await loginUser(email_address, password);
      res.status(200).send({ token, email_address });
    } catch (error) {
      next(error);
    }
  }
);

export default authRouter;
