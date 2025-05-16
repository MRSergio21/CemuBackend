import { Degree } from "../interfaces/degree";
import { insertDegree, getDegree, getDegrees, updateDegree, deleteDegree } from "../models/degreeModel";

const createDegree = async (item: Degree) => {
    return await insertDegree(item);
};
  
const findAllDegrees = async () => {
    return await getDegrees();
};
  
const findDegreeById = async (id: string) => {
    return await getDegree(id);
};
  
const modifyDegree = async (id: string, data: Degree) => {
    return await updateDegree(id, data);
};
  
const removeDegree = async (id: string) => {
    return await deleteDegree(id);
};

export { createDegree, findAllDegrees, findDegreeById, modifyDegree, removeDegree };