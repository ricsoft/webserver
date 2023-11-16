import express from "express";
import * as bookmarks from "../controllers/bookmarks.js";
import { httpStatus } from "../utils/constants.js";

const router = express.Router();

router.post("/bookmarks", async function (req, res) {
  const ok = await bookmarks.post(req.body);
  res.status(ok ? httpStatus.ok : httpStatus.error);
  res.send();
});

export default router;
