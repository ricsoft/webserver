import express from "express";
import bookmarksApiRouter from "./bookmarksApi.js";

const router = express.Router();
router.use(bookmarksApiRouter);

export default router;
