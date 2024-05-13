import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({ data, index }) => {
  const [editProduct, setEditProduct] = useState(false);

  const imageStyle = {
    width: "100%", // Extend the image width to fill the container
    height: "auto", // Maintain aspect ratio
    maxWidth: "100%", // Ensure the image doesn't exceed the container's width
    maxHeight: "100%", // Ensure the image doesn't exceed the container's height
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage}
            style={imageStyle}
            alt="Product Image"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">{data.sellingPrice}</p>
          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
};

const AdminProductList = ({ products }) => {
  return (
    <div className="h-screen overflow-y-auto flex flex-col gap-4 p-4">
      {products.map((product, index) => (
        <AdminProductCard key={index} data={product} />
      ))}
    </div>
  );
};

export default AdminProductList;
