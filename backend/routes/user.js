import express from "express";
import { SignIN, SignUp, UserDetails } from "../controllers/user.js";
import { authToken } from "../middleware/authToken.js";

const userRouter = express.Router();

userRouter.post("/signup", SignUp);
userRouter.post("/signin", SignIN);
userRouter.get("/details", authToken, UserDetails);

export default userRouter;
