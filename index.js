import router from "./routes/routes.js";
import express from "express";
import exphbs from "express-handlebars";
import https from "https";
import fs from "fs";
import cors from "cors";
import { setupDb } from "./db/db.js";
import "dotenv/config.js";

await setupDb();

const app = express();
app.use(cors());
app.use(express.json());
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(router);

if (JSON.parse(process.env.HTTPS)) {
  https
    .createServer(
      {
        // openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 9999
        key: fs.readFileSync("key.pem"),
        passphrase: process.env.PASSPHRASE,
        cert: fs.readFileSync("cert.pem"),
      },
      app
    )
    .listen(process.env.PORT);
} else {
  app.listen(process.env.PORT);
}
