import { Request, Response, NextFunction } from "express";

const getTest = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      message: "success",
      data: "get test ok",
    });
  };
};

export { getTest };
