import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRouter.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use("/api/auth", authRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`App Runs on Port number ${port}`);
  });
});
