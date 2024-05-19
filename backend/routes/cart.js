import express from "express";
import { authToken } from "../middleware/authToken.js";
import {
  addToCart,
  allCartDetails,
  countAddToCart,
  deleteCartProduct,
  updateAddToCart,
} from "../controllers/cart.js";

const cartRouter = express.Router();

cartRouter.post("/create", authToken, addToCart);
cartRouter.get("/count", authToken, countAddToCart);
cartRouter.get("/details", authToken, allCartDetails);
cartRouter.put("/update", authToken, updateAddToCart);
cartRouter.delete("/deleteProduct", authToken, deleteCartProduct);

export default cartRouter;
