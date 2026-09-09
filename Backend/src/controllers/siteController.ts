import { Request, Response } from "express";
import Site from "../models/Site.js";

export const getSites = async (
  _req: Request,
  res: Response
) => {
  try {
    const sites = await Site.find().sort({ createdAt: -1 });

    res.status(200).json(sites);
  } catch (error) {
    console.error("Get sites error:", error);

    res.status(500).json({
      message: "Failed to get sites",
    });
  }
};

export const createSite = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, url } = req.body;

    if (!name || !url) {
      return res.status(400).json({
        message: "Name and URL are required",
      });
    }

    const site = await Site.create({
      name,
      url,
    });

    res.status(201).json(site);
  } catch (error) {
    console.error("Create site error:", error);

    res.status(500).json({
      message: "Failed to create site",
    });
  }
};