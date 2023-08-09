import express from "express";
import { catchAsync } from "../middleware/";
import { testRoute } from "../controllers/app";
const router = express.Router();

router.get("/", catchAsync(testRoute));

module.exports = router;
