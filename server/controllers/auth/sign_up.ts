import { Request, Response, NextFunction } from "express";
import { UserInput } from "../../../storage/models/user/user_model";
import { body } from "express-validator";

const registerUser = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // REQUEST BODY
    const data: UserInput = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      is_active: false,
    };

    console.log(data, "REQUEST BODY");

    return res.status(200).json({
      message: "success",
      data: "create user",
    });
  };
};

export { registerUser };
