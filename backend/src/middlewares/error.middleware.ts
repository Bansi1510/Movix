import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);

  const statusCode = error.statusCode || 500;

  const message = error.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;