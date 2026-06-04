import { NextFunction, Request, Response } from "express";
import response from "../utils/resHandler";
import {
  loginAdminService,
  getAdminProfileService,
  generateUserInsightService,
  logoutAdminService,

} from "../services/admin.service";

export const loginAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const { token, admin } = await loginAdminService(
      email,
      password
    );

    console.log("🔐 Setting cookie with token:", token.substring(0, 20) + "...");
    
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return response(
      res,
      200,
      `welcome ${admin.email}`,
      admin
    );
  } catch (error: any) {
    return response(res, 400, error.message);
  }
};

export const getAdminProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const admin = await getAdminProfileService(
      req.user?.id!
    );

    return response(res, 200, "", admin);
  } catch (error: any) {
    return response(res, 400, error.message);
  }
};

export const generateUserInsightController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId as string;

    const insight = await generateUserInsightService(
      userId
    );

    res.status(200).json({
      success: true,
      data: insight,
    });
  } catch (error) {
    next(error);
  }
};

export const checkAuthController = (
  req: Request,
  res: Response
) => {
  console.log(req.user)
  return response(
    res,
    200,
    "Authenticated",
    {
      admin: req.user,
      authenticated: true,
    }
  );
};
export const logoutAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await logoutAdminService(res);

    return response(
      res,
      200,
      "Logout successful"
    );
  } catch (error) {
    next(error);
  }
};
// export const getDashboardStats = () => { }
// export const getRevenueStats = () => { }
// export const getTopVideos = () => { }
// export const getRecentUploads = () => { }