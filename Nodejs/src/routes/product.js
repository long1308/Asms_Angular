import express from "express";
import {
    create,
    get,
    getAll,
    remove,
    update,
} from "../controllers/index.js";
const router = express.Router();
router.get("/", getAll);
router.get("/:id", get);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
export default router;