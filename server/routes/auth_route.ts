import express from "express";
import { catchAsync } from "../middleware/";
import { signUp } from "../controllers/app";
const {
  userValidationRules,
  validateRegister,
} = require("../middleware/user/user_create_validate");

const router = express.Router();
router.post(
  "/sign-up", // route path atau url path
  userValidationRules(), // validasi value masuk
  validateRegister, // check value error or not ?
  catchAsync(signUp) // controller sign up
);

module.exports = router;
