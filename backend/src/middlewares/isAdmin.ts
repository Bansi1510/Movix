import { NextFunction, Request, Response } from "express"
import response from "../utils/resHandler"
import { verifyToken } from "../utils/jwt";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminId = req.cookies.id;

    if (!adminId) return response(res, 404, 'admin id not found');
    const decoded = verifyToken(adminId);

    req.user.id = decoded.id;
    req.user.email = decoded.email;

    next();
  } catch (error) {
    console.log(error)
    return response(res, 502, "server error")
  }
}

export default isAdmin;