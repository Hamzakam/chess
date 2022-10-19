import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { getUserFromEmail } from "../services/User";

export interface CustomPayload extends JwtPayload {
  email_address: string;
}
export interface CustomRequest extends Request {
  email_address: string;
}
export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error(error);
  switch (error.name) {
    case "NotFoundError":
      response
        .status(404)
        .json({ error: "No Resource Error", message: error.message });
      break;
    case "CredentialError":
    case "jsonWebTokenError":
    case "error":
    case "InvalidMove":
      response.status(400).json({
        error: error.name,
        message: error.message || "Invalid Credentials. Please Try again",
      });

    default:
      response.status(500).json({ error: "internal error" });
  }
  next();
}

export async function userExtractor(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const auth = request.get("authorization");
    const token =
      auth && auth.toLowerCase().startsWith("bearer ")
        ? auth.substring(7)
        : null;
    if (!token) {
      throw { name: "CredentialError", message: "missing token" };
    }
    const decodedToken: JwtPayload | string = jwt.verify(
      request.body.token,
      process.env.SECRET || ""
    );
    if (!decodedToken) {
      throw {
        name: "jsonWebTokenError",
        message: "Access to resource denied",
      };
    }
    const email_address = (decodedToken as CustomPayload).email_address;
    const rows = await getUserFromEmail(email_address);
    if (!rows || rows.length === 0) {
      throw { name: "NotFoundError", message: "Sorry. User not found." };
    }
    (request as CustomRequest).email_address = email_address;
  } catch (error) {
    next(error);
  }
}
