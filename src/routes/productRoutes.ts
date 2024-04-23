import express from "express";
import { createProduct, getAllProduct } from "../controllers/productController";
import { uploadProductImage } from "../controllers/uploadsController";

const router = express.Router();

router.route("/").post(createProduct).get(getAllProduct);
router.route("/uploads").post(uploadProductImage);

export default router;
