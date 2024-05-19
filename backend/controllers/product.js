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

export const categoryWiseProduct = asyncErrorHandler(async (req, res, next) => {
  const category = req.params.category;

  const checkingCategory = await Product.findOne({ category });
  console.log(checkingCategory);
  if (!checkingCategory) {
    return next(
      new errorHandler(`The mentioned ${category} is not present`, 400)
    );
  }

  const categoryProduct = await Product.find({ category });

  return res.status(200).json({
    categoryProduct,
    message: `All the products in category ${category} have been fetched`,
  });
});

export const categoryWiseProductInBody = asyncErrorHandler(
  async (req, res, next) => {
    const category = req.body.category;

    const categoryProduct = await Product.find({ category });

    return res.status(200).json({
      categoryProduct,
      message: "Products have been fetched successsfully",
    });
  }
);

export const getProductById = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (!product) {
    return next(new errorHandler("Product is not found in database", 400));
  }

  return res.status(200).json({
    product,
    message: "product has been fetched succesfully",
  });
});

export const searchProduct = asyncErrorHandler(async (req, res, next) => {
  const query = req.query.q;

  const regex = new RegExp(query, "i", "g");

  const product = await Product.find({
    $or: [
      { productName: regex },
      {
        category: regex,
      },
    ],
  });

  return res.status(200).json({
    product,
    message: "Search operation has been done sucessfully",
  });
});
