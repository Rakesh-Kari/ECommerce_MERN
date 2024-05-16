import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const CategoryProduct = () => {
  const params = useParams();
  const category = params.categoryName;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductByCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/product/categoryWiseProduct/${category}`
      );
      setProducts(response.data.categoryProduct);
      setLoading(false);
    } catch (err) {
      console.log("The error message is", err);
    }
  };

  console.log("The products are catgeory Wise", products);

  useEffect(() => {
    fetchProductByCategory();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2 className="">The products are of Category: {category}</h2>
          {Array.isArray(products) &&
            products.map((product, index) => {
              return (
                <div>
                  <div>{product.productName}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
