import { Request, Response } from "express";
import { handleHttp } from "../utils/errorHandle";
import { createInternship, findAllInternships, findInternshipById, modifyInternship, removeInternship } from "../services/internshipService";
import { Internship } from "../interfaces/internships";

const getInternship = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            handleHttp(res, "Invalid ID");
            return;
        }
        const response = await findInternshipById(id.toString());
        if (!response) {
            res.status(404).json({ message: "Internship not found" });
            return;
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getInternships = async (_req: Request, res: Response) => {
    try {
        const response = await findAllInternships();
        res.status(200).json(response);
    } catch (e) {
        handleHttp(res, "Error getting internships", e);
    }
};

const postInternship = async (
    req: Request<{}, {}, Internship>,
    res: Response
) => {
    try {
        const {startDate, ...rest} = req.body;
        let parsedStartDate = new Date(startDate);
        const newItem = await createInternship({
            ...rest,
            startDate: parsedStartDate,
        });
        res.status(201).json(newItem);
    } catch (e) {
        handleHttp(res, "Error creating internship", e);
    }
};

const updateInternship = async (req: Request<{ id: string }, {}, Internship>, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return handleHttp(res, "Invalid ID");

        const response = await modifyInternship(id.toString(), req.body);
        if (!response) {
            res.status(404).json({ message: "Internship not found" });
            return;
        }

        res.status(200).json(response);
    } catch (e) {
        handleHttp(res, "Error updating internship", e);
    }
};  

const deleteInternship = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return handleHttp(res, "Invalid ID");

        const response = await removeInternship(id.toString());
        if (!response) {
            res.status(404).json({ message: "Internship not found" });
            return;
        }

        res.status(200).json({ message: "Internship deleted successfully" });
    } catch (e) {
        handleHttp(res, "Error deleting internship", e);
    }
};

export { getInternship, getInternships, postInternship, updateInternship, deleteInternship };