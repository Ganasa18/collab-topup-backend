// INITIAL DATABASE CONFIG
module.exports = {
  development: {
    HOST: "localhost",
    USER: "masayoshi",
    PASSWORD: "    ",
    DB: "topup_db",
    PORT: 5432,
    dialect: "postgres",
    timezone: "+07:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      // ssl: {
      //   require: true, // This will help you. But you will see nwe error
      //   rejectUnauthorized: false, // This line will fix new error
      // },
      dateStrings: true,
      typeCast: true, // for reading from database
    },
    timezone: "+07:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
