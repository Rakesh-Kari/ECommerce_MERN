import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductsUsingSearch from "../components/ProductsUsingSearch";

const SearchProduct = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const searchQuery = query.get("q");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/v1/product/search?q=${searchQuery}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setData(response.data.product);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
      setData([]);
    }
  };

  const delayedFetch = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      fetchProduct();
    }, 1000);

    setTimeoutId(id);
  };

  useEffect(() => {
    if (searchQuery) {
      delayedFetch();
    } else {
      setData([]);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  return (
    <div className="container mx-auto">
      {loading && <p className="text-lg text-center ">Loading...</p>}
      <div className="flex gap-4">
        <p className="mt-5 font-bold">Search Products: </p>
        <p className="mt-5 font-bold text-slate-700">{data.length}</p>
      </div>
      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4 mt-5">No Data found</p>
      )}
      {data.length !== 0 && !loading && (
        <ProductsUsingSearch loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
