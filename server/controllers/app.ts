import { registerUser } from "./auth/sign_up";
import { getTest } from "./test_route/get_test";

const testRoute = getTest();
const signUp = registerUser();

export { testRoute, signUp };
