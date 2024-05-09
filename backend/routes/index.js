import express from "express";
import userRouter from "./user.js";
import errorMiddleware from "../middleware/error.js";

const router = express.Router();

router.use("/user", userRouter);
router.use(errorMiddleware);

export default router;
