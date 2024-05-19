import express from "express";
import userRouter from "./user.js";
import errorMiddleware from "../middleware/error.js";
import productRouter from "./product.js";
import cartRouter from "./cart.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use(errorMiddleware);

export default router;
