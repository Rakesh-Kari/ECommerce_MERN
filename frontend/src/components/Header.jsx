import React from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="cursor-pointer">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
          <input
            type="text"
            placeholder="Please search here..."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[40px] h-8 bg-red-500 flex items-center justify-center rounded-r-full text-white">
            <CiSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="text-3xl">
            <FaRegUserCircle />
          </div>
          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="text-white bg-red-500 flex items-center justify-center rounded-full w-5 h-5 p-1 absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>
            <Link to="/login">
              <button className="bg-red-500 px-3 rounded-full py-1 text-white hover:bg-red-700">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
