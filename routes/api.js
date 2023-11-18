import express from "express";
import * as bookmarks from "../controllers/bookmarks.js";
import { httpStatus } from "../utils/constants.js";

const router = express.Router();

router.get("/bookmarks/:folder", async function (req, res) {
  let data = null;

  if (req.params.folder) data = await bookmarks.getFolder(req.params.folder);
  if (data) {
    res.status(httpStatus.ok);
    res.json(data);
  }

  res.status(httpStatus.error);
  res.send();
});

router.get("/bookmarks", async function (req, res) {
  const data = await bookmarks.get();

  if (data) {
    res.status(httpStatus.ok);
    res.json(data);
  }

  res.status(httpStatus.error);
  res.send();
});

router.post("/bookmarks", async function (req, res) {
  const ok = await bookmarks.post(req.body);
  res.status(ok ? httpStatus.ok : httpStatus.error);
  res.send();
});

export default router;
