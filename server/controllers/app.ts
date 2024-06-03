import { setActivateAccount } from "./auth/activate_account";
import { registerUser } from "./auth/sign_up";
import { loginUser } from "./auth/login";
import { getTest } from "./test_route/get_test";
import { addMenuMaster } from "./master/menu/create_menu";
import { getMenuUserMaster } from "./master/menu/get_menu_user";
import { addRoleMaster } from "./master/role/create_role";
import { getRoleMaster } from "./master/role/get_role";
import { updateRoleMaster } from "./master/role/update_role";
import { getAllMenuMaster } from "./master/menu/get_menu_master";
import { getAllSubMenuMaster } from "./master/menu/get_submenu_master";
import { addSubMenuMaster } from "./master/menu/create_submenu";
import { getAccessMaster } from "./master/access/get_access";
import { createAccessUserMaster } from "./master/access/create_access";

const testRoute = getTest();
const signUp = registerUser();
const login = loginUser();
const confirmAccount = setActivateAccount();

const createMenu = addMenuMaster();
const getMenuUser = getMenuUserMaster();
const getAllMenu = getAllMenuMaster();
const geAllSubMenu = getAllSubMenuMaster();
const createSubMenu = addSubMenuMaster();

const createRole = addRoleMaster();
const getRole = getRoleMaster();
const updateRole = updateRoleMaster();

const getAllAccess = getAccessMaster();
const createAccessUser = createAccessUserMaster();

export {
  testRoute,
  signUp,
  confirmAccount,
  login,
  createMenu,
  getMenuUser,
  getAllMenu,
  geAllSubMenu,
  createSubMenu,
  createRole,
  getRole,
  updateRole,
  getAllAccess,
  createAccessUser,
};
