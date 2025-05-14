import { Request, Response } from "express";
import { handleHttp } from "../utils/errorHandle";
import { createGrade, findAllGrades, findGradeById, modifyGrade, removeGrade } from "../services/degreeService";
import { Degree } from "../interfaces/degree";

const getGrade = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            handleHttp(res, "Invalid ID");
            return;
        }
        const response = await findGradeById(id.toString());
        if (!response) {
            res.status(404).json({ message: "Grade not found" });
            return;
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getGrades = async (_req: Request, res: Response) => {
    try {
        const response = await findAllGrades();
        res.status(200).json(response);
    } catch (e) {
        handleHttp(res, "Error getting grades", e);
    }
};

const postGrade = async (
    req: Request<{}, {}, Degree>,
    res: Response
) => {
    try {
        const newItem = await createGrade(req.body);
        res.status(201).json(newItem);
    } catch (e) {
        handleHttp(res, "Error creating grade", e);
    }
};

const updateGrade = async (req: Request<{ id: string }, {}, Degree>, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return handleHttp(res, "Invalid ID");

        const response = await modifyGrade(id.toString(), req.body);
        if (!response) {
            res.status(404).json({ message: "Grade not found" });
            return;
        }

        res.status(200).json(response);
    } catch (e) {
        handleHttp(res, "Error updating grade", e);
    }
};

const deleteGrade = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return handleHttp(res, "Invalid ID");

        const response = await removeGrade(id.toString());
        if (!response) {
            res.status(404).json({ message: "Grade not found" });
            return;
        }

        res.status(200).json({ message: "Grade deleted successfully" });
    } catch (e) {
        handleHttp(res, "Error deleting grade", e);
    }
};

export { getGrade, getGrades, postGrade, updateGrade, deleteGrade };