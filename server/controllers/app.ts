import { setActivateAccount } from "./auth/activate_account";
import { registerUser } from "./auth/sign_up";
import { loginUser } from "./auth/login";
import { getTest } from "./test_route/get_test";

const testRoute = getTest();
const signUp = registerUser();
const login = loginUser();
const confirmAccount = setActivateAccount();

export { testRoute, signUp, confirmAccount, login };

