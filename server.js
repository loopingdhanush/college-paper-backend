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
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.use("/api/papers", paperRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});