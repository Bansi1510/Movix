import { NextFunction, Request, Response } from "express"
import response from "../utils/resHandler"
import { verifyToken } from "../utils/jwt";

const isLoggedInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.cookies.id;

    if (!userId) return response(res, 401, 'please login first');
    const decoded = verifyToken(userId);

    req.user.id = decoded.id;
    req.user.email = decoded.email;

    next();
  } catch (error) {
    console.log(error)
    return response(res, 502, "server error")
  }
}

export default isLoggedInUser;