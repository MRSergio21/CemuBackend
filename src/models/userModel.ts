import { prisma } from "../config/prisma";
import { NewUser } from "../interfaces/user";

export const findUserByEmail = async (email: string) => {
  return await prisma.administrator.findUnique({ where: { email } });
};

export const createUser = async (data: NewUser) => {
  return await prisma.administrator.create({ data });
};

export const findUserById = async (id: number) => {
  return await prisma.administrator.findUnique({ where: { id } });
};
