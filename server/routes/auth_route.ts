import express from "express";
import { catchAsync } from "../middleware";
import { signUp, login, confirmAccount } from "../controllers/app";
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
  "/sign-up", // route path atau url path
  userValidationRules(), // validasi value masuk
  validateRegister, // check value error or not ?
  catchAsync(signUp) // controller sign up
);

router.post(
  "/login",
  userLoginValidationRules(),
  validateLogin,
  catchAsync(login)
);

// activate account
router.get("/activate-account/:token", catchAsync(confirmAccount));


module.exports = router;
