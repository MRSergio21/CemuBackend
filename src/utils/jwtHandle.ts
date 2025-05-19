import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

const generateToken = (id: number | string) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1h", // duración del token
  });
  return token;
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

export { generateToken, verifyToken };
