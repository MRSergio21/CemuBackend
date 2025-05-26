import { Router } from "express";
import { getInternship, getInternships, postInternship, updateInternship, deleteInternship } from "../controllers/internshipsController";
import { checkAuth } from "../middlewares/session";

const router = Router()

router.get("/:id", getInternship);
router.get("/", getInternships);
router.post("/", checkAuth, postInternship);
router.put("/:id", checkAuth, updateInternship);
router.delete("/:id", checkAuth, deleteInternship);

export { router as internshipRouter };