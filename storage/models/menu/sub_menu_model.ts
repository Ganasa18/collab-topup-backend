import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../..";
import { SubMenuAttributes } from "../../../server/interface";

export interface SubMenuInput extends Optional<SubMenuAttributes, "id"> {}
export interface SubMenuOutput extends Required<SubMenuAttributes> {}

class SubMenuProvider
  extends Model<SubMenuAttributes, SubMenuInput>
  implements SubMenuInput
{
  declare id: number;
  declare menu_id: number;
  declare submenu_name: string;
  declare path_url: string;
  declare icon: string;
  is_active?: boolean;

  static modelDefiner() {
    SubMenuProvider.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        menu_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        submenu_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        path_url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        icon: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "sub_menus_table",
        sequelize: sequelize,
      }
    );
  }
}

export default SubMenuProvider;
