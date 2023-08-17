import { NextFunction, Request, Response } from "express";
import SubMenuProvider from "../../../../storage/models/menu/sub_menu_model";
import { MenuRemapAttributes } from "../../../interface/menu_interface";
import { sendJsonResponse } from "../../../utils";
import { AppError } from "../../../middleware";

const getMenuMaster = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let id = req.query.id;
    // const menus = await MenuProvider.sequelize?.query(
    //   `SELECT mt.id, mt.menu_name
    //    FROM menus_table mt
    //    JOIN menus_access_table mat ON
    //    mt.id = mat.menu_id
    //    WHERE mat.level_user_id = ${id}
    //    ORDER BY mat.menu_id ASC
    //   `,
    //   {
    //     model: MenuProvider,
    //     mapToModel: true,
    //   }
    // );

    // let menuId: number[] = [];
    // await Promise.all([
    //   menus?.map(async (menu) => {
    //     return menuId.push(menu.id);
    //   }),
    // ]);

    // `SELECT *
    //    FROM sub_menus_table smb
    //    JOIN menus_table mt ON smb.menu_id = mt.id
    //    WHERE smb.menu_id IN (${menuId.toString()})
    //   `,

    if (!id) {
      return next(new AppError("Bad Request", 400));
    }

    const submenu = await SubMenuProvider.sequelize?.query(
      `SELECT *, smb.id as sub_id 
       FROM sub_menus_table smb
       JOIN menus_table mt ON smb.menu_id = mt.id
       JOIN menus_access_table mat ON mt.id = mat.menu_id
       WHERE mat.level_user_id = ${id}
       AND smb.is_active IS TRUE
       ORDER BY smb.id
      `,
      {
        raw: true,
        model: SubMenuProvider,
        mapToModel: true,
      }
    );

    let menusRemap: any = submenu;
    let groupedTech;
    if (submenu) {
      groupedTech = Object.entries(
        menusRemap.reduce(
          (
            acc: any,
            {
              id,
              menu_name,
              submenu_name,
              path_url,
              icon,
              access,
              add,
              edit,
              remove,
            }: MenuRemapAttributes
          ) => {
            // console.log(menu_name);
            // Group initialization
            if (!acc[menu_name]) {
              acc[menu_name] = [];
            }

            // Grouping
            acc[menu_name].push({
              id,
              submenu_name,
              path_url,
              icon,
              access,
              add,
              edit,
              remove,
            });
            return acc;
          },
          {}
        )
      ).map(([label, submenu]) => ({
        label,
        submenu,
      }));
    }

    return sendJsonResponse(res, 200, {
      message: "success",
      data: groupedTech,
    });
  };
};

export { getMenuMaster };
