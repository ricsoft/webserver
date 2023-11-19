import express from "express";
import * as bookmarks from "../controllers/bookmarks.js";
import { httpStatus } from "../utils/constants.js";

const router = express.Router();

router.get("/bookmarks/:param", async function (req, res) {
  let data = null;

  if (req.params.param === "backup") data = await bookmarks.getBackup();
  else if (req.params.param) data = await bookmarks.getFolder(req.params.param);
  checkData({ res: res, data: data });
});

router.get("/bookmarks", async function (req, res) {
  const data = await bookmarks.get();
  checkData({ res: res, data: data });
});

router.post("/bookmarks", async function (req, res) {
  const ok = await bookmarks.post(req.body);
  res.status(ok ? httpStatus.ok : httpStatus.error);
  res.send();
});

function checkData(args) {
  if (args.data) {
    args.res.status(httpStatus.ok);
    args.res.json(args.data);
  }

  args.res.status(httpStatus.error);
  args.res.send();
}

export default router;
