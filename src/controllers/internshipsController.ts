import { Request, Response } from "express";
import { handleHttp } from "../utils/errorHandle";
import { createInternship, findAllInternships, findInternshipById, modifyInternship, removeInternship } from "../services/internshipService";
import { Internship } from "../interfaces/internships";
import { successResponse, errorResponse, notFoundResponse, invalidIdResponse, parseId } from "../utils/responseHandler";

const getInternship = async (req: Request, res: Response): Promise<void> => {
const id = parseId(req.params.id);
    if (id === null) return invalidIdResponse(res);

    try {
        const response = await findInternshipById(id.toString());
        if (!response) return notFoundResponse(res, "Internship not found");

        successResponse(res, response);
    } catch {
        errorResponse(res, "Internal Server Error");
    }
}

const getInternships = async (_req: Request, res: Response) => {
    try {
        const response = await findAllInternships();
        successResponse(res, response);
    } catch (e) {
        handleHttp(res, "Error getting internships", e);
    }
};

const postInternship = async ( req: Request<{}, {}, Internship>, res: Response) => {
    try {
        const newItem = await createInternship(req.body);
        successResponse(res, newItem, 201);
    } catch (e) {
        handleHttp(res, "Error creating internship", e);
    }
};

const updateInternship = async (req: Request<{ id: string }, {}, Internship>, res: Response): Promise<void> => {
    const id = parseId(req.params.id);
    if (id === null) return invalidIdResponse(res);

    try {
        const response = await modifyInternship(id.toString(), req.body);
        if (!response) return notFoundResponse(res, "Internship not found");

        successResponse(res, response);
    } catch (e) {
        handleHttp(res, "Error updating internship", e);
    }
};  

const deleteInternship = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const id = parseId(req.params.id);
    if (id === null) return invalidIdResponse(res);

    try {
        const response = await removeInternship(id.toString());
        if (!response) return notFoundResponse(res, "Internship not found");

        successResponse(res, { message: "Internship deleted successfully" });
    } catch (e) {
        handleHttp(res, "Error deleting internship", e);
    }
};

export { getInternship, getInternships, postInternship, updateInternship, deleteInternship };