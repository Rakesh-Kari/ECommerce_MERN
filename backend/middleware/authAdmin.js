import { User } from "../models/User.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import errorHandler from "../utils/errorHandler.js";

export const adminCheck = asyncErrorHandler(async (req, res, next) => {
  const checkToken = await User.findById({
    _id: req.userId,
  });

  console.log("Checking the token", checkToken);

  if (checkToken.role === "ADMIN") {
    next();
  } else {
    return next(new errorHandler("User is not the admin", 400));
  }
});
