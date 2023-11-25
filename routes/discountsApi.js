import express from "express";
import * as discounts from "../controllers/discounts.js";
import { httpStatus } from "../utils/constants.js";

const discountsApiRouter = express.Router();

discountsApiRouter.post("/discounts", async function (req, res) {
  const ok = await discounts.post(req.body);
  res.status(ok ? httpStatus.ok : httpStatus.error);
  res.send();
});

export default discountsApiRouter;
