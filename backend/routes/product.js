import express from "express";
import {
  categoryWiseProduct,
  categoryWiseProductInBody,
  createProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
  searchProduct,
  updateProduct,
} from "../controllers/product.js";
import { authToken } from "../middleware/authToken.js";
import { adminCheck } from "../middleware/authAdmin.js";

const productRouter = express.Router();

productRouter.post("/create", authToken, adminCheck, createProduct);
productRouter.get("/allproducts", authToken, adminCheck, getAllProducts);
productRouter.put("/update", authToken, adminCheck, updateProduct);

productRouter.get("/productByCategory", getProductByCategory);
productRouter.get("/categoryWiseProduct/:category", categoryWiseProduct);
productRouter.post("/categoryWiseProductInBody", categoryWiseProductInBody);
productRouter.get("/productById/:id", getProductById);

productRouter.get("/search", authToken, searchProduct);

export default productRouter;
