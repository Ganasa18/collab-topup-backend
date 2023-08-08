import { sequelize } from "../storage";
import { app } from "./app";
// SERVER PORT SETTING
const PORT = Number(process.env.PORT || 3001);

// ERROR EXCEPTION
process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// DATABASE CONNECTION INITIAL
async function assertDatabaseConnection() {
  sequelize
    .authenticate()
    .then(async () => {
      console.log("Connection has been established successfully.");
      // FORCE DB SYNC
      // await sequelize.sync({ force: true });
      // DB SYNC
      await sequelize.sync();
      console.log("successfully sync database");
    })
    .catch((err: Error) => {
      console.error("Unable to connect to the database:", err);
    });
}

// RUN DATABASE CONNECTION
assertDatabaseConnection();

//RUN SERVER
const server = app.listen(PORT, "0.0.0.0", () => {
  // event connection
  console.log(`App running on port ${PORT}...`);
});

// HANDLE REJECTION
process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
