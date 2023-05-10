import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

//config
const app = express();
const API_DB = process.env.API_DB;
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// router
app.use("/api");

// database config
mongoose.connect(API_DB);
export const viteNodeApp = app;