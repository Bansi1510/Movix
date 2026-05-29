import { Request, Response } from "express";
import response from "../utils/resHandler";
import { sendWelcomeEmail } from "../services/email.service";
import {
  createUserService,
  findUserByEmailService,
  findUserByIdService,
  comparePasswordService,
} from "../services/user.service";

import { generateToken } from "../utils/jwt";

// =========================
// REGISTER USER
// =========================

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!email || !password) {
      return response(res, 400, "Email and password required");
    }

    // check existing user
    const existingUser = await findUserByEmailService(email);

    if (existingUser) {
      return response(res, 400, "User already exists");
    }

    // create user
    const user = await createUserService(name, email, password);

    await sendWelcomeEmail(
      user.email,
      user.name || undefined
    );
    // generate token
    const token = generateToken(user.id, user.email);

    return response(res, 201, "User registered successfully", {
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server error");
  }
};

// =========================
// LOGIN USER
// =========================

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return response(res, 400, "Email and password required");
    }

    // check user
    const user = await findUserByEmailService(email);

    if (!user) {
      return response(res, 404, "Invalid credentials");
    }

    // compare password
    const isPasswordMatch = await comparePasswordService(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      return response(res, 400, "Invalid credentials");
    }

    // token
    const token = generateToken(user.id, user.email);

    return response(res, 200, "Login successful", {
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server error");
  }
};

// =========================
// GET PROFILE
// =========================

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return response(res, 401, "Unauthorized");
    }

    const user = await findUserByIdService(userId);

    if (!user) {
      return response(res, 404, "User not found");
    }

    return response(res, 200, "Profile fetched successfully", user);
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server error");
  }
};
