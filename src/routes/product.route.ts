import express from "express";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validateResource";
import { createProductHandler, updateProductHandler, getProductHandler, deleteProductHandler } from "../controller/product.controller";
import { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } from "../schema/product.schema";
import { deserializeUser } from "../middleware/deserializeUser";

const router = express.Router();
router.use(deserializeUser, requireUser);

// Product
router.post("/", [requireUser, validate(createProductSchema)], createProductHandler);
router.put("/:productId", [requireUser, validate(updateProductSchema)], updateProductHandler);
router.get("/:productId", validate(getProductSchema), getProductHandler);
router.delete("/:productId", [requireUser, validate(deleteProductSchema)], deleteProductHandler);

export default router;
