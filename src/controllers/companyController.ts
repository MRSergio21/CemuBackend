import { Request, Response } from "express"
import { handleHttp } from "../utils/errorHandle"
import { createCompany, findAllCompanies, findCompanyById, modifyCompany, removeCompany } from "../services/companyService";
import { Company } from "../interfaces/company";
import { successResponse, errorResponse, notFoundResponse, invalidIdResponse, parseId } from "../utils/responseHandler";

const getCompany = async (req: Request, res: Response): Promise<void> => {
const id = parseId(req.params.id);
    if (id === null) return invalidIdResponse(res);

    try {
        const response = await findCompanyById(id.toString());
        if (!response) return notFoundResponse(res, "Company not found");

        successResponse(res, response);
    } catch {
        errorResponse(res, "Internal Server Error");
    }
};

const getCompanies = async (_req: Request, res: Response) => {
    try {
        const response = await findAllCompanies();
        successResponse(res, response);
    } catch (e) {
        handleHttp(res, "Error getting companies", e);
    }
};


const postCompany = async ( req: Request<{}, {}, Company>, res: Response) => {
    try {
        const newItem = await createCompany(req.body);
        successResponse(res, newItem, 201);
    } catch (e) {
        handleHttp(res, "Error creating company", e);
    }
};

const updateCompany = async ( req: Request<{ id: string }, {}, Company>, res: Response ): Promise<void> => {
    const id = parseId(req.params.id);
    if (id === null) return invalidIdResponse(res);

    try {
        const response = await modifyCompany(id.toString(), req.body);
        if (!response) return notFoundResponse(res, "Company not found");

        successResponse(res, response);
    } catch (e) {
        handleHttp(res, "Error updating company", e);
    }
};

const deleteCompany = async ( req: Request<{ id: string }>, res: Response ): Promise<void> => {
    const id = parseId(req.params.id);
    if (id === null) return invalidIdResponse(res);

    try {
        const response = await removeCompany(id.toString());
        if (!response) return notFoundResponse(res, "Company not found");

        successResponse(res, { message: "Company deleted successfully" });
    } catch (e) {
        handleHttp(res, "Error deleting company", e);
    }
};

export { getCompany, getCompanies, updateCompany, postCompany, deleteCompany };