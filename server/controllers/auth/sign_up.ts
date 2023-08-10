import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcryptjs");
import UserProvider, {
  UserInput,
} from "../../../storage/models/user/user_model";
import { AppError } from "../../middleware";
import { Email, signToken } from "../../utils/";

const registerUser = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // REQUEST BODY
    const data: UserInput = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      is_active: false,
    };

    await new Email(
      data,
      data.email,
      "localhost:3001/api/auth/active-account",
      "reset password"
    )
      .sendTicket()
      .catch((err) => {
        console.log(err);
      });

    // //CHECK IF USER HAS REGISTERED & HASH PASSWORD
    // UserProvider.beforeCreate(async (User) => {
    //   const checkUser = await UserProvider.findOne({
    //     where: {
    //       email: User.email,
    //     },
    //   });
    //   if (checkUser) {
    //     return next(new AppError("User already exists", 400));
    //   }
    //   const salt = bcrypt.genSaltSync(10);
    //   User.password = bcrypt.hashSync(User.password, salt);
    // });

    // // INSERT INTO DB
    // const auth = await UserProvider.create(data);

    // const token: string = await signToken(auth);
    // // Set Header Session
    // req.session = {
    //   jwt: token,
    // };

    return res.status(200).json({
      message: "success",
      // token: token,
      // data: auth,
      data: data,
    });
  };
};

export { registerUser };
