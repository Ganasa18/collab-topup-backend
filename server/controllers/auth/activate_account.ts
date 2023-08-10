import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserProvider from "../../../storage/models/user/user_model";
import { AppError } from "../../middleware";
import { UserPayload } from "../../interface/user_interface";

const setActivateAccount = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.params.token;
    const jwtdummysecreat = "my-secret-key-and-ultra-long-secret";
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET ? process.env.JWT_SECRET : jwtdummysecreat
    ) as UserPayload;

    // VERIFY PAYLOAD
    if (!payload) {
      return next(new AppError("Token invalid", 401));
    }

    // VALIDATE USER
    const user = await UserProvider.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      return next(new AppError("Token invalid", 400));
    }

    if (user?.is_active) {
      return next(new AppError("User already activate", 400));
    }

    // UPDATE VALUE USER
    await UserProvider.update(
      { is_active: true },
      {
        where: {
          email: payload.email,
        },
      }
    );
    return res.redirect("https://google.com");
  };
};

export { setActivateAccount };
