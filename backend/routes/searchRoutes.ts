import { Router } from "express";
import { searchScan } from "../controllers/searchController";

const router = Router();
router.get("/", searchScan); // GET /api/search?serial=XXX

export default router;
