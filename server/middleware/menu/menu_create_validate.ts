import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const menuCreateValidationRules = () => {
  return [body("menu_name").notEmpty().withMessage("Menu name is required")];
};

const validateCreateMenu = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any = [];
  errors
    .array()
    .map((err: any) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    message: "error",
    errors: extractedErrors,
  });
};

module.exports = {
  menuCreateValidationRules,
  validateCreateMenu,
};
