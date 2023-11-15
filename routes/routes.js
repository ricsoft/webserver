import express from "express";
import apiRoutes from "./api.js";

const views = `${process.cwd()}/views`;
const router = express.Router();

router.use(express.static('public'))
router.use("/api", apiRoutes);
router.use("/bookmarks", express.static(`${views}/bookmarks`));
router.get("/", (req, res) => res.status(200).send());

export default router;
