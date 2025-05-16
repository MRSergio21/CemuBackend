import { Request, Response } from "express";
import { handleHttp } from "../utils/errorHandle";
import { createDegree, findAllDegrees, findDegreeById, modifyDegree, removeDegree } from "../services/degreeService";
import { Degree } from "../interfaces/degree";

const getDegree = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            handleHttp(res, "Invalid ID");
            return;
        }
        const response = await findDegreeById(id.toString());
        if (!response) {
            res.status(404).json({ message: "Degree not found" });
            return;
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getDegrees = async (_req: Request, res: Response) => {
    try {
        const response = await findAllDegrees();
        res.status(200).json(response);
    } catch (e) {
        handleHttp(res, "Error getting degrees", e);
    }
};

const postDegree = async (
    req: Request<{}, {}, Degree>,
    res: Response
) => {
    try {
        const newItem = await createDegree(req.body);
        res.status(201).json(newItem);
    } catch (e) {
        handleHttp(res, "Error creating degree", e);
    }
};

const updateDegree = async (req: Request<{ id: string }, {}, Degree>, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return handleHttp(res, "Invalid ID");

        const response = await modifyDegree(id.toString(), req.body);
        if (!response) {
            res.status(404).json({ message: "Degree not found" });
            return;
        }

        res.status(200).json(response);
    } catch (e) {
        handleHttp(res, "Error updating degree", e);
    }
};

const deleteDegree = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return handleHttp(res, "Invalid ID");

        const response = await removeDegree(id.toString());
        if (!response) {
            res.status(404).json({ message: "Degree not found" });
            return;
        }

        res.status(200).json({ message: "Degree deleted successfully" });
    } catch (e) {
        handleHttp(res, "Error deleting degree", e);
    }
};

export { getDegree, getDegrees, postDegree, updateDegree, deleteDegree };