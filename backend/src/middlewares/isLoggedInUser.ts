import { NextFunction, Request, Response } from "express"
import response from "../utils/resHandler"
import { verifyToken } from "../utils/jwt";

const isLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.user_token;

    if (!token) {
      return response(res, 401, "Please login first");
    }

    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error(error);
    return response(res, 500, "Server error");
  }
};

export default isLoggedInUser