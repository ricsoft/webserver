import express from "express";
import bookmarksApiRouter from "./bookmarksApi.js";
import discountsApiRouter from "./discountsApi.js";
import { validatePin } from "../middleware/validatePin.js";

const router = express.Router();
router.use(discountsApiRouter);
router.use(validatePin);
router.use(bookmarksApiRouter);

export default router;
