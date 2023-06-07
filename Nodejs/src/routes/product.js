import express from "express";
import {
  create,
  get,
  getAll,
  remove,
  update,
  updatePartial,
} from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission..js";
const router = express.Router();
router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products/",checkPermission, create);
router.put("/products/:id",checkPermission, update);
router.delete("/products/:id",checkPermission, remove);
router.patch("/products/:id", updatePartial);
export default router;
