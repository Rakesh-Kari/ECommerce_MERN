import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/product/productByCategory"
      );
      setCategoryProduct(response.data);
      setLoading(false);
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
    <div className="container mx-auto p-4 overflow-hidden">
      <div className="flex items-center gap-4 justify-between overflow-x-auto">
        {loading
          ? result &&
            result.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : result &&
            result.map((product, index) => {
              return (
                <Link
                  to={"product-category?category=" + product?.category}
                  className="cursor-pointer"
                  key={product?.category}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
