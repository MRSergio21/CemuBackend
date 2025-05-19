import { prisma } from "../config/prisma";
import { User } from "../interfaces/user";


export const findUserByEmail = async (email: string) => {
  return await prisma.administrator.findUnique({ where: { email } });
};

export const createUser = async (data: User) => {
  return await prisma.administrator.create({ data });
};
