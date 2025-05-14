import { Internship } from "../interfaces/internships";
import { insertInternship, getInternships, getInternship, updateInternship, deleteInternship } from "../models/internshipsModel";

const createInternship = async (item: Internship) => {
    return await insertInternship(item);
};

const findAllInternships = async () => {
    return await getInternships();
};

const findInternshipById = async (id: string) => {
    return await getInternship(id);
};

const modifyInternship = async (id: string, data: Internship) => {
    return await updateInternship(id, data);
};

const removeInternship = async (id: string) => {
    return await deleteInternship(id);
};

export { createInternship, findAllInternships, findInternshipById, modifyInternship, removeInternship };