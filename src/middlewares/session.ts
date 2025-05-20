import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
      res.status(401).json({ error: "Token missing or malformed" });
      return; 
    }

    const token = bearer.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { user: User };

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
