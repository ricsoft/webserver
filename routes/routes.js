import express from "express";
import apiRoutes from "./api.js";
import { getDiscounts } from "../controllers/discounts.js";
import { logger } from "../middleware/logger.js";

const views = `${process.cwd()}/views`;
const router = express.Router();

router.use(logger);
router.use(express.static("public"));
router.use("/api", apiRoutes);
router.use("/bookmarks", express.static(`${views}/bookmarks`));
router.get("/discounts", async (req, res) => await getDiscounts(res));
router.get("/", (req, res) => res.status(200).send());

export default router;
