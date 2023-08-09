import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../..";
import { UserAttribute } from "../../../server/interface/user_interface";

export interface UserInput extends Optional<UserAttribute, "id"> {}
export interface UserOutput extends Required<UserAttribute> {}

class UserProvider
  extends Model<UserAttribute, UserInput>
  implements UserInput
{
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare is_active: boolean;
  declare remember_token: string;
  declare open_id: string;

  static modelDefiner() {
    UserProvider.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        open_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        remember_token: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "users_table",
        sequelize: sequelize,
      }
    );
  }
}

export default UserProvider;
