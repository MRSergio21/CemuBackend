import { Router } from "express";
import { loginCtrl, registerCtrl, meCtrl } from "../controllers/authController";
import { checkAuth } from "../middlewares/session";

const router = Router();

router.post("/login", loginCtrl);
router.post("/register", registerCtrl);
router.post("/me", checkAuth, meCtrl);

export { router as authRouter };