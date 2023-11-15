import router from "./routes/routes.js";
import express from "express";
import "dotenv/config.js";

const app = express();
app.use(router);
app.listen(process.env.PORT);
