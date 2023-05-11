import express from "express";
import routerProduct from "./product";

const router = express.Router();
router.use("/product",routerProduct);

export default router;