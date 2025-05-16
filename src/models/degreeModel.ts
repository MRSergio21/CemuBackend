import { prisma } from "../config/prisma";
import { Degree } from '../interfaces/degree';

const insertDegree = async (item: Degree) => {
  const result = await prisma.degree.create({
    data: {
      name: item.name,
    },
  });
  return result;
};

const getDegrees = async () => {
  const result = await prisma.degree.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  return result;
};

const getDegree = async (id: string) => {
  const result = await prisma.degree.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return result;
};

const updateDegree = async (id: string, data: Degree) => {
  const result = await prisma.degree.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      name: data.name,
    },
  });
  return result;
};

const deleteDegree = async (id: string) => {
  const result = await prisma.degree.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
  return result;
};

export { insertDegree, getDegrees, getDegree, updateDegree, deleteDegree };