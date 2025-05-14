import { Router } from "express";
import { getGrade, getGrades, postGrade, updateGrade, deleteGrade } from "../controllers/gradeController";

const router = Router()

router.get("/:id", getGrade);
router.get("/", getGrades);
router.post("/", postGrade);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);

export { router }