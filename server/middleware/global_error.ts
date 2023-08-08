import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check status code
  err.statusCode = err.statusCode || 500;
  // check error message
  err.status = err.status || "error";
  //   respone error
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
