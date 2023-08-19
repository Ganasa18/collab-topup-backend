import { Request, Response, NextFunction } from "express";

import { sendJsonResponse } from "../../../utils";
import SubMenuProvider, {
  SubMenuInput,
} from "../../../../storage/models/menu/sub_menu_model";

const addSubMenuMaster = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // REQUEST BODY
    const data: SubMenuInput = {
      menu_id: req.body.menu_id,
      submenu_name: req.body.submenu_name,
      path_url: req.body.path_url,
      icon: req.body.icon,
    };

    const submenu = await SubMenuProvider.create(data);

    return sendJsonResponse(res, 200, { message: "success", data: submenu });
  };
};

export { addSubMenuMaster };
