import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.listen(port, () => console.log(`server is running... 👍`));
