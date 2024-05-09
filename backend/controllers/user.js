import zod from "zod";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";

const SignupValidation = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

export const SignUp = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, profilePic } = req.body;
  const success = SignupValidation.safeParse(req.body);
  if (success.error) {
    return res.status(400).json({
      message: "Please provide proper input validations",
      errors: success.error.errors,
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new errorHandler("User is already existing", 400));
  }
  if (!email) {
    return next(new errorHandler("Please fill the email field", 400));
  }
  if (!name) {
    return next(new errorHandler("Please fill the name field", 400));
  }
  if (!password) {
    return next(new errorHandler("Please fill the password field", 400));
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    name,
    role: "General",
    password: hashedPassword,
    profilePic,
  });

  return res
    .status(201)
    .json({ user, message: "User has been created Successfully" });
});

const LoginValidation = zod.object({
  email: zod.string().email().nonempty(),
  password: zod.string().nonempty(),
});

export const SignIN = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const success = LoginValidation.safeParse(req.body);
  if (!success) {
    return next(new errorHandler("Please give proper input Validations", 400));
  }

  if (!email) {
    return next(new errorHandler("please fill the email field", 400));
  }
  if (!password) {
    return next(new errorHandler("please fill the password field", 400));
  }

  const user = await User.findOne({ email });

  const checkingPassword = await bcrypt.compare(password, user.password);
  console.log("Checking Password:", checkingPassword);

  if (!checkingPassword) {
    return next(new errorHandler("Password doesn't matches", 400));
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const tokenOption = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("token", token, tokenOption)
    .json({ token, message: "Login is successfull" });
});

export const UserDetails = asyncErrorHandler(async (req, res, next) => {
  const user = await User.find({
    _id: req.userId,
  });
  console.log(user);

  return res.status(200).json({ user, message: "The user has been found" });
});

export const UserLogout = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.status(200).json({ message: "The logout is successfull" });
});
