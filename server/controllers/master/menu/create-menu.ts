import { Request, Response, NextFunction } from "express";
import MenuProvider, {
  MenuInput,
} from "../../../../storage/models/menu/menu_model";
import { sendJsonResponse } from "../../../utils";

const addMenuMaster = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // REQUEST BODY
    const data: MenuInput = {
      menu_name: req.body.menu_name,
    };

    const menu = await MenuProvider.create(data);

    return sendJsonResponse(res, 200, { message: "success", data: menu });
  };
};

export { addMenuMaster };
