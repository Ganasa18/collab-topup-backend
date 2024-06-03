import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const accessCreateValidationRules = () => {
  return [
    body("level_user_id").notEmpty().withMessage("Role user is required"),
    body("menu_id").notEmpty().withMessage("Menu id is required"),
  ];
};

const validateCreateAccess = (
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
  accessCreateValidationRules,
  validateCreateAccess,
};
