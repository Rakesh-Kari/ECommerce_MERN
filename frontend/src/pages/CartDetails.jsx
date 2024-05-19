import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaMinusCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { countAddToCart } from "../redux/UserSlice";

const CartDetails = () => {
  const count = useSelector((state) => state.users.count.count);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCart = new Array(count).fill(null);
  const dispatch = useDispatch();

  const increaseQuantity = async (id, quantity) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/cart/update",
        {
          productId: id,
          quantity: quantity + 1,
        },
        {
          withCredentials: true,
        }
      );
      setData((prevData) =>
        prevData.map((product) =>
          product.product._id === id
            ? { ...product, quantity: quantity + 1 }
            : product
        )
      );
      return response.data;
    } catch (err) {
      console.log("The error message is", err);
    }
  };

  const decreaseQuantity = async (id, quantity) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/cart/update",
        {
          productId: id,
          quantity: quantity - 1,
        },
        {
          withCredentials: true,
        }
      );
      setData((prevData) =>
        prevData.map((product) =>
          product.product._id === id
            ? { ...product, quantity: quantity - 1 }
            : product
        )
      );
    } catch (err) {
      console.log("The error message is", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/v1/cart/deleteProduct",
        {
          data: { productId: id },
          withCredentials: true,
        }
      );
      dispatch(countAddToCart());
      setData((prevData) =>
        prevData.filter((product) => product?.product._id !== id)
      );
      console.log("Product deleted successfully from frontend");
    } catch (err) {
      console.error("Error deleting product from cart:", err);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/cart/details",
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setData(response.data.cart.items);
    } catch (err) {
      console.log("The error message is", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalQuantity = data.reduce(
    (previous, current) => previous + current.quantity,
    0
  );

  const totalPrice = data.reduce(
    (previous, current) =>
      previous + current.quantity * current.product.sellingPrice,
    0
  );

  console.log("The cart details data is", data);

  return (
    <div className="container mx-auto">
      <div>
        {data.length === 0 && loading && <p className="">No Data found</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        <div className="w-full max-w-3xl mb-2">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div className="w-full bg-slate-200 h-32 mt-5  border border-slate-300 animate-pulse rounded "></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div className="w-full bg-white h-32 mt-5  border border-slate-300 rounded flex relative">
                    <div className="w-32 h-full bg-slate-200">
                      <img
                        src={product?.product.productImage}
                        className="w-full h-full object-scale-down mix-blend-multiply "
                      />
                    </div>
                    <div className="px-4 py-2 ">
                      <div
                        className="absolute right-2 hover:text-white hover:bg-red-600 px-1 py-1 rounded-full cursor-pointer "
                        onClick={() => deleteProduct(product?.product._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product.product.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.product.category}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p className="text-red-500">
                          {product?.product.sellingPrice}
                        </p>
                        <p className="absolute right-0 pr-3 text-red-500">
                          {product?.product.sellingPrice * product.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          className="cursor-pointer text-red-500 w-6 h-6 flex justify-center items-center hover:bg-red-600 hover:text-white rounded"
                          onClick={() =>
                            decreaseQuantity(
                              product?.product._id,
                              product.quantity
                            )
                          }
                        >
                          <FaMinusCircle />
                        </button>
                        <span className="text-lg">{product?.quantity}</span>
                        <button
                          className="cursor-pointer text-red-500 w-6 h-6 flex justify-center items-center hover:bg-red-600 hover:text-white rounded "
                          onClick={() =>
                            increaseQuantity(
                              product?.product._id,
                              product.quantity
                            )
                          }
                        >
                          <FaCirclePlus />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 w-full max-w-[500px] bg-slate-300 mt-5 border bordre-slate-300 animate-pulse">
              Total
            </div>
          ) : (
            <div className="h-36 bg-white mt-5">
              <h2 className="bg-red-500 text-white px-4 py-1">Summary</h2>
              <div className="flex gap-2 items-center justify-between px-4 font-medium text-lg text-slate-500">
                <p className="">The total Quantity is: </p>
                <p className="">{totalQuantity}</p>
              </div>
              <div className="flex gap-2 items-center justify-between px-4 font-medium text-lg text-slate-500">
                <p>The total Price is: </p>
                <p>{totalPrice}</p>
              </div>
              <button className="bg-green-300 w-full p-4 mt-2 flex items-center justify-center hover:bg-green-600 hover:text-white">
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
