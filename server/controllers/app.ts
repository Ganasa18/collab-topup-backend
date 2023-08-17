import { setActivateAccount } from "./auth/activate_account";
import { registerUser } from "./auth/sign_up";
import { loginUser } from "./auth/login";
import { getTest } from "./test_route/get_test";
import { addMenuMaster } from "./master/menu/create-menu";
import { getMenuMaster } from "./master/menu/get-menu";
import { addRoleMaster } from "./master/role/create-role";

const testRoute = getTest();
const signUp = registerUser();
const login = loginUser();
const confirmAccount = setActivateAccount();

const createMenu = addMenuMaster();
const getMenu = getMenuMaster();

const createRole = addRoleMaster();

export {
  testRoute,
  signUp,
  confirmAccount,
  login,
  createMenu,
  getMenu,
  createRole,
};
