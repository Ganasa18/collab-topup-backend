import { Response, Request, NextFunction } from "express";
import MenuProvider from "../../../../storage/models/menu/menu_model";
import { sendJsonResponse } from "../../../utils";

const getAllMenuMaster = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.size as string, 10) || 10;
    const offset: number = (page - 1) * limit;

    const { rows, count } = await MenuProvider.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]],
    });
    const totalPage = Math.ceil(count / limit);
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

export { getAllMenuMaster };
