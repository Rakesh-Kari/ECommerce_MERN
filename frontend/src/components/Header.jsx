import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCount, countAddToCart } from "../redux/UserSlice";
import { toast } from "react-toastify";
import { clearUserDetails } from "../redux/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countCart = useSelector((state) => state.users.count.count);
  const userDetails = useSelector((state) => state.users.userDetails);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [search, setSearch] = useState("");

  const tokenUserDetails = userDetails && userDetails.user;

  console.log("The count of the cart is", countCart);

  const firstUserDetail =
    Array.isArray(tokenUserDetails) && tokenUserDetails.length > 0
      ? tokenUserDetails[0]
      : null;

  useEffect(() => {
    dispatch(countAddToCart());
  }, [firstUserDetail]);

  const handleLogout = async () => {
    console.log("hello");
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/logout",
      {
        withCredentials: true,
      }
    );

    toast(response.data.message);
    navigate("/");
    dispatch(clearUserDetails());
    dispatch(clearCount());
    return response.data;
  };

  const ROLE = {
    ADMIN: "ADMIN",
    GENERAL: "GENERAL",
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    }
  };

  return (
    <div className="h-16 shadow-md bg-white fixed w-full z-40">
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
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[40px] h-8 bg-red-500 flex items-center justify-center rounded-r-full text-white">
            <CiSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative group flex justfy-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((previous) => !previous)}
            >
              {firstUserDetail ? (
                firstUserDetail.profilePic ? (
                  <img
                    src={firstUserDetail.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={firstUserDetail.name}
                  />
                ) : (
                  <FaRegUserCircle />
                )
              ) : null}
            </div>
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  {firstUserDetail && firstUserDetail.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel/all-products"
                      className="whitespace-nowrap hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((previous) => !previous)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <Link to="/cart-details" className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="text-white bg-red-500 flex items-center justify-center rounded-full w-5 h-5 p-1 absolute -top-2 -right-3">
              <p className="text-sm">{countCart}</p>
            </div>
          </Link>
          <div>
            {firstUserDetail ? (
              <button
                className="bg-red-500 px-3 rounded-full py-1 text-white hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-red-500 px-3 rounded-full py-1 text-white hover:bg-red-700">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
