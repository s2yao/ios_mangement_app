import { Router } from "express";
import { createScan } from "../controllers/scanController";

const router = Router();
router.post("/", createScan);
export default router;
