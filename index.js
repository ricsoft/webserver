import router from "./routes/routes.js";
import express from "express";
import { setupDb } from "./db/db.js";
import "dotenv/config.js";

await setupDb();

const app = express();
app.use(express.json());
app.use(router);
app.listen(process.env.PORT);
