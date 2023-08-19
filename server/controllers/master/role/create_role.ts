import { Request, Response, NextFunction } from "express";
import { sendJsonResponse } from "../../../utils";
import RoleProvider, {
  RoleInput,
} from "../../../../storage/models/role/role_model";

const addRoleMaster = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // REQUEST BODY
    const data: RoleInput = {
      role_name: req.body.role_name,
    };
    const role = await RoleProvider.create(data);
    return sendJsonResponse(res, 200, { message: "success", data: role });
  };
};

export { addRoleMaster };
