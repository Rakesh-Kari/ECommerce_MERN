import React, { useState } from "react";
import { IoMdExit } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from "../utils/ProductCategory";
import uploadImage from "../utils/Upload";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../redux/UserSlice";

const UploadProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const [uploadProductImage, setUploadProductImage] = useState("");
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    price: "",
    sellingPrice: "",
    description: "",
  });

  const deletingImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((previous) => {
      return {
        ...previous,
        productImage: [...newProductImage],
      };
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    setUploadProductImage(file.name);
    console.log("The image file is", file);

    const UploadImageCloudinary = await uploadImage(file);
    console.log("THe uploaded image is", UploadImageCloudinary);

    setData((previous) => {
      return {
        ...previous,
        productImage: [...previous.productImage, UploadImageCloudinary.url],
      };
    });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/product/create",
        data,
        { withCredentials: true }
      );
      console.log("THe product data is ", response.data);
      toast(response.data.message);
      onClose();
      dispatch(getAllProducts());
      return response.data;
    } catch (err) {
      console.log("The error message is", err);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 left-0 bottom-0 right-0 flex justify-center items-center ">
      <div className=" bg-white px-4 py-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Upload Product</h2>
          <div
            className="text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdExit />
          </div>
        </div>
        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={onHandleSubmit}
        >
          <label htmlFor="productName">Product Name: </label>
          <input
            type="text"
            required
            value={data.productName}
            placeholder="Please enter the product Name"
            name="productName"
            onChange={handleOnChange}
            className=" border py-1 px-2 outline-none hover:bg-slate-100"
          />
          <label htmlFor="brandName">Brand Name: </label>
          <input
            type="text"
            required
            value={data.brandName}
            placeholder="Please enter the brand Name"
            name="brandName"
            onChange={handleOnChange}
            className=" border py-1 px-2 outline-none hover:bg-slate-100"
          />

          <label htmlFor="category">Category: </label>
          <select
            required
            value={data.category}
            onChange={handleOnChange}
            name="category"
            className="outline-none border py-1 px-4 rounded"
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage">Product Image: </label>
          <label htmlFor="uploadProductImage">
            <div className="border rounded flex justify-center items-center h-32 bg-slate-200">
              <div className="flex justify-center items-center flex-col gap-2 text-slate-500 cursor-pointer">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  required
                  type="file"
                  id="uploadProductImage"
                  className="ml-20 hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((element, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={element}
                        width={80}
                        height={80}
                        className="bg-slate-200 border"
                      />
                      <div className="absolute top-0 right-0 p-1 border bg-red-700 rounded-full text-white hidden group-hover:block">
                        <IoIosCloseCircleOutline
                          onClick={() => deletingImage(index)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Please upload the product image</p>
            )}
          </div>

          <label htmlFor="price">Price: </label>
          <input
            required
            type="number"
            value={data.price}
            placeholder="Please enter the price"
            name="price"
            onChange={handleOnChange}
            className=" w-full  border py-1 px-2 outline-none hover:bg-slate-100"
          />

          <label htmlFor="sellingPrice">Selling Price: </label>
          <input
            required
            type="number"
            value={data.sellingPrice}
            placeholder="Please enter the price"
            name="sellingPrice"
            onChange={handleOnChange}
            className=" w-full  border py-1 px-2 outline-none hover:bg-slate-100"
          />

          <label htmlFor="Description">Description</label>
          <textarea
            required
            className="h-28 bg-slate-200 outline-none"
            rows={3}
            cols={5}
            name="description"
            value={data.description}
            onChange={handleOnChange}
            placeholder="Enter the product description"
          ></textarea>

          <button className="border flex justify-center items-center w-full max-w-sm mx-auto bg-red-400 py-2 mt-4 rounded hover:bg-red-700 hover:text-white">
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
