import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

type TokenPayload = {
  id: string;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send("Token não fornecido");

  const [, token] = authorization.split(" ");

  const decoded = JWT.verify(token, "secret");
  const { id } = decoded as TokenPayload;
  req.userID = id;
  next();
};
