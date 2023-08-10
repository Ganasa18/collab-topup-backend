import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../middleware";

const userLoginValidationRules = () => {
  return [
    body("email").notEmpty().isEmail().withMessage("Email must be valid"),
    body("password").notEmpty().withMessage("Password must be valid"),
  ];
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 422));
  }
  next();
};

module.exports = {
  userLoginValidationRules,
  validateLogin,
};
