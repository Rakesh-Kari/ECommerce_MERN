import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import zod from "zod";
import errorHandler from "../utils/errorHandler.js";
import { Product } from "../models/Product.js";

const createProductValidation = zod.object({
  productName: zod.string(),
  brandName: zod.string(),
  productImage: zod.array(zod.string().optional()),
  category: zod.string(),
  description: zod.string(),
  price: zod.number().positive(),
  sellingPrice: zod.number().positive(),
});

export const createProduct = asyncErrorHandler(async (req, res, next) => {
  const success = createProductValidation.safeParse(req.body);
  if (!success) {
    return next(new errorHandler("Please give proper input validations", 400));
  }

  const {
    productName,
    brandName,
    productImage,
    category,
    description,
    price,
    sellingPrice,
  } = req.body;

  const existingProduct = await Product.findOne({ productName });
  if (existingProduct) {
    return next(new errorHandler("Product already exists", 400));
  }

  const product = await Product.create({
    productName,
    brandName,
    productImage,
    category,
    description,
    price,
    sellingPrice,
  });

  return res.status(200).json({
    product,
    message: "Product has been created",
  });
});

export const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const allProducts = await Product.find({});

  return res.status(200).json({
    allProducts,
    message: "The list of all Products",
  });
});

export const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const {
    _id,
    productName,
    brandName,
    category,
    description,
    price,
    sellingPrice,
    productImage,
  } = req.body;

  if (!_id) {
    return next(new errorHandler("Product id is required", 400));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id },
    {
      productName,
      brandName,
      description,
      category,
      price,
      sellingPrice,
      productImage,
    }
  );

  return res.status(200).json({
    updatedProduct,
    message: "Product has been updated succesfully",
  });
});

export const getProductByCategory = asyncErrorHandler(
  async (req, res, next) => {
    const productCategory = await Product.distinct("category");

    console.log("productCategory", productCategory);

    const productCategoryArray = [];

    for (const category of productCategory) {
      const product = await Product.findOne({ category });
      if (product) {
        productCategoryArray.push(product);
      }
    }

    return res.status(200).json({
      productCategory,
      message: "Fetched all the categories",
      productCategoryArray,
    });
  }
);
