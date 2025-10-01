import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 4500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);

connectDB();

app.listen(port, console.log(`server is running on port: 4500...`));
