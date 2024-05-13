import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductByCategory,
  updateProduct,
} from "../controllers/product.js";
import { authToken } from "../middleware/authToken.js";
import { adminCheck } from "../middleware/authAdmin.js";

const productRouter = express.Router();

productRouter.post("/create", authToken, adminCheck, createProduct);
productRouter.get("/allproducts", authToken, adminCheck, getAllProducts);
productRouter.put("/update", authToken, adminCheck, updateProduct);

productRouter.get("/productByCategory", getProductByCategory);

export default productRouter;
