import { PrismaClient } from "@prisma/client";
import { InternshipInput } from "../interfaces/internships";

const prisma = new PrismaClient();

export const insertInternship = async (data: InternshipInput) => {
  if (data.degree_id === null) {
    throw new Error("degree_id cannot be null");
  }
  return await prisma.internship.create({
    data: {
      ...data,
      degree_id: data.degree_id as number,
    },
    include: {
      company: true,
      degree: true,
    },
  });
};

export const getInternships = async () => {
  return await prisma.internship.findMany({
    include: {
      company: true,
      degree: true,
    },
  });
};

export const getInternship = async (id: string) => {
  return await prisma.internship.findUnique({
    where: { id: Number(id) },
    include: {
      company: true,
      degree: true,
    },
  });
};

export const updateInternship = async (id: string, data: InternshipInput) => {
  if (data.degree_id === null) {
    throw new Error("degree_id cannot be null");
  }
  return await prisma.internship.update({
    where: { id: Number(id) },
    data: {
      ...data,
      degree_id: data.degree_id as number,
    },
    include: {
      company: true,
      degree: true,
    },
  });
};

export const deleteInternship = async (id: string) => {
  return await prisma.internship.delete({
    where: { id: Number(id) },
  });
};
