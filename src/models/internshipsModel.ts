import { prisma } from "../config/prisma";
import { Internship } from "../interfaces/internships";

const insertInternship = async (data: Internship) =>  {
  const result = await prisma.internship.create({
    data: {
      internshipTitle: data.internshipTitle,
      internshipLocation: data.internshipLocation,
      salary: data.salary,
      modality: data.modality,
      workday: data.workday,
      internshipType: data.internshipType,
      minimumStudies: data.minimumStudies,
      languages: data.languages,
      startDate: data.startDate,
      internshipPeriod: data.period,
      minimumExperience: data.minimumExperience,
      backgroundKnowledge: data.backgroundKnowledge,
      description: data.description,
      company: {
        connect: { id: data.company.id }
      },
      degree: data.degree ? {
        connect: { id: data.degree.id }
      } : undefined,
    },
  });
  return result;
};

const getInternships = async () => {
  return await prisma.internship.findMany({
    orderBy: { id: 'asc' },
    include: { company: true, degree: true },
  });
};

const getInternship = async (id: string) => {
  return await prisma.internship.findUnique({
    where: { id: parseInt(id, 10) },
    include: { company: true, degree: true },
  });
};

const updateInternship = async (id: string, data: Internship) =>  {
  const result = await prisma.internship.update({
    where: { id: parseInt(id, 10) },
    data: {
      internshipTitle: data.internshipTitle,
      internshipLocation: data.internshipLocation,
      salary: data.salary,
      modality: data.modality,
      internshipType: data.internshipType,
      workday: data.workday,
      minimumStudies: data.minimumStudies,
      languages: data.languages,
      startDate: data.startDate,
      internshipPeriod: data.period,
      minimumExperience: data.minimumExperience,
      backgroundKnowledge: data.backgroundKnowledge,
      description: data.description,
      company: {
        connect: { id: data.company.id }
      },
      degree: data.degree ? {
        connect: { id: data.degree.id }
      } : undefined,
    },
  });
  return result;
};

const deleteInternship = async (id: string) => {
  return await prisma.internship.delete({
    where: { id: parseInt(id, 10) },
  });
};

export { insertInternship, getInternships, getInternship, updateInternship, deleteInternship };
