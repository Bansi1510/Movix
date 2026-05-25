import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/db.config";
import { generateToken } from "../utils/jwt";
import response from "../utils/resHandler";


export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return response(res, 401, "email and password required");

    const admin = await prisma.admin.findFirst({
      where: {
        email
      },
    });

    if (!admin) return response(res, 402, "admin not found")

    const isMatchPassword = await bcrypt.compare(password, admin.password);

    if (!isMatchPassword) return response(res, 402, "incorrect password");

    const token = generateToken(admin.id, admin.email);

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return response(res, 200, `welcome ${admin.email}`, { email: admin.email, id: admin.id });

  } catch (error) {
    console.log(error)
    return response(res, 502, "server error")
  }
}

export const getAdminProfile = async (req: Request, res: Response) => {
  try {
    const id = req.id;
    if (!id) return response(res, 404, "admin not found login again");

    const admin = await prisma.admin.findFirst({
      where: {
        id
      },
      select: {
        email: true,
        id: true
      }
    });

    return response(res, 200, "", admin);
  } catch (error) {
    console.log(error)
    return response(res, 502, "server error")
  }
}