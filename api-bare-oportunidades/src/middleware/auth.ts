import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const auth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token is required" });
  }
  const [, token] = authHeader.split(" ");

  try {
    await jwt.verify(
      token,
      process.env.APP_SECRET || "34f08ca07a8ee8dec0c07a844115c08e"
    );

    next();
  } catch (err) {
    return response.status(401).json({ message: "Token is required" });
  }
};
