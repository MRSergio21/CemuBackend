import { Router } from "express";
import { getCompany, getCompanies, postCompany, updateCompany, deleteCompany} from "../controllers/companyController";

const router = Router()

router.get("/:id", getCompany);
router.get("/", getCompanies);
router.post("/", postCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export { router as companyRouter };