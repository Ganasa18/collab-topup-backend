import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../..";
import { RoleAttributes } from "../../../server/interface/role_interface";

export interface RoleInput extends Optional<RoleAttributes, "id"> {}
export interface RoleOutput extends Required<RoleAttributes> {}

class RoleProvider
  extends Model<RoleAttributes, RoleInput>
  implements RoleInput
{
  declare id: number;
  declare role_name: string;

  static modelDefiner() {
    RoleProvider.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        role_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "roles_table",
        sequelize: sequelize,
      }
    );
  }
}

export default RoleProvider;
