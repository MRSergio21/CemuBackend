import { Request, Response } from "express"
import { handleHttp } from "../utils/errorHandle"
import { createCompany, findAllCompanies, findCompanyById, modifyCompany, removeCompany } from "../services/companyService";
import { Company } from "../interfaces/company";

const getCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
            if (isNaN(id)) {
                handleHttp(res, "Invalid ID");
                return;
            }
            const response = await findCompanyById(id.toString());
            if (!response) {
                res.status(404).json({ message: "Company not found" });
                return;
            }
            res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getCompanies = async (_req: Request, res: Response) => {
    try {
        const response = await findAllCompanies();
        res.status(200).json(response);
    } catch (e) {
        handleHttp(res, "Error getting companies", e);
    }
};


const postCompany = async (
    req: Request<{}, {}, Company>,
    res: Response
) => {
    try {
        const newItem = await createCompany(req.body);
        res.status(201).json(newItem);
    } catch (e) {
        handleHttp(res, "Error creating company", e);
    }
};

const updateCompany = async (req: Request<{ id: string }, {}, Company>, res: Response): Promise<void> => {
    async (
        req: Request<{ id: string }, {}, Company>,
        res: Response
    ) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return handleHttp(res, "Invalid ID");

            const response = await modifyCompany(id.toString(), req.body);
            if (!response) return res.status(404).json({ message: "Company not found" });

            res.status(200).json(response);
        } catch (e) {
            handleHttp(res, "Error updating company", e);
        }
    };
}

const deleteCompany = async (req: Request<{ id: string }>, res: Response, next: Function) => {
    async (
        req: Request<{ id: string }, {}, Company>,
        res: Response
    ) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return handleHttp(res, "Invalid ID");
            const response = await removeCompany(id.toString());
            if (!response) return res.status(404).json({ message: "Company not found" });
            res.status(200).json(response);
        } catch (error) {
            handleHttp(res, "Error deleting company", error);
        }
    };
}

export { getCompany, getCompanies, updateCompany, postCompany, deleteCompany };