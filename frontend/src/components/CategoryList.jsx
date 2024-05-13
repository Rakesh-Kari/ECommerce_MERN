import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);

  const fetchCategoryProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/product/productByCategory"
      );
      setCategoryProduct(response.data);
      console.log("The set category product", response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const result = categoryProduct.productCategoryArray;

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-10 ">
        <Slider {...settings}>
          {result &&
            result.map((product, index) => {
              return (
                <div className="bg-white h-[300px] rounded-xl">
                  <div className="h-56 bg-indigo-500 flex justify-center items-center">
                    <img
                      src={product.productImage}
                      alt="a randomn image"
                      className="h-44 w-44 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-4 p-4 ">
                    <Link
                      to={"/product-category/" + product?.category}
                      className="border px-4 py-1 bg-indigo-400 hover:bg-indigo-600 hover:text-white"
                    >
                      {product.category}
                    </Link>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryList;
