import { RequestInput } from "../interfaces/request";
import { insertRequest, getRequests, getRequest, updateRequest } from "../models/requestModel";

const createRequest = async (item: RequestInput) => {
    return await insertRequest(item);
}

const findAllRequests = async () => {
    return await getRequests();
}

const findRequestById = async (id: string) => {
    return await getRequest(id);
}

const modifyRequest = async (id: string, data: RequestInput) => {
    return await updateRequest(id, data);
}

export {
    createRequest,
    findAllRequests,
    findRequestById,
    modifyRequest,
};