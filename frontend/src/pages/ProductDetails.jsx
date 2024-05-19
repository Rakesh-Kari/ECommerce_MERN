import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/UserSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaStar, FaStarHalf } from "react-icons/fa";

const ProductDetails = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.users.singleProduct.product);

  console.log("The params is", id);
  console.log("Single product is", product);

  useEffect(() => {
    dispatch(getProductById(id));
    toast("Product details have been fetched");
  }, [id, dispatch]);

  const handleBuyProduct = (e, productId) => {
    // Add your buy product logic here
  };

  const handleAddToCart = (e, productId) => {
    // Add your add to cart logic here
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex ">
        <div className="border bg-slate-200 h-[500px] w-[500px]">
          <img
            src={product?.productImage}
            alt="Product Image"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="ml-10">
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {product?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {product?.productName}
            </h2>
            <p className="capitalize text-slate-400">{product?.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">{product?.sellingPrice}</p>
              <p className="text-slate-400 line-through">{product?.price}</p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuyProduct(e, product?._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                onClick={(e) => handleAddToCart(e, product?._id)}
              >
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description: </p>
              <p>{product?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
