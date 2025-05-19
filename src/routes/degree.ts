import { Router } from "express";
import { getDegree, getDegrees, postDegree, updateDegree, deleteDegree } from "../controllers/degreeController";

const router = Router()

router.get("/:id", getDegree);
router.get("/", getDegrees);
router.post("/", postDegree);
router.put("/:id", updateDegree);
router.delete("/:id", deleteDegree);

export { router as degreeRouter };