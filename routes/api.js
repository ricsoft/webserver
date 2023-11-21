import express from "express";
import bookmarksApiRouter from "./bookmarksApi.js";
import { validatePin } from "../middleware/validatePin.js";

const router = express.Router();
router.use(validatePin, bookmarksApiRouter);

export default router;
