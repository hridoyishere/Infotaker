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

    // Create site
    const site = await Note.create({
      userid: user._id,
      title,
      text,
    });

    return res.status(201).json({
      success: true,
      message: "Note added successfully",
      site,
    });
  } catch (error) {
    console.error("Note create error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to create note",
    });
  }
};
