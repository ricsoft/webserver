import express from "express";
import * as bookmarks from "../controllers/bookmarks.js";
import { httpStatus } from "../utils/constants.js";
import { checkData } from "../utils/utils.js";

const bookmarksApiRouter = express.Router();

bookmarksApiRouter.get("/bookmarks/:param", async function (req, res) {
  let data = null;
  if (req.params.param === "backup") data = await bookmarks.getBackup();
  else if (req.params.param) data = await bookmarks.getFolder(req.params.param);
  checkData({ res: res, data: data });
});

bookmarksApiRouter.get("/bookmarks", async function (req, res) {
  const data = await bookmarks.get();
  checkData({ res: res, data: data });
});

bookmarksApiRouter.post("/bookmarks", async function (req, res) {
  const ok = await bookmarks.post(req.body);
  res.status(ok ? httpStatus.ok : httpStatus.error);
  res.send();
});

export default bookmarksApiRouter;
