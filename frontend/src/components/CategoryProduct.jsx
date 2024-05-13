import React from "react";
import { useParams } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  const category = params.categoryName;
  return <div>{category}</div>;
};

export default CategoryProduct;
