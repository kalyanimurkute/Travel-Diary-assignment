import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_EXPIRATION } from "../config.js";

dotenv.config();

// ================= SIGNUP =================

const postSignup = async (req, res) => {

  try {

    const {
      name,
      email,
      mobile,
      city,
      country,
      password,
    } = req.body;

    if (!name) {
      return res.json({
        success: false,
        message: "Name is required",
      });
    }

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.json({
        success: false,
        message: "Password is required",
      });
    }

    // Check existing user

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Encrypt password

    const salt = bcrypt.genSaltSync(10);

    const encryptedPassword = bcrypt.hashSync(
      password,
      salt
    );

    // Create user

    const newUser = new User({
      name,
      email,
      mobile,
      city,
      country,
      password: encryptedPassword,
    });

    const savedUser = await newUser.save();

    return res.json({
      success: true,
      message: "Signup successful",
      data: savedUser,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================

const postLogin = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.json({
        success: false,
        message: "Password is required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    // JWT Token

    const jwtToken = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      }
    );

    existingUser.password = undefined;

    return res.json({
      success: true,
      message: "Login successful",
      data: existingUser,
      jwtToken,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { postSignup, postLogin };