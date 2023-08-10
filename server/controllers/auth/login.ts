import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcryptjs");
import UserProvider from "../../../storage/models/user/user_model";
import { AppError } from "../../middleware";
import { signToken } from "../../utils/sign_token";

const loginUser = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // REQUEST BODY
    const { email, password } = req.body;

    // Check user with email
    const user = await UserProvider.findOne({
      where: {
        email: email,
      },
    });
    // when user not found
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Periksa pengguna apakah aktif atau tidak
    if (!user.is_active) {
      return next(new AppError("User is not active", 403));
    }

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return next(new AppError("Wrong password", 401));
    }

    // Generate token
    const token: string = await signToken(user);

    // Set Header Session
    req.session = {
      jwt: token,
    };

    return res.status(200).json({
      message: "success",
      token: token,
      data: user,
    });
  };
};

export { loginUser };
