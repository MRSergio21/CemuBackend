import { Router } from "express";
import { getRequest, getRequests, postRequest, updateRequest } from "../controllers/requestController";
import { checkAuth } from "../middlewares/session";

const router = Router()

router.get("/:id", checkAuth, getRequest);
router.get("/", checkAuth, getRequests);
router.post("/", postRequest);
router.put("/:id", checkAuth, updateRequest);

export { router as requestRouter };