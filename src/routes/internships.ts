import { Router } from "express";
import { getInternship, getInternships, postInternship, updateInternship, deleteInternship } from "../controllers/internshipsController";

const router = Router()

router.get("/:id", getInternship);
router.get("/", getInternships);
router.post("/", postInternship);
router.put("/:id", updateInternship);
router.delete("/:id", deleteInternship);

export { router }