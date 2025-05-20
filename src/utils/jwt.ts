import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
};
