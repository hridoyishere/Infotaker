import { Request, Response } from "express";
import mongoose from "mongoose";
import Site from "../models/Site.js";
import User from "../models/User.js";

export const getSites = async (req: Request, res: Response) => {
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
    const sites = await Site.find({
      userid: user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      sites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to get sites",
    });
  }
};

export const createSite = async (req: Request, res: Response) => {
  try {
    const { userid, name, url } = req.body;

    // Check required fields
    if (!userid || !name || !url) {
      return res.status(400).json({
        success: false,
        error: "User ID, name and URL are required",
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
    const site = await Site.create({
      userid: user._id,
      name,
      url,
    });

    return res.status(201).json({
      success: true,
      message: "Site added successfully",
      site,
    });
  } catch (error) {
    console.error("Create site error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to create site",
    });
  }
};

export const removeSite = async (req: Request, res: Response) => {
  try {
    const userid = req.params.userid as string;
    const siteid = req.params.siteid as string;

    console.log(userid,siteid)

    // Check site ID
    if (!siteid || !userid) {
      return res.status(400).json({
        success: false,
        error: "Site and user ID is required",
      });
    }

    // Check whether ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(siteid)) {
      return res.status(400).json({
        success: false,
        error: "Invalid site ID",
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
    const site = await Site.findById(siteid);

    if (!site) {
      return res.status(404).json({
        success: false,
        error: "Site not found",
      });
    }

    // Delete the site
    await Site.findByIdAndDelete(siteid);

    return res.status(200).json({
      success: true,
      message: "Site removed successfully",
    });
  } catch (error) {
    console.error("Remove site error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to remove site",
    });
  }
};
