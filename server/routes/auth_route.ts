import express from "express";
import { catchAsync } from "../middleware/";
import { signUp } from "../controllers/app";
const {
  userValidationRules,
  validateRegister,
} = require("../middleware/user/user_create_validate");

const router = express.Router();
router.post(
  "/sign-up",
  userValidationRules(),
  validateRegister,
  catchAsync(signUp)
);

module.exports = router;
