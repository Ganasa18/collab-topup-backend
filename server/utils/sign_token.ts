import { UserAttribute } from "../interface/user_interface";
import { Response, Request } from "express";
const jwt = require("jsonwebtoken");

// export const createSendToken = async (
//   userData: UserAttribute,
//   statusCode: number,
//   res: Response,
//   req: Request
// ) => {
//   const token: string = await signToken(userData);
//   req.session = {
//     jwt: token,
//   };

//   return res.status(statusCode).json({
//     status: "success",
//     token: token,
//     data: userData,
//   });
// };

export const signToken = async (userData: UserAttribute) => {
  const jwtdummysecreat = "my-secret-key-and-ultra-long-secret";
  return await jwt.sign(
    {
      id: userData.id,
      email: userData.email,
    },
    process.env.JWT_SECRET ? process.env.JWT_SECRET : jwtdummysecreat,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
        ? process.env.JWT_EXPIRES_IN
        : "30d",
    }
  );
};
