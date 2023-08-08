import { app } from "./app";
// SERVER PORT SETTING
const PORT = Number(process.env.PORT || 3001);

// ERROR EXCEPTION
process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// DATABASE CONNECTION

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
