// services/authService.ts
import { Auth } from "../interfaces/auth";
import { User } from "../interfaces/user";
import { findUserByEmail, createUser } from "../models/userModel";
import { encrypt, verfied } from "../utils/bcryptHandle";
import { generateToken } from "../utils/jwt"

export const loginUser = async (credentials: Auth) => {
  const user = await findUserByEmail(credentials.email);
  if (!user) throw new Error("Usuario no encontrado");

  const passwordMatch = await verfied(credentials.password, user.password);
  if (!passwordMatch) throw new Error("Credenciales incorrectas");

  const token = generateToken({ id: user.id, email: user.email });
  return { token, user: { username: user.username, email: user.email } };
};

export const registerUser = async (data: User) => {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new Error("Ya existe un usuario con este email");

  const passwordHash = await encrypt(data.password);
  const user = await createUser({ ...data, password: passwordHash });

  const token = generateToken({ id: user.id, email: user.email });
  return { token, user: { username: user.username, email: user.email } };
};
