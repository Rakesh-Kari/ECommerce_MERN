import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
DB();
app.use(cookieParser());
app.use("/api/v1", router);

const PORT = process.env.PORT || 4000;

app.listen(3000, () => {
  console.log(`The server has been connected at PORT ${PORT}`);
});
