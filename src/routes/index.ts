import { Router } from "express";
import { authRouter } from "./auth";
import { companyRouter } from "./company";
import { degreeRouter } from "./degree";
import { internshipRouter } from "./internships";
import { requestRouter } from "./request";
import { checkAuth } from "../middlewares/session"; 

const router = Router();

router.use("/auth", authRouter); 
router.use("/company", checkAuth, companyRouter);
router.use("/degree", checkAuth, degreeRouter);
router.use("/internships", internshipRouter);
router.use("/requests", requestRouter);

export { router };
