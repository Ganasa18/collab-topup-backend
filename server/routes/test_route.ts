import express from "express";
import { catchAsync } from "../middleware/catch_async";
import { testRoute } from "../controllers/app";
const router = express.Router();

router.get("/", catchAsync(testRoute));

module.exports = router;
