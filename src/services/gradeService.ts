import { Grade } from "../interfaces/grade";
import { insertGrade, getGrades, getGrade, updateGrade, deleteGrade } from "../models/gradeModel";

const createGrade = async (item: Grade) => {
    return await insertGrade(item);
};
  
const findAllGrades = async () => {
    return await getGrades();
};
  
const findGradeById = async (id: string) => {
    return await getGrade(id);
};
  
const modifyGrade = async (id: string, data: Grade) => {
    return await updateGrade(id, data);
};
  
const removeGrade = async (id: string) => {
    return await deleteGrade(id);
};

export { createGrade, findAllGrades, findGradeById, modifyGrade, removeGrade };