import { Degree } from "../interfaces/degree";
import { insertGrade, getGrades, getGrade, updateGrade, deleteGrade } from "../models/degreeModel";

const createGrade = async (item: Degree) => {
    return await insertGrade(item);
};
  
const findAllGrades = async () => {
    return await getGrades();
};
  
const findGradeById = async (id: string) => {
    return await getGrade(id);
};
  
const modifyGrade = async (id: string, data: Degree) => {
    return await updateGrade(id, data);
};
  
const removeGrade = async (id: string) => {
    return await deleteGrade(id);
};

export { createGrade, findAllGrades, findGradeById, modifyGrade, removeGrade };