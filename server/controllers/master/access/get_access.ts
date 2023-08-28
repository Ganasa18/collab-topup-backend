import { Request, Response, NextFunction } from "express";
import { sendJsonResponse } from "../../../utils";
import MenuAccessProvider from "../../../../storage/models/menu/menu_access_model";
import MenuProvider from "../../../../storage/models/menu/menu_model";
import RoleProvider from "../../../../storage/models/role/role_model";

const getAccessMaster = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.size as string, 10) || 10;
    const offset: number = (page - 1) * limit;

    MenuAccessProvider.belongsTo(MenuProvider, { foreignKey: "menu_id" });
    MenuProvider.hasMany(MenuAccessProvider, { foreignKey: "id" });
    MenuAccessProvider.belongsTo(RoleProvider, { foreignKey: "level_user_id" });
    RoleProvider.hasMany(MenuAccessProvider, { foreignKey: "id" });

    // const rows = await MenuAccessProvider.findAll();

    let { rows, count } = await MenuAccessProvider.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]],
      include: [
        {
          model: MenuProvider,
          required: true,
          attributes: ["id", "menu_name"],
        },
        {
          model: RoleProvider,
          required: true,
          attributes: ["id", "role_name"],
        },
      ],
    });

    const totalPage = Math.ceil(count / limit);

    if (rows.length == 0) {
      count = 0;
    }

    const result = {
      message: "sucess",
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

export { getAccessMaster };
