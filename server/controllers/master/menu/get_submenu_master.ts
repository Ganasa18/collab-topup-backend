import { Request, Response, NextFunction } from "express";
import { sendJsonResponse } from "../../../utils";
import SubMenuProvider from "../../../../storage/models/menu/sub_menu_model";
import MenuProvider from "../../../../storage/models/menu/menu_model";

const getAllSubMenuMaster = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.size as string, 10) || 10;
    const offset: number = (page - 1) * limit;

    SubMenuProvider.belongsTo(MenuProvider, {
      foreignKey: "menu_id",
    });
    MenuProvider.hasMany(SubMenuProvider, { foreignKey: "id" });

    const { rows, count } = await SubMenuProvider.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]],
      include: {
        model: MenuProvider,
        attributes: ["id", "menu_name"],
        required: false,
      },
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

export { getAllSubMenuMaster };
