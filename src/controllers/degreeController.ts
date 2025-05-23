import { Request, Response } from "express";
import { handleHttp } from "../utils/errorHandle";
import { createDegree, findAllDegrees, findDegreeById, modifyDegree, removeDegree } from "../services/degreeService";
import { Degree } from "../interfaces/degree";
import { successResponse, errorResponse, notFoundResponse, invalidIdResponse, parseId } from "../utils/responseHandler";

const getDegree = async (req: Request, res: Response): Promise<void> => {
    const id = parseId(req.params.id);
    if (id === null) return invalidIdResponse(res);

    try {
        const response = await findDegreeById(id.toString());
        if (!response) return notFoundResponse(res, "Degree not found");

        successResponse(res, response);
    } catch {
        errorResponse(res, "Internal Server Error");
    }
};

const getDegrees = async (_req: Request, res: Response): Promise<void> => {
    try {
        const response = await findAllDegrees();
        successResponse(res, response);
    } catch (e) {
        handleHttp(res, "Error getting degrees", e);
    }
};

const postDegree = async (req: Request<{}, {}, Degree>, res: Response): Promise<void> => {
    try {
        const newItem = await createDegree(req.body);
        successResponse(res, newItem, 201);
    } catch (e) {
        handleHttp(res, "Error creating degree", e);
    }
};

const updateDegree = async (req: Request<{ id: string }, {}, Degree>, res: Response): Promise<void> => {
    const id = parseId(req.params.id);
    if (id === null) return invalidIdResponse(res);

    try {
        const response = await modifyDegree(id.toString(), req.body);
        if (!response) return notFoundResponse(res, "Degree not found");

        successResponse(res, response);
    } catch (e) {
        handleHttp(res, "Error updating degree", e);
    }
};

const deleteDegree = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const id = parseId(req.params.id);
    if (id === null) return invalidIdResponse(res);

    try {
        const response = await removeDegree(id.toString());
        if (!response) return notFoundResponse(res, "Degree not found");

        successResponse(res, { message: "Degree deleted successfully" });
    } catch (e) {
        handleHttp(res, "Error deleting degree", e);
    }
};

export { getDegree, getDegrees, postDegree, updateDegree, deleteDegree };
