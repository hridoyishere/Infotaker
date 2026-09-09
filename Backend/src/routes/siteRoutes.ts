import { Router } from "express";
import {
  getSites,
  createSite,
  removeSite,
} from "../controllers/siteController.js";

const router = Router();

router.get("/:userid", getSites);
router.post("/", createSite);
router.delete("/:siteid/:userid",removeSite)

export default router;