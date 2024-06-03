import { Request, Response, NextFunction } from "express";
import { sendJsonResponse } from "../../../utils";
import MenuAccessProvider, {
  MenuAccessInput,
} from "../../../../storage/models/menu/menu_access_model";

const createAccessUserMaster = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data: MenuAccessInput = {
      level_user_id: req.body.level_user_id,
      menu_id: req.body.menu_id,
    };

    const accessUser = await MenuAccessProvider.create(data);

    sendJsonResponse(res, 200, { message: "sucess created", data: accessUser });
  };
};

export { createAccessUserMaster };
