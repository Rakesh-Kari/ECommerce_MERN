import React, { useEffect } from "react";
import UploadProduct from "../components/UploadProduct";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/UserSlice";
import AdminProductCard from "../components/AdminProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const productsList = useSelector(
    (state) => state.users.allProducts.allProducts
  );

  console.log("The list of all the products is", productsList);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <div className="font-bold text-lg">All Products</div>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className=" border px-4 py-2 rounded-full bg-red-200 hover:bg-red-500 hover:text-white"
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4  overflow-y-scroll">
        {Array.isArray(productsList) ? (
          productsList.map((product, index) => {
            return <AdminProductCard data={product} key={index} />;
          })
        ) : (
          <div>No products Available</div>
        )}
      </div>

      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} />
      )}
    </div>
  );
};

export default Products;
