import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../..";
import { MenuAccessAttributes } from "../../../server/interface";

export interface MenuAccessInput extends Optional<MenuAccessAttributes, "id"> {}
export interface MenuAccessOutput extends Required<MenuAccessAttributes> {}

class MenuAccessProvider
  extends Model<MenuAccessAttributes, MenuAccessInput>
  implements MenuAccessOutput
{
  declare id: number;
  declare level_user_id: number;
  declare menu_id: number;
  declare access: boolean;
  declare add: boolean;
  declare edit: boolean;
  declare remove: boolean;

  static modelDefiner() {
    MenuAccessProvider.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        level_user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        menu_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        access: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        add: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        edit: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        remove: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "menus_access_table",
        sequelize: sequelize,
      }
    );
  }
}

export default MenuAccessProvider;
