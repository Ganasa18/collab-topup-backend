import { registerUser } from "./auth/sign_up";
import { loginUser } from "./auth/login";
import { getTest } from "./test_route/get_test";

const testRoute = getTest();
const signUp = registerUser();
const login = loginUser();

export { testRoute, signUp, login };
