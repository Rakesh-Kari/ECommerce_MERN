import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productImage: {
    type: [],
    required: true,
    optional: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: String,
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
