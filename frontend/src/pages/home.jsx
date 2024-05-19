import React, { useEffect } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div className="">
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"} />
      <HorizontalCardProduct
        category={"televisions"}
        heading={"Popular Televisions"}
      />
      <VerticalCardProduct category={"mobiles"} heading={"InDemand Mobiles"} />
      <VerticalCardProduct category={"watches"} heading={"Top Watches"} />
    </div>
  );
};

export default Home;
