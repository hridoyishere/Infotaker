import { Router } from "express";
import {
  getSites,
  createSite,
} from "../controllers/siteController.js";

const router = Router();

router.get("/", getSites);
router.post("/", createSite);

export default router;