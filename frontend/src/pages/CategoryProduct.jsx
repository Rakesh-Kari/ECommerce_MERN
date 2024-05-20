import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import productCategory from "../utils/ProductCategory";
import ProductsUsingSearch from "../components/ProductsUsingSearch";
import { useLocation } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const searchQuery = query.getAll("category");

  console.log("The search Query is", searchQuery);

  const searchQueryListObject = {};

  searchQuery.forEach((el) => {
    searchQueryListObject[el] = true;
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState(searchQueryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchProductByCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/v1/product/categoryWiseProduct`,
        {
          category: filterCategoryList,
        }
      );
      setProducts(response.data.categoryProduct);
      setLoading(false);
    } catch (err) {
      console.log("The error message is", err);
    }
  };

  console.log("The sort By is ", sortBy);

  useEffect(() => {
    fetchProductByCategory();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (categoryName) => selectCategory[categoryName]
    );
    setFilterCategoryList(arrayOfCategory);
    console.log("The filterCategory list is", arrayOfCategory);
  }, [selectCategory]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((previous) => {
      return { ...previous, [value]: checked };
    });
  };

  const handleOnChangeSort = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === "asc") {
      setProducts((previous) =>
        previous.sort((a, b) => a.sellingPrice - b.sellingPrice)
      );
    }
    if (value === "dsc") {
      setProducts((previous) =>
        previous.sort((a, b) => b.sellingPrice - a.sellingPrice)
      );
    }
  };

  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr] gap-2">
        <div className="bg-white p-2 min-h-[calc(100vh-160px)] overflow-y-scroll">
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-500 pb-1">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  value={"asc"}
                  onChange={handleOnChangeSort}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  value={"dsc"}
                  onChange={handleOnChangeSort}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-500 pb-1">
              Category By
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      id={categoryName?.value}
                      onChange={handleChange}
                      value={categoryName?.value}
                      checked={selectCategory[categoryName?.value]}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        <div>
          <div className="flex gap-4">
            <p className="font-bold">Search Products:</p>
            <p className="text-slate-600">{products.length}</p>
          </div>
          <div className="min-h-[calc(100vh-120px)] overflow-x-scroll max-h-[calc(100vh-120px)]">
            {products.length !== 0 && !loading && (
              <ProductsUsingSearch data={products} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
