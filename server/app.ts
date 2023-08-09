import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { json } from "body-parser";
import { AppError } from "./middleware/";
import { globalErrorHandler } from "./middleware/";
const cookieParser = require("cookie-parser");

// EXPRESS INITIAL
const app = express();

// CORS
app.use(cors<Request>({ credentials: true, origin: true }));

// BODY PARSER, READING DATA FROM BODY INTO REQ BODY
app.use(json());

// SET CONFIG
app.set("trust proxy", true);

app.use(
  express.urlencoded({
    extended: true,
  })
);

// COOKIE PARSER MIDDLEWARE
app.use(cookieParser());

// ROUTES
const testRoutes = require("./routes/test_route");
const authRoutes = require("./routes/auth_route");

// URL
app.use("/api/v1/test-route", testRoutes);
app.use("/api/v1/auth", authRoutes);

// HANDLER ROUTES NOT FOUND
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export { app };
