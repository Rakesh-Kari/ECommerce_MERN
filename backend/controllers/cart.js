import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import errorHandler from "../utils/errorHandler.js";

export const addToCart = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;

  let { products } = req.body;
  if (!Array.isArray(products)) {
    products = [
      { productId: products.productId, quantity: products.quantity || 1 },
    ];
  } else {
    products = products.map((product) => ({
      productId: product.productId,
      quantity: product.quantity || 1,
    }));
  }

  const allProductsId = products.map((item) => item.productId);
  const checkingProducts = await Product.find({ _id: { $in: allProductsId } });

  if (allProductsId.length !== checkingProducts.length) {
    return next(new errorHandler("One or more products not found", 400));
  }

  let cart = await Cart.findOne({ user: userId });

  let message = "";

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
    message = "Cart has been created successfully";
  } else {
    message = "Product has been added to the cart";
  }

  for (const { productId, quantity } of products) {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }
  await cart.save();

  return res.status(200).json({
    success: true,
    cart,
    message,
  });
});

export const countAddToCart = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;

  const cart = await Cart.findOne({ user: userId });

  const count = cart ? cart.items.length : 0;

  return res.status(200).json({
    count,
    message: "Count has been fetched",
  });
});

export const allCartDetails = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  return res.status(200).json({
    cart,
    message: "Cart details have been fetched successfully",
  });
});

export const updateAddToCart = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;

  const { productId, quantity } = req.body;

  const cartUser = await Cart.findOne({ user: userId });

  if (!cartUser) {
    return next(new errorHandler("Cart not found", 400));
  }

  const itemIndex = cartUser.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return next(new errorHandler("product not found", 400));
  }

  cartUser.items[itemIndex].quantity = quantity;

  await cartUser.save();

  return res.status(200).json({
    cartUser,
    message: "Cart has been updated successfully",
  });
});

export const deleteCartProduct = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;

  const { productId } = req.body;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return next(new errorHandler("Cart has not been found", 400));
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return next(
      new errorHandler("There is no matching product in the cart", 400)
    );
  }

  cart.items.splice(itemIndex, 1);
  await cart.save();

  return res.status(200).json({
    cart,
    message: "Product has been deleted succesfully",
  });
});
