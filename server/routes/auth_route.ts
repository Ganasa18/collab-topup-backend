import express from "express";
import { catchAsync } from "../middleware/";
import { signUp, login } from "../controllers/app";
const {
  userValidationRules,
  validateRegister,
} = require("../middleware/user/user_create_validate");
const {
  userLoginValidationRules,
  validateLogin,
} = require("../middleware/user/user_login_validate");

const router = express.Router();
router.post(
  "/sign-up",
  userValidationRules(),
  validateRegister,
  catchAsync(signUp)
);

router.post(
  "/login",
  userLoginValidationRules(),
  validateLogin,
  catchAsync(login)
);

module.exports = router;
