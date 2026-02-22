import "./config/env.js";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import paperRoutes from "./routes/paperRoutes.js";



const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/papers", paperRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});