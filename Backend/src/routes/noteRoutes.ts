import { Router } from "express";
import { createNote,getNotes, removeNote } from "../controllers/NoteControllers";

const router = Router();

router.post("/", createNote);
router.get("/:userid",getNotes)
router.delete("/:noteid/:userid",removeNote)

export default router;