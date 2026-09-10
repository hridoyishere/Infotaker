import { Request, Response } from "express";
import mongoose from "mongoose";
import Note from "../models/Note.js";
import User from "../models/User.js";

export const getNotes = async (req: Request, res: Response) => {
  try {
    const userid = req.params.userid as string;

    // Check userid
    if (!userid) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    // Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID",
      });
    }

    // Check user exists
    const user = await User.findById(userid);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized request",
      });
    }

    // Get only this user's sites
    const note = await Note.find({
      userid: user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to get note",
    });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { userid, title, text } = req.body;

    // Check required fields
    if (!userid || !title || !text) {
      return res.status(400).json({
        success: false,
        error: "User ID, title and text are required",
      });
    }

    // Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID",
      });
    }

    // Check user exists
    const user = await User.findById(userid);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized request",
      });
    }

    // Create note
    const note = await Note.create({
      userid: user._id,
      title,
      text,
    });

    return res.status(201).json({
      success: true,
      message: "Note added successfully",
      note,
    });
  } catch (error) {
    console.error("Note create error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to create note",
    });
  }
};

export const removeNote = async (req: Request, res: Response) => {
  try {
    const userid = req.params.userid as string;
    const noteid = req.params.noteid as string;

    console.log("userid",userid,"noteid", noteid);

    // Check site ID
    if (!noteid || !userid) {
      return res.status(400).json({
        success: false,
        error: "Note and user ID is required",
      });
    }

    // Check whether ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteid)) {
      return res.status(400).json({
        success: false,
        error: "Invalid note ID",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID",
      });
    }

    // Check user exists
    const user = await User.findById(userid);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized request",
      });
    }

    // Find the site
    const site = await Note.findById(noteid);

    if (!site) {
      return res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }

    // Delete the site
    await Note.findByIdAndDelete(noteid);

    return res.status(200).json({
      success: true,
      message: "Note removed successfully",
    });
  } catch (error) {
    console.error("Remove note error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to remove note",
    });
  }
};
