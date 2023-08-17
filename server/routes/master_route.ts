import express from "express";
import { catchAsync } from "../middleware/";
import { createMenu, createRole, getMenu } from "../controllers/app";

const {
  menuCreateValidationRules,
  validateCreateMenu,
} = require("../middleware/menu/menu_create_validate");

const {
  roleCreateValidationRules,
  validateCreateRole,
} = require("../middleware/role/role_create_validate");

const router = express.Router();

// MENU MASTER
router.post(
  "/menu",
  menuCreateValidationRules(),
  validateCreateMenu,
  catchAsync(createMenu)
);
router.get("/menu", catchAsync(getMenu));

// ROLE USER MASTER
router.post(
  "/role",
  roleCreateValidationRules(),
  validateCreateRole,
  catchAsync(createRole)
);

module.exports = router;
