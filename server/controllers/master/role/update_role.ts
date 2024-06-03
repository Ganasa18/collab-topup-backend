import { Request, Response, NextFunction } from "express";
import RoleProvider from "../../../../storage/models/role/role_model";
import { sendJsonResponse } from "../../../utils";
import { AppError } from "../../../middleware";

const updateRoleMaster = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const checkRole = await RoleProvider.findOne({ where: { id: id } });

    if (!checkRole) {
      return next(new AppError("Invalid request", 400));
    }

    const data = {
      role_name: req.body.role_name,
    };

    const role = await RoleProvider.update(data, {
      where: {
        id: id,
      },
      returning: true,
    });

    return sendJsonResponse(res, 201, { message: "success", data: role });
  };
};

export { updateRoleMaster };
