import { Router } from "express";
import { createNote,getNotes } from "../controllers/NoteControllers";

const router = Router();

router.post("/", createNote);
router.get("/:userid",getNotes)


export default router;