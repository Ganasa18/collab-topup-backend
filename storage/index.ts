import { Sequelize } from "sequelize";
import UserProvider from "./models/user/user_model";
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
const modelDefiners = [UserProvider.modelDefiner];
for (const modelDefiner of modelDefiners) {
  modelDefiner();
}
export { sequelize };
