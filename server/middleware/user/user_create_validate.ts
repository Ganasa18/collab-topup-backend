import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
const userValidationRules = () => {
  return [
    // username must be an email
    body("email").isEmail().withMessage("Email must be valid"),
    // password must be at least 5 chars long
    body("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 characters long"),
  ];
};

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
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
  userValidationRules,
  validateRegister,
};
