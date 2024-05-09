import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const authToken = asyncErrorHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new errorHandler("User did not login", 400));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    req.userId = decoded._id;
    console.log(req.userId);
  } else {
    return next(new errorHandler("The decoded value is not correct", 400));
  }

  next();

  if (!token) {
    return next(new errorHandler("Token is not present", 400));
  }
});
