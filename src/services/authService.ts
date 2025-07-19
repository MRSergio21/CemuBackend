import { AuthInput, AuthResponse, RegisterInput, SafeUser } from "../interfaces/auth";
import { User, NewUser } from "../interfaces/user";
import { findUserByEmail, createUser } from "../models/userModel";
import { encrypt, verfied } from "../utils/bcryptHandle";
import { generateToken } from "../utils/jwt";

export const loginUser = async (credentials: AuthInput): Promise<AuthResponse> => {
  const user = await findUserByEmail(credentials.email);
  if (!user) throw new Error("Usuario no encontrado");

  const passwordMatch = await verfied(credentials.password, user.password);
  if (!passwordMatch) throw new Error("Credenciales incorrectas");

  const token = generateToken({ id: user.id, email: user.email });

  const safeUser: SafeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  return { token, user: safeUser };
};

export const registerUser = async (data: RegisterInput): Promise<AuthResponse> => {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new Error("Ya existe un usuario con este email");

  const passwordHash = await encrypt(data.password);

  const newUser: NewUser = {
    username: data.username,
    email: data.email,
    password: passwordHash,
  };

  const user = await createUser(newUser);

  const token = generateToken({ id: user.id, email: user.email });

  const safeUser: SafeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  return { token, user: safeUser };
};
