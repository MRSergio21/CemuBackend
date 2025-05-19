import { Router } from "express";
import { loginCtrl, registerCtrl } from "../controllers/authController";

const router = Router();

router.post("/login", loginCtrl);
router.post("/register", registerCtrl);

export { router as authRouter };