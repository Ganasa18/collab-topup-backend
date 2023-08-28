import express from "express";
import {
  createAccessUser,
  createMenu,
  createRole,
  createSubMenu,
  geAllSubMenu,
  getAllAccess,
  getAllMenu,
  getMenuUser,
  getRole,
  updateRole,
} from "../controllers/app";
import { catchAsync } from "../middleware";

const {
  menuCreateValidationRules,
  validateCreateMenu,
} = require("../middleware/menu/menu_create_validate");

const {
  subMenuCreateValidationRules,
  validateCreateSubMenu,
} = require("../middleware/menu/sub_menu_create_validate");

const {
  roleCreateValidationRules,
  validateCreateRole,
} = require("../middleware/role/role_create_validate");

const {
  accessCreateValidationRules,
  validateCreateAccess,
} = require("../middleware/access/access_user_validate");

const router = express.Router();

// MENU MASTER
router.post(
  "/menu",
  menuCreateValidationRules(),
  validateCreateMenu,
  catchAsync(createMenu)
);

router.post(
  "/submenu",
  subMenuCreateValidationRules(),
  validateCreateSubMenu,
  catchAsync(createSubMenu)
);

router.get("/menu", catchAsync(getMenuUser));
router.get("/menu-master", catchAsync(getAllMenu));
router.get("/submenu-master", catchAsync(geAllSubMenu));

// ROLE USER MASTER
router.post(
  "/role",
  roleCreateValidationRules(),
  validateCreateRole,
  catchAsync(createRole)
);
router.get("/role", catchAsync(getRole));
router.put(
  "/role/:id",
  roleCreateValidationRules(),
  validateCreateRole,
  catchAsync(updateRole)
);

// ACCESS MASTER
router.post(
  "/access-master",
  accessCreateValidationRules(),
  validateCreateAccess,
  catchAsync(createAccessUser)
);
router.get("/access-master", catchAsync(getAllAccess));

module.exports = router;
