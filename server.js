import "./config/env.js";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import paperRoutes from "./routes/paperRoutes.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"

const app = express();

app.use(cookieParser());

connectDB();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://10.241.135.97:5173"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/papers", paperRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running");
});