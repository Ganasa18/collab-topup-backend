import { Request, Response, NextFunction } from "express";
import { sendJsonResponse } from "../../../utils";
import RoleProvider from "../../../../storage/models/role/role_model";

const getRoleMaster = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.size as string, 10) || 10;
    const offset: number = (page - 1) * limit;

    let { rows, count } = await RoleProvider.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]],
    });

    const totalPage = Math.ceil(count / limit);

    if (rows.length == 0) {
      count = 0;
    }

    const result = {
      message: "success",
      listData: rows,
      pageInfo: {
        currentPage: page,
        perPage: limit,
        totalRow: count,
        totalPage: totalPage,
      },
    };

    return sendJsonResponse(res, 200, result);
  };
};

export { getRoleMaster };
