import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email and password are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      logintry: 0,
    });

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      },
    );

    // Response
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Check login attempt limit
    if (user.logintry >= 10) {
      return res.status(429).json({
        success: false,
        error: "Too many login attempts. Please try again next day.",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Wrong password
    if (!passwordMatch) {
      user.logintry += 1;
      await user.save();

      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Successful login
    user.logintry = 0;
    await user.save();

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      },
    );

    // Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
};
