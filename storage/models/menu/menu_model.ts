import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../..";
import { MenuAttributes } from "../../../server/interface/menu_interface";

export interface MenuInput extends Optional<MenuAttributes, "id"> {}
export interface MenuOutput extends Required<MenuAttributes> {}

class MenuProvider
  extends Model<MenuAttributes, MenuInput>
  implements MenuInput
{
  declare id: number;
  declare menu_name: string;

  static modelDefiner() {
    MenuProvider.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        menu_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "menus_table",
        sequelize: sequelize,
      }
    );
  }
}

export default MenuProvider;
