import { Company } from "../interfaces/company";
import { insertCompany, getCompanies, getCompany, updateCompany, deleteCompany } from "../models/companyModel";

const createCompany = async (item: Company) => {
  return await insertCompany(item);
};

const findAllCompanies = async () => {
  return await getCompanies();
};

const findCompanyById = async (id: string) => {
  return await getCompany(id);
};

const modifyCompany = async (id: string, data: Company) => {
  return await updateCompany(id, data);
};

const removeCompany = async (id: string) => {
  return await deleteCompany(id);
};

export { createCompany, findAllCompanies, findCompanyById, modifyCompany, removeCompany };