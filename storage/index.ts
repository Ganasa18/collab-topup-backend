import { Sequelize } from "sequelize";
import UserProvider from "./models/user/user_model";
import MenuProvider from "./models/menu/menu_model";
import SubMenuProvider from "./models/menu/sub_menu_model";
import RoleProvider from "./models/role/role_model";
import MenuAccessProvider from "./models/menu/menu_access_model";
const env = process.env.NODE_ENV || "development";
const dbConfig = require(__dirname + "/../config")[env];

// IMPORT MODULE CONFIG
let sequelize: Sequelize;
sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// MODEL DEFINER
const modelDefiners = [
  UserProvider.modelDefiner,
  RoleProvider.modelDefiner,
  MenuProvider.modelDefiner,
  SubMenuProvider.modelDefiner,
  MenuAccessProvider.modelDefiner,
];
for (const modelDefiner of modelDefiners) {
  modelDefiner();
}
export { sequelize };
