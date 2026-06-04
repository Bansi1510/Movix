import { NextFunction, Request, Response } from "express";
import response from "../utils/resHandler";
import { verifyToken } from "../utils/jwt";

const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.admin_token;
    console.log("token:", token)
    if (!token) {
      return response(
        res,
        401,
        "Unauthorized: Token not found"
      );
    }

    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error(error);

    return response(
      res,
      401,
      "Unauthorized: Invalid token"
    );
  }
};

export default isAdmin;