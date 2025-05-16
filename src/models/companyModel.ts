import { prisma } from "../config/prisma";
import { Company } from "../interfaces/company";

const insertCompany = async (item: Company) => {
  const result = await prisma.company.create({
    data: {
      name: item.name,
    },
  });
  return result;
};

const getCompanies = async () => {
  const result = await prisma.company.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  return result;
};

const getCompany = async (id: string) => {
  const result = await prisma.company.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return result;
};

const updateCompany = async (id: string, data: Company) => {
  const result = await prisma.company.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      name: data.name,
    },
  });
  return result;
};

const deleteCompany = async (id: string) => {
  const result = await prisma.company.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
  return result;
};

export { insertCompany, getCompanies, getCompany, updateCompany, deleteCompany };
