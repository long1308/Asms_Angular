import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routerProduct from "./routes/product.js";
import routerSize from "./routes/size.js";
import routerColor from "./routes/color.js";
import routerUser from "./routes/user.js";
import routerCategory from "./routes/category.js";
//config
const app = express();
const API_DB = process.env.API_DB;
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// router
app.use("/api", routerProduct);
app.use("/api", routerSize);
app.use("/api", routerColor);
app.use("/api", routerUser);
app.use("/api", routerCategory);
// database config
mongoose.connect(API_DB);
export const viteNodeApp = app;
